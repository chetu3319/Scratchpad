// GLSL boiler plate 

// Add float precision in GLSL shader
#ifdef GL_ES
precision mediump float;
#endif

// Add screen resolution uniform 
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// code that take a float input and returns vec3 color output
// the color values are selected by the cosine function based on 4 predefined vec3 
// function ColorGenerator() {
//   this.a = createVector(0.5, 0.5, 0.5);
//   this.b = createVector(0.5, 0.5, 0.5);
//   this.c = createVector(1.0, 1.0, 1.0);
//   this.d = createVector(0.0, 0.33, 0.67);

//   this.GetColor = function (t) {
//     let r = this.a.x + this.b.x * cos(360 * (this.c.x * t + this.d.x));
//     let g = this.a.y + this.b.y * cos(360 * (this.c.y * t + this.d.y));
//     let b = this.a.z + this.b.z * cos(360 * (this.c.z * t + this.d.z));

//     return color(r * 255, g * 255, b * 255);
//   };
// }

vec3 ColorGenerator(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.9529, 0.5804, 0.5804);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.6118, 0.2, 0.2);
    float x = a.x + b.x * cos( 2.*3.14 *(c.x * t + d.x));
    float y = a.y + b.y * cos( 2.*3.14 * (c.y * t + d.y));
    float z = a.z + b.z * cos(2.*3.14 * (c.z * t + d.z));
    return vec3(x,y,z); 
}

//draw circle given a center position and radius
float drawCircle(vec2 point, vec2 center,float radius) 
{
        return step(length(point - center),radius); 
}
  

void main()
{
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 original = st; 
    st *= 30.; 
    st = fract(st);
    vec3 color = vec3(0.);
    color = vec3(st.x,st.y,abs(sin(u_time)));
    color = vec3(drawCircle(st, vec2(0.5,0.5),.1 +drawCircle(original,u_mouse/u_resolution.xy,0.1)/10.));
    vec3 a = color *vec3( drawCircle(original,u_mouse/u_resolution.xy,0.1),0.0,0.0 );
     color -=vec3(drawCircle(original,u_mouse/u_resolution.xy,0.1),0.0,1.0 );
     color +=a; 
    gl_FragColor = vec4(color, 1.0);
}