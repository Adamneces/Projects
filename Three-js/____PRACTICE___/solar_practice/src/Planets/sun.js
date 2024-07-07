import * as THREE from "three";
import { textures } from "../data/textures";
import sunVertexShader from "../shaders/sunGlow/vertex.glsl"
import sunFragmentShader from "../shaders/sunGlow/fragment.glsl"

export const createSun = (camera) => {
  const sunGeometry = new THREE.SphereGeometry(15, 32, 32);
  const sun = new THREE.Mesh(
    sunGeometry,
    new THREE.MeshBasicMaterial({
      map: textures.sun.sunTexture,
    })
  );

  const sunGlowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      c: { type: "f", value: 1.0 },
      p: { type: "f", value: 1.4 },
      glowColor: { type: "c", value: new THREE.Color(0xff6700) },
      viewVector: { type: "v3", value: camera.position },
    },
    vertexShader: sunVertexShader,
    fragmentShader: sunFragmentShader,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
  });

  const sunGlow = new THREE.Mesh(sunGeometry.clone(), sunGlowMaterial);
  sunGlow.scale.multiplyScalar(1.05);

  return [sun, sunGlow]
};
