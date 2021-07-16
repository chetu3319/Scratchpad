let circles = [];

// setup function in p5js
function setup() {
  var cnv = createCanvas(innerWidth - 100, innerHeight - 100);
  cnv.style["box-shadow"] = "5px 5px 10px #f00";

  // store position, radius and color of 100 circles in circles array
  for (var i = 0; i < 100; i++) {
    circles[i] = {
      x: random(width),
      y: random(height),
      radius: random(10, 20),
      color: color(random(255), random(255), random(255)),
    };
  }
}

function draw() {
  background(0);
  // draw 100 circles in a and move it randomly using perlin noise
  for (var i = 0; i < 100; i++) {
    var x = noise(circles[i].x);
    var y = noise(circles[i].y);
    var radius = circles[i].radius;
    var c = circles[i].color;
    fill(c);
    ellipse(x, y, radius, radius);
    circles[i].x += x;
    circles[i].y += y;
  }
}

// resize window code in p5.js
function windowResized() {
  resizeCanvas(innerWidth - 100, innerHeight - 100);
}

// function to draw 100 circles randomly of radius 100 to 500 with random color
function drawCircles() {
  for (var i = 0; i < 100; i++) {
    var x = random(width);
    var y = random(height);
    var radius = random(100, 500);
    var c = color(random(255), random(255), random(255));
    ellipse(x, y, radius, radius);
  }
}
