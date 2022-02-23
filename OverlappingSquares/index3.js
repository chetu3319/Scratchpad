
const canvasSketch = require('canvas-sketch');
const { Vector } = require('p5');

var poissonSampler = require('./AlgoModules/PoissonDiskSampling.js');
var WaterColorBlob = require('./WaterColorBlob.js');
var pallets = require('./color-pallet.json');
var {LCH2RGB} = require('./ColorSpaceConversion.js');

var PoissonFilledRect = require('./AlgoModules/Rectangles/PoissonFilledRect.js')
var CurvedRectangle = require('./AlgoModules/Rectangles/CurvedRectangle.js')

// Grab P5.js from npm
const p5 = require('p5');
const PoissonDiskSampler = require('./AlgoModules/PoissonDiskSampling.js');

// Attach p5.js it to global scope
new p5()

const settings = {
  // Tell canvas-sketch we're using p5.js
  p5: true,

  animate: false,
  fps:20,
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
    poissionDiskSampler.samplePoints();
     
  
  };
 

  // resizeCanvas(settings.dimensions[0], settings.dimensions[1]);

  // Return a renderer to 'draw' the p5.js content
  return ({ playhead, width, height }) => {
    // Draw with p5.js things
    // set background color
    clear(); 
    pallet = CreateScientificPalettes({l:100, c:30, h:random(0,360)});


    bgPoints = bgPoisson.samplePoints();
    for(let i = 0; i < bgPoints.length; i++)
    {
      let c = random(pallet.analogous);
      c = LCH2RGB(c.l, c.c, c.h);
      c.setAlpha(50); 
      fill(c);
      noStroke(); 
      ellipse(bgPoints[i].x, bgPoints[i].y, 10, 10);
    }

    // points = poissionDiskSampler.samplePoints();
    
 
     

    // for(let i = 0; i < points.length; i++)
    // {
    //   pallet = CreateScientificPalettes({l:50, c:100, h:random(0,360)});

    //   let aspectRatio = random(0,4);
    //   let w = randomGaussian(300,100);
    //   w = constrain(w,100,500);
    //   let h = w * aspectRatio;
    //   let dotResolution = randomGaussian(10,5);
    //   dotResolution = constrain(dotResolution,5,15);
      
    //   PoissonFilledRect(points[i],w,h,pallet.analogous,dotResolution);
     
    // }

    poissionDiskSampler = new poissonSampler(30,400,width,height);
    points = poissionDiskSampler.samplePoints();

    for(let i = 0; i < points.length; i++)
    {
      pallet = CreateScientificPalettes({l:50, c:100, h:random(0,360)});

      let aspectRatio = random(0,2);
      let w = randomGaussian(300,100);
      w = constrain(w,100,500);
      let h = w * aspectRatio;

      let strokeColor = random(pallet.analogous);
      strokeColor = LCH2RGB(strokeColor.l, strokeColor.c, strokeColor.h);
      CurvedRectangle(points[i].x, points[i].y,w,h,strokeColor,strokeColor);


    }
   


 
 

      
     
   
      

    


    

   
 
   

  };
}, settings);


function DrawRects()
{
  pallet = CreateScientificPalettes({l:100, c:10, h:randomGaussian(0,5)});
  let bgLCH = random(pallet.tetradic);
  let bgRGB = LCH2RGB(bgLCH.l, bgLCH.c, bgLCH.h);
  background(bgRGB);


  pallet = CreateScientificPalettes({l:50, c:100, h:random(0,360)});
  let c = random(pallet.analogous);
  let cRGB = LCH2RGB(c.l, c.c, c.h);

  let strokeColor = random(pallet.analogous);
  let StrokeColorRGB = LCH2RGB(strokeColor.l, strokeColor.c, strokeColor.h);




  var points = poissionDiskSampler.samplePoints(); 
  console.log(poissionDiskSampler.activeList.length);
  points = shuffle(points);

  for(let i = 0; i < points.length; i++)
  {
    let c = random(pallet.analogous);
    let cRGB = LCH2RGB(c.l, c.c, c.h);

    let strokeColor = random(pallet.analogous);
    let StrokeColorRGB = LCH2RGB(strokeColor.l, strokeColor.c, strokeColor.h);
    let w = random(400,700);
    let h = random(400,700);
    console.log(points[i])
  
    DrawCurvedRectange(points[i], w, h, cRGB, StrokeColorRGB);
  }

}

var poissionDiskSampler,bgPoisson;
var blobs = [];  
function Setup()
{
  
  randomSeed(1)
  poissionDiskSampler = new poissonSampler(30,500,width,height);
  bgPoisson = new poissonSampler(30,10,width,height);
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




