import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'white' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh);

mesh.position.x = 1
mesh.position.y = -0.4
mesh.position.z = -1
// mesh.position.set(0.5, -0.7, 1) (x,y,z)

mesh.scale.x = 1
mesh.scale.y = 1.5
mesh.scale.z = 0.9
// mesh.scale.set(1.5, 1.5, 1) (x,y,z)

// Rotation
//mesh.rotation.z = 1
//mesh.rotation.y = Math.PI * 0.25


/**
 * Objects
 */
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'grey' })
)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'yellow' })
)
cube1.position.x = -1
cube2.position.x = 1
group.add(cube1);
group.add(cube2);

group.position.y = 0.5

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 2
camera.position.x = -0.3
camera.position.y = 0.5
scene.add(camera);

camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)