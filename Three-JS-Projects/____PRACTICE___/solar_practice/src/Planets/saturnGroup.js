import * as THREE from "three";
import { textures } from "../data/textures";

export const createSaturn = () => {
  const saturnGroup = new THREE.Group();
  const saturn = new THREE.Mesh(
    new THREE.SphereGeometry(9, 64, 64),
    new THREE.MeshStandardMaterial({
      map: textures.saturn.saturnTexture,
    })
  );
  saturn.rotation.x = (26.73 * Math.PI) / 180;

  // Function to adjust ring geometry UV mapping
  function adjustRingGeometry(geometry) {
    const pos = geometry.attributes.position;
    const v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      geometry.attributes.uv.setXY(i, v3.length() < 14 ? 0 : 1, 1);
    }
  }

  const saturnRingGeometry = new THREE.RingGeometry(12, 18.5, 64);
  adjustRingGeometry(saturnRingGeometry);

  const saturnRing = new THREE.Mesh(
    saturnRingGeometry,
    new THREE.MeshBasicMaterial({
      map: textures.saturn.saturnRingTexture,
      side: THREE.DoubleSide,
      transparent: true,
    })
  );
  saturnRing.rotation.x = (-63.27 * Math.PI) / 180; 

  //moons 
  const titan = new THREE.Mesh(
    new THREE.SphereGeometry(0.404, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.saturn.titanTexture,
    })
  );
  const rhea = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.saturn.rheaTexture,
    })
  );
  const lapetus = new THREE.Mesh(
    new THREE.SphereGeometry(0.115, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.saturn.lapetusTexture,
    })
  );
  const dione = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.saturn.dioneTexture,
    })
  );
  const tethys = new THREE.Mesh(
    new THREE.SphereGeometry(0.085, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textures.saturn.tethysTexture,
    })
  );

  saturnGroup.add(saturn, saturnRing, titan, rhea, lapetus, dione, tethys);

  return [saturnGroup, saturn, titan, rhea, lapetus, dione, tethys];
};
