
const canvasSketch = require('canvas-sketch');
const { Vector } = require('p5');

var poissonSampler = require('./PoissonDiskSampling.js');
var WaterColorBlob = require('./WaterColorBlob.js');
var pallets = require('./color-pallet.json');
var {LCH2RGB} = require('./ColorSpaceConversion.js');

// Grab P5.js from npm
const p5 = require('p5');

// Attach p5.js it to global scope
new p5()

const settings = {
  // Tell canvas-sketch we're using p5.js
  p5: true,

  animate: false,
  fps:1,
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
  clear(); 
  pallet = CreateScientificPalettes({l:100, c:10, h:randomGaussian(0,5)});
  let bgLCH = random(pallet.tetradic);
    let bgRGB = LCH2RGB(bgLCH.l, bgLCH.c, bgLCH.h);
  background(bgRGB);
    Draw(); 
 
    

  };
}, settings);


var poissionDiskSampler;
var blobs = [];  
function Setup()
{
  
  poissionDiskSampler = new poissonSampler(30,500,width,height);

}




function Draw ()
{
  // blendMode(ADDITIVE);
  var points = poissionDiskSampler.samplePoints(); 
  points = shuffle(points);

  pallet = CreateScientificPalettes({l:10, c:100, h:randomGaussian(180,10)});

  // noStroke(); 
  rectMode(CENTER);
 
  for(var i = 0; i < points.length; i++)
  {
  
     


    let c = random(pallet.analogous);
    let strokeC = random(pallet.analogous)
    let strokeRGB = LCH2RGB(strokeC.r, strokeC.g, strokeC.b);
    let rgbColor = LCH2RGB(c.l, c.c, c.h);
    let alphaValue = randomGaussian(200,100);
    alphaValue = constrain(alphaValue, 0, 255);
    rgbColor.setAlpha(alphaValue);
    strokeRGB.setAlpha(alphaValue);
    fill(rgbColor);
    stroke(rgbColor);
    strokeWeight(randomGaussian(50,2));
    DrawRectWithAspectRatio(points[i].x, points[i].y,
    random(-1,5),Math.abs(randomGaussian(500,300)));
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


function adjustHue(val) {
  if (val < 0) val += Math.ceil(-val / 360) * 360;

  return val % 360;
}

function CreateScientificPalettes(baseColor)
{
  const targetHueSteps = {
    analogous: [-10,0,-20,-30,10,20, 30,40,50, 60],
    triadic: [0, 120, 240],
    tetradic: [0, 90, 180, 270],
    complementary: [0, 180],
    splitComplementary: [0, 150, 210],
  
  };

  const palettes = []; 

  for (const type of Object.keys(targetHueSteps)) {
    palettes[type] = targetHueSteps[type].map((step) => ({
      l: baseColor.l,
      c: baseColor.c,
      h: adjustHue(baseColor.h + step),
      mode: "lch"
    }));
  }

  return palettes;
}




