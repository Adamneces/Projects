// marsGroup.js
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { textures } from "../data/textures";

const gltfLoader = new GLTFLoader();

const loadModel = (url) => {
    return new Promise((resolve, reject) => {
        gltfLoader.load(
            url,
            (gltf) => resolve(gltf.scene),
            undefined,
            (error) => reject(error)
        );
    });
};

const loadMarsMoons = async () => {
    const phobos = await loadModel('/models/Phobos_1_1000.glb');
    phobos.scale.set(0.004, 0.004, 0.004);
    phobos.position.set(0, 40, 0);

    const deimos = await loadModel('/models/Deimos_1_1000.glb');
    deimos.scale.set(0.009, 0.009, 0.009);
    deimos.position.z = -3;

    return { phobos, deimos };
};

export const createMars = async () => {
    const marsGroup = new THREE.Group();

    // Mars
    const mars = new THREE.Mesh(
        new THREE.SphereGeometry(0.532, 32, 32),
        new THREE.MeshStandardMaterial({
            map: textures.mars.marsTexture,
        })
    );
    mars.rotation.x = -25 * Math.PI / 180;
    marsGroup.add(mars);

    try {
        const { phobos, deimos } = await loadMarsMoons();
        marsGroup.add(phobos);
        marsGroup.add(deimos);
        return [marsGroup, mars, phobos, deimos];
    } catch (error) {
        console.error("Error loading Mars moons:", error);
        return [marsGroup, mars, null, null];
    }
};
