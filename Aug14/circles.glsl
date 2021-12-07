// GLSL Boiler plate code 

// GLSL boiler plate 

// Add float precision in GLSL shader
#ifdef GL_ES
precision mediump float;
#endif

// Add screen resolution uniform 
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


vec3 ColorGenerator(float t) {
     vec3 a = vec3(0.251, 0.8471, 0.6667);
    vec3 b = vec3(0.7608, 0.0, 0.0);
    vec3 c = vec3(0.8549, 0.0, 0.0);
    vec3 d = vec3(0.298, 0.8314, 0.1882);
    float x = a.x + b.x * cos( 2.*3.14 *(c.x * t + d.x));
    float y = a.y + b.y * cos( 2.*3.14 * (c.y * t + d.y));
    float z = a.z + b.z * cos(2.*3.14 * (c.z * t + d.z));
    return vec3(x,y,z); 
}

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}



//create circle of radius r 

float circle(vec2 st, float r, float w) {

    float d = length(st);

    float a = step(d, r-w);
    float b = step(d, r);
    float c = b-a; 
    return c;
}

// rotate point around origin 
vec2 rotate(vec2 st, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(st.x * c - st.y * s, st.x * s + st.y * c);
}

float arc(vec2 st, float startAngle, float endAngle, float r, float w)
{
    float t = atan(st.x, st.y);
    t *= -1.0; 
    float  angle = startAngle * 3.14159265 / 180.0;
    float a = step(t, angle) - step(t, endAngle * 3.14159265 / 180.0); 
    // convert degree to radian 

    float c = circle(st, r, w) * a;
    return c; 
}

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main()
{
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 original = st; 
    
   
    vec3 color = vec3(1.0, 1.0, 1.0);

    for (int i = 0; i < 100; i++) {
        
        float randomNumber = random(vec2(float(i)));
        vec3 colorMultiplier = ColorGenerator(noise(vec2(randomNumber)));
        float rotationSpeed = map(randomNumber, 0.0, 1.0, -3.14 * 2., 3.14*2.);
         float offSet = random( vec2(float(i)*100.0));
         offSet = map(offSet, 0.0, 1.0, -100.0, 100.0);

        //Rotation
        vec2 pt = st + vec2(-0.5,-0.5);
        pt = rotate(pt,rotationSpeed * (u_time + offSet)/ 10.0);


     


       
        //vec2 st, float startAngle, float endAngle, float r, float w
        float radius = map(randomNumber, 0.0, 1.0, 0., .5);
        float width = map(randomNumber, 0.0, 1.0, 0.0, 0.5 - radius);

        float arcLength = map(randomNumber, 0.0, 1.0, 0.0, 100.0);
        
       
        float c = arc(pt, 0. + offSet, -arcLength+ offSet, radius, width);
       
        // set color to the brightest color
        color = max(color, c);
       
        color *= colorMultiplier; 

    }

    color = color;//+ (1.0- color);
    // color = 1.-color; 

    // color *= arc(st + vec2(-0.5,-.5), time , time2, 0.5, 0.05); 




    
    gl_FragColor = vec4(color, 1.0);
}