

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
         
    var linePoint = CreatePolygon(width/2, height/2, width/4, 6);
    var newLinePoints = SplitLinesRecrusively(linePoint, 5);
    DrawShape(newLinePoints);
 }




 function SplitLinesRecrusively(linePoints, level)
 {
    if(level == 0)
    {
      return linePoints;
    }
    else
    {
      var newLinePoints = []; 

      for(var i = 0; i < linePoints.length; i++)
      {
        // Create new set of Points
        var newPoints = SplitLine(linePoints[i], linePoints[(i+1)%linePoints.length]);
        newLinePoints.push(newPoints[0]);
        newLinePoints.push(newPoints[1]);
      }

      return SplitLinesRecrusively(newLinePoints, level - 1);
    }
 }

  function SplitLine(linePoint1, linePoint2)
  {
    var newLinePoints = [];

    var midPoint = createVector((linePoint1.x + linePoint2.x)/2, (linePoint1.y + linePoint2.y)/2);

  

    var newLinePoint1 = createVector(linePoint1.x, midPoint.y);
    var newLinePoint2 = createVector(midPoint.x, linePoint2.y);

    newLinePoints.push(newLinePoint1);
    newLinePoints.push(newLinePoint2);

    return newLinePoints;
  }

 function DrawShape(points)
  {
    beginShape();
    for(var i = 0; i < points.length; i++)
    {
      vertex(points[i].x, points[i].y);
    }
    endShape(CLOSE);
  }


  


 // Given radius and number of sides create a polygon
  function CreatePolygon(x,y,radius, sides)
  {
    var linePoints = [];
    // Start angle
    let a = 0;
    // End angle
    let b = TWO_PI;
    // Increment angle
    let inc = (b-a)/sides;
    // Draw polygon
    for (let i = 0; i < sides; i++)
    {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      linePoints.push(createVector(sx,sy));
      a += inc;
    }
  
    return linePoints;
  }




 