
const canvasSketch = require('canvas-sketch');



// Grab P5.js from npm
const p5 = require('p5');
const { reflectionSymmetry } = require('../Nov28/p5.repeater');

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
  


  
  // DrawFlowField(100, 100, color(255, 0, 0));
  // Attach events to window to receive them
  window.mouseClicked = ()   => {


  };
 

  // resizeCanvas(settings.dimensions[0], settings.dimensions[1]);

  // Return a renderer to 'draw' the p5.js content
  return ({ playhead, width, height }) => {
    // Draw with p5.js things
    background("#090302");
  
    Draw();

  };
}, settings);


function Draw()
{
  noiseSeed(10);
  // Draw rectangle grid of resolution 10x10

  for(var x = 0; x < width/100; x ++)
  {
    for(var y = 0; y < height/100; y++)
    {
      colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF"];
   
      // convert rgb color to lch
      var lch = rgbToLch(colors[Math.floor(random(colors.length))]);
      console.log(lch);

      fill(colors[(x+ y) % 5]);
      rect(x*100, y*100, 100, 100);
    }
  }

}


function rgbToLch(rgb)
{
  // Convert RGB to LCH
  var lch = chroma(rgb).lch();
  return lch;
}


function AddColorPallet()
{
  // Five complementary colors hex codes
  colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF"];
  // create division



}