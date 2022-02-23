


function FetchContours(path)
{
    if(path.commands == undefined)
        return []; 
    var contours = [],
    currentContour = [];


    var cmd;
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

    return contours;
    // //Create an svg element for each contour
    // var svgContours = [];
    // var svgContourPoints = [];

    // for (var i = 0; i < contours.length; i += 1) {
    //     var contour = contours[i];
    //     var svgContour = document.createElementNS("http://www.w3.org/2000/svg", "path");
    //     svgContour.setAttribute("d", contourToPath(contour));

    //     let svgLength = svgContour.getTotalLength();
    //     let iterators = svgLength / 5; 
    //     let points = []; 
    //     for(let i = 0; i < ceil(iterators); i++)
    //     {
    //         let point = svgContour.getPointAtLength(i*5);
    //         points.push([point.x, point.y]);
    //     }

    //     svgContourPoints.push(points);


    //     svgContours.push(svgContour);
    // }

   

    // return svgContourPoints;
}

// Create a svg path from the contour data
function contourToPath(contour)
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

function ResampleByLength(path,segmentLength)
{
    let subPaths = FetchContours(path);
    var force = false; 
    var commands = [];
    if (!force) {
        segmentLength = Math.max(segmentLength, 1);
    }





}


function ResampleByPoints(path, numberOfPoints)
{
    let subPaths = FetchContours(path);

    //Create an svg element for each contour
    var svgContours = [];
    var svgContourPoints = [];

    let totalLength = 0; 
    for (var i = 0; i < subPaths.length; i += 1) {
        var contour = subPaths[i];
        var svgContour = document.createElementNS("http://www.w3.org/2000/svg", "path");
        svgContour.setAttribute("d", contourToPath(contour));

        let length = svgContour.getTotalLength();
        totalLength += length;

        svgContours.push({svgContour: svgContour, length: length});
    }
  
    for(var i = 0 ; i < subPaths.length; i++)
    {

        let iteratorPoints = svgContours[i].length * numberOfPoints / totalLength;
        let segmentLength = svgContours[i].length / iteratorPoints;
        
        let iterators = svgContours[i].length / segmentLength;
        let points = [];    
       
        for(let j = 0; j < ceil(iterators); j++)
        {

            
            let point = svgContours[i].svgContour.getPointAtLength(j*segmentLength);
            points.push([point.x, point.y]);
        }
        svgContourPoints.push(points);
    }

    return svgContourPoints;

}


module.exports = {FetchContours,ResampleByPoints}