
const canvasSketch = require('canvas-sketch');
const { Vector } = require('p5');
const {quarternionData} = require("./Quarternions");

const {PerspectiveMatrix,RotateAlongZ,TransposeMatrix,MatrixMultiplyGeneral,QuaternionToMatrix,CreateScaleMatrix, RotateAlongX, PrintMatrix, WorldToImageMatrix, CameraProject,MatrixMultiply} = require('./Transformations');


// Grab P5.js from npm
const p5 = require('p5');

// Attach p5.js it to global scope
new p5()

const settings = {
  // Tell canvas-sketch we're using p5.js
  p5: true,

  animate: true,
  fps: 60,
  playbackRate: "throttle",

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
   background(0,0,0);
    Draw(); 
 
    

  };
}, settings);

const vertices = [[0.0, 0.0, 0.007],  [0.01, 0.0, 0.01], [-0.0, 0.0034, 0.007], [-0.0, 0.0, -0.01], [-0.01, 0.0, 0.01],  ];



const faces = [ [1, 2, 3], [1, 4, 5], [4, 2, 1], [1, 5, 4], [5, 1, 3], [3, 2, 4]];

const CameraProperties = {
  position: new Vector(0, 0, 0),
  up : new Vector(0, 1, 0),
  fov : PI / 4,
  target: new Vector(0, 0, 0),      // Camera always looks towards world center
  near: 0.01,
  far: 100,
  aspect: settings.dimensions[0] / settings.dimensions[1]
}

let points = [];

function Setup()
{


}




function Draw ()
{

  fill("#CE8964")
  stroke(0)
  strokeWeight(1)
  rect(0, width/2, width, height/2);
  fill("#274156")
  stroke(0)
  rect(0, 0, width, height/2);
  
  // print(quarternionData[frameCount % quarternionData.length]);
  
  let points = []; 

  
  // CameraProperties.position = new Vector(map(mouseX,0,width, -10, 10),map(mouseY, 0, height, -10, 10),5);
  
  CameraProperties.position = new Vector(0,1,3);
  
  
  
  let q = quarternionData[(frameCount*3) % quarternionData.length];
  
  //0.712668473907345, -0.0669152117629431, -0.0690413585080456, -0.694880603023836
  // let rotationMatrix = QuaternionToMatrix(q[0], q[1], q[2], q[3]);
  // PrintMatrix(rotationMatrix,4,4);

  pitchRollYaw = GetPitchRollYaw(q[0], q[1], q[2], q[3]);

  let rotationMatrix = RotateAlongX(pitchRollYaw[0]);

  let roataionMatrixZ = RotateAlongZ(pitchRollYaw[2]);


  rotationMatrix = MatrixMultiply(rotationMatrix, roataionMatrixZ);

  scaleMatrix = CreateScaleMatrix(50); 
  rotationMatrix = MatrixMultiply(rotationMatrix, scaleMatrix);

  // Multiply points by rotation matrix 
  for(let i = 0; i < vertices.length; i++)
  {
    let p = []; 
    p[0] = vertices[i][0];
    p[1] = vertices[i][1];
    p[2] = vertices[i][2];
    p[3] = 1;

    // Multiply by rotation matrix
    p = MatrixMultiplyGeneral(rotationMatrix, p,4,4,4,1);
    points[i] = []; 
    points[i][0] = p[0];
    points[i][1] = p[1];
    points[i][2] = p[2];
    points[i][3] = 1[3];


  }
  
  


  scaleMatrix = CreateScaleMatrix(50); 


  

  // Perspective Matrix: Confirmed working
 
  Xpi = PerspectiveMatrix(CameraProperties.fov, CameraProperties.aspect, CameraProperties.near, CameraProperties.far);


  // World to Image: Confirmed working

  Xiw = WorldToImageMatrix(CameraProperties.position, CameraProperties.target, CameraProperties.up);


  //rotationMatrix
  // Xr = RotationMatrix(0,0,0);
 
  // scaleMatrix = MatrixMultiply(RotateX,scaleMatrix);
  // PrintMatrix(scaleMatrix,4,4);

  
  // Xpi = MatrixMultiply( Xpi,scaleMatrix);
  Xpw = MatrixMultiply(Xiw,Xpi);
 


 
  let viewport = [0, 0, 2048, 2048];


  for(let i = 0; i < points.length; i++)
  {
 
    let projectedPoint = CameraProject(points[i],viewport,0,1,Xpw);
    

    points[i] = projectedPoint;
    // print(projectedPoint);
  }



 


  // Connect points based on faces index 
  for(let i = 0; i < faces.length; i++)
  {
    strokeWeight(5);

    let face = faces[i];
    let p1 = points[face[0] - 1];
    let p2 = points[face[1] - 1];
    let p3 = points[face[2] - 1];

    let c = color(25 , map(i, 0, faces.length, 50,85), map(i, 0, faces.length, 100, 255));
    

    fill(c);
   // stroke(10);
    noStroke()

    triangle(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

    // line(p1[0],p1[1],p2[0],p2[1]);
    // line(p2[0],p2[1],p3[0],p3[1]);
    // line(p3[0],p3[1],p1[0],p1[1]);
  
  }

  for(let i = 0; i < points.length; i++)
  {
    stroke(255);
    strokeWeight(10);
    point(points[i][0],points[i][1]);
   
    // fill(255);
    // textSize(50)
    // text(i,points[i][0],points[i][1]);
  
 
   
  }
}

function UpdateCamera()
{
  CameraProperties.position = new Vector(3,2,1);


}




function GetPitchRollYaw(x,y,z,w)
{
  let qx = x;
  let qy = y;
  let qz = z;
  let qw = w;

  yaw = atan2(2.0 * (qw*qz + qx*qy), 1.0 - 2.0 * (qy*qy + qz*qz)) ;

  roll = atan2(2.0 * (qw*qx + qy*qz), 1.0 - 2.0 * (qx*qx + qy*qy)) ;


  let sinp = 2.0 * (qw*qy - qx*qz);
  let pitch = 0; 
  if(Math.abs(sinp) >= 1)
  {
    pitch = sinp>0?PI/2: -PI/2;
  }
  else
  {
    pitch = asin(sinp);
  }

  pitch = pitch ;

  return [pitch, roll, yaw];
  
}




