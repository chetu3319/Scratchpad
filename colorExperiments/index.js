
const canvasSketch = require('canvas-sketch');
const { Vector } = require('p5');

const {LCH2RGB} = require('./ColorSpaceConversion.js');



// Grab P5.js from npm
const p5 = require('p5');

// Attach p5.js it to global scope
new p5()

const settings = {
  // Tell canvas-sketch we're using p5.js
  p5: true,

  animate: false,

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
   
    pallet = CreateScientificPalettes({l:100, c:10, h:random(360)});
    let bgLCH = random(pallet.analogous);
    let bgRGB = LCH2RGB(bgLCH.l, bgLCH.c, bgLCH.h);
    background(bgRGB);
    Draw(); 
 
    

  };
}, settings);


function Setup()
{

     
  

}




function Draw ()
{

  var resolution = 5; 

  translate(width/(2 *resolution),height/(2* resolution));
  counter = 0; 
  pallet = CreateScientificPalettes({l:53.2, c:104, h:random(360)});
  console.log(pallet)
  
  for(var i = 0; i < resolution; i++)
  {
    for(var j = 0; j < resolution; j++)
    {
      counter ++; 
      let p = createVector(i * width/resolution , j * height/resolution);
      let c = random(pallet.splitComplementary);
      let rgbColor = LCH2RGB(c.l, c.c, c.h);
   
      DrawRandomShape(p.x, p.y, width/resolution, rgbColor);
    }
  }



    // Draw circle 
   


}


function DrawRandomShape(x, y, size, color)
{
  // // Draw a circle
  fill(color);
  noStroke();
  let rSize = randomGaussian(size/2, size/10);
  rSize = constrain(rSize, size/10, size);
  ellipse(x, y, rSize, rSize);


  
}

function adjustHue(val) {
  if (val < 0) val += Math.ceil(-val / 360) * 360;

  return val % 360;
}

function CreateScientificPalettes(baseColor)
{
  const targetHueSteps = {
    analogous: [0, 30, 60],
    triadic: [0, 120, 240],
    tetradic: [0, 90, 180, 270],
    complementary: [0, 180],
    splitComplementary: [0, 150, 210]
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




