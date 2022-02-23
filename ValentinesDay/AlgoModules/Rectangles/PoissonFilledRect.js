// Grab P5.js from npm
const p5 = require('p5');
var poissonSampler = require('../PoissonDiskSampling.js')
var {LCH2RGB} = require('../Color/ColorSpaceConversion.js');

function PoissonFilledRect(position,width,height,colorPallete,dotResolution)
{
   randomSeed(1);
    let poissonDiskSampler = new poissonSampler(30,dotResolution,width,height);

    let points = poissonDiskSampler.samplePoints();

    points = shuffle(points);

    push()
    translate(position.x, position.y);
    for(let i = 0; i < points.length; i++)
    {
        let c = random(colorPallete);
        let cRGB = LCH2RGB(c.l, c.c, c.h);

        cRGB.setAlpha(randomGaussian(50,10));
        fill(cRGB);
        noStroke();
        let w = randomGaussian(dotResolution*2,dotResolution);
        
        ellipse(points[i].x, points[i].y, w,w);
    }
    pop()
}

module.exports = PoissonFilledRect;