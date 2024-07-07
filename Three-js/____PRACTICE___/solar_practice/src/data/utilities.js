export function orbit(planet, distance, speed, elapsedTime, axisY){
    planet.position.x = Math.cos(speed * elapsedTime) * distance
    planet.position.z = Math.sin(speed * elapsedTime) * distance

    if (axisY){
        planet.position.y = Math.sin(speed * elapsedTime) * axisY
    }
}

export function rotate(planet, angularSpeed) {
    planet.rotation.y += angularSpeed * (1/60);
}
export function updateMoonRotations(moons, angularSpeed) {
    const rotationIncrement = angularSpeed * (1 / 60); // Assuming angularSpeed is in degrees per second

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