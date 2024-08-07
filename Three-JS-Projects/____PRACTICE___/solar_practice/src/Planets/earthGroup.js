import * as THREE from "three";
import { textures } from "../data/textures";
import earthVertexShader from "../shaders/earth/vertex.glsl"
import earthFragmentShader from "../shaders/earth/fragment.glsl"
import atmosphereVertexShader from "../shaders/atmosphere/vertex.glsl"
import atmosphereFragmentShader from "../shaders/atmosphere/fragment.glsl"

export const createEarth = () => {
  // Earth Group
  const earthGroup = new THREE.Group();
  earthGroup.rotation.x = (-23.4 * Math.PI) / 180;

  // Earth
  const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
  const earth = new THREE.Mesh(
    earthGeometry,
    new THREE.ShaderMaterial({
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
      uniforms: {
        uDayTexture: new THREE.Uniform(textures.earth.earthTexture),
        uNightTexture: new THREE.Uniform(textures.earth.earthNightLights),
        uSpecularCloudsTexture: new THREE.Uniform(textures.earth.earthSpecularClouds),
        uSunDirection: new THREE.Uniform(new THREE.Vector3(-1.0, 0.0, 0.0)),
        uAtmosphereDayColor: new THREE.Uniform(new THREE.Color('#00AAFF')),
        uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color('#FF6600')),
      }
    })
  );

  const atmosphereMaterial = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    transparent: true,
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    uniforms:
    {
        uSunDirection: new THREE.Uniform(new THREE.Vector3(0, 0, 1)),
        uAtmosphereDayColor: new THREE.Uniform(new THREE.Color('#00AAFF')),
        uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color('#FF6600'))
    },
    // ...
})

const atmosphere = new THREE.Mesh(
    earthGeometry,
    atmosphereMaterial
)
atmosphere.scale.set(1.025, 1.025, 1.025)


  // Moon
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.267, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.earth.moonTexture,
    }))

  earthGroup.add(earth, moon, atmosphere);

  return [earthGroup, earth, moon];
};
