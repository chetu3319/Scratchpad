

function Particle()
{
    this.position = createVector(0,0);
    this.velocity  = createVector(0,0);
    this.flowFieldNoise ;
    this.particleIsFinished = false;
    this.historicalPositions = [];
    this.granualrity ;
    this.strokeWeightValue ;
    this.color = color(255, 255, 255);
    this.offset = createVector(0, 0);
    this.distanceThreshold = 1; 
    this.alpha = 255;



    this.update = function()
    {
        if(this.particleIsFinished)
        {
            return;
        }

        var noiseValue = this.flowFieldNoise.GetValue2D(this.offset.x + (this.position.x/this.granualrity),this.offset.y +  (this.position.y/this.granualrity));
        noiseValue += noise(noiseValue); 
        this.velocity.setHeading(noiseValue);
        this.position.add(this.velocity);
        this.historicalPositions.push(this.position.copy());
    }

    this.show = function()
    {
        // this.color.setAlpha(this.alpha);
        stroke(this.color);
        strokeWeight(this.strokeWeightValue);
        noFill();
        strokeCap(PROJECT);
        beginShape();
        for(var i = 0; i < this.historicalPositions.length; i++)
        {
            curveVertex(this.historicalPositions[i].x, this.historicalPositions[i].y);
        }
        endShape();


    }


    this.checkCollision = function(otherParticles)
    {
        for(var i = 0; i < otherParticles.length; i++)
        {
            if(this == otherParticles[i])
                continue; 

            var otherParticle = otherParticles[i];

            var distanceUnderCheck = this.strokeWeightValue + otherParticle.strokeWeightValue;
            distanceUnderCheck *= this.distanceThreshold; 

            for(var j = 0; j < otherParticle.historicalPositions.length; j++)
            {
                var d = dist(this.position.x, this.position.y, otherParticle.historicalPositions[j].x, otherParticle.historicalPositions[j].y);
                if(d < distanceUnderCheck)
                {
                    this.particleIsFinished = true;
                    return;
                }
            }

        }
    }

    this.checkEdges = function()
    {
        if(this.position.x > width+100 || this.position.x < -100)
        {
          this.particleIsFinished = true;
         
        }
        if(this.position.y > height +100|| this.position.y < -100)
        {
          this.particleIsFinished = true;
    
        }
    }

    this.lengthOfCurve = function()
    {
        var length = 0;
        for(var i = 0; i < this.historicalPositions.length - 1; i++)
        {
            var d = dist(this.historicalPositions[i].x, this.historicalPositions[i].y, this.historicalPositions[i+1].x, this.historicalPositions[i+1].y);
            length += d;
        }
        return length;
    }

}



module.exports = Particle;