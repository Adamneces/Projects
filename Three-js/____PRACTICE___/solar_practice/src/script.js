import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

import { data } from "./data/data"; 

// GUI
const gui = new GUI();

// Elements
const canvas = document.querySelector("canvas.webgl");
const saturnBtn = document.querySelector(".container");
const moonBtn = document.querySelector(".containerTwo"); 

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};
// loader
const rgbeLoader = new RGBELoader();
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader()

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Environment
 */
textureLoader.load('/textures/solar/milky-way.jpg', (envMap) => {
    envMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = envMap
})
scene.backgroundIntensity = 0.04
/**
 * MODELS
 */

let phobos = null
let deimos = null

gltfLoader.load(
    '/models/Phobos_1_1000.glb',
    (gltf) => {     // Success

           phobos = gltf.scene
           phobos.scale.set(0.009, 0.009, 0.009)
           phobos.position.z = -3
    },            
);
gltfLoader.load(
    '/models/Deimos_1_1000.glb',
    (gltf) => {     // Success

           deimos = gltf.scene
           deimos.scale.set(0.009, 0.009, 0.009)
           deimos.position.z = -3
    },
)

// Earth - texture
const earthTexture = textureLoader.load('textures/solar/earth/earth.jpg');
earthTexture.colorSpace = THREE.SRGBColorSpace;

const earthNormalTexture = textureLoader.load('textures/solar/earth/earth_normal.jpg');
const oceanTexture = textureLoader.load('textures/solar/earth/ocean.png');
const cloudsMap = textureLoader.load('textures/solar/earth/earth_clouds.jpg');
const earthNightLights = textureLoader.load('textures/solar/earth/earth_night.jpg');
const earthBumpMap = textureLoader.load('textures/solar/earth/earth_bumps.jpg');

// Mercury
const mercuryTexture = textureLoader.load('textures/solar/mercury/mercury.jpg')
mercuryTexture.colorSpace = THREE.SRGBColorSpace
// Venus - texture
const venusTexture = textureLoader.load('textures/solar/venus/venus.jpg')
venusTexture.colorSpace = THREE.SRGBColorSpace

const venusAtmosphereTexture = textureLoader.load('textures/solar/venus/venus_atmosphere.jpg')

// Jupiter - texture
const jupiterTexture = textureLoader.load('textures/solar/jupiter/jupiter.jpg')
jupiterTexture.colorSpace = THREE.SRGBColorSpace

const europaTexture = textureLoader.load('textures/solar/jupiter/europa.webp')
europaTexture.colorSpace = THREE.SRGBColorSpace

const callistoTexture = textureLoader.load('textures/solar/jupiter/callisto.jpg')
callistoTexture.colorSpace = THREE.SRGBColorSpace

const ganymedeTexture = textureLoader.load('textures/solar/jupiter/ganymede.jpg')
ganymedeTexture.colorSpace = THREE.SRGBColorSpace

const ioTexture = textureLoader.load('textures/solar/jupiter/io.jpg')
ioTexture.colorSpace = THREE.SRGBColorSpace

// Mars - texture
const marsTexture = textureLoader.load('textures/solar/mars/mars.jpg')
marsTexture.colorSpace = THREE.SRGBColorSpace

// Saturn - texture
const saturnTexture = textureLoader.load('textures/solar/saturn/saturn.jpg')
saturnTexture.colorSpace = THREE.SRGBColorSpace

const saturnRingTexture = textureLoader.load('textures/solar/saturn/saturn_ring.png')
saturnRingTexture.colorSpace = THREE.SRGBColorSpace

// Saturn - moons
const lapetusTexture = textureLoader.load('textures/solar/saturn/lapetus.jpg')
const rheaTexture = textureLoader.load('textures/solar/saturn/rhea.jpg')
const titanTexture = textureLoader.load('textures/solar/saturn/titan.jpg')
const tethysTexture = textureLoader.load('textures/solar/saturn/tethys.jpg')
const dioneTexture = textureLoader.load('textures/solar/saturn/dione.jpg')

// Uranus - texture
const uranusTexture = textureLoader.load('textures/solar/uranus/uran.jpg')
uranusTexture.colorSpace = THREE.SRGBColorSpace

const titaniaTexture = textureLoader.load('textures/solar/uranus/titania.jpg')
const oberonTexture = textureLoader.load('textures/solar/uranus/oberon.jpg')
const umbrielTexture = textureLoader.load('textures/solar/uranus/umbriel.jpg')
const arielTexture = textureLoader.load('textures/solar/uranus/ariel.png')

// Neptune - texture
const neptuneTexture = textureLoader.load('textures/solar/neptune/neptun.jpg')
neptuneTexture.colorSpace = THREE.SRGBColorSpace

const tritonTexture = textureLoader.load('textures/solar/neptune/triton.jpg')


// Sun - texture    
const sunTexture = textureLoader.load('textures/solar/sun/sun.jpg')
sunTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Camera
 * */
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 4000);
camera.position.set(160,2,2)

scene.add(camera);

/**
 * OBJECTS
 */

// Earth Group
const earthGroup = new THREE.Group();
earthGroup.rotation.x = -23.4 * Math.PI / 180
scene.add(earthGroup);

// Earth    
const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
const earth = new THREE.Mesh(
    earthGeometry,
    new THREE.MeshStandardMaterial({
        map: earthTexture,
        normalMap: earthNormalTexture,
        bumpMap: earthBumpMap,
        metalnessMap: oceanTexture,
    })
);
earthGroup.add(earth);

// Light Mesh
const lightMesh = new THREE.Mesh(
    earthGeometry,
    new THREE.MeshBasicMaterial({
        map: earthNightLights,
        blending: THREE.AdditiveBlending,
        color: new THREE.Color(0x606060)
    })
);
earthGroup.add(lightMesh)

// Clouds
const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.01, 64, 64),
    new THREE.MeshStandardMaterial({
        map: cloudsMap,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
        opacity: 0.9,
    })
);
earthGroup.add(clouds);

// Moon
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.267, 32, 32),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('textures/solar/earth/moon.jpg')
    })
)
moon.position.x = 4
earthGroup.add(moon);

camera.lookAt(earthGroup.position)  

/**
 * VENUS
 *  */ 
const venusGroup = new THREE.Group()
venusGroup.rotation.x =  -177 * Math.PI / 180
scene.add(venusGroup)

const venus = new THREE.Mesh(
    new THREE.SphereGeometry(0.95, 32,32),
    new THREE.MeshStandardMaterial({
        map: venusTexture,
    })
)

const venusAtmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.95, 32,32), 
    new THREE.MeshStandardMaterial({
        map: venusAtmosphereTexture,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.45
    })
)
venusGroup.add(venus,venusAtmosphere);

/**
 * MERCURY
 */
const mercury = new THREE.Mesh(
    new THREE.SphereGeometry(0.38, 32, 32),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('textures/solar/mercury/mercury.jpg')
    })
)
mercury.position.z = -92
mercury.position.y = 0.62
scene.add(mercury) 

/**
 * MARS
 */
const marsGroup = new THREE.Group()

// Mars
const mars = new THREE.Mesh(
    new THREE.SphereGeometry(0.532, 32, 32),
    new THREE.MeshStandardMaterial({
        map: marsTexture
    })
)
mars.rotation.x = -25 * Math.PI / 180
marsGroup.add(mars)
if (phobos && deimos){
    marsGroup.add(phobos, deimos)
}
scene.add(marsGroup)

/**
 * Jupiter
 */
const jupiterGroup = new THREE.Group()
const jupiter = new THREE.Mesh(
    new THREE.SphereGeometry(11.2, 128, 128),
    new THREE.MeshStandardMaterial({
        map: jupiterTexture
    })
)
jupiterGroup.position.z = 334
jupiter.rotation.x = -3.13 * Math.PI / 180
    jupiterGroup.add(jupiter)

const europa = new THREE.Mesh(
    new THREE.SphereGeometry(0.245, 32, 32),
    new THREE.MeshStandardMaterial({
        map: europaTexture
    })
)
europa.position.z = -20

const callisto = new THREE.Mesh(
    new THREE.SphereGeometry(0.378, 32,32),
    new THREE.MeshStandardMaterial({
        map: callistoTexture
    })
)
callisto.position.z = 20

const ganymede = new THREE.Mesh(
    new THREE.SphereGeometry(0.413, 32,32),
    new THREE.MeshStandardMaterial({
        map: ganymedeTexture
    })
)
ganymede.position.z = 20

const io = new THREE.Mesh(
    new THREE.SphereGeometry(0.286, 32,32),
    new THREE.MeshStandardMaterial({
        map: ioTexture
    })
)
io.position.z = 20

jupiterGroup.add(europa, callisto, io, ganymede)
scene.add(jupiterGroup)


/**
 * Saturn
 */
const saturnGroup = new THREE.Group();
const saturn = new THREE.Mesh(
    new THREE.SphereGeometry(9, 64, 64),
    new THREE.MeshStandardMaterial({
        map: saturnTexture
    })
)
saturn.rotation.x = 26.73 * Math.PI / 180

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

const saturnRing = new THREE.Mesh(saturnRingGeometry, 
    new THREE.MeshBasicMaterial({
        map: saturnRingTexture,
        side: THREE.DoubleSide,
        transparent: true
    })
);
saturn.rotation.x = 26.73 * Math.PI / 180; 
saturnRing.rotation.x = -63.27 * Math.PI / 180; 


saturnGroup.position.z = 736;

//moons
const titan = new THREE.Mesh(
    new THREE.SphereGeometry(0.404, 32, 32),
    new THREE.MeshStandardMaterial({
        map: titanTexture
    })
);
const rhea = new THREE.Mesh(
    new THREE.SphereGeometry(0.120, 32, 32),
    new THREE.MeshStandardMaterial({
        map: rheaTexture
    })
);
const lapetus = new THREE.Mesh(
    new THREE.SphereGeometry(0.115, 32, 32),
    new THREE.MeshStandardMaterial({
        map: lapetusTexture
    })
);
const dione = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 32, 32),
    new THREE.MeshStandardMaterial({
        map: dioneTexture
    })
);
const tethys = new THREE.Mesh(
    new THREE.SphereGeometry(0.085, 32, 32),
    new THREE.MeshStandardMaterial({
        map: tethysTexture
    })
);

saturnGroup.add(saturn, saturnRing, titan, rhea, lapetus, dione, tethys);

scene.add(saturnGroup);

camera.lookAt(saturnGroup.position);

/**
 * URANUS
 */
const uranusGroup = new THREE.Group();
const uranus = new THREE.Mesh(
    new THREE.SphereGeometry(3.95, 64, 64),
    new THREE.MeshStandardMaterial({
        map: uranusTexture
    })
)
uranus.rotation.x = 98 * Math.PI / 180

uranusGroup.position.z = 1325

const titania = new THREE.Mesh(
    new THREE.SphereGeometry(0.124, 32, 32),
    new THREE.MeshStandardMaterial({
        map: titaniaTexture
    })
)
const oberon = new THREE.Mesh(
    new THREE.SphereGeometry(0.119, 32, 32),
    new THREE.MeshStandardMaterial({
        map: oberonTexture
    })
)

const umbriel = new THREE.Mesh(
    new THREE.SphereGeometry(0.092, 32, 32),
    new THREE.MeshStandardMaterial({
        map: umbrielTexture
    })
)

const ariel = new THREE.Mesh(
    new THREE.SphereGeometry(0.091, 32, 32),
    new THREE.MeshStandardMaterial({
        map: arielTexture
    })
)
uranusGroup.add(uranus, titania, oberon, umbriel, ariel)

scene.add(uranusGroup)

/**
 * NEPTUNE
 */
const neptuneGroup = new THREE.Group();
const neptune = new THREE.Mesh(
    new THREE.SphereGeometry(3.88, 64, 64),
    new THREE.MeshStandardMaterial({
        map: neptuneTexture
    })
)
neptuneGroup.position.z = 1900
neptune.rotation.x = 28 * Math.PI / 180

const triton = new THREE.Mesh(
    new THREE.SphereGeometry(0.212, 32, 32),
    new THREE.MeshStandardMaterial({
        map: tritonTexture
    })
)

neptuneGroup.add(neptune, triton)
scene.add(neptuneGroup)

/**
 * SUN
 */
const sunGeometry = new THREE.SphereGeometry(15, 32, 32)
const sun = new THREE.Mesh(
    sunGeometry,
    new THREE.MeshBasicMaterial({
    map: sunTexture
})
)

const sunGlowMaterial = new THREE.ShaderMaterial({
    uniforms: {
        'c': { type: 'f', value: 1.0 },
        'p': { type: 'f', value: 1.4 },
        glowColor: { type: 'c', value: new THREE.Color(0xff6700) },
        viewVector: { type: 'v3', value: camera.position }
    },
    vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main() {
            vec3 vNormal = normalize( normalMatrix * normal );
            vec3 vNormel = normalize( normalMatrix * viewVector );
            intensity = pow( c - dot(vNormal, vNormel), p );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `,
    fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4( glow, 1.0 );
        }
    `,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true
});

const sunGlow = new THREE.Mesh(sunGeometry.clone(), sunGlowMaterial);
sunGlow.scale.multiplyScalar(1.05);

scene.add(sunGlow);
scene.add(sun)

sun.castShadow = true;
earthGroup.castShadow = true;
mercury.castShadow = true;
venus.castShadow = true;
mars.castShadow = true;
jupiter.castShadow = true;
uranus.castShadow = true;
neptune.castShadow = true;

earthGroup.receiveShadow = true;
mercury.receiveShadow = true;
venus.receiveShadow = true;
mars.receiveShadow = true;
jupiter.receiveShadow = true;
uranus.receiveShadow = true;
neptune.receiveShadow = true;

/**
 * LIGHTS
 */

// Directional Light
const sunLight = new THREE.PointLight(0xffffff, 2, 0, 0); // color, intensity, distance (0 = unlimited)
sunLight.position.set(0, 0, 0);

sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 512; // Adjust for shadow quality
sunLight.shadow.mapSize.height = 512;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 5000;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.015);
scene.add(ambientLight, sunLight);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Planets
const planets = {
    mercury: mercury,
    venus: venusGroup,
    earth: earthGroup,
    mars: marsGroup,
    jupiter: jupiterGroup,
    saturn: saturnGroup,
    uranus: uranusGroup,
    neptune: neptuneGroup,
}
const moons = {
    moon: moon,
}

let selectedMoon = null;
let selectedPlanet = null;

saturnBtn.addEventListener('click', (event) => {
    selectedPlanet = event.target.textContent
    controls.target.copy(planets[selectedPlanet].position);
    controls.update();
})
moonBtn.addEventListener('click', (event) => {
    selectedMoon = event.target.textContent
})


// Resize
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
const clock = new THREE.Clock();

// Tick function 
function tick() {
    // Call tick again on the next frame
    window.requestAnimationFrame(tick);

    // Get elapsed time
    const elapsedTime = clock.getElapsedTime();

    // -----
    if (selectedPlanet) {
        camera.position.x = Math.cos(data.orbitSpeed[selectedPlanet] * elapsedTime) * data.distance[selectedPlanet]
        camera.position.z = Math.sin(data.orbitSpeed[selectedPlanet] * elapsedTime) * data.distance[selectedPlanet]
        camera.lookAt(planets[selectedPlanet].position);

    }
    if (selectedMoon){
        const worldPosition = new THREE.Vector3();
        const pos = moons[selectedMoon].getWorldPosition(worldPosition);
    
    camera.position.copy(pos);
    camera.position.z += 1
    camera.position.x -= 1
    camera.lookAt(pos);
    }
    /**
    }
    
     * 
     * Animate Objects
     * 
     *  */ 
    // Earth Orbit 
    earthGroup.position.x = Math.cos(data.orbitSpeed.earth * elapsedTime) * 150
    earthGroup.position.z = Math.sin(data.orbitSpeed.earth * elapsedTime) * 150

    // Mercury Orbit
    mercury.position.x = Math.cos(data.orbitSpeed.mercury * elapsedTime) * 58.5
    mercury.position.z = Math.sin(data.orbitSpeed.mercury * elapsedTime) * 58.5

    // Venus Orbit
    venusGroup.position.x = Math.cos(data.orbitSpeed.venus * elapsedTime) * 108
    venusGroup.position.z = Math.sin(data.orbitSpeed.venus * elapsedTime) * 108

    // Mars Orbit
    marsGroup.position.x = Math.cos(data.orbitSpeed.mars * elapsedTime) * 228
    marsGroup.position.z = Math.sin(data.orbitSpeed.mars * elapsedTime) * 228

    // Jupiter Orbit
    jupiterGroup.position.x = Math.cos(data.orbitSpeed.jupiter * elapsedTime) * 780
    jupiterGroup.position.z = Math.sin(data.orbitSpeed.jupiter * elapsedTime) * 780

    // Saturn Orbit
    saturnGroup.position.x = Math.cos(data.orbitSpeed.saturn * elapsedTime) * 1437
    saturnGroup.position.z = Math.sin(data.orbitSpeed.saturn * elapsedTime) * 1437

    // Uranus Orbit
    uranusGroup.position.x = Math.cos(data.orbitSpeed.uranus * elapsedTime) * 2883
    uranusGroup.position.z = Math.sin(data.orbitSpeed.uranus * elapsedTime) * 2883

    // Neptune Orbit
    neptuneGroup.position.x = Math.cos(data.orbitSpeed.neptune * elapsedTime) * 4507
    neptuneGroup.position.z = Math.sin(data.orbitSpeed.neptune * elapsedTime) * 4507


    // Earth Axis Rotation
    earth.rotation.y += data.angularSpeed.earth * (1 / 60);
    clouds.rotation.y += data.angularSpeed.earth * (1 / 60);
    lightMesh.rotation.y += data.angularSpeed.earth * (1 / 60);

    // Mercury Axis Rotation
    mercury.rotation.y += data.angularSpeed.mercury * (1 / 60);

    // Venus Axis Rotation
    venus.rotation.y += data.angularSpeed.venus * (1 / 60)
    venusAtmosphere.rotation.y += data.angularSpeed.venus * (1 / 60)


    // Moon Axis Rotation
    moon.rotation.y += data.angularSpeed.moon * (1 / 60)
    // Moon Orbit
    const orbitRadius = 4; // Example radius
    moon.position.x = Math.cos(data.orbitSpeed.moon * elapsedTime) * orbitRadius;
    moon.position.z = Math.sin(data.orbitSpeed.moon * elapsedTime) * orbitRadius;

    // Mars axis
    mars.rotation.y += data.angularSpeed.mars * (1 / 60)
    // Phobos orbit axis
    if (phobos){
        phobos.position.x = Math.cos(data.orbitSpeed.phobos * elapsedTime) * 2;
        phobos.position.z = Math.sin(data.orbitSpeed.phobos * elapsedTime) * 2;
        phobos.position.y = Math.sin(data.orbitSpeed.phobos * elapsedTime) * -1

        phobos.rotation.y += data.orbitSpeed.phobos * (1 / 60)
    }
    // Deimos orbit axis
    if (deimos){
        deimos.position.x = Math.cos(data.orbitSpeed.deimos * elapsedTime) * orbitRadius;
        deimos.position.z = Math.sin(data.orbitSpeed.deimos * elapsedTime) * orbitRadius;
        deimos.position.y = Math.sin(data.orbitSpeed.deimos * elapsedTime) * 0.5

        deimos.rotation.y += data.orbitSpeed.deimos * (1 / 60)
    }

    // Jupiter axis
    jupiter.rotation.y += data.angularSpeed.jupiter * (1 / 60)

    europa.position.x = Math.sin(data.orbitSpeed.europa * elapsedTime) * 35
    europa.position.z = Math.cos(data.orbitSpeed.europa * elapsedTime) * 35
    europa.position.y = Math.sin(data.orbitSpeed.europa * elapsedTime) * -12 

    callisto.position.x = Math.sin(data.orbitSpeed.callisto * elapsedTime) * 60
    callisto.position.z = Math.cos(data.orbitSpeed.callisto * elapsedTime) * 60
    callisto.position.y = Math.sin(data.orbitSpeed.callisto * elapsedTime) * 20 

    io.position.x = Math.sin(data.orbitSpeed.io * elapsedTime) * 20
    io.position.z = Math.cos(data.orbitSpeed.io * elapsedTime) * 20
    io.position.y = Math.sin(data.orbitSpeed.io * elapsedTime) * 10

    ganymede.position.x = Math.sin(data.orbitSpeed.ganymede * elapsedTime) * 50
    ganymede.position.z = Math.cos(data.orbitSpeed.ganymede * elapsedTime) * 50
    ganymede.position.y = Math.sin(data.orbitSpeed.ganymede * elapsedTime) * 35

    // Saturn axis
    saturn.rotation.y += data.angularSpeed.saturn * (1 / 60)

    titan.position.x = Math.sin(data.orbitSpeed.titan * elapsedTime) * 51
    titan.position.z = Math.cos(data.orbitSpeed.titan * elapsedTime) * 51
    titan.position.y = Math.sin(data.orbitSpeed.titan * elapsedTime) * 5

    rhea.position.x = Math.sin(data.orbitSpeed.rhea * elapsedTime) * 22
    rhea.position.z = Math.cos(data.orbitSpeed.rhea * elapsedTime) * 22
    rhea.position.y = Math.sin(data.orbitSpeed.rhea * elapsedTime) * 10

    lapetus.position.x = Math.sin(data.orbitSpeed.lapetus * elapsedTime) * 90
    lapetus.position.z = Math.cos(data.orbitSpeed.lapetus * elapsedTime) * 90
    lapetus.position.y = Math.sin(data.orbitSpeed.lapetus * elapsedTime) * 13

    dione.position.x = Math.sin(data.orbitSpeed.dione * elapsedTime) * 23
    dione.position.z = Math.cos(data.orbitSpeed.dione * elapsedTime) * 23
    dione.position.y = Math.sin(data.orbitSpeed.dione * elapsedTime) * -9

    tethys.position.x = Math.sin(data.orbitSpeed.tethys * elapsedTime) * 21
    tethys.position.z = Math.cos(data.orbitSpeed.tethys * elapsedTime) * 21
    tethys.position.y = Math.sin(data.orbitSpeed.tethys * elapsedTime) * 25

    // Uranus
    uranus.rotation.y += data.angularSpeed.uranus * (1 / 60)

    titania.position.x = Math.sin(data.orbitSpeed.titania * elapsedTime) * 16
    titania.position.z = Math.cos(data.orbitSpeed.titania * elapsedTime) * 16
    titania.position.y = Math.sin(data.orbitSpeed.titania * elapsedTime) * 5

    oberon.position.x = Math.sin(data.orbitSpeed.oberon * elapsedTime) * 21.5
    oberon.position.z = Math.cos(data.orbitSpeed.oberon * elapsedTime) * 21.5
    oberon.position.y = Math.sin(data.orbitSpeed.oberon * elapsedTime) * 12

    umbriel.position.x = Math.sin(data.orbitSpeed.umbriel * elapsedTime) * 9
    umbriel.position.z = Math.cos(data.orbitSpeed.umbriel * elapsedTime) * 9
    umbriel.position.y = Math.sin(data.orbitSpeed.umbriel * elapsedTime) * -3

    ariel.position.x = Math.sin(data.orbitSpeed.ariel * elapsedTime) * 7
    ariel.position.z = Math.cos(data.orbitSpeed.ariel * elapsedTime) * 7

    // Neptune
    neptune.rotation.y += data.angularSpeed.neptune * (1 / 60)

    triton.position.x = Math.sin(data.orbitSpeed.triton * elapsedTime) * 13
    triton.position.z = Math.cos(data.orbitSpeed.triton * elapsedTime) * 13
    triton.position.y = Math.sin(data.orbitSpeed.triton * elapsedTime) * -5

    // Render
    renderer.render(scene, camera);

    // Update controls
    controls.update();
}
tick();
