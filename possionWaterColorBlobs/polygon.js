
function polygon(centerPoint, polygonSize, numberOfPoints)
{
    // Create an array of vertex points for the regular polygon of given size and numberOfPoints 
    
  
    var vertexPoints = [];
    var angle = TWO_PI / numberOfPoints;
    for (var i = 0; i < numberOfPoints; i++)
    {
        var x = centerPoint.x + polygonSize * cos(angle * i);
        var y = centerPoint.y + polygonSize * sin(angle * i);
        
        vertexPoints.push(createVector(x, y));
    }

    return vertexPoints;

}

module.exports = polygon;