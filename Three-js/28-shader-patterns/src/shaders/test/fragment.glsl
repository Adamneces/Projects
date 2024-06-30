varying vec2 vUv;
float PI = 3.141592653589793;

float random(vec2 st){
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}



void main()
{
    float strength = round(random(vUv));

    gl_FragColor = vec4(strength, 1.0, strength, 1.0);
}