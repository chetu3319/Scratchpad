
const canvasSketch = require('canvas-sketch');
const {dft,dft2} = require("./dft.js");
const sketchSignalPath = require("./sketchSignalPath.js");
const opentype = require('opentype.js');
var {FetchContours,ResampleByPoints} = require('./svgUtils.js');



// Grab P5.js from npm
const p5 = require('p5');

// Attach p5.js it to global scope
new p5()

const settings = {
  // Tell canvas-sketch we're using p5.js
  p5: true,

  animate: true,
  // duration: 1,
  // loop: false,
  fps: 10,
  playbackRate:"throttle",

  dimensions: [2048, 2048],
  resizeCanvas: true,
  // Enable MSAA
  attributes: {
    antialias: true
  }
};


var wordContourPoints,wordShapePoints; 
// Optionally preload before you load the sketch
window.preload = () => {
  // Preload sounds/images/etc...

  opentype.load('Fonts/Kanit-Black.ttf', function (err, font) {
    if (err) {
      alert('Font could not be loaded: ' + err);
    } else {
      
      path = font.getPath("RE", 0, 0, 500);

      wordContourPoints = ResampleByPoints(path, 200);
      
      
    }
  });

};




var pathPoints = []; 

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
    background(0,0,0,50);
   
    scale(0.5);
    translate(width/2,height/2);
    // Draw(); 
    DrawPoints();
    let pts = GetDFTCalculations(wordContourPoints);
    if(wordShapePoints == undefined)
      wordShapePoints = pts;
    else
    {
      for(let i = 0; i < pts.length; i++)
      {
  
        wordShapePoints[i].unshift([pts[i][0][0],pts[i][0][1]]);
      }
   
    }


 
    
  
    DrawFourierShapePoints();
 
    

  };
}, settings);



function DrawPoints()
{

  
  if(wordContourPoints == undefined) return;

  push()
  translate(0,700);

  for(let i = 0; i < wordContourPoints.length; i++)
  {

    stroke(255);
    strokeWeight(1);
    for (let j = 0; j < wordContourPoints[i].length; j++) {
      point(wordContourPoints[i][j][0], wordContourPoints[i][j][1]);
    }

    // beginShape();
    // noFill();
    // stroke(255);
    // strokeWeight(5);
    
    // for (let j = 0; j < wordContourPoints[i].length; j++) {
    //   vertex(wordContourPoints[i][j][0], wordContourPoints[i][j][1]);
    // }
    // endShape();
  }

  pop()
}



function DrawTextSvgPath(path)
{
  if (path.commands== undefined) return

  background(0)
  noFill()
  stroke(255)
  for (let cmd of path.commands) {
      if (cmd.type === 'M') {
          beginShape()
          vertex(cmd.x, cmd.y)
      } else if (cmd.type === 'L') {
          vertex(cmd.x, cmd.y)
      } else if (cmd.type === 'C') {
          bezierVertex(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y)
      } else if (cmd.type === 'Q') {
          quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y)
      } else if (cmd.type === 'Z') {
          endShape(CLOSE)
      }
  }
}

let SketchFourierPoints=[]; 
function Setup()
{

  SketchFourierPoints = dft2(sketchSignalPath,50);


}


function GetDFTCalculations(signalData)
{
  
  let fourierPoints = []; 
  
  for(let i = 0; i < signalData.length; i++)
  {
    let dftPts = dft2(signalData[i],13);
    fourierPoints.push(dftPts);
  }

   return DrawFourierSketches(fourierPoints);
  

}

let t = 0; 
function DrawFourierSketches(fourierContours)
{
  var shapePoints = []; 
  if(t > TWO_PI)
  {
    t = 0; 
  }
  t += TWO_PI/1000;

  for(let i = 0; i < fourierContours.length; i++)
  {

    if(i != 1 )
    continue;

    print(fourierContours[i]);
    let points = []; 



    // for(let t = 0; t < TWO_PI; t+= TWO_PI/fourierContours[0][0].length)
    // {
      let vx = epiCycles(width / 2 + 100, 100, 0, fourierContours[i][0],t);
      let vy = epiCycles(100, height / 2 + 100, HALF_PI, fourierContours[i][1],t);
      
      points.push([vx.x, vy.y]);
    // }  
    shapePoints.push(points);
  }


  return shapePoints; 

}

function DrawFourierShapePoints()
{
  if(wordShapePoints == undefined)
    return; 


  
  for(let i = 0; i < wordShapePoints.length; i++)
  {
    // translate(100,0)
    beginShape();
    noFill();
    stroke(255);
    strokeWeight(5);

    // print(wordShapePoints[i]);
    for (let j = 0; j < wordShapePoints[i].length; j++) {
      vertex(wordShapePoints[i][j][0], wordShapePoints[i][j][1]);
    }
    endShape();
  }





}


let path = []; 
function Draw ()
{

 points = []; 
 for(let t = 0; t < TWO_PI; t+= TWO_PI/SketchFourierPoints[0].length)
 {
    let vx = epiCycles(width / 2 + 100, 100, 0, SketchFourierPoints[0],t);
    let vy = epiCycles(100, height / 2 + 100, HALF_PI, SketchFourierPoints[1],t);
    
    points.push(createVector(vx.x, vy.y));
 }
  

  beginShape();
  noFill();
  stroke(255);
  strokeWeight(10);
  for (let i = 0; i < points.length; i++) {
    curveVertex(points[i].x, points[i].y);
  }
  endShape();


  

}
var xoff = 10000; 
function epiCycles(x, y, rotation, fourier,t) {
  

  xoff += 0.001;
  let n = noise(xoff); 
  let iterator =20; ;
 
  // ellipse(n * width, 100, 50,50)

  iterator = constrain(iterator, 0, fourier.length );
  for (let i = 0 ; i <iterator ; i++) {
    let prevx = x;
    let prevy = y;

    let freq = fourier[i].frequency;
    let radius = fourier[i].amplitude * 2;
    let phase = fourier[i].phase;
 
    x += radius * cos(freq * t + phase + rotation);
    y += radius * sin(freq * t + phase + rotation);

    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);
    stroke(255);
    line(prevx, prevy, x, y);
  }
  // print((x,y))
  return createVector(x, y);
}




