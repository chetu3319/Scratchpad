
const canvasSketch = require('canvas-sketch');
const { Vector } = require('p5');



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


var samplingGrid = [];
var k = 30; 
var r = 80; 

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
    background(0);
    Draw(); 
 
    

  };
}, settings);

var activeList = [];
function Setup()
{
  let w = r / Math.sqrt(2); 
  let h = r / Math.sqrt(2);

  
  // Create a 2D array where rows are of width w and columns are of height w
  for (let i = 0; i < width; i = (int) (i + w))
  {
    var colArray = []; 
   
    for (let j = 0; j < height; j = (int) (j +h))
    {
      colArray.push(-1); 
    }
    samplingGrid.push(colArray);
  }

  var p = createVector(random(width), random(height));

  // identify the row and col index of the cell that the point is in
  var row = Math.floor(p.x / w);
  var col = Math.floor(p.y / h);


  // set the value of the cell to 1
  samplingGrid[row][col] = p;
  activeList.push(p);



}




function Draw ()
{

  
  let w = r / Math.sqrt(2); 
  let h = r / Math.sqrt(2);
  
  var pointFound = false; 

  if(activeList.length > 0)
  {
    var rIdx = floor(random(activeList.length));
    var randomPoint = activeList[rIdx];
    for(i = 0 ; i < k ; i++)
    {
      // find a random point at a distance r to 2r away from the randomIdx point
      
      var randomRadius = random(r, 2*r);
      var sample = p5.Vector.random2D();
      sample.setMag(randomRadius);
      sample.add(randomPoint);

      // check if the sample point is outside the canvas
      if(sample.x < 0 || sample.x > width || sample.y < 0 || sample.y > height)
      {
        continue; 
      }



      // Is the sample point close to any of the active points?
      var isClose = false;
      //find the row and col index of the cell that the sample point is in
      var row = Math.floor(sample.x / w);
      var col = Math.floor(sample.y / h);

      for(let x = row - 1; x< row+ 2; x++)
      {
        for(let y = col - 1; y < col + 2; y++)
        {
          if(x >= 0 && x < samplingGrid.length && y >= 0 && y < samplingGrid[0].length)
          {
            
            if(samplingGrid[x][y] != -1)
            {
   
              
             
              if(sample.dist(samplingGrid[x][y]) < randomGaussian(r, r/10))
              {
                isClose = true;
              }
            }
          }
        }
      }

      if(!isClose)
      {
        // set the value of the cell to 1

        
        samplingGrid[row][col] = sample;
        pointFound = true;
    
        
        // remove randompoint from the activeList 
        activeList.push(sample);
      }
     


    }

    if(pointFound == false)
    {
      activeList.splice(rIdx, 1);
    }
  }


  for(let i = 0; i < samplingGrid.length; i++)
  {
    for(let j = 0; j < samplingGrid[0].length; j++)
    {
      if(samplingGrid[i][j] != -1)
      {
        let p = samplingGrid[i][j]; 
        stroke(255,0,0);
        strokeWeight(40);
        point(p.x, p.y);
      }
    }
  }

  for (let i = 0; i < activeList.length; i++)
  {
    let p = activeList[i]; 
    stroke(0);
  strokeWeight(20)
    point(p.x, p.y);
 
  }

}




