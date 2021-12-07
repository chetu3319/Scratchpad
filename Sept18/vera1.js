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
  rectMode(CENTER);
}

function draw() {
  background(255);

  Grid();
}

let counter = 30;
function Grid() {
  // translate(width / 4, height / 4);
  // scale(0.5);
  // ellipse(0, 0, 10, 10);
  randomSeed(9);

  repeater.glide(width / counter, height / counter, linesFunction);
  function linesFunction(details) {
    let w = details.width;
    let h = details.height;
    repeater.rotationSymmetry(2, 0, 0, (d) => {
      noFill();

      strokeWeight(10);
      // rect(0, 0, w, h);
      for (let i = 0; i < 1; i++) {
        push();
        translate(0, 0);
        let r = random(PI);
        rotate(r);
        line(
          -w,
          (sin(frameCount / random(20, 100) + r) * 0) / 2,
          w,
          (sin(frameCount / random(20, 100) + r) * 0) / 2
        );
        pop();
        // line(random(-90, 90), random(-90, 90), random(-90, 90), random(-90, 90));
      }

      // textSize(30);
      // text(details.index, 10, 10);
    });
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
