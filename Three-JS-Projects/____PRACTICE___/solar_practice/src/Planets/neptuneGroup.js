import * as THREE from "three";
import { textures } from "../data/textures";

export const createNeptune = () => {
  const neptuneGroup = new THREE.Group();
  const neptune = new THREE.Mesh(
    new THREE.SphereGeometry(3.88, 64, 64),
    new THREE.MeshStandardMaterial({
      map: textures.neptune.neptuneTexture,
    })
  );
  neptuneGroup.position.z = 1900;
  neptune.rotation.x = (28 * Math.PI) / 180;

  const triton = new THREE.Mesh(
    new THREE.SphereGeometry(0.212, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.neptune.tritonTexture,
    })
  );
  neptuneGroup.add(neptune, triton);

  return [neptuneGroup, neptune, triton];
};
