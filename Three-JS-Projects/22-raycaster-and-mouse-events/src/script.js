import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Model Loader
const gltfLoader = new GLTFLoader()

let duckModel = null;

gltfLoader.load('/models/Duck/glTF/Duck.gltf', 
    (gltf) => {
        duckModel = gltf.scene;
        duckModel.position.y = -1.25
        scene.add(duckModel);
})

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

/**
 * RayCaster
 */
const raycaster = new THREE.Raycaster();

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
 * Mouse
 */
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / sizes.width) * 2 - 1;
    mouse.y = - (event.clientY / sizes.height) * 2 + 1;
})

window.addEventListener('click', () => {
    if(currentIntersect){
     
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
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
 * LIGHTS
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#ffffff', 2.1)
scene.add(directionalLight)

/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect = null

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate objects
    object1.position.y = Math.sin(elapsedTime * 0.5) * 1.3
    object2.position.y = Math.sin(elapsedTime * 0.75) * 1.3
    object3.position.y = Math.sin(elapsedTime * 0.38) * 1.3

    // Cast a ray

    raycaster.setFromCamera(mouse, camera)


    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest);

    for(const object of objectsToTest) {
        object.material.color.set('#ff0000')
    }

    for(const intersect of intersects){
        intersect.object.material.color.set('#0000FF')
    }

    if (intersects.length){
        if(currentIntersect === null){
            console.log('Mouse enter')
        }

        currentIntersect = intersects[0]
    }else{
        if(currentIntersect){
            console.log('Mouse leave')
        }

        currentIntersect = null
    }

    // Test intersect with model
    if (duckModel){
        const modelIntersects = raycaster.intersectObjects(duckModel);

        if (modelIntersects.length){
            duckModel.rotation.y += 2
        }
        else{
            duckModel.scale.set(1,1,1)
        }
    }
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()