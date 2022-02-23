const canvasSketch = require('canvas-sketch');
const createShader = require('canvas-sketch-util/shader');

// Setup our sketch
const settings = {
  dimensions: [ 2048, 2048 ],
  context: 'webgl',
  animate: true
};

// Your glsl code
const frag = `
  precision highp float;

  uniform float time;
  varying vec2 vUv;
  uniform float xpoints[100];
  uniform float ypoints[100];
  uniform int numOfPoints; 


  #define PI 3.1415926
  struct LineLight{
      float range;
      vec2 p0;
      vec2 p1;
      vec3 color;
  };

  vec3 SampleLight(LineLight light,vec2 pos){
    // l is the line from lineLight point 1 to point 2
    vec2 AB = light.p1 - light.p0;

	float t = dot(normalize(pos - light.p0) , normalize(AB));
    t = max(t,0.0);
    float d = (length(pos - light.p0) * t) / length(AB);
    d = clamp(d,0.0,1.0);
    // mix is a linear interpolation function
    vec2 closerP = mix(light.p0 , light.p1, vec2(d,d));
    float il = 1.0 - clamp(length(closerP - pos) / light.range,0.0,1.0);
    il = pow(il,04.0);
    vec2 ax = vec2(-AB.y,AB.x);
    il *= abs(max(0.0,dot(normalize(ax) , normalize(pos - closerP)))) ;
    light.color *= il ;
    return light.color;
  }

  void main () {
    float anim = sin(time) * 0.5 + 0.5;

    vec2 uv = vUv;
    vec2 p = uv ;
    vec3 color = vec3(0.0);
    for(int i = 0; i < 6; i++)
    {
      LineLight light;
      light.p0 = vec2(xpoints[i],ypoints[i]);
      light.p1 = vec2(xpoints[i+1],ypoints[i+1]);
      light.range = 11.0;
      light.color = vec3(0.349, 0.0, 1.0);
      color += SampleLight(light,p);
    }
   

    gl_FragColor = vec4(color,1.0);
  }
`;

// Your sketch, which simply returns the shader
const sketch = ({ gl }) => {

  print("yay")
  //Create a float array of 7 point 
  let xPoints = new Float32Array([0.1,0.3,0.5,.0,0.2,0.4,0.6]);
  let yPoints = new Float32Array([0.5,0.1,0.7,0.9,0.5,0.1,0.7]);
  // Create the shader and return it. It will be rendered by regl.
  return createShader({
    // Pass along WebGL context
    gl,
    // Specify fragment and/or vertex shader strings
    frag,
    // Specify additional uniforms to pass down to the shaders
    uniforms: {
      // Expose props from canvas-sketch
      time: ({ time }) => time,
      xpoints: xPoints,
      ypoints: yPoints,
      numOfPoints: 7
    }
  });
};

canvasSketch(sketch, settings);