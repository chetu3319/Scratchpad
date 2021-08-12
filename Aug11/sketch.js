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

let gridObjs = [];
let colorPool;
function setup() {
  colorPool = new ColorGenerator();
  rectMode(CENTER);
  createGrid(20, 20);
}

function draw() {
  background(1);
  RenderGridObjects();
}

let counter = 0;
// create a grid of rectangles
let yoff = 0.0;
function createGrid(rows, cols) {
  let w = width / cols;
  let h = height / rows;

  for (let i = 0; i < rows; i++) {
    let rows = [];
    for (let j = 0; j < cols; j++) {
      let pool = new ColorGenerator();
      // pool.d = createVector(random(0, 1), random(0, 1), random(0, 1));
      let idx = (i + j) / float(rows + cols);
      idx = map(idx, 0, 1, 0.1, 0.2);
      let c = colorPool.GetColor(idx);
      let scale = map(noise(yoff), 0, 1, 1, 5);
      let t = map(noise(yoff + j), 0, 1, 0, 1);
      let n = noise(yoff + i + j) / 10000.0;
      let obj = {
        y: w / 2 + j * w,
        x: h / 2 + i * h,
        c: c,
        t: t,
        scale: scale,
        noise: n,
        w: w,
        h: h,
        pool: pool,
      };
      rows.push(obj);
      yoff += 0.01;
    }
    gridObjs.push(rows);
  }

  // Shuffle gridObjs

  // for (let i = 0; i < gridObjs.length; i++) {
  //   let j = floor(random(0, gridObjs.length));
  //   let temp = gridObjs[i];
  //   gridObjs[i] = gridObjs[j];
  //   gridObjs[j] = temp;
  // }
}

function RenderGridObjects() {
  // sort gridObjs by t
  // gridObjs.sort((a, b) => {
  //   return b.t - a.t;
  // });
  blendMode(OVERLAY);
  // let n = noise(frameCount / 1000.0);
  // n = map(n, 0, 1, 0, gridObjs.length);

  for (let i = 0; i < gridObjs.length; i++) {
    let rows = gridObjs[i];
    for (let j = 0; j < rows.length; j++) {
      let obj = rows[j];

      let t = map(obj.t, 0, 1, 0.1, 0.2);
      let c = obj.pool.GetColor(t);

      obj.t += 0.001;

      if (obj.t > 1) {
        obj.t %= 1;
        let radius = 2;
        for (let a = -radius; a < radius + 1; a++) {
          for (let b = -radius; b < radius + 1; b++) {
            if (i == 0 && j == 0) {
              continue;
            }
            if (
              i + a < 0 ||
              i + a >= gridObjs.length ||
              j + b < 0 ||
              j + b >= gridObjs[i].length
            ) {
              continue;
            }
            let obj2 = gridObjs[i + a][j + b];
            if (obj2.t == 1 || obj2.t == 0) {
              continue;
            }
            if (obj2.t > 0.5) {
              obj2.t += 0.01;
              if (obj2.t > 1) {
                obj2.t = 1;
              }
            } else {
              obj2.t -= 0.01;
              if (obj2.t < 0) {
                obj2.t = 0;
              }
            }
          }
        }
      }
      fill(c);
      noStroke();

      rect(obj.x, obj.y, obj.w * obj.scale, obj.h * obj.scale);
      // text(obj.t.toFixed(3), obj.x, obj.y);
    }
  }

  counter++;
  if (counter > 1000) {
    //randomly at 0.1 probability change time
    for (let i = 0; i < gridObjs.length; i++) {
      for (let j = 0; j < gridObjs[i].length; j++) {
        let obj = gridObjs[i][j];
        if (random(0, 1) < 0.1) {
          obj.t += random(0.01, 1);
        }
      }
    }
    counter = 0;
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
