import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { data2 } from "./data/data";
import { orbit, rotate, updateMoonRotations, updateMoonOrbit } from "./data/utilities";
import { info } from "./data/planetInfo.js";

import { createAllPlanets } from "./createPlanets.js";

// Elements
const canvas = document.querySelector("canvas.webgl");
const planetBtn = document.querySelectorAll(".heading");
const moonBtn = document.querySelectorAll(".moonGroup button");
const infoPanel = document.querySelector(".info-text");
const infoHeading = document.querySelector(".info-heading");

const loadingContainer = document.getElementById("loading-container");
const loadingBar = document.getElementById("progress-bar");

const aboutBtn = document.getElementById("about");
const homeBtn = document.getElementById("home");
const creditsBtn = document.getElementById("credits");

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// Loader
const textureLoader = new THREE.TextureLoader();

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Camera
const camera = new THREE.PerspectiveCamera( 65, sizes.width / sizes.height, 0.1, 4000);
camera.position.set(160, 2, 2);

// Clock
const clock = new THREE.Clock();
let lastUpdate = Date.now();

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Global variables
let selectedMoon = null;
let selectedPlanet = null;

const planetObject = {
  planets: {
    mercury: null,
    venus: null,
    venusAtmosphere: null,
    earth: null,
    mars: null,
    jupiter: null,
    saturn: null,
    uranus: null,
    neptune: null,
    sun: null,
    sunGlow: null,
  },
  moons: {
    moon: null,
    phobos: null,
    deimos: null,
    europa: null,
    callisto: null,
    io: null,
    ganymede: null,
    titan: null,
    rhea: null,
    lapetus: null,
    dione: null,
    tethys: null,
    titania: null,
    oberon: null,
    umbriel: null,
    ariel: null,
    triton: null,
  },
  groups: {
    mercury: null,
    venus: null,
    earth: null,
    mars: null,
    jupiter: null,
    saturn: null,
    uranus: null,
    neptune: null,
  },
};

// Initialize Function
async function initialize() {
  // Environment Map
  textureLoader.load("/textures/solar/milky-way.jpg", (envMap) => {
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = envMap;
  });
  scene.backgroundIntensity = 0.04;

  const [ earthGroup, earth, moon, mercury, venusGroup, venus, venusAtmosphere, marsGroup, mars, phobos, deimos, jupiterGroup, jupiter, io,
    callisto, ganymede, europa, saturnGroup, saturn, titan, rhea, lapetus, dione, tethys, uranusGroup, uranus, titania, oberon, umbriel, ariel,
    neptuneGroup, neptune,triton, sun, sunGlow ] = await createAllPlanets(camera, loadingBar);

  // Assign values to planetObject
  Object.assign(planetObject.planets, { mercury, venus, venusAtmosphere, earth, mars, jupiter, saturn, uranus, neptune, sun, sunGlow });
  Object.assign(planetObject.moons, { moon, phobos, deimos, europa, callisto, io, ganymede, titan, rhea, lapetus, dione, tethys, titania, oberon, umbriel, ariel, triton });
  Object.assign(planetObject.groups, { mercury: mercury, venus: venusGroup, earth: earthGroup, mars: marsGroup, jupiter: jupiterGroup, saturn: saturnGroup, uranus: uranusGroup, neptune: neptuneGroup });


  const planetsShadows = [ sun, earthGroup, mercury, venus, mars, jupiter, uranus, neptune, camera ];
  planetsShadows.forEach((planet) => {
    planet.receiveShadow = true;
    planet.castShadow = true;
  });

  // SunLight
  const sunLight = new THREE.PointLight(0xffffff, 2, 0, 0); // color, intensity, distance (0 = unlimited)
  sunLight.position.set(0, 0, 0);

  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 512; // Adjust for shadow quality
  sunLight.shadow.mapSize.height = 512;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 5000;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.015);

  // Add everything to the scene
  scene.add( ambientLight, sunLight, sun, sunGlow, earthGroup, mercury, venusGroup, marsGroup, jupiterGroup, saturnGroup, uranusGroup, neptuneGroup);

  // Event listeners for buttons
  setupEventListeners();

  // Start animation loop
  tick();
  loadingContainer.style.display = "none";
}

function setupEventListeners() {
  planetBtn.forEach((planet) => {
    planet.addEventListener("click", (event) => {
      if (selectedPlanet) {
        const moonToHide = document.getElementById(`${selectedPlanet}`);
        moonToHide.style.display = "none";

        const removeActiveClass = document.getElementById(
          `planet-${selectedPlanet}`
        );
        removeActiveClass.className = "heading";
      }

      if (selectedMoon) {
        const removeActiveClass = document.getElementById(
          `moon-${selectedMoon}`
        );
        removeActiveClass.className = "moons";
      }

      selectedMoon = null;
      selectedPlanet = event.target.textContent;

      infoHeading.textContent = `${selectedPlanet}`;
      infoHeading.style.textTransform = "uppercase";
      infoPanel.textContent = info[selectedPlanet];

      const active = document.getElementById(`planet-${selectedPlanet}`);
      active.className += " active";

      const moons = document.getElementById(`${selectedPlanet}`);
      moons.style.display = "flex";
    });
  });

  moonBtn.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (selectedMoon) {
        const removeActiveClass = document.getElementById(
          `moon-${selectedMoon}`
        );
        removeActiveClass.className = "moons";
      }
      selectedMoon = event.target.textContent;
      infoHeading.textContent = `${selectedMoon}`;
      infoHeading.style.textTransform = "uppercase";
      infoPanel.textContent = info[selectedMoon];

      const active = document.getElementById(`moon-${selectedMoon}`);
      active.className += " moon-active";
    });
  });

  aboutBtn.addEventListener("click", () => {
    infoHeading.textContent = "About this page";
    infoPanel.textContent = info["about"];
  });
  creditsBtn.addEventListener("click", () => {
    infoHeading.textContent = "Credits";
    infoPanel.innerHTML = "";
    infoPanel.textContent = info["credits"] + " ";

    const link = document.createElement("a");
    link.href = "https://www.solarsystemscope.com/textures/";
    link.textContent = "Solar System Scope";
    link.target = "_blank";
    link.className = "custom-link";

    infoPanel.appendChild(link);
  });

  homeBtn.addEventListener("click", () => {
    if (selectedPlanet) {
      const moonToHide = document.getElementById(`${selectedPlanet}`);
      moonToHide.style.display = "none";

      const removeActiveClass = document.getElementById(
        `planet-${selectedPlanet}`
      );
      removeActiveClass.className = "heading";
    }
    if (selectedMoon) {
      const removeActiveClass = document.getElementById(`moon-${selectedMoon}`);
      removeActiveClass.className = "moons";
    }

    infoHeading.textContent = "Solar system";
    infoPanel.textContent = info["info"];

    selectedPlanet = null;
    selectedMoon = null;

    controls.target.copy(new THREE.Vector3(0, 0, 0));
    controls.update();

    camera.position.set(158, 1, 1);
    camera.lookAt(earthGroup.position);
  });

  // Resize
  window.addEventListener("resize", () => {
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
}

// Tick Function
function tick() {
  window.requestAnimationFrame(tick);
  const elapsedTime = clock.getElapsedTime();

  let now = Date.now();
  let delta = (now - lastUpdate) / 1000;
  lastUpdate = now;

  if (selectedPlanet) {
    camera.position.x =
      Math.cos(data2[selectedPlanet].orbitSpeed * elapsedTime) *
      data2[selectedPlanet].distance;
    camera.position.z =
      Math.sin(data2[selectedPlanet].orbitSpeed * elapsedTime) *
        data2[selectedPlanet].distance +
      data2[selectedPlanet].cameraZ;
    camera.position.y = data2[selectedPlanet].cameraY;
    camera.lookAt(planetObject.groups[selectedPlanet].position);
  }
  if (selectedMoon) {
    const worldPosition = new THREE.Vector3();
    const pos = planetObject.moons[selectedMoon].getWorldPosition(worldPosition);

    camera.position.copy(pos);
    camera.position.z += 1;
    camera.position.x -= 1;
    camera.lookAt(pos);
  }

  rotate(planetObject.planets.earth, data2.earth.angularSpeed, delta);
  rotate(planetObject.moons.moon, data2.moon.angularSpeed, delta);
  rotate(planetObject.planets.mercury, data2.mercury.angularSpeed, delta);
  rotate(planetObject.planets.venus, data2.venus.angularSpeed, delta);
  rotate(planetObject.planets.venusAtmosphere, data2.venus.angularSpeed, delta);
  rotate(planetObject.planets.mars, data2.mars.angularSpeed, delta);
  rotate(planetObject.planets.jupiter, data2.jupiter.angularSpeed, delta);
  rotate(planetObject.planets.saturn, data2.saturn.angularSpeed, delta);
  rotate(planetObject.planets.uranus, data2.uranus.angularSpeed, delta);
  rotate(planetObject.planets.neptune, data2.neptune.angularSpeed, delta);

  // Phobos orbit axis
  if (planetObject.moons.phobos) {
    // moons.phobos = phobos;
    // marsGroup.add(phobos);
    orbit(planetObject.moons.phobos, 2, data2.phobos.orbitSpeed, elapsedTime);
    planetObject.moons.phobos.position.y = Math.sin(data2.phobos.orbitSpeed * elapsedTime) * -1;
    planetObject.moons.phobos.rotation.y += data2.phobos.orbitSpeed * (1 / 60);
  }
  // Deimos orbit axis
  if (planetObject.moons.deimos) {
    // moons.deimos = deimos;
    // marsGroup.add(deimos);
    orbit(planetObject.moons.deimos, 3, data2.deimos.orbitSpeed, elapsedTime);
    planetObject.moons.deimos.position.y = Math.sin(data2.deimos.orbitSpeed * elapsedTime) * 0.5;
    planetObject.moons.deimos.rotation.y += data2.deimos.orbitSpeed * (1 / 60);
  }

  updateMoonOrbit(planetObject.groups, data2, elapsedTime);
  updateMoonRotations(planetObject.moons, data2.restOfTheMoonsAngularSpeed, delta);
  updateMoonOrbit(planetObject.moons, data2, elapsedTime);

  // Render
  renderer.render(scene, camera);

  // Update controls
  controls.update();
}

initialize();