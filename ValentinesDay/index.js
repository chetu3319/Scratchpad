
const canvasSketch = require('canvas-sketch');
const { Vector } = require('p5');

var poissonSampler = require('./AlgoModules/PoissonDiskSampling.js');



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
    // set backg round color
    
    Draw(); 
 
    

  };
}, settings);


function Setup()
{



}




function Draw ()
{
  background("#EFC7E5");
  translate(width/2, height/2);
  for(let i = 0; i < 400; i++)
  {
  
    rotate(randomGaussian(0, 0.001));
    DrawHeartCurve();
  }

}


function DrawHeartCurve()
{
  let r = 50; 
  for(let t = 0 ; t < TWO_PI; t += 0.01)
  {
  let x = r *16*  Math.sin(t) * Math.sin(t) * Math.sin(t);
  let y= -r * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2*cos(3 * t)- cos(4 * t));
  // let y = 50 * 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

  stroke("#E18AD4")
  strokeWeight(10);
  point(x, y);
  }

}



