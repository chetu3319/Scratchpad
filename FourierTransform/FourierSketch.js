
// Grab P5.js from npm
const p5 = require('p5');

const {dft,dft2} = require("./dft.js");

function FourierSketch(svgContour,wordTotalLength)
{
    this.svgContour = svgContour;
    this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.svgElement.setAttribute("d", SvgContourToPath(this.svgContour));
    this.svgContourLength = this.svgElement.getTotalLength();
    this.svgContourPoints = [];
    this.wordTotalLength = wordTotalLength;
    this.fourierEpicycleParams; 
    this.epiCyclePoints = []; 
   
    this.CalculateSvgPoints = function(numberOfPoints)
    {
        let segmentLength = this.svgContourLength / numberOfPoints;
        let points = []; 

        let iterators = this.svgContourLength / segmentLength;
        for(let j = 0; j < ceil(iterators); j++)
        {
            let point = this.svgElement.getPointAtLength(j*segmentLength);
            points.push([point.x, point.y]);
        }

        this.svgContourPoints = points;
    }

    this.CalculateFourierEpicycleParams = function(numberOfPoints)
    {
        this.fourierEpicycleParams = dft2(this.svgContourPoints,numberOfPoints);
    }

    this.CalculateFourierSketchTrail = function (x,y,t,dt, trailAmount)
    {

        // trailAmount = constraint(trailAmount,0,TWO_PI);

        iterators = trailAmount/dt; 
        
        if(this.fourierEpicycleParams == undefined)
        return; 
        
       
            let timeStamp = t ; 
            timeStamp = timeStamp % TWO_PI;
        
            let vx = this.epiCycles(500, 500, 0,this.fourierEpicycleParams[0], timeStamp);
          
            let vy = this.epiCycles(250, 500, HALF_PI,this.fourierEpicycleParams[1], timeStamp);
            
            stroke(255,255,255,100)
            line(vx[0], vx[1], vx[0], vy[1]);
            line(vy[0], vy[1], vx[0], vy[1]);
            this.epiCyclePoints.unshift([vx[0],vy[1]]);
    

        if(this.epiCyclePoints.length > 70)
        {
            this.epiCyclePoints.pop(); 
        }
    }

    this.epiCycles = function (xPos, yPos, rotation,fourier , t)
    {

        if(this.fourierEpicycleParams == undefined)
            return; 

    
        let x = xPos; 
        let y = yPos;
     
    
        
        for(let i = 0; i < fourier.length; i++)
        {
            let prevx = x; 
            let prevy = y;

            let freq = fourier[i].frequency;
            let radius = fourier[i].amplitude;
            let phase = fourier[i].phase;

            
            x += radius * cos(freq * t + phase + rotation);
            y += radius * sin(freq * t + phase + rotation);

            // Render the epicycles
            stroke(255, 100);
            noFill();
            ellipse(prevx, prevy, radius * 2);
            stroke(255);
            line(prevx, prevy, x, y);
        }

      
        return [x, y];
    }


    this.DrawSvgContourPoints = function()
    {
        for(let i = 0 ; i < this.svgContourPoints.length; i++)
        {
            stroke(255); 
            strokeWeight(2);
            point(this.svgContourPoints[i][0], this.svgContourPoints[i][1]);
        }
    }

    this.DrawEpiCyclePoints = function()
    {
        beginShape();
        stroke(255);
        strokeWeight(10);
  
        for(let i = 0; i < this.epiCyclePoints.length; i++)
        {
            vertex(this.epiCyclePoints[i][0], this.epiCyclePoints[i][1]);
        }
        endShape();
    }

    




    
}


function SvgContourToPath(contour)
{
    var path = "";
    for (var i = 0; i < contour.length; i += 1) {
        var cmd = contour[i];
        if (cmd.type === "M") {
            path += "M" + [cmd.x, cmd.y] + " ";
        } else if (cmd.type === "L") {
            path += "L" + [cmd.x, cmd.y] + " ";
        } else if (cmd.type === "C") {
            path += "C" + [cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y] + " ";
        } else if (cmd.type === "Q") {
            path += "Q" + [cmd.x1, cmd.y1, cmd.x, cmd.y] + " ";
        } else if (cmd.type === "Z") {
            path += "Z";
        }
    }

    return path; 
}


function FetchContours(path)
{


    if(path.commands == undefined)
        return; 

    let svgElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgElement.setAttribute("d", SvgContourToPath(path.commands));
    let wordTotalLength = svgElement.getTotalLength();
    var contours = [];
    currentContour = [];

    let cmd;

    for (var i = 0; i < path.commands.length; i += 1) {
        cmd = path.commands[i];
     
        if (cmd.type === "M") {
            if (currentContour.length !== 0) {
                contours.push(currentContour);
            }
            currentContour = [cmd];
        } else {
            currentContour.push(cmd);
        }
    }

    if (currentContour.length !== 0) {
        contours.push(currentContour);
    }

    let fourierSketchElements = []; 
    for(let i = 0; i < contours.length; i++)
    {
        let fourierSketchElement = new FourierSketch(contours[i],wordTotalLength);
        fourierSketchElements.push(fourierSketchElement);
    }

    return fourierSketchElements;
}


module.exports = {FetchContours}