
const canvasSketch = require('canvas-sketch');
const { Vector } = require('p5');


var polygon = require('./polygon.js');
var WaterColorBlob = require('./WaterColorBlob.js');



// Grab P5.js from npm
const p5 = require('p5');
const Polygon = require('polygon');

// Attach p5.js it to global scope
new p5()

const settings = {
  // Tell canvas-sketch we're using p5.js
  p5: true,

  animate: false,

  dimensions: [2048, 2048],
  resizeCanvas: true,
  fps: 1,
  // playbackRate: "throttle",
  // Enable MSAA
  attributes: {
    antialias: true
  }
};


// Optionally preload before you load the sketch
window.preload = () => {
  // Preload sounds/images/etc...

};

var blob; 
var sketch = canvasSketch(() => {
  // Inside this is a bit like p5.js 'setup' function
  // ...
  blob = new WaterColorBlob();
  
  blob.CreatePolygon(createVector(width/2, height/2), 50, 5);


  
  // DrawFlowField(100, 100, color(255, 0, 0));
  // Attach events to window to receive them
  window.mouseClicked = ()   => {
  
  };
 

  // resizeCanvas(settings.dimensions[0], settings.dimensions[1]);

  // Return a renderer to 'draw' the p5.js content
  return ({ playhead, width, height }) => {
    // Draw with p5.js things
    // set background color

    background(255);
    blob.polygonPoints = blob.SubdividePolygon(blob.polygonPoints,3);
    blob.CreateLayers(blob.polygonPoints, 30,3); 
    blob.ShowLayers();
    
    // blob.ShowBasePolygon();
 
    

  };
}, settings);


var polygonPoints,layers; 
function Setup()
{
  polygonPoints=polygon(createVector(width/2, height/2), 100, 10);
  for(var i = 0 ; i < 3; i ++)
  {
    polygonPoints = SubdividePolygonPoints(polygonPoints,.5);
  }

  layers = SubdivideIntoLayers(polygonPoints, 50);

  background(255);

}


var directions = []; 
function SubdividePolygonPoints(points,extentMultiplier)
{
  var newPoints = []; 
  for(var i = 0; i < points.length; i++)
  {
    var p1 = points[i];
    var p2 = points[(i+1) % points.length]; 

    if(dist(p1.x, p1.y, p2.x, p2.y) < 1)
    {
      continue; 
    }
    var midPoint = p5.Vector.lerp(p1, p2, randomGaussian(0.5, 0.1));

    DirectionPoints = {
      startPoint: midPoint,
      endPoint: midPoint
    }

    // Find the direction which is 90 degree anti-clockwise from the line between p1 and p2
    var dir = p5.Vector.sub(p2, p1);
    var l = dir.mag();
    dir.rotate(randomGaussian(-HALF_PI, HALF_PI/8));
    dir.normalize();
  
    dir.mult(randomGaussian(l* extentMultiplier, l/8));

    endPoint = p5.Vector.add(midPoint, dir);
    DirectionPoints.endPoint = endPoint;


    directions.push(DirectionPoints);

    newPoints.push(p1);
    newPoints.push(endPoint);
    newPoints.push(p2);
    
  }
  return newPoints; 
}

function SubdivideIntoLayers(points, layersCount)
{
  var layers = []; 

  for(let i = 0; i < layersCount; i++)
  {
    for(let j = 0 ; j < 1+ floor(i /3); j++)
    {
      newPoints = SubdividePolygonPoints(points, 1/j);
    }

    let opacity = Math.abs(randomGaussian(1, 5));

    layers.push({
      points: newPoints,
      opacity: opacity
    });
  }

  return layers;
}



function Draw ()
{
  background(255);
  // Draw a cirlce 
  var c = color("#f44336");
 
  // noFill(); 
  // stroke(color);
  noStroke(); 
  // strokeWeight(5);

 
  for(let i = 0; i < layers.length; i++)
  {
    let points = layers[i].points;
    let opacity = layers[i].opacity;

    c.setAlpha(opacity);
    fill(c);
    beginShape();
    for(var j = 0; j < points.length; j++)
    {
      var p = points[j]; 
      vertex(p.x, p.y);
     
      
    }
    endShape(CLOSE);
  }
 

 
  

}






