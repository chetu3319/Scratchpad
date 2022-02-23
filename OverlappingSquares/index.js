
const canvasSketch = require('canvas-sketch');
const { Vector } = require('p5');

var poissonSampler = require('./PoissonDiskSampling.js');
var WaterColorBlob = require('./WaterColorBlob.js');
var pallets = require('./color-pallet.json');

// Grab P5.js from npm
const p5 = require('p5');

// Attach p5.js it to global scope
new p5()

const settings = {
  // Tell canvas-sketch we're using p5.js
  p5: true,

  animate: false,
  fps:5,
  playbackRate: "throttle",

  dimensions: [2048, 2048],
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

var sketch = canvasSketch(() => {
  // Inside this is a bit like p5.js 'setup' function
  // ...
  Setup();


  
  // DrawFlowField(100, 100, color(255, 0, 0));
  // Attach events to window to receive them
  window.mouseClicked = ()   => {
  
  };
 

  // resizeCanvas(settings.dimensions[0], settings.dimensions[1]);

  // Return a renderer to 'draw' the p5.js content
  return ({ playhead, width, height }) => {
    // Draw with p5.js things
    // set background color

    Draw(); 
 
    

  };
}, settings);


var poissionDiskSampler;
var blobs = [];  
function Setup()
{
  poissionDiskSampler = new poissonSampler(30,100,width,height);
  
  background(255);

  


}



pallet = random(pallets);
function Draw ()
{



  noStroke(); 
  var points = poissionDiskSampler.samplePoints(); 

  // shuffle points array 
  points = shuffle(points);
  
  for(var i = 0; i < points.length; i++)
  {
    var b = new WaterColorBlob();
    b.c = color(random(pallet));
    b.CreatePolygon(points[i], Math.abs(randomGaussian(100,100)), 4,random(TWO_PI));
  
    b.polygonPoints = b.SubdividePolygon(b.polygonPoints, 0);
    b.CreateLayers(b.polygonPoints, Math.abs(randomGaussian(5,20)),0);
    b.ShowLayers();
    blobs.push(b);

  }


  
  for(var i = 0; i < points.length; i++)
  {

    let c = color(random(pallet));
    // c.setAlpha(Math.abs(randomGaussian(50, 20)));
    // blendMode(DIFFERENCE);
   noFill();
    stroke(c);
    strokeWeight(10);
    // ellipse(points[i].x, points[i].y, random(5, 10), random(5, 10));
    // rect(points[i].x, points[i].y, Math.abs(randomGaussian(100, 10)) ,Math.abs(randomGaussian(100, 10)));

  //  DrawRectWithAspectRatio(points[i].x, points[i].y, Math.abs(randomGaussian(2,2)), Math.abs(randomGaussian(100, 200)));
}

  

}

function DrawRectWithAspectRatio(x,y, aspectRatio, size)
{
 
  if(x == 0)
  {
    console.log(x,y);
  }
  if(aspectRatio > 1)
  {
    rect(x, y, size, size/aspectRatio);
  }
  else
  {
    rect(x, y, size*aspectRatio, size);
  }
}




