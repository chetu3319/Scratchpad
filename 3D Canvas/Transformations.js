const { Vector } = require('p5');

function PerspectiveMatrix(fov,aspectRatio,near,far)
{
    // Create a perspective matrix
    // fov is the field of view
    // aspectRatio is the width/height of the viewport
    // near is the near clipping plane
    // far is the far clipping plane

    let f = 1.0 / Math.tan(fov * 0.5);
    let range = 1.0 / (near - far);

    let perspectiveMatrix = [];
    perspectiveMatrix[0] = f / aspectRatio;
    perspectiveMatrix[1] = 0;
    perspectiveMatrix[2] = 0;
    perspectiveMatrix[3] = 0;
    perspectiveMatrix[4] = 0;
    perspectiveMatrix[5] = f;
    perspectiveMatrix[6] = 0;
    perspectiveMatrix[7] = 0;
    perspectiveMatrix[8] = 0;
    perspectiveMatrix[9] = 0;
    perspectiveMatrix[10] = (near + far) * range;
    perspectiveMatrix[11] = -1;
    perspectiveMatrix[12] = 0;
    perspectiveMatrix[13] = 0;
    perspectiveMatrix[14] = (2 * near * far) * range;
    perspectiveMatrix[15] = 0;
    
    


    return perspectiveMatrix;
}


function PrintMatrix(inputMatrix, sizeX,sizeY)
{
    outputString = "";
    //Print the array into a matrix readable format
    for(let i = 0; i < sizeX; i++)
    {
        for(let j = 0 ; j < sizeY; j++)
        {
            let idx = i * sizeY + j;
            outputString += inputMatrix[idx].toFixed(4) + "\t";
        }
        outputString += "\n";
    }

    console.log(outputString);
}

function WorldToImageMatrix(position,target, worldUp)
{
    forwardVector = Vector.sub(position,target);
   
    forwardVector.normalize();

    rightVector = Vector.cross(forwardVector,worldUp);
    rightVector.normalize();

    upVector = Vector.cross(forwardVector,rightVector);
    upVector.normalize();

    


    worldToImageMatrix = [];
    worldToImageMatrix[0] = rightVector.x;
    worldToImageMatrix[1] = upVector.x;
    worldToImageMatrix[2] = forwardVector.x;
    worldToImageMatrix[3] = 0;

    worldToImageMatrix[4] = rightVector.y;
    worldToImageMatrix[5] = upVector.y;
    worldToImageMatrix[6] = forwardVector.y;
    worldToImageMatrix[7] = 0;

    worldToImageMatrix[8] = rightVector.z;
    worldToImageMatrix[9] = upVector.z;
    worldToImageMatrix[10] = forwardVector.z;
    worldToImageMatrix[11] = 0;

    worldToImageMatrix[12] = -1 * (position.x * rightVector.x + position.y * rightVector.y + position.z * rightVector.z);
    worldToImageMatrix[13] = -1 * (position.x * upVector.x + position.y * upVector.y + position.z * upVector.z);
    worldToImageMatrix[14] = -1 * (position.x * forwardVector.x + position.y * forwardVector.y + position.z * forwardVector.z);
    worldToImageMatrix[15] = 1;

 
    return worldToImageMatrix;
}

function MatrixMultiply(matrixA, matrixB)
{
    out = []; 

    out[0] = matrixA[0] * matrixB[0] + matrixA[1] * matrixB[4] + matrixA[2] * matrixB[8] + matrixA[3] * matrixB[12];
    out[1] = matrixA[0] * matrixB[1] + matrixA[1] * matrixB[5] + matrixA[2] * matrixB[9] + matrixA[3] * matrixB[13];
    out[2] = matrixA[0] * matrixB[2] + matrixA[1] * matrixB[6] + matrixA[2] * matrixB[10] + matrixA[3] * matrixB[14];
    out[3] = matrixA[0] * matrixB[3] + matrixA[1] * matrixB[7] + matrixA[2] * matrixB[11] + matrixA[3] * matrixB[15];

    out[4] = matrixA[4] * matrixB[0] + matrixA[5] * matrixB[4] + matrixA[6] * matrixB[8] + matrixA[7] * matrixB[12];
    out[5] = matrixA[4] * matrixB[1] + matrixA[5] * matrixB[5] + matrixA[6] * matrixB[9] + matrixA[7] * matrixB[13];
    out[6] = matrixA[4] * matrixB[2] + matrixA[5] * matrixB[6] + matrixA[6] * matrixB[10] + matrixA[7] * matrixB[14];
    out[7] = matrixA[4] * matrixB[3] + matrixA[5] * matrixB[7] + matrixA[6] * matrixB[11] + matrixA[7] * matrixB[15];

    out[8] = matrixA[8] * matrixB[0] + matrixA[9] * matrixB[4] + matrixA[10] * matrixB[8] + matrixA[11] * matrixB[12];
    out[9] = matrixA[8] * matrixB[1] + matrixA[9] * matrixB[5] + matrixA[10] * matrixB[9] + matrixA[11] * matrixB[13];
    out[10] = matrixA[8] * matrixB[2] + matrixA[9] * matrixB[6] + matrixA[10] * matrixB[10] + matrixA[11] * matrixB[14];
    out[11] = matrixA[8] * matrixB[3] + matrixA[9] * matrixB[7] + matrixA[10] * matrixB[11] + matrixA[11] * matrixB[15];

    out[12] = matrixA[12] * matrixB[0] + matrixA[13] * matrixB[4] + matrixA[14] * matrixB[8] + matrixA[15] * matrixB[12];
    out[13] = matrixA[12] * matrixB[1] + matrixA[13] * matrixB[5] + matrixA[14] * matrixB[9] + matrixA[15] * matrixB[13];
    out[14] = matrixA[12] * matrixB[2] + matrixA[13] * matrixB[6] + matrixA[14] * matrixB[10] + matrixA[15] * matrixB[14];
    out[15] = matrixA[12] * matrixB[3] + matrixA[13] * matrixB[7] + matrixA[14] * matrixB[11] + matrixA[15] * matrixB[15];

    return out;
}

function MatrixMultiplyGeneral(matrixA, matrixB,row1, columns1, row2, columns2)
{
    if(columns1 != row2)
    {
        print("Can't Multiply these matrices");
        return;
    }
    result = []; 
    for(let i = 0; i < row1; i++)
    {
        for(let j = 0; j < columns2; j++)
        {
            let sum = 0;
            for(let k = 0; k < columns1; k++)
            {
                sum += matrixA[i * columns1 + k] * matrixB[k * columns2 + j];
            }
            result[i * columns2 + j] = sum;
        }
    }

    return result; 
}


function CreateScaleMatrix(scale)
{
    scaleMatrix = [];
    scaleMatrix[0] = scale;
    scaleMatrix[1] = 0;
    scaleMatrix[2] = 0;
    scaleMatrix[3] = 0;

    scaleMatrix[4] = 0;
    scaleMatrix[5] = scale;
    scaleMatrix[6] = 0;
    scaleMatrix[7] = 0;

    scaleMatrix[8] = 0;
    scaleMatrix[9] = 0;
    scaleMatrix[10] = scale;
    scaleMatrix[11] = 0;

    scaleMatrix[12] = 0;
    scaleMatrix[13] = 0;
    scaleMatrix[14] = 0;
    scaleMatrix[15] = 1;

    return scaleMatrix;
}

function CameraProject ( vec, viewport,near,far, combinedProjView) 
{
    var vX = viewport[0],
    vY = viewport[1],
    vWidth = viewport[2],
    vHeight = viewport[3],
    n = 0,
    f = 1
  
    // convert: clip space -> NDC -> window coords
    // implicit 1.0 for w component

    let temp4 = []; 
    temp4[0] = vec[0];
    temp4[1] = vec[1];
    temp4[2] = vec[2];
    temp4[3] = 1.0;

    
    let temp4_2 = [];
    // Matrix multiplication of combined projection and view matrix
    temp4_2[0] = combinedProjView[0] * temp4[0] + combinedProjView[4] * temp4[1] + combinedProjView[8] * temp4[2] + combinedProjView[12] * temp4[3];
    temp4_2[1] = combinedProjView[1] * temp4[0] + combinedProjView[5] * temp4[1] + combinedProjView[9] * temp4[2] + combinedProjView[13] * temp4[3];
    temp4_2[2] = combinedProjView[2] * temp4[0] + combinedProjView[6] * temp4[1] + combinedProjView[10] * temp4[2] + combinedProjView[14] * temp4[3];
    temp4_2[3] = combinedProjView[3] * temp4[0] + combinedProjView[7] * temp4[1] + combinedProjView[11] * temp4[2] + combinedProjView[15] * temp4[3];



    // now transform into NDC
    var w = temp4_2[3]
    if (w !== 0) { // how to handle infinity here?
        temp4_2[0] = temp4_2[0] / w
        temp4_2[1] = temp4_2[1] / w
        temp4_2[2] = temp4_2[2] / w
    }
  
    let out = []; 
    // and finally into window coordinates
    // the foruth component is (1/clip.w)
    // which is the same as gl_FragCoord.w
    out[0] = vX + vWidth / 2 * temp4_2[0] + (0 + vWidth / 2)
    out[1] = vY + vHeight / 2 * temp4_2[1] + (0 + vHeight / 2)
    out[2] = (f - n) / 2 * temp4_2[2] + (f + n) / 2
    out[3] = w === 0 ? 0 : 1 / w
    return out;
}


function RotateAlongX(rotation)
{
    var out = []; 

    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;

    out[4] = 0;
    out[5] = Math.cos(rotation);
    out[6] = -Math.sin(rotation);
    out[7] = 0;

    out[8] = 0;
    out[9] = Math.sin(rotation);
    out[10] = Math.cos(rotation);
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
}

function RotateAlongZ(rotation)
{
    var out = [];

    out[0] = Math.cos(rotation);
    out[1] = -Math.sin(rotation);
    out[2] = 0;
    out[3] = 0;

    out[4] = Math.sin(rotation);
    out[5] = Math.cos(rotation);
    out[6] = 0;
    out[7] = 0;

    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1; 
    return out; 
}

function QuaternionToMatrix(x,y,z,s)
{
    // Normalize quaternion
    let norm = Math.sqrt(x*x + y*y + z*z + s*s);
    x /= norm;
    y /= norm;
    z /= norm;
    s /= norm;

    print(x,y,z,s);
    let result = [];
    result[0] = 1 - 2 * y * y - 2 * z * z;
    result[1] = 2 * x * y - 2 * s * z;
    result[2] = 2 * x * z + 2 * s * y;
    result[3] = 0;

    result[4] = 2 * x * y + 2 * s * z;
    result[5] = 1 - 2 * x * x - 2 * z * z;
    result[6] = 2 * y * z - 2 * s * x;
    result[7] = 0;

    result[8] = 2 * x * z - 2 * s * y;
    result[9] = 2 * y * z + 2 * s * x;
    result[10] = 1 - 2 * x * x - 2 * y * y;
    result[11] = 0;

    result[12] = 0;
    result[13] = 0;
    result[14] = 0;
    result[15] = 1;

    return result; 


}

TransposeMatrix = function(matrix)
{
    let out =[]; 

    out[0] = matrix[0];
    out[1] = matrix[4];
    out[2] = matrix[8];
    out[3] = matrix[12];

    out[4] = matrix[1];
    out[5] = matrix[5];
    // Fill in the matrix
    out[6] = matrix[9];
    out[7] = matrix[13];

    out[8] = matrix[2];
    out[9] = matrix[6];
    out[10] = matrix[10];
    out[11] = matrix[14];

    // fill in the matrix 
    out[12] = matrix[3];
    out[13] = matrix[7];
    out[14] = matrix[11];
    out[15] = matrix[15];

    return out;
}

module.exports = {PerspectiveMatrix,RotateAlongZ,TransposeMatrix,MatrixMultiplyGeneral,RotateAlongX,QuaternionToMatrix, PrintMatrix,WorldToImageMatrix, CameraProject,MatrixMultiply,CreateScaleMatrix};