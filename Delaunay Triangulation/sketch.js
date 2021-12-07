function Triangle(a, b, c) {
  this.a = ;
  this.b = b;
  this.c = c;

  this.edges = [
    new Edge(this.a, this.b),
    new Edge(this.b, this.c),
    new Edge(this.c, this.a)
  ];


  function CalculateCircumCircle() {
    var a = this.edges[0].length();
    var b = this.edges[1].length();
    var c = this.edges[2].length();

    var s = (a + b + c) / 2;

    
    var r = (a*b*c)/ (4 * sqrt(s* (s - a)*(s - b)*(s - c)));

    // Calculate Circumcenter 
    var x = (a*b*c)/ (4 * sqrt(s* (s - a)*(s - b)*(s - c)));
    var y = (a*b*c)/ (4 * sqrt(s* (s - a)*(s - b)*(s - c)));
    

    return r; 
  }

  this.CircumCircle = CalculateCircumCircle();; 





  this.Render = function () {
    stroke(0);
    strokeWeight(2);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
    line(this.b.x, this.b.y, this.c.x, this.c.y);
    line(this.c.x, this.c.y, this.a.x, this.a.y);
  };
}

function Edge(a, b) {
  this.a = a;
  this.b = b;

  this.length = function() {
    return dist(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

var superTriangle;
var points = [];

function setup() {
  createCanvas(600, 600);

  points.push(createVector(200, 300));
  points.push(createVector(400, 100));
  points.push(createVector(450, 300));
  points.push(createVector(300, 500));

  superTriangle = new Triangle(
    createVector(400, 10),
    createVector(10, 500),
    createVector(550, 550)
  );
}

function draw() {
  background(220);

  superTriangle.Render();
  RenderPoints();
}

function RenderPoints() {
  for (var i = 0; i < points.length; i++) {
    fill(0);
    noStroke();
    ellipse(points[i].x, points[i].y, 4, 4);
  }
}

function BowyerWatsonDelaunayTriangulation() {
  var triangulation = [];

  triangulation.push(superTriangle);

  for (var i = 0; i < points.length; i++) {
    var badTriangles = [];

    for(var j = 0; j < triangulation.length; j++) {
      if(triangulation[j].Contains(points[i])) {
        badTriangles.push(triangulation[j]);
      }
    }


  }
}
