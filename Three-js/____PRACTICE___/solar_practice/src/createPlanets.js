import { createEarth } from "./Planets/earthGroup.js";
import { createMercury } from "./Planets/mercury.js";
import { createVenus } from "./Planets/venusGroup.js";
import { createMars } from "./Planets/marsGroup.js";
import { createJupiter } from "./Planets/jupiterGroup.js";
import { createSaturn } from "./Planets/saturnGroup.js";
import { createUranus } from "./Planets/uranusGroup.js";
import { createNeptune } from "./Planets/neptuneGroup.js";
import { createSun } from "./Planets/sun.js";

export const createAllPlanets = async (camera) => {
  const [earthGroup, earth, clouds, lightMesh, moon] = createEarth();
  const mercury = createMercury();
  const [venusGroup, venus, venusAtmosphere] = createVenus();
  const [marsGroup, mars, phobos, deimos] = await createMars();
  const [jupiterGroup, jupiter, io, callisto, ganymede, europa] = createJupiter();
  const [saturnGroup, saturn, titan, rhea, lapetus, dione, tethys] = createSaturn();
  const [uranusGroup, uranus, titania, oberon, umbriel, ariel] = createUranus();
  const [neptuneGroup, neptune, triton] = createNeptune();
  const [sun, sunGlow] = createSun(camera);

  return [earthGroup, earth, clouds, lightMesh, moon, mercury, venusGroup, venus, venusAtmosphere,
    marsGroup, mars, phobos, deimos, jupiterGroup, jupiter, io, callisto, ganymede, europa,
    saturnGroup, saturn, titan, rhea, lapetus, dione, tethys, uranusGroup, uranus, titania, oberon, umbriel, ariel,
    neptuneGroup, neptune, triton, sun, sunGlow
  ]
};
