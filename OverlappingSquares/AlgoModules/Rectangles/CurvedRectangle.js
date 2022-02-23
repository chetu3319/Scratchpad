// Grab P5.js from npm
const p5 = require('p5');


function CurvedRectangle(x,y,rectWidth,rectHeight, strokeColor, fillColor)
{
    rectMode(CENTER)
    strokeColor.setAlpha(10);
    stroke(strokeColor);
    strokeWeight(1);
  
    fillColor.setAlpha(2);
    fill(fillColor);
    // noFill(); 
  
    let iterators = randomGaussian(3000,100);
    iterators = constrain(iterators,1000,5000);
  

    for(let i = 0; i <iterators ; i++)
    {
      push();
      translate(x, y);
      
      scale(randomGaussian(1,0.005));
  
      rotate(randomGaussian(0,.01));
      
      
      rect(0, 0, rectWidth, rectHeight);
      pop();
  
    }  
  
}

module.exports = CurvedRectangle;