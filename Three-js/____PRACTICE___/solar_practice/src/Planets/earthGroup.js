import * as THREE from "three";
import { textures } from "../data/textures";

export const createEarth = () => {
  // Earth Group
  const earthGroup = new THREE.Group();
  earthGroup.rotation.x = (-23.4 * Math.PI) / 180;

  // Earth
  const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
  const earth = new THREE.Mesh(
    earthGeometry,
    new THREE.MeshStandardMaterial({
      map: textures.earth.earthTexture,
      normalMap: textures.earth.earthNormalTexture,
      bumpMap: textures.earth.earthBumpMap,
      metalnessMap: textures.earth.oceanTexture,
    })
  );

  // Light Mesh
  const lightMesh = new THREE.Mesh(
    earthGeometry,
    new THREE.MeshBasicMaterial({
      map: textures.earth.earthNightLights,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color(0x606060),
    })
  );

  // Clouds
  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.01, 64, 64),
    new THREE.MeshStandardMaterial({
      map: textures.earth.cloudsMap,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      opacity: 0.9,
    })
  );

  // Moon
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.267, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.earth.moonTexture,
    }))

  earthGroup.add(earth, clouds, lightMesh, moon);

  return [earthGroup, earth, clouds, lightMesh, moon];
};
