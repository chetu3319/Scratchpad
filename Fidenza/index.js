
const canvasSketch = require('canvas-sketch');
const { Vector } = require('p5');
var Particle = require("./Particle")

const colorPallet = {
  background: ["#1F2022", "#282A2E", "#373B41", "#42454D", "#565A65", "#6C7279"],
  primary: ["#541388","#d90368","#f1e9da","#2e294e","#ffd400"],
  secondary: ["#fdfffc","#235789","#c1292e","#f1d302","#020100"],
  tertiary: ["#F92672", "#FD971F", "#F4BF75", "#A6E22E", "#66D9EF", "#9E6FFF"],
}

// Grab P5.js from npm
const p5 = require('p5');

// Attach p5.js it to global scope
new p5()

const settings = {
  // Tell canvas-sketch we're using p5.js
  p5: true,

  animate: true,

  dimensions: [512, 512],
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


var flowFieldNoise; 
var lengthNoise; 
var xPosNoise, yPosNoise;
var particles = [];
var strokeWeightRange
var completedParticles = []; 
var sketch = canvasSketch(() => {
  // Inside this is a bit like p5.js 'setup' function
  // ...
  
 
  strokeWeightRange = createVector(2,5)
  flowFieldNoise = new CustomNoise(random(23487234580382093), 213345, 0.01);
  lengthNoise = new CustomNoise(324234, 213345, 0.1);
  xPosNoise = new CustomNoise(3489, 36523, 0.02);
  yPosNoise = new CustomNoise(6490234, 6576432, 0.02);


  for(var i = 0; i < 1; i++)
  {
    var p = AddNewParticle();
    particles.push(p);
  
  }

  
  // DrawFlowField(100, 100, color(255, 0, 0));
  // Attach events to window to receive them
  window.mouseClicked = ()   => {

    var p = AddNewParticle();

    particles.push(p);
  };
 

  // resizeCanvas(settings.dimensions[0], settings.dimensions[1]);

  // Return a renderer to 'draw' the p5.js content
  return ({ playhead, width, height }) => {
    // Draw with p5.js things
    background("#86BBD8");
    Draw(); 
    

  };
}, settings);


function AddNewParticle()
{
  var p = new Particle();
  p.position.x = random(-100,width+100);
  p.position.y = random(-100,height+100);
 
  // Create a random direction
  p.velocity = p5.Vector.random2D();
  p.velocity.mult(20);
  p.distanceThreshold = random(1,2)
  p.flowFieldNoise = flowFieldNoise;
  p.granualrity = 400;
  this.offset = p5.Vector.random2D();
  this.offset.mult(random(100,200));
  p.alpha = randomGaussian(200,50)
  // p.alpha = 255; 

  
  p.strokeWeightValue = Math.abs(randomGaussian(strokeWeightRange.x, strokeWeightRange.y));
  // p.strokeWeightValue = 50; 
  p.color = random(colorPallet.primary);
  return p;  

}

function Draw()
{
 

  

  for(var i = 0; i < particles.length; i++)
  {
    if(!particles[i].particleIsFinished)
    {
      particles[i].update();
      particles[i].checkCollision(particles);
      particles[i].checkCollision(completedParticles);
      particles[i].checkEdges();
      particles[i].show();
    }
    else
    {
      
      if(particles[i].lengthOfCurve() > 10)
      {
        completedParticles.push(particles[i]);
      }


      if(completedParticles.length > 20)
      {
        strokeWeightRange.x = 20;
        strokeWeightRange.y = 10; 
      }
      if(completedParticles.length > 1000)
        continue;

      // Adding new particle; 
     var p = AddNewParticle();


      particles[i]  = p;
      
    }

    
  }


  for(var i = 0; i < completedParticles.length; i++)
  {
    completedParticles[i].show();
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
    
   
    return noise(x,y);
  }
}















