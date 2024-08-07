import * as THREE from "three";
import { textures } from "../data/textures";

export const createJupiter = () => {
  const jupiterGroup = new THREE.Group();
  const jupiter = new THREE.Mesh(
    new THREE.SphereGeometry(11.2, 128, 128),
    new THREE.MeshStandardMaterial({
      map: textures.jupiter.jupiterTexture,
    })
  );
  jupiter.rotation.x = (-3.13 * Math.PI) / 180;
  jupiterGroup.add(jupiter);

  const europa = new THREE.Mesh(
    new THREE.SphereGeometry(0.245, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.jupiter.europaTexture,
    })
  );

  const callisto = new THREE.Mesh(
    new THREE.SphereGeometry(0.378, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.jupiter.callistoTexture,
    })
  );

  const ganymede = new THREE.Mesh(
    new THREE.SphereGeometry(0.413, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.jupiter.ganymedeTexture,
    })
  );

  const io = new THREE.Mesh(
    new THREE.SphereGeometry(0.286, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.jupiter.ioTexture,
    })
  );
  jupiterGroup.add(europa, callisto, io, ganymede);

  return [jupiterGroup, jupiter, europa, callisto, io, ganymede];
};
