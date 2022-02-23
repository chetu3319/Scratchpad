var polygon = require('./polygon.js');
// Grab P5.js from npm
const p5 = require('p5');

function WaterColorBlob()
{
    this.polygonPoints = [];
    this.layers = [];
    this.c = color("#FD5200");
    
    this.CreatePolygon = function (position, size, numberOfPoints)
    {
        this.size = size; 
        this.polygonPoints = polygon(position, size, numberOfPoints);
        
    }

    this.SubdividePolygon = function (points, recursionLevel)
    {
        if(recursionLevel == 0)
        {
            return points;
        }
        
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
      
          
      
          // Find the direction which is 90 degree anti-clockwise from the line between p1 and p2
          var dir = p5.Vector.sub(p2, p1);
          var l = dir.mag();
          dir.rotate(randomGaussian(-HALF_PI, HALF_PI/4));
          dir.normalize();
        
          dir.mult(randomGaussian(l/4, l/8));
      
          endPoint = p5.Vector.add(midPoint, dir);
          
      
          newPoints.push(p1);
          newPoints.push(endPoint);
          newPoints.push(p2);
          
        }

        return this.SubdividePolygon(newPoints,recursionLevel - 1);; 
    }

    this.CreateLayers = function (points, layersCount, layerRecursionLevel)
    {
        this.layers = []; 
        for(let i = 0; i < layersCount; i++)
        {
            this.layers.push(this.SubdividePolygon(points, layerRecursionLevel));
        }
    }


    this.ShowLayers = function()
    {
        
        for(let i = 0; i < this.layers.length; i++)
        {
            //Translate subtly to give the illusion of depth
            push();
           
            translate(randomGaussian(this.size/10,this.size/5),randomGaussian(this.size/10,this.size/5));
            
            this.c.setAlpha(Math.abs(randomGaussian(40,5)));
            fill(this.c);
            noStroke(); 
            beginShape()
            for(let j = 0; j < this.layers[i].length; j++)
            {
                vertex(this.layers[i][j].x, this.layers[i][j].y);
            }
            endShape(CLOSE);
            pop();
        }
    }


    this.ShowBasePolygon = function()
    {
        fill(this.c);
        beginShape();
        for(var j = 0; j < this.polygonPoints.length; j++)
        {
            var p = this.polygonPoints[j]; 
            curveVertex(p.x, p.y);
        }
        endShape(CLOSE);
    }
}

module.exports = WaterColorBlob;