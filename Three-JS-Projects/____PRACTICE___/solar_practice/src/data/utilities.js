export function orbit(planet, distance, speed, elapsedTime, axisY){
    planet.position.x = Math.cos(speed * elapsedTime) * distance 
    planet.position.z = Math.sin(speed * elapsedTime) * distance 

    if (axisY){
        planet.position.y = Math.sin(speed * elapsedTime) * axisY
    }
}

export function rotate(planet, angularSpeed, delta) {
    planet.rotation.y += angularSpeed * delta;
}
export function updateMoonRotations(moons, angularSpeed, delta) {
    const rotationIncrement = angularSpeed * delta; 

    for (const moonName in moons) {
        if (moons.hasOwnProperty(moonName)) {
            const moon = moons[moonName];
            // Exclude moon, phobos, and deimos
            if (moonName !== 'moon' && moonName !== 'phobos' && moonName !== 'deimos') {
                if (moon && moon.rotation) {
                    moon.rotation.y += rotationIncrement;
                }
            }
        }
    }
}
export function updatePlanetRotation(planets, data) {
    for (planet in planets){
        rotate(planet, data[planet].angular)
    }
}
export function updateMoonOrbit(moons, data, elapsedTime){
    for (const moonName in moons) {
        const moon = moons[moonName];
        if (moon && moonName !== "phobos" && moonName !== "deimos") {
            if (data[moonName]) {
                // Check if `y` exists in data[moonName], indicating it's a moon
                if (data[moonName].hasOwnProperty('y')) {
                    orbit(moon, data[moonName].radius, data[moonName].orbitSpeed, elapsedTime, data[moonName].y);
                } else {
                    // Planet case
                    orbit(moon, data[moonName].radius, data[moonName].orbitSpeed, elapsedTime);
                }
            } else {
                console.error(`Data for ${moonName} not found`);
            }
        }
    }
}