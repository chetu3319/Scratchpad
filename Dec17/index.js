
 const canvasSketch = require('canvas-sketch');

 // Grab P5.js from npm
 const p5 = require('p5');
const { reflectionSymmetry } = require('../Nov28/p5.repeater');
 
 // Attach p5.js it to global scope
 new p5()
 
 const settings = {
   // Tell canvas-sketch we're using p5.js
   p5: true,

   animate:true,

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
 
 var previousPoint = createVector(width/2, height/2);
 var previousWeight = CustomNoise() * 20;
 canvasSketch(() => {
   // Inside this is a bit like p5.js 'setup' function
   // ...
   previousPoint = createVector(width/2, height/2);
    previousWeight = CustomNoise() * 20;

   // Attach events to window to receive them
   window.mouseClicked = () => {

   };
 
   // Return a renderer to 'draw' the p5.js content
   return ({ playhead, width, height }) => {
     // Draw with p5.js things
      Draw(); 
    // DrawLines(); 
   };
 }, settings);



 function DrawLines()
 {
   var angle = frameCount * 0.1 * 360 ; 
   var vector = p5.Vector.fromAngle(radians(angle));
   

    vector.mult(300);
    // vector.add(mouseX, mouseY);

    drawLine(0, 10, createVector(mouseX,mouseY), vector);
 
    
    // line(width/2, height/2, vector.x, vector.y);
  
 }


 //uniform number generator
  function random(min, max)
  {
    return Math.random() * (max - min) + min;
  }

 function Draw()
 {
    // background("#E6E6EA");

    // Create a vector in the direction prvoided by the CustomNoise angle 
   
    var noiseAngle = CustomNoise()* TWO_PI;
    var noiseVector = p5.Vector.fromAngle(noiseAngle);
    noiseVector.mult(CustomNoise() * 500);
    // noiseVector.add(createVector(width/2, height/2));

    



    // Draw noiseVector 
    // stroke(fetwchColor());
    // strokeWeight(1);
    // line(previousPoint.x, previousPoint.y, previousPoint.x + noiseVector.x, previousPoint.y + noiseVector.y);

    // fill red color
    fill(100,0,0)
    

    var nextPointX = previousPoint.x + noiseVector.x;
    var nextPointY = previousPoint.y + noiseVector.y;
    var nextPointWeight = CustomNoise() * 20;


    strokeWeight(10); 
    // point(nextPointX, nextPointY);
    drawLine(previousWeight,nextPointWeight, previousPoint, createVector(nextPointX, nextPointY));
   
    previousWeight = nextPointWeight
    previousPoint = createVector(nextPointX, nextPointY);

    if(isOutOfCanvas(previousPoint))
    {
      previousPoint = createVector(width/2, height/2);
      previousWeight = CustomNoise() * 20;
      
    }
  
 }

 // Write a function to check if the point is out of canvas or not 
  function isOutOfCanvas(point)
  {
    if(point.x < 0 || point.x > width || point.y < 0 || point.y > height)
    {
      return true;
    }
    return false;
  }

 


// Draw 100 lines segments with starting weight and end weight 
function drawLine(startWeight, endWeight, stratPoint, endPoint)
{
   var currentPoint = stratPoint;
  var previousPoint = stratPoint;

  

  previousPoint = stratPoint;
   // if a random number is greater than 0.5 then use red color or else use green color 
  
  // extract 100 points from the line uniformly
  for (var i = 0; i < 100; i++)
  {
    var t = i / 100;
  
    var x = stratPoint.x + t * (endPoint.x - stratPoint.x);
   
    var y = stratPoint.y + t * (endPoint.y - stratPoint.y);
    var weight = startWeight + t * (endWeight - startWeight);

    weight = lerp(startWeight, endWeight, t);
    strokeWeight(weight);
    
  


      point(x, y);
  
    previousPoint = createVector(x, y);
  }

}







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

 