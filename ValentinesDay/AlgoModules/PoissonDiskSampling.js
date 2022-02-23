
const p5 = require('p5');

function PoissonDiskSampler(iterationsLimit, gridResolution,widthOfArea,heightOfArea,position)
{
    this.samplingGrid = []
    this.iterationsLimit = iterationsLimit; 
    this.radius = gridResolution; 
    this.gridResolution = gridResolution/sqrt(2);
    this.w = widthOfArea;
    this.h = heightOfArea;
    this.cols, this.rows;
    this.position = position; 
    this.PoissonPoints = []; 


    this.activeList = [];

    this.drawBaseGrid = function()
    {
       return; 
    }

    this.init = function()
    {
        // STEP 0: Initialize the grid
        this.cols = floor(this.w/this.gridResolution);
        this.rows = floor(this.h/this.gridResolution);

      
        for(let i = 0 ; i < this.cols*this.rows; i++)
        {
            this.samplingGrid.push(-1);
        }

        // STEP 1: Sample the first point
        let point = createVector(random(this.w), random(this.h));
        let i = floor (point.x/this.gridResolution);
        let j = floor (point.y/this.gridResolution);

        this.samplingGrid[i + j * this.cols] = point;
        this.activeList.push(point);

    }

    this.samplePoints = function()
    {
        
        
        var counter = 0;

        while(this.activeList.length > 0)
        {
            pointFound = false;
            counter ++; 

            // Find a random point from the actibe list
            let rIdx = floor(random(this.activeList.length)); 
            let randomPoint = this.activeList[rIdx];
            
            
            for(let n = 0 ; n < this.iterationsLimit ; n++)
            {
                // Find a random point at a distance this.gridResolution to 2 * this.gridResolution away from the randomIdx point

                let samplePoint = p5.Vector.random2D();
                samplePoint.setMag(random(this.radius, 2*this.radius));
                samplePoint.add(randomPoint);


                // Find row and column of the sample point
                let col = floor(samplePoint.x/this.gridResolution);
                let row = floor(samplePoint.y/this.gridResolution);

                if(col < 0 || col >= this.cols || row < 0 || row >= this.rows)
                {
                    continue;
                }
              


                // Is the sample point close to any of the active points?
                let ok = true;

            
                for(let i = -1; i < 2; i++)
                {
                    for(let j = -1; j < 2; j++)
                    {
                        let idx = (col + i) + (row + j) * this.cols;
                        let nieghbor = this.samplingGrid[idx];
                        if(nieghbor && nieghbor != -1 )
                        {
                           
                            let d = p5.Vector.dist(samplePoint, nieghbor);
                            if(d < this.radius)
                            {
                                ok = false; 
                            }
                        }
                    }
                }


                if(ok)
                {
                    this.samplingGrid[row*this.cols + col] = samplePoint;
                    this.PoissonPoints.push(samplePoint);
                    this.activeList.push(samplePoint);
                    pointFound = true;
                    break;
                   
                }


            }

            if(!pointFound)
            {
                
                this.activeList.splice(rIdx, 1);
            }

        }

        return this.PoissonPoints;
    }

    this.init();

}


module.exports = PoissonDiskSampler;