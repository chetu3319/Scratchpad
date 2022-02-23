
const p5 = require('p5');

function PoissonDiskSampler(iterationsLimit, gridResolution,widthOfArea,heightOfArea)
{
    this.samplingGrid = []
    this.iterationsLimit = iterationsLimit; 
    this.gridResolution = gridResolution;
    this.w = widthOfArea;
    this.h = heightOfArea;

    this.activeList = [];
    this.init = function()
    {
        let colsSize = floor(this.gridResolution/Math.sqrt(2));
        let rowsSize = floor(this.gridResolution/Math.sqrt(2));

        let cols = ceil(this.w/colsSize);
        let rows = ceil(this.h/rowsSize);

        for(let i = 0 ; i < cols*rows; i++)
        {
            this.samplingGrid.push(-1);
        }

        this.activeList.push(createVector(random(this.w), random(this.h)));

        //identify row and col index of the cell that the point is in
        let row = Math.floor(this.activeList[0].x / this.gridResolution);
        let col = Math.floor(this.activeList[0].y / this.gridResolution);

        this.samplingGrid[row*cols + col] = this.activeList[0];

    
    }

    this.samplePoints = function()
    {
        let colsSize = floor(this.gridResolution/Math.sqrt(2));
        let rowsSize = floor(this.gridResolution/Math.sqrt(2));

        let cols = ceil(this.w/colsSize);
        let rows = ceil(this.h/rowsSize);

        var counter = 0;

        while(this.activeList.length > 0 && counter < 500)
        {
            pointFound = false;
            counter ++; 
            let rIdx = floor(random(this.activeList.length)); 
            let randomPoint = this.activeList[rIdx];
            for(let i = 0 ; i < this.iterationsLimit ; i++)
            {
                // Find a random point at a distance this.gridResolution to 2 * this.gridResolution away from the randomIdx point

                let samplePoint = p5.Vector.random2D();
                samplePoint.setMag(random(this.gridResolution, 2*this.gridResolution));
                samplePoint.add(randomPoint);

                // Check if the sample point is outside the canvas
                if(samplePoint.x < 0 || samplePoint.x > this.w 
                    || samplePoint.y < 0 || samplePoint.y > this.h)
                {
                    continue;
                }


                // Is the sample point close to any of the active points?
                let isClose = false;

                //find the row and col index of the cell that the sample point is in
                let row = Math.floor(samplePoint.x / this.gridResolution);
                let col = Math.floor(samplePoint.y / this.gridResolution);

                for(let x = row - 1; x< row+ 2; x++)
                {
                    for(let y = col - 1; y < col + 2; y++)
                    {
                        if( x*cols + y >  this.samplingGrid.length || x*cols + y < 0)
                        {
                            continue; 
                        }
                        if(this.samplingGrid[x*cols + y] == undefined)
                        {
                            console.log(x,y)
                            console.log(this.samplingGrid.length)
                            console.log(x*cols + y)
                            console.log(samplePoint)
                            console.log(row,col);
                        }
                        if(this.samplingGrid[x*cols + y] != -1)
                        {
                            
                            
                            if(samplePoint.dist(this.samplingGrid[x*cols + y]) < this.gridResolution)
                            {
                                isClose = true;
                                break;
                            }
                        }
                    }
                }


                if(!isClose)
                {
                    this.samplingGrid[row*cols + col] = samplePoint;
                    this.activeList.push(samplePoint);
                    pointFound = true;
                   
                }


            }

            if(!pointFound)
            {
                
                this.activeList.splice(rIdx, 1);
            }

        }

        return this.samplingGrid;
    }

    this.init();

}


module.exports = PoissonDiskSampler;