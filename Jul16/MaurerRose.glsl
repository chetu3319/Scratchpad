// GLSL Boiler plat code 

// If GLES then use medium precision float 
#ifdef GL_ES
precision mediump float;
#endif

// define PI 
#define PI 3.1415926535897932384626433832795

// Add screen resolution uniform 
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;



//Write plot function 
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

//   Theta goes from 0 to 2pi
//   float k = theta * d * PI / 180;
//   float r = 300 * sin(n * k);
//   float x = r * cos(k) 
//   float y = r * sin(k) 

float Maurer(vec2 point, vec2 center)
{

    float angle = PI -  atan(point.y - center.y, point.x - center.x);
    angle /= (2. * PI);
   
    // return (step(angle,a) - step(angle, a-0.01)); 
    float n = 3.872;
    float d = u_time/4.0;
    // convert d from degrees to radians 
    d *= PI / 180.;
    
    float k = (angle* 2.*PI) * d ;
    float r = sqrt(point.x *   point.x + point.y + point.y) * sin(n * k);
    float x = r * cos(k);
    float y = r * sin(k);
    float dist = 1.800 + u_mouse.x/u_resolution.x - length(point - vec2(x,y)); 

    return step(dist,0.756); 
}


void main() 
{
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    

    vec3 color = vec3(st.x,st.y,1.-st.x);
    float v = Maurer(st, vec2(0.50,0.50));
    color = vec3(v);
   
    gl_FragColor = vec4(color, 1.0);
}
