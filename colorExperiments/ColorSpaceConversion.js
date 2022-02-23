
// Grab P5.js from npm
const p5 = require('p5');


function ConvertRGBToLCH(r, g, b) {
    //convrt rgb colorspace to luminance, chroma, hue
    //https://en.wikipedia.org/wiki/LCH_color_space
    //https://www.rapidtables.com/convert/color/rgb-to-hsl.html
  
    let l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    let c = Math.sqrt(Math.pow(r - l, 2) + Math.pow(g - l, 2) + Math.pow(b - l, 2));
    let h = Math.atan2(b - g, r - b);
    h = h / (2 * Math.PI);
    h = h * 360;
  
    return {
      l: l,
      c: c,
      h: h
    };
  
  }
  
  
  function LCH2RGB(l,c,h)
  {
    labColor = LCH2LAB(l,c,h);
    xyzColor =  LAB2XYZ(labColor.l, labColor.a, labColor.b);
    rgbColor = XYZ2RGB(xyzColor.x, xyzColor.y, xyzColor.z);
  
    return color(rgbColor.r * 255/100, rgbColor.g * 255/100, rgbColor.b * 255/100);
  }
  
  
  function LCH2LAB(l,c,h)
  {
    //https://en.wikipedia.org/wiki/Lab_color_space
    //https://www.rapidtables.com/convert/color/rgb-to-hsl.html
  
    // calculate the cosine of the angle in degrees
  
  
    let a =  Math.cos(h * Math.PI / 180) * c;
    let b = Math.sin(h * Math.PI / 180) * c;
  
    return {
      l: l,
      a: a,
      b: b
    };
  
  }
  
  
  function matrix(params, mats) {
    const precision = 100000000;
      return mats.map(
          mat => mat.reduce(
              // (acc, value, index) => acc + params[index] * value,
              (acc, value, index) => acc + params[index] * precision * (value * precision) / precision / precision,
              0
          )
      );
  }
  
  
  function LAB2XYZ(labL,labA,labB)
  {
    //https://en.wikipedia.org/wiki/Lab_color_space
    //https://www.rapidtables.com/convert/color/rgb-to-hsl.html
  
    // calculate the cosine of the angle in degrees
    const [ wd50X, wd50Y, wd50Z ] = [ 96.42, 100, 82.49 ];
    const precision = 100000000;
     const epsilon = pow(6, 3) / pow(29, 3);
   const kappa = pow(29, 3) / pow(3, 3);
    const f2 = (labL + 16) / 116;
      const f1 = labA / 500 + f2;
      const f3 = f2 - labB / 200;
      // compute pre-scaled XYZ
      const [ initX, initY, initZ ] = [
          pow(f1, 3) > epsilon   ? pow(f1, 3)                : (116 * f1 - 16) / kappa,
          labL > kappa * epsilon ? pow((labL + 16) / 116, 3) : labL / kappa,
          pow(f3, 3) > epsilon   ? pow(f3, 3)                : (116 * f3 - 16) / kappa
      ];
      const [ xyzX, xyzY, xyzZ ] = matrix(
          // compute XYZ by scaling pre-scaled XYZ by reference white
          [ initX * wd50X, initY * wd50Y, initZ * wd50Z ],
          // calculate D65 XYZ from D50 XYZ
          [
              [ 0.9555766, -0.0230393,  0.0631636],
              [-0.0282895,  1.0099416,  0.0210077],
              [ 0.0122982, -0.0204830,  1.3299098]
          ]
      );
      return {
      x : xyzX,
      y : xyzY,
      z : xyzZ
    };
  
  }
  
  function XYZ2RGB(xyzX,xyzY,xyzZ)
  {
    //https://en.wikipedia.org/wiki/Lab_color_space
    //https://www.rapidtables.com/convert/color/rgb-to-hsl.html
  
    const [ lrgbR, lrgbB, lrgbG ] = matrix([ xyzX, xyzY, xyzZ ], [
          [ 3.2404542, -1.5371385, -0.4985314],
          [-0.9692660,  1.8760108,  0.0415560],
          [ 0.0556434, -0.2040259,  1.0572252]
      ]);
      const [ rgbR, rgbG, rgbB ] = [ lrgbR, lrgbB, lrgbG ].map(
          v => v > 0.31308 ? 1.055 * pow(v / 100, 1 / 2.4) * 100 - 5.5 : 12.92 * v
      );
  
  
      return {
      r : rgbR,
      g : rgbG,
      b : rgbB,
    }
  }
  


module.exports = { LCH2RGB, LCH2LAB, LAB2XYZ, XYZ2RGB };
