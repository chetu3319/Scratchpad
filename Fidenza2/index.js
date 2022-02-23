
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


var flowFieldNoise; 
var lengthNoise; 
var xPosNoise, yPosNoise;
var particles = [];
var strokeWeightRange
var completedParticles = []; 
var sketch = canvasSketch(() => {
  // Inside this is a bit like p5.js 'setup' function
  // ...
  
 
  strokeWeightRange = createVector(1,1)
  // flowFieldNoise = new CustomNoise(34,34,0.01);
  // lengthNoise = new CustomNoise(324234, 213345, 0.1);
  // xPosNoise = new CustomNoise(3489, 36523, 0.02);
  // yPosNoise = new CustomNoise(6490234, 6576432, 0.02);


  for(var i = 0; i < 10; i++)
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
    background("#090302");
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
  p.velocity.mult(10);
  p.distanceThreshold = 5
  p.flowFieldNoise = flowFieldNoise;
  p.granualrity = 0.005;
  this.offset = p5.Vector.random2D();
  this.offset.mult(random(100,200));
  p.alpha = 255; 
  // p.alpha = 255; 

  
  // p.strokeWeightValue = Math.abs(randomGaussian(strokeWeightRange.x, strokeWeightRange.y));
  p.strokeWeightValue = 1;
  // p.strokeWeightValue = 50; 
  p.color = color("#F6F8FF");
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
      // particles[i].showDirection();
      // if(particles[i].lengthOfCurve() >100)
      // {
      //   particles[i].particleIsFinished = true;
      // }
      particles[i].show();
    }
    else
    {
      
      if(particles[i].lengthOfCurve() > 50)
      {
        completedParticles.push(particles[i]);
      }


      if(completedParticles.length >= 0)
      {
        strokeWeightRange.x = 1;
        strokeWeightRange.y = 1; 
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















