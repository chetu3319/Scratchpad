
const canvasSketch = require('canvas-sketch');


var polygon = require('./polygon.js');
var WaterColorBlob = require('./WaterColorBlob.js');
var PoissonDiskSampler = require('./PoissonDiskSampling.js');



// Grab P5.js from npm
const p5 = require('p5');

// Attach p5.js it to global scope
new p5()

var goldenRatio = 1.61803398875;
const settings = {
  // Tell canvas-sketch we're using p5.js
  p5: true,

  animate: false,

  dimensions: [2048/goldenRatio, 2048],
  resizeCanvas: true,
  fps: 5,
  playbackRate: "throttle",
  // Enable MSAA
  attributes: {
    antialias: true
  }
};

var poissonSampledPoints; 
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
    background(255);
    Draw(); 
 
    

  };
}, settings);


var pts = [];
var blobs = []; 
var coloePallet = ["#ed1c24","#235789","#f1d302","#9BC53D"]
var backgroundPaint,bPaints; 
function Setup()
{

  poissonSampledPoints = new PoissonDiskSampler(30,200,2048, 2048);

  // Create a grid of points equally spaced across the canvas at the resolution of 150 

  let cellWidth =  300/Math.sqrt(2);
  let cellHeight = 300 / Math.sqrt(2);
  let cols = ceil(width/cellWidth);
  let rows = ceil(height/cellHeight);
  console.log(cols*rows);
  
  pts = [];
  for(let i = 0; i < cols; i++)
  {
    for(let j = 0; j < rows; j++)
    {
      pts.push(createVector(75+i*cellWidth + randomGaussian(0,10), 75+j*cellHeight + randomGaussian(0,10)));
    }
  }



  // pts = poissonSampledPoints.samplePoints();

  for(let i = 0 ; i < pts.length; i++)
  {
    var b = new WaterColorBlob();
    b.c = color("#E9F1F7");
    b.CreatePolygon(pts[i], Math.abs(randomGaussian(25,3)), randomGaussian(7,1));
    b.polygonPoints = b.SubdividePolygon(b.polygonPoints,3);
    b.CreateLayers(b.polygonPoints, 30,3); 
    blobs.push(b);

  }

  bPaints = []; 
  for(let i = 0 ; i < pts.length; i++)
  {
    backgroundPaint = new WaterColorBlob();
    backgroundPaint.c = color("#FFB2E6");
    backgroundPaint.CreatePolygon(pts[i],120, randomGaussian(7,1));
    backgroundPaint.polygonPoints = backgroundPaint.SubdividePolygon(backgroundPaint.polygonPoints,3);
    backgroundPaint.CreateLayers(backgroundPaint.polygonPoints, 20,5);
    bPaints.push(backgroundPaint);
  }


  


}


// E0DFD5

function Draw ()
{

  for(let i = 0; i < bPaints.length; i++)
  {
    bPaints[i].ShowLayers();
  }
  
 
  for(let i = 0 ; i < blobs.length; i++)
  {
    blobs[i].ShowLayers();
  }
  console.log(blobs[0]);

  console.log("Done");


}

