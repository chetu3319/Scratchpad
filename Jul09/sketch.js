/**
 * A p5.js example integrating with canvas-sketch.
 * Here, canvas-sketch handles the frame loop, resizing
 * and exporting.
 * @author Matt DesLauriers (@mattdesl)
 */

const canvasSketch = require("canvas-sketch");

// Grab P5.js from npm
const p5 = require("p5");

// Attach p5.js it to global scope
new p5();

const settings = {
  // Tell canvas-sketch we're using p5.js
  p5: true,
  // Turn on a render loop (it's off by default in canvas-sketch)
  animate: true,
  // Optional loop duration
  // Enable MSAA
  attributes: {
    antialias: true,
  },
  dimensions: [2048, 2048],
};

// Optionally preload before you load the sketch
window.preload = () => {
  // Preload sounds/images/etc...
};

canvasSketch(() => {
  // Inside this is a bit like p5.js 'setup' function
  // ...
  setup();
  // Attach events to window to receive them
  window.mouseClicked = () => {};

  // Return a renderer to 'draw' the p5.js content
  return ({ playhead, width, height }) => {
    // Draw with p5.js things
    clear();
    draw();
  };
}, settings);

let rotorObjs = [];
function setup() {
  // createCanvas(window.innerWidth, window.innerHeight);
  rotatorObj = new rotator();
  angleMode(DEGREES);
  let noiseOffset = 100;
  let c = new ColorGenerator();
  let length = random(10, 30);
  for (let i = 0; i < length; i++) {
    rotorObjs.push(new rotator());
    rotorObjs[i].color = c.GetColor(map(i, 0, length, 0.0, 1.0));
    rotorObjs[i].offset = (noise(noiseOffset) * width) / 2;
    rotorObjs[i].length = noise(noiseOffset + 100) * random(10, width);
    rotorObjs[i].trailLength = noise(noiseOffset + 400) * 1000;
    noiseOffset += 1;
  }
}

function draw() {
  background("#242424");

  fill(255);
  noStroke();
  for (let i = 0; i < rotorObjs.length; i++) {
    rotorObjs[i].update();
    rotorObjs[i].draw();
    if (rotorObjs[i].done()) {
      rotorObjs.splice(i, 1);
      let a = new rotator();
      a.color = color(random(255), random(255), random(255), 255);
      rotorObjs.push(a);
    }
  }
}

function rotator() {
  this.time = 10;
  this.color = color(0, 0, 0, 0);
  this.length = random(10, 100);
  this.offset = (noise(100) * width) / 2;

  this.trail = [];
  this.trailLength = random(50, 500);

  this.rotateBy = random(360);
  this.rotateSpeed = 1 - noise(random(-1, 1)) * 2;
  this.update = function () {
    // this.time --;
    this.rotateBy += this.rotateSpeed;
  };

  this.done = function () {
    return this.time <= 0;
  };

  this.draw = function () {
    push();
    translate(width / 2, height / 2);
    rotate(this.rotateBy);
    for (let i = 0; i < this.trailLength; i++) {
      this.color.setAlpha(map(i, 0, this.trailLength, 0.0, 70.0));
      fill(this.color);
      noStroke();
      rotate(this.rotateSpeed);

      rect(this.offset, 0, this.length, map(i, 0, this.trailLength, 10, 30));
    }
    pop();
  };
}

function ColorGenerator() {
  this.a = createVector(0.5, 0.5, 0.5);
  this.b = createVector(0.5, 0.5, 0.5);
  this.c = createVector(1.0, 1.0, 1.0);
  this.d = createVector(0.0, 0.33, 0.67);

  this.GetColor = function (t) {
    let r = this.a.x + this.b.x * cos(360 * (this.c.x * t + this.d.x));
    let g = this.a.y + this.b.y * cos(360 * (this.c.y * t + this.d.y));
    let b = this.a.z + this.b.z * cos(360 * (this.c.z * t + this.d.z));

    return color(r * 255, g * 255, b * 255);
  };
}
