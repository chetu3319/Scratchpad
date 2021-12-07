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
  window.mouseClicked = () => {
    counter++;
  };

  // Return a renderer to 'draw' the p5.js content
  return ({ playhead, width, height }) => {
    // Draw with p5.js things
    // clear();
    draw();
  };
}, settings);

let gridObjs = [];
let colorPool;
function setup() {
  colorPool = new ColorGenerator();
}

function draw() {
  background(255);

  Grid();
}

let counter = 10;
let noiseArray = [];
function Grid() {
  randomSeed(counter);

  repeater.glide(width / 10, height / 10, linesFunction);
  function linesFunction(details) {
    let w = details.width;
    let h = details.height;

    rectMode(CENTER);
    rect(0, 0, h - 10, w - 20);
  }
}

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
