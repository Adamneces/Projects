import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loader
const textureLoader = new THREE.TextureLoader();

const woodTexture = textureLoader.load('/wood.jpeg')
const floorTexture = textureLoader.load('/floor.jpg');
const wallTexture = textureLoader.load('/wallTexture.jpg');
const metalTexture = textureLoader.load('/metal.jpg');

const floorRoughnessTexture = textureLoader.load('/floor-rough.jpg')

woodTexture.colorSpace = THREE.SRGBColorSpace
floorTexture.colorSpace = THREE.SRGBColorSpace
wallTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Lights
 */
// Ambient
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// PointLight
const pointLight = new THREE.PointLight( 0xffffff, 100, 20 );
pointLight.position.set( 0, 3, 0 );
pointLight.castShadow = true
scene.add( pointLight );

pointLight.shadow.mapSize.width = 1024; // default
pointLight.shadow.mapSize.height = 1024; // default
pointLight.shadow.camera.near = 0.5; // default
pointLight.shadow.camera.far = 500

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );

/**
 * Objects
 */
    const boxGeometry = new THREE.BoxGeometry(1);
    const boxMaterial = new THREE.MeshStandardMaterial({ map: woodTexture });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);

    box.position.set(-2, 0, -1)
    //spotLight.target = box;


// Floor
    const floorGeometry = new THREE.PlaneGeometry(6, 6);
    const floorMaterial = new THREE.MeshStandardMaterial({
        map: floorTexture,
        roughnessMap: floorRoughnessTexture,
    });
    floorMaterial.roughness = 2
    floorMaterial.normalScale = 1

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    scene.add(floor);

    floor.receiveShadow = true;

    floor.rotation.x = (Math.PI / 2) * -1;
    floor.position.y = -0.5;

// Walls
    const wallGeometry = new THREE.PlaneGeometry(6, 4);
    const wallMaterial = new THREE.MeshStandardMaterial({
        map: wallTexture,
    });
    const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
    const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
    scene.add(wall1, wall2); 

    wall1.rotation.y = Math.PI / 2
    wall1.position.x = -3
    wall1.position.y = 1.5

    wall2.position.z = -3
    wall2.position.y = 1.5

// Sphere
    const sphereGeometry = new THREE.SphereGeometry(1);
    const sphereMaterial = new THREE.MeshStandardMaterial({
        map: metalTexture,
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    sphere.castShadow = true; //default is false
    sphere.receiveShadow = false; //default

    sphere.scale.set(0.5,0.5,0.5);
    sphere.position.set(-2.5, 0, 0.3)
   
// CONTROLS
    const folder = gui.addFolder('floor');

    folder.add(floorMaterial, 'roughness').min(0).max(2);
    folder.add(floorMaterial, 'metalness').min(0).max(2);
    
    
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
camera.position.z = 2
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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.position.x = Math.sin(elapsedTime) * 1.5;
    sphere.rotation.z = Math.sin(elapsedTime) * -2

    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()