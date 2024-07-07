import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

const earthTexture = textureLoader.load('textures/solar/earth/earth.jpg');
earthTexture.colorSpace = THREE.SRGBColorSpace;

// EARTH + MOON
const earthNormalTexture = textureLoader.load('textures/solar/earth/earth_normal.jpg');
const oceanTexture = textureLoader.load('textures/solar/earth/ocean.png');
const cloudsMap = textureLoader.load('textures/solar/earth/earth_clouds.jpg');
const earthNightLights = textureLoader.load('textures/solar/earth/earth_night.jpg');
const earthBumpMap = textureLoader.load('textures/solar/earth/earth_bumps.jpg');
const moonTexture = textureLoader.load('textures/solar/earth/moon.jpg')

// MERCURY
const mercuryTexture = textureLoader.load('textures/solar/mercury/mercury.jpg')
mercuryTexture.colorSpace = THREE.SRGBColorSpace

// VENUS
const venusTexture = textureLoader.load('textures/solar/venus/venus.jpg')
venusTexture.colorSpace = THREE.SRGBColorSpace

const venusAtmosphereTexture = textureLoader.load('textures/solar/venus/venus_atmosphere.jpg')

// JUPITER + MOONS
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

// MARS
const marsTexture = textureLoader.load('textures/solar/mars/mars.jpg')
marsTexture.colorSpace = THREE.SRGBColorSpace

// SATURN + MOONS
const saturnTexture = textureLoader.load('textures/solar/saturn/saturn.jpg')
saturnTexture.colorSpace = THREE.SRGBColorSpace

const saturnRingTexture = textureLoader.load('textures/solar/saturn/saturn_ring.png')
saturnRingTexture.colorSpace = THREE.SRGBColorSpace

const lapetusTexture = textureLoader.load('textures/solar/saturn/lapetus.jpg')
const rheaTexture = textureLoader.load('textures/solar/saturn/rhea.jpg')
const titanTexture = textureLoader.load('textures/solar/saturn/titan.jpg')
const tethysTexture = textureLoader.load('textures/solar/saturn/tethys.jpg')
const dioneTexture = textureLoader.load('textures/solar/saturn/dione.jpg')

// URANUS
const uranusTexture = textureLoader.load('textures/solar/uranus/uran.jpg')
uranusTexture.colorSpace = THREE.SRGBColorSpace

const titaniaTexture = textureLoader.load('textures/solar/uranus/titania.jpg')
const oberonTexture = textureLoader.load('textures/solar/uranus/oberon.jpg')
const umbrielTexture = textureLoader.load('textures/solar/uranus/umbriel.jpg')
const arielTexture = textureLoader.load('textures/solar/uranus/ariel.png')

// NEPTUNE
const neptuneTexture = textureLoader.load('textures/solar/neptune/neptun.jpg')
neptuneTexture.colorSpace = THREE.SRGBColorSpace

const tritonTexture = textureLoader.load('textures/solar/neptune/triton.jpg')

// SUN 
const sunTexture = textureLoader.load('textures/solar/sun/sun.jpg')
sunTexture.colorSpace = THREE.SRGBColorSpace

export const textures = {
    earth: {
        earthTexture,
        earthNormalTexture,
        oceanTexture,
        cloudsMap,
        earthNightLights,
        earthBumpMap,
        moonTexture,
    },
    mercury: {
        mercuryTexture,
    },
    venus: {
        venusTexture,
        venusAtmosphereTexture,
    },
    jupiter: {
        jupiterTexture,
        europaTexture,
        callistoTexture,
        ganymedeTexture,
        ioTexture,
    },
    mars: {
        marsTexture,
    },
    saturn: {
        saturnTexture,
        saturnRingTexture,
        lapetusTexture,
        rheaTexture,
        titanTexture,
        tethysTexture,
        dioneTexture,
    },
    uranus: {
        uranusTexture,
        titaniaTexture,
        oberonTexture,
        umbrielTexture,
        arielTexture,
    },
    neptune: {
        neptuneTexture,
        tritonTexture,
    },
    sun: {
        sunTexture,
    }
}