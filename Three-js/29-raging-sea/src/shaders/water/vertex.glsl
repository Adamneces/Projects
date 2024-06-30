uniform float uTime;
uniform float uWavesElevation;
uniform float uWavesSpeed;
uniform vec2 uWavesFrequency;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uWavesFrequency.x + uTime * uWavesSpeed) 
                    * sin(modelPosition.z * uWavesFrequency.y + uTime * uWavesSpeed) 
                    * uWavesElevation;

    modelPosition.y += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}