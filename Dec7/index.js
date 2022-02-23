

 const canvasSketch = require('canvas-sketch');

 // Grab P5.js from npm
 const p5 = require('p5');
const { reflectionSymmetry } = require('../Nov28/p5.repeater');
 
 // Attach p5.js it to global scope
 new p5()
 
 const settings = {
   // Tell canvas-sketch we're using p5.js
   p5: true,

   animate:false,

   dimensions: [2048, 2048],
   // Enable MSAA
   attributes: {
     antialias: true
   }
 };
 
 // Optionally preload before you load the sketch
 window.preload = () => {
   // Preload sounds/images/etc...
 };
 
 canvasSketch(() => {
   // Inside this is a bit like p5.js 'setup' function
   // ...

 
   // Attach events to window to receive them
   window.mouseClicked = () => {
     Draw(); 
   };
 
   // Return a renderer to 'draw' the p5.js content
   return ({ playhead, width, height }) => {
     // Draw with p5.js things
     Draw(); 
   };
 }, settings);


 function Draw()
 {
    background("#E6E6EA");
   
    
   var radius = width  * 1.5; 

   while(radius > 0)
   {

     radius -= (5+ CustomNoise() * 10); 
     strokeWeight(CustomNoise()*10);
     noStroke(); 
     var strokeColor =fetchColor();
     let c = fetchColor();
   
    //  ellipse(width/2,height/2, radius, radius); 
    var rotationNoise = CustomNoise() * 360; 
    for(var i = 0 ; i < CustomNoise() * 1000; i++)
    {
      c.setAlpha(CustomNoise() *255);
      strokeColor.setAlpha(100 + CustomNoise() *155);
      // stroke(strokeColor);
      fill(c);
       DrawEquilateralTriangle(width/2 + map(CustomNoise(),0,1,-250,250) , height/2 + map(CustomNoise(),0,1,-250,250) , radius+CustomNoise()*100 , rotationNoise);
    }

    
    //  rect(width/2,height/2, radius, radius);
     //triangle(width/2, height/2, width/2, height/2, width/2, height/2);
   }
 }



 function DrawRectangle(x,y,length,widht,rotation)
 {
   push();
   translate(x,y);
   rotate(rotation);
   rect(0,0,length,widht);
   pop();
 }

 function DrawEquilateralTriangle(x, y, size,angle)
 {
   // Given the center of the triangle, the size, and the angle,
    // draw the triangle.
   
      //  angle = 0; 
   var x1 = x + size * Math.cos(angle);
   var y1 = y + size * Math.sin(angle);

   var x2 = x + size * Math.cos(angle + 2 * Math.PI / 3);
   var y2 = y + size * Math.sin(angle + 2 * Math.PI / 3);

   var x3 = x + size * Math.cos(angle + 4 * Math.PI / 3);
   var y3 = y + size * Math.sin(angle + 4 * Math.PI / 3);

   triangle(x1, y1, x2, y2, x3, y3);

 }


//  function fetchColor()
//  {
//    var colorList = []; 
//    colorList.push(color("#009FB7"));
//    colorList.push(color("#FED766"));
//    colorList.push(color("#FE4A49"));

//    return colorList[Math.floor(Math.random() * colorList.length)];
//  }

// function fetchColor()
// {
//   var colorList = []; 
//   colorList.push(color("#BAFF29"));
//   colorList.push(color("#6290C3"));
//   colorList.push(color("#1A1B41"));

//   return colorList[Math.floor(Math.random() * colorList.length)];
// }

// function fetchColor()
// {
//   var colorList = []; 
//   colorList.push(color("#F4F4F8"));
//   colorList.push(color("#C3D350"));
//   colorList.push(color("#009FB7"));
//   colorList.push(color("#0F0A0A"));
//   colorList.push(color("#FED766")); 
//   colorList.push(color("#DE541E"));

//   return colorList[Math.floor(Math.random() * colorList.length)];
// }

function fetchColor()
{
  var colorList = []; 

  colorList.push(color("#FF3E41"));
  // colorList.push(color("#FF3E41"));
  // colorList.push(color("#FF3E41"));
  // colorList.push(color("#FF3E41"));

  // colorList.push(color("#FF3E41"));
  colorList.push(color("#49416D"));
  // colorList.push(color("#0F0A0A"));
  // colorList.push(color("#F4F4F8")); 

  return colorList[Math.floor(Math.random() * colorList.length)];
}



 var noiseOffset = 1; 
 var noisePointer = 100; 
 function CustomNoise()
 {
   noisePointer += noiseOffset;
   return noise(noisePointer);
 }

 