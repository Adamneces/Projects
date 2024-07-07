uniform vec3 viewVector;
uniform float c;
uniform float p;
varying float intensity;

void main() {
    vec3 vNormal = normalize(normalMatrix * normal);
    vec3 vViewVec = normalize(normalMatrix * viewVector);
    intensity = pow(c - dot(vNormal, vViewVec), p);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
