import * as THREE from "three";
import { textures } from "../data/textures";

export const createVenus = () => {
  const venusGroup = new THREE.Group();
  venusGroup.rotation.x = (-177 * Math.PI) / 180;

  const venus = new THREE.Mesh(
    new THREE.SphereGeometry(0.95, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.venus.venusTexture,
    })
  );

  const venusAtmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.95, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.venus.venusAtmosphereTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.45,
    })
  );
  venusGroup.add(venus, venusAtmosphere);

  return [venusGroup, venus, venusAtmosphere]
};
