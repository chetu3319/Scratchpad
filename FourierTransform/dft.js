function dft(signalValues, numberOfSamples)
{
    let X = []; 

   

    const N = signalValues.length; 
    for(let k = 0; k < numberOfSamples;k++)
    {
        let realComponent = 0;
        let imaginaryComponent = 0;
        
        for (let n = 0; n < N; n++)
        {
            let phi = TWO_PI * k * n /N; 
            realComponent += signalValues[n] * cos(phi);
            imaginaryComponent += - signalValues[n] * sin(phi);
        }

        realComponent /= N;
        imaginaryComponent /= N;

        let frequency = k; 
        let amplitude = sqrt(realComponent * realComponent + imaginaryComponent * imaginaryComponent);
        let phase = atan2(imaginaryComponent, realComponent);

        X[k] = {
            real: realComponent,
            imaginary: imaginaryComponent,
            frequency: frequency,
            amplitude: amplitude,
            phase: phase
        }
    }

    return X;

}


function dft2(signalValues, numberOfSamples)
{
    // The format of signalValues is consituting array of array -> 2D array
    let X = [];
    let Y = []; 

    numberOfSamples = min(signalValues.length - 1, numberOfSamples);
    
    // iterate over the signalValues 
    for(let i = 0; i < signalValues.length; i++)
    {
        X.push(signalValues[i][0])
        Y.push(signalValues[i][1])
    }

    xSignalDFT = dft(X, numberOfSamples);
    ySignalDFT = dft(Y, numberOfSamples);

    return [xSignalDFT, ySignalDFT];

}

module.exports = {dft,dft2};