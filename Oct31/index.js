/**
 * A p5.js example integrating with canvas-sketch.
 * Here, canvas-sketch handles the frame loop, resizing
 * and exporting.
 * @author Matt DesLauriers (@mattdesl)
 */

const canvasSketch = require("canvas-sketch");
import * as repeater from "./p5.repeater";

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
    // clear();
    draw();
  };
}, settings);

function setup() {
  PackWithCircles();
}

function draw() {
  background(54, 38, 167);
  circles.forEach((element) => {
    fill(100, 200, 100, 100);
    ellipse(element.x, element.y, element.r, element.r);
    fill(0, 0, 0);
    ellipse(element.x, element.y, 10, 10);
  });

  ConnectWithNearbyCircles();
}

var circles = [];
function PackWithCircles() {
  let counter = 0;
  circles = []; // clear the array
  while (circles.length < 200) {
    counter++;
    if (counter > 100000) return;

    let c = {
      x: random(width),
      y: random(height),
      r: random(100, 700),
    };

    let isColliding = false;
    circles.forEach((element) => {
      if (dist(c.x, c.y, element.x, element.y) < c.r + element.r) {
        isColliding = true;
      }
    });

    if (isColliding == false) {
      circles.push(c);
    }
  }
}

function ConnectWithNearbyCircles() {}

function ColorGenerator() {
  this.a = createVector(0.5, 0.5, 0.5);
  this.b = createVector(0.5, 0.5, 0.5);
  this.c = createVector(0.5, 1, 0.6);
  this.d = createVector(0.0, 0.33, 0.67);

  this.GetColor = function (t) {
    let r = this.a.x + this.b.x * cos(360 * (this.c.x * t + this.d.x));
    let g = this.a.y + this.b.y * cos(360 * (this.c.y * t + this.d.y));
    let b = this.a.z + this.b.z * cos(360 * (this.c.z * t + this.d.z));

    return color(r * 255, g * 255, b * 255);
  };
}
