import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from "lil-gui"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"
/**
 * Base
 */

// DEBUG
const gui = new GUI;

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// TEXTURES
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('./textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg');
const matcapTexture = textureLoader.load('./textures/matcaps/1.png');
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg');

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

// OBJECTS ----------------------------------------------

// const material = new THREE.MeshBasicMaterial({ map: doorColorTexture });
// material.color = new THREE.Color(0xff0000)

// material.transparent = true;
// material.opacity = 0.5;

// material.side = THREE.DoubleSide;

// MESH NORMAL MATERIAL -----------------------------
// const material = new THREE.MeshNormalMaterial();

// MESH MATCAP MATERIAL--------------------------------
// const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture }); 

// MESHDEPTHMATERIAL
//const material = new THREE.MeshDepthMaterial();

//MESHLAMBERTMATERIAL --------------------- this one is using lights
// const material = new THREE.MeshLambertMaterial();

//MeshPhongMaterial ---------------------------------
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff);

// MeshToonMaterial -----------------------------
// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// material.gradientMap = gradientTexture;

// Mesh Standart Material--
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.9
material.roughness = 0
material.map = doorColorTexture
material.aoMap = doorAmbientOcclusionTexture
material.displacementMap = doorHeightTexture
material.displacementScale = 0
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
material.normalMap = doorNormalTexture
// material.transparent = true;
// material.alphaMap = doorAlphaTexture

const materialGui = gui.addFolder('Material')

materialGui.add(material, 'metalness').min(0).max(1)
materialGui.add(material, 'roughness').min(0).max(1)
materialGui.add(material, 'aoMapIntensity').min(0).max(5)
materialGui.add(material, 'displacementScale').min(0).max(1)


const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
const torusGeometry = new THREE.TorusGeometry(0.4, 0.20, 16, 32);
const planeGeometry = new THREE.PlaneGeometry(1,1, 100, 100);

const sphere = new THREE.Mesh(sphereGeometry, material);
const torus = new THREE.Mesh(torusGeometry, material);
const plane = new THREE.Mesh(planeGeometry, material);

sphere.position.x = -2
torus.position.x = 2

scene.add(sphere, torus, plane);

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 50)
// pointLight.position.x = 0
// pointLight.position.y = 5
// pointLight.position.z = 0
// scene.add(pointLight);

/**
 * Enviroment map
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = environmentMap
    scene.environment = environmentMap
});


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    torus.rotation.y += 0.01
    plane.rotation.z -= 0.005
    sphere.rotation.y += 0.015

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()