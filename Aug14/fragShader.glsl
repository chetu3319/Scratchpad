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
    vec3 d = vec3(0.8196, 0.2784, 0.7294);
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


void main()
{
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 original = st; 

    

    
    vec3 color = ColorGenerator(u_time +  noise(st*10.0));
    
    gl_FragColor = vec4(color, 1.0);
}