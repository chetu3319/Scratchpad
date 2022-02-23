
const canvasSketch = require('canvas-sketch');

// Grab P5.js from npm
const p5 = require('p5');
const { reflectionSymmetry } = require('../Nov28/p5.repeater');

// Attach p5.js it to global scope
new p5()

const settings = {
  // Tell canvas-sketch we're using p5.js
  p5: true,

  animate: true,

  dimensions: [2048, 2048],
  resizeCanvas: true,
  // Enable MSAA
  attributes: {
    antialias: true
  }
};

let img; 
// Optionally preload before you load the sketch
window.preload = () => {
  // Preload sounds/images/etc...
  img = loadImage('testImg.jpg', ()=> {
    
    var aspectRatio = img.width / img.height;
    img.resize(width * aspectRatio, height);
    
    
  });


};


var flowFieldNoise; 
var lengthNoise; 
var xPosNoise, yPosNoise;
var sketch = canvasSketch(() => {
  // Inside this is a bit like p5.js 'setup' function
  // ...
  
  flowFieldNoise = new CustomNoise(10, 10, 0.01);
  lengthNoise = new CustomNoise(324234, 213345, 0.1);
  xPosNoise = new CustomNoise(3489, 36523, 0.02);
  yPosNoise = new CustomNoise(6490234, 6576432, 0.02);
  
  // DrawFlowField(100, 100, color(255, 0, 0));
  // Attach events to window to receive them
  window.mouseClicked = ()   => {

  };
  background(0);

  // resizeCanvas(settings.dimensions[0], settings.dimensions[1]);

  // Return a renderer to 'draw' the p5.js content
  return ({ playhead, width, height }) => {
    // Draw with p5.js things
    Draw(); 
    

  };
}, settings);


function Draw()
{
 
  var aspectRatio = img.width / img.height;
    img.resize(width * aspectRatio, height);
  

  // translate((width - img.width)/2, (height - img.height)/2);

  for(var i = 0; i < 1000; i++)
  {
  // background(0);
  var x = random() * width;
  var y = random() * height;
 

      var c = img.get(x, y);

      stroke(c);
      strokeWeight(lengthNoise.GetValue1D() * 10);
      var noiseValue = flowFieldNoise.GetValue2D( x/500, y/500);
      var angle = noiseValue * TWO_PI;
      var xOffset = cos(angle) * lengthNoise.GetValue1D() * 50;
      var yOffset = sin(angle) * lengthNoise.GetValue1D() * 50;
      line(x, y, x + xOffset, y + yOffset);
  

  }
}


function DrawFlowField(xResolution, yResolution, color)
{
  stroke(color)
  sizeX = width / xResolution;
  sizeY = height / yResolution;
  noiseSeed(10000); 

  for(var x = 0; x < xResolution; x++)
  {
    for(var y = 0; y < yResolution; y++)
    {
      var xPos = x * sizeX;
      var yPos = y * sizeY;
      var noiseValue = flowFieldNoise.GetValue(xPos/100, yPos/100);
      var angle = noiseValue * TWO_PI;
      var xOffset = cos(angle) * sizeX;
      var yOffset = sin(angle) * sizeY;
      line(xPos, yPos, xPos + xOffset, yPos + yOffset);
    }
  }
}


function CustomNoise(seed, startValue, updateFrequency)
{
  this.seed = seed; 
  this.updateFrequency = updateFrequency;
  this.startValue = startValue; 
  this.GetValue1D = function()
  {
    noiseSeed(this.seed);
    this.startValue += this.updateFrequency;
    return noise(this.startValue);
  }

  this.GetValue2D = function(x, y)
  {
    noiseSeed(this.seed);
    
   
    return noise(x, y);
  }
}
















