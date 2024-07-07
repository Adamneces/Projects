import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

import { data } from "./data/data"; 
import { orbit, rotate, updateMoonRotations } from "./data/utilities";
import {info} from "./data/planetInfo.js"

import { createAllPlanets } from "./createPlanets.js";

// GUI
const gui = new GUI();

// Elements
const canvas = document.querySelector("canvas.webgl");
const planetBtn = document.querySelectorAll(".heading");
const moonBtn = document.querySelectorAll(".moonGroup button"); 
const infoPanel = document.querySelector(".info-text")
const infoHeading = document.querySelector(".info-heading");

const loadingContainer = document.getElementById('loading-container');
const loadingBar = document.getElementById('loading-bar');

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};
// loader
const textureLoader = new THREE.TextureLoader();

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
 * Camera
 * */
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 4000);
camera.position.set(160,2,2)

/**
 * OBJECTS
 */

const [earthGroup, earth, clouds, lightMesh, moon, mercury, venusGroup, venus, venusAtmosphere,
    marsGroup, mars, phobos, deimos, jupiterGroup, jupiter, io, callisto, ganymede, europa,
    saturnGroup, saturn, titan, rhea, lapetus, dione, tethys, uranusGroup, uranus, titania, oberon, umbriel, ariel,
    neptuneGroup, neptune, triton, sun, sunGlow] = await createAllPlanets(camera);


scene.add(sun, sunGlow, earthGroup, mercury, venusGroup, marsGroup, jupiterGroup, saturnGroup, uranusGroup, neptuneGroup)

// Planet shadows
const planetsShadows = [sun, earthGroup, mercury, venus, mars, jupiter, uranus, neptune, camera];
planetsShadows.forEach(planet => {
    planet.receiveShadow = true;
    planet.castShadow = true;
});

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
    moon,
    phobos: null,
    deimos: null,
    europa,
    callisto,
    io,
    ganymede,
    titan,
    rhea,
    lapetus,
    dione,
    tethys,
    titania,
    oberon,
    umbriel,
    ariel,
    triton
    
}

let selectedMoon = null;
let selectedPlanet = null;

planetBtn.forEach(planet => {
    planet.addEventListener('click', (event) => {

        if (selectedPlanet){
            const moonToHide = document.getElementById(`${selectedPlanet}`)
            moonToHide.style.display = 'none';
    
            const removeActiveClass = document.getElementById(`planet-${selectedPlanet}`);
            removeActiveClass.className = 'heading'
        }
    
        if (selectedMoon){
            const removeActiveClass = document.getElementById(`moon-${selectedMoon}`);
            removeActiveClass.className = 'moons'
        }
    
        selectedMoon = null;
        selectedPlanet = event.target.textContent
    
        infoHeading.textContent = `${selectedPlanet}`
        infoHeading.style.textTransform = "uppercase"
        infoPanel.textContent = info[selectedPlanet];
    
        controls.target.copy(planets[selectedPlanet].position);
        controls.update();
    
        const active = document.getElementById(`planet-${selectedPlanet}`);
        active.className += ' active'
    
        const moons = document.getElementById(`${selectedPlanet}`);
        moons.style.display = 'flex';
    })
})

moonBtn.forEach(button => {
    button.addEventListener('click', (event) => {
        if (selectedMoon){
            const removeActiveClass = document.getElementById(`moon-${selectedMoon}`);
            removeActiveClass.className = 'moons'
        }
        selectedMoon = event.target.textContent;
        infoHeading.textContent = `${selectedMoon}`
        infoHeading.style.textTransform = "uppercase"
        infoPanel.textContent = info[selectedMoon];

    const active = document.getElementById(`moon-${selectedMoon}`);
    active.className += ' moon-active'
    });
});

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
        if (selectedPlanet === 'saturn'){
            camera.position.y = 7
        }else{
            camera.position.y = 2
        }
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

    // Orbit rotation
    orbit(earthGroup, 150, data.orbitSpeed.earth, elapsedTime);
    orbit(mercury, 58.5, data.orbitSpeed.mercury, elapsedTime);
    orbit(venusGroup, 108, data.orbitSpeed.venus, elapsedTime);
    orbit(marsGroup, 228, data.orbitSpeed.mars, elapsedTime);
    orbit(jupiterGroup, 780, data.orbitSpeed.jupiter, elapsedTime);
    orbit(saturnGroup, 1437, data.orbitSpeed.saturn, elapsedTime);
    orbit(uranusGroup, 2883, data.orbitSpeed.uranus, elapsedTime);
    orbit(neptuneGroup, 4507, data.orbitSpeed.neptune, elapsedTime);

    orbit(moon, 4, data.orbitSpeed.moon, elapsedTime);

    // Axis Rotation
    rotate(earth, data.angularSpeed.earth);
    rotate(clouds, data.angularSpeed.earth);
    rotate(lightMesh, data.angularSpeed.earth);
    rotate(moon, data.angularSpeed.moon);

    rotate(mercury, data.angularSpeed.mercury);

    rotate(venus, data.angularSpeed.venus);
    rotate(venusAtmosphere, data.angularSpeed.venus);

    rotate(mars, data.angularSpeed.mars);

    rotate(jupiter, data.angularSpeed.jupiter);

    rotate(saturn, data.angularSpeed.saturn);

    rotate(uranus, data.angularSpeed.uranus);

    rotate(neptune, data.angularSpeed.neptune);
    
    // Phobos orbit axis
    if (phobos){
        moons.phobos = phobos
        marsGroup.add(phobos)
        orbit(phobos, 2, data.orbitSpeed.phobos, elapsedTime);
        phobos.position.y = Math.sin(data.orbitSpeed.phobos * elapsedTime) * -1

        phobos.rotation.y += data.orbitSpeed.phobos * (1 / 60)
    }
    // Deimos orbit axis
    if (deimos){
        moons.deimos = deimos
        marsGroup.add(deimos)
        orbit(deimos, 3, data.orbitSpeed.deimos, elapsedTime);
        deimos.position.y = Math.sin(data.orbitSpeed.deimos * elapsedTime) * 0.5

        deimos.rotation.y += data.orbitSpeed.deimos * (1 / 60)
    }

    orbit(europa, 35, data.orbitSpeed.europa, elapsedTime, -12);
    orbit(callisto, 60, data.orbitSpeed.callisto, elapsedTime, 20);
    orbit(io, 20, data.orbitSpeed.io, elapsedTime, 10);
    orbit(ganymede, 50, data.orbitSpeed.ganymede, elapsedTime, 35);

    orbit(titan, 51, data.orbitSpeed.titan, elapsedTime, 5);
    orbit(rhea, 22, data.orbitSpeed.rhea, elapsedTime, 10);
    orbit(lapetus, 90, data.orbitSpeed.lapetus, elapsedTime, 13);
    orbit(dione, 23, data.orbitSpeed.dione, elapsedTime, -9);
    orbit(tethys, 21, data.orbitSpeed.tethys, elapsedTime, 25);

    orbit(titania, 16, data.orbitSpeed.titania, elapsedTime, 5);
    orbit(oberon, 21.5, data.orbitSpeed.oberon, elapsedTime, 12);
    orbit(umbriel, 9, data.orbitSpeed.umbriel, elapsedTime, -3);
    orbit(ariel, 7, data.orbitSpeed.ariel, elapsedTime, 1);

    orbit(triton, 13, data.orbitSpeed.triton, elapsedTime, 5);

    // Rest of the moons axis
    updateMoonRotations(moons, data.angularSpeed.otherMoons);

    // Render
    renderer.render(scene, camera);

    // Update controls
    controls.update();
}
tick();
