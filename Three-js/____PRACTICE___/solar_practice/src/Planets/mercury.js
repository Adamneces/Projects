import * as THREE from "three"
import { textures } from "../data/textures"

export const createMercury = () => {
    const mercury = new THREE.Mesh(
        new THREE.SphereGeometry(0.38, 32, 32),
        new THREE.MeshStandardMaterial({
            map: textures.mercury.mercuryTexture
        })
    )

    return mercury
}