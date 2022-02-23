
const canvasSketch = require('canvas-sketch');
const { Vector } = require('p5');
const opentype = require('opentype.js');
var  {FetchContours} = require('./FourierSketch.js');



// Grab P5.js from npm
const p5 = require('p5');

// Attach p5.js it to global scope
new p5()


// Variables 
var wordSvgPath,wordFourierSketchElements; 

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
  
  opentype.load('Fonts/Kanit-Black.ttf', function (err, font) {
    if (err) {
      alert('Font could not be loaded: ' + err);
    } else {
      
      wordSvgPath = font.getPath("LOVE", 00, 500, 500);

      print(wordSvgPath);

      wordFourierSketchElements = FetchContours(wordSvgPath);
      
      SegmentContoursToPoints(500);


      
    }
  });
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
    background(0,0,0,50);
    // scale(0.5);
    Draw(); 
 
    

  };
}, settings);


function Setup()
{



}



let t = 0; 
function Draw ()
{
  dt = TWO_PI /100; 
  if(t > TWO_PI)
  {
    t = 0; 
  }
  t += dt;

  if(wordFourierSketchElements == undefined)
    return; 

 
  for(let i = 0 ; i < wordFourierSketchElements.length; i++)
  {
    wordFourierSketchElements[i].DrawSvgContourPoints(); 
    wordFourierSketchElements[i].CalculateFourierSketchTrail(width/2, 100, t,dt,TWO_PI);
    wordFourierSketchElements[i].DrawEpiCyclePoints();
  }



}


///// 

function SegmentContoursToPoints(numberOfPoints)
{
  if (wordFourierSketchElements == undefined)
    return; 

  for(let i = 0 ; i < wordFourierSketchElements.length; i++)
  {
    let points = wordFourierSketchElements[i].svgContourLength * numberOfPoints/wordFourierSketchElements[i].wordTotalLength;
    wordFourierSketchElements[i].CalculateSvgPoints(points);
    wordFourierSketchElements[i].CalculateFourierEpicycleParams(20); 

   

  }

  // print(wordFourierSketchElements); 
}




