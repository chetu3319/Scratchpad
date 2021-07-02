let xoff,yoff; 
let noiseValues = []; 


function setup() {
  createCanvas(400, 400);
  xoff = 0; yoff= 100; 
  
  
  
  for(let i = 0; i< height -100; i++)
    {
       noiseValues.push(createVector(noise(xoff), noise(yoff))); 
       xoff += 0.01; 
      yoff += 0.01; 
    }
}


function draw() {
  background(0);
  
  noiseValues.push(createVector(noise(xoff), noise(yoff))); 
  
  for(let i = 0; i < noiseValues.length; i++)
    {
      let v = noiseValues[i]; 
      fill(100,255,255,10+v.x*10)
      noStroke(); 
      ellipse(width/2, height*2.5- i* 3, v.x*300, v.y* 200); 
      
    }
  
  noiseValues.shift(); 
  
  
  
  
  
  
  
  xoff += 0.01; 
  yoff += 0.01; 
  // noLoop(); 
  
}