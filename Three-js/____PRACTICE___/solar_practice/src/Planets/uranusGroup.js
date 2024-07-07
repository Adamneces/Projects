import * as THREE from "three";
import { textures } from "../data/textures";

export const createUranus = () => {
  const uranusGroup = new THREE.Group();
  const uranus = new THREE.Mesh(
    new THREE.SphereGeometry(3.95, 64, 64),
    new THREE.MeshStandardMaterial({
      map: textures.uranus.uranusTexture,
    })
  );
  uranus.rotation.x = (98 * Math.PI) / 180;

  const titania = new THREE.Mesh(
    new THREE.SphereGeometry(0.124, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.uranus.titaniaTexture,
    })
  );
  const oberon = new THREE.Mesh(
    new THREE.SphereGeometry(0.119, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.uranus.oberonTexture,
    })
  );

  const umbriel = new THREE.Mesh(
    new THREE.SphereGeometry(0.092, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.uranus.umbrielTexture,
    })
  );

  const ariel = new THREE.Mesh(
    new THREE.SphereGeometry(0.091, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.uranus.arielTexture,
    })
  );
  uranusGroup.add(uranus, titania, oberon, umbriel, ariel);

  return [uranusGroup, uranus, titania, oberon, umbriel, ariel]
};
