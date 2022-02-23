
const canvasSketch = require('canvas-sketch');

// Create a color pallet of Red, Yellow and Blue 
var colorPallet = [ "#FF0000", "#FFFF00", "#0000FF","#FFFFFF"];


// Grab P5.js from npm
const p5 = require('p5');


// Attach p5.js it to global scope
new p5()

const settings = {
  // Tell canvas-sketch we're using p5.js
  p5: true,

  animate: true,
  fps: 5,
  playbackRate: "throttle",
 

  dimensions: [2048, 2048*1.666],
  resizeCanvas: true,
  // Enable MSAA
  attributes: {
    antialias: true
  }
};


// Optionally preload before you load the sketch
window.preload = () => {
  // Preload sounds/images/etc...

};


var rectangles = []; 

var sketch = canvasSketch(() => {
  // Inside this is a bit like p5.js 'setup' function
  // ...
  var r = {
    x: 50,
    y: 50,
    w: width-100,
    h: height-100,
    c : SelectRandomColor()
  }

  rectangles.push(r);


  
  // DrawFlowField(100, 100, color(255, 0, 0));
  // Attach events to window to receive them
  window.mouseClicked = ()   => {
    ColorWhite();;

  };
 


  // resizeCanvas(settings.dimensions[0], settings.dimensions[1]);

  // Return a renderer to 'draw' the p5.js content
  return ({ playhead, width, height }) => {
    // Draw with p5.js things
    background(255);
  
    if(rectangles.length < 20)
    {
      SubdivideRectangels();
    }
    Draw();

  };
}, settings);


function Draw()
{

  stroke(0)
  strokeWeight(30);
  for (var i = 0; i < rectangles.length; i++) {
    fill(rectangles[i].c);
    rect(rectangles[i].x, rectangles[i].y, rectangles[i].w, rectangles[i].h);
  }
}

function SubdivideRectangels()
{
  var newRectangles = [];
  for(var i = 0; i < rectangles.length; i++)
  {
    if(random(1) < 0.5)
    {
      newRectangles.push(rectangles[i]);
      continue; 
    }  
 
    var originalRectangle = rectangles[i];

    var goldenRatio = 1.61803398875;
    var widthCut = 0
    var heightCut = 0; 
    if(random(1) < 0.5)
    {
 
      while(widthCut == 0 || widthCut > originalRectangle.w)
      {
        widthCut = randomGaussian(originalRectangle.w/goldenRatio, originalRectangle.w/(4*goldenRatio));
      }
     
    }
    else
    {
      while(heightCut==0 || heightCut > originalRectangle.h)
      {
        heightCut = randomGaussian(originalRectangle.h/goldenRatio, originalRectangle.h/(4*goldenRatio));
      }

    }
     


    var r1 = {
      x: originalRectangle.x,
      y: originalRectangle.y,
      w: widthCut != 0 ? widthCut : originalRectangle.w,
      h: heightCut != 0 ? heightCut : originalRectangle.h,
      c: originalRectangle.c
    }

    var r2 = {
      x: originalRectangle.x + widthCut,
      y: originalRectangle.y + heightCut,
      w: widthCut!=0 ? originalRectangle.w - widthCut : originalRectangle.w,
      h: heightCut!=0 ? originalRectangle.h - heightCut : originalRectangle.h,
      c: SelectRandomColor()
    }

    // if the delta between the area of two rectangles is less than 10% of the area of the original rectangle then we don't subdivide
    if(r1.w * r1.h < 0.2 * originalRectangle.w * originalRectangle.h || r2.w * r2.h < 0.2 * originalRectangle.w * originalRectangle.h)
    {
      newRectangles.push(originalRectangle);
      continue; 
    }

    // if the area of the two rectangles is less than 10% of the area of the canvas rectangle then we don't subdivide
    if(r1.w * r1.h < 0.02 * width * height || r2.w * r2.h < 0.02 * width * height)
    {
      newRectangles.push(originalRectangle);
      continue; 
    }

    // Aspect ratio should not be more than 2:1 or 1:2
    if((r1.w / r1.h > 7 || r1.w / r1.h < 1/7) || (r2.w / r2.h > 7 || r2.w / r2.h < 1/7))
    {
      newRectangles.push(originalRectangle);
      continue;
    }

    newRectangles.push(r1);
    newRectangles.push(r2);
  }

  rectangles = newRectangles;
}


function SelectRandomColor()
{
  return random(colorPallet);
  // return pallet[randomNumber]["color"];


}


function ColorWhite()
{
  
  for (var i = 0; i < rectangles.length; i++) {
    if(mouseX > rectangles[i].x && mouseX < rectangles[i].x + rectangles[i].w && mouseY > rectangles[i].y && mouseY < rectangles[i].y + rectangles[i].h)
    {
      console.log(rectangles[i]);
      var neighboringRects = FindNeighboring(rectangles[i]);
      console.log(neighboringRects);
      for(var j = 0; j < neighboringRects.length; j++)
      {
        neighboringRects[j].c = color(255);
      }
    }
  }
}

function FindNeighboring(r)
{
  // Find the neighboring rectangles of r and return them in an array
  var neighboring = [];
  for (var i = 0; i < rectangles.length; i++) {
    if(rectangles[i].x == r.x && rectangles[i].y == r.y)
    {
      continue;
    }
    if(rectangles[i].x == r.x + r.w && rectangles[i].y == r.y)
    {
      continue;
    }
    if(rectangles[i].x == r.x && rectangles[i].y == r.y + r.h)
    {
      continue;
    }
    if(rectangles[i].x == r.x + r.w && rectangles[i].y == r.y + r.h)
    {
      continue;
    }

    if(rectangles[i].y == r.y && rectangles[i].y + rectangles[i].w == r.y + r.w)
    {
      neighboring.push(rectangles[i]);
    }
    if(rectangles[i].x == r.x + r.w && rectangles[i].y == r.y)
    {
      neighboring.push(rectangles[i]);
    }
    if(rectangles[i].x == r.x && rectangles[i].y == r.y + r.h)
    {
      neighboring.push(rectangles[i]);
    }
    if(rectangles[i].x == r.x + r.w && rectangles[i].y == r.y + r.h)
    {
      neighboring.push(rectangles[i]);
    }
  }

  return neighboring;

}