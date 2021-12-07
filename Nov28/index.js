/**
 * A p5.js example integrating with canvas-sketch.
 * Here, canvas-sketch handles the frame loop, resizing
 * and exporting.
 * @author Matt DesLauriers (@mattdesl)
 */

const canvasSketch = require("canvas-sketch");
import { Vector } from "p5";
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
let mover = [];
function setup() {
  colorPool = new ColorGenerator();
  mover.push({
    position: createVector(width / 2, height / 2),
    offset: createVector(random(0, 100), random(0, 100)),
  });
}

function draw() {
  background("#49416D");
  mover[0].position = createVector(
    noise(mover[0].offset.x) * width,
    noise(mover[0].offset.y) * height
  );
  mover[0].offset.add(0.01, 0.01);
  Grid();
}

let counter = 10;
let noiseArray = [];
let n = 1000;
function Grid() {
  randomSeed(counter);
  push();
  // scale(1.4);
  repeater.glide(width / 20, height / 20, dotFunction);
  function dotFunction(details) {
    let w = details.width;
    let h = details.height;

    // colorMode(HSB);
    blendMode(SOFT_LIGHT);
    rectMode(CENTER);
    translate(w / 2, h / 2);

    fill("#FF3E41");
    strokeWeight(6);
    stroke("#FF3E41");
    let p = mover[0].position;
    let d = Vector.dist(details.position, createVector(p.x, p.y));
    d = map(d, 0, width, 0, 50.0);
    if (d < 30.0) {
      strokeWeight(d);
      line(details.position.x, details.position.y, p.x, p.y);
    }
    // ellipse(details.position.x, details.position.y, d, d);
  }
  pop();
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
