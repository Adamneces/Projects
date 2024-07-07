vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower)
{
    vec3 lightDirection = normalize(lightPosition);
    vec3 lightReflection = reflect(-lightDirection, normal);

    // shading
    float shading = clamp(dot(normal, lightDirection), 0.0, 1.0);

    // specular
    float specular = - dot(lightReflection, viewDirection);
    specular = max(0.0, specular);
    specular = pow(specular, specularPower);

    // return lightColor
    return lightColor * lightIntensity * shading + (lightColor * lightIntensity * specular);
}