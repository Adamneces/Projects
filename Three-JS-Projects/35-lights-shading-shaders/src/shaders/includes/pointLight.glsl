vec3 pointLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower, vec3 position, float lightDecay)
{
    vec3 lightDelta = lightPosition - position;
    float lightDistance = length(lightDelta);

    vec3 lightDirection = normalize(lightDelta);
    vec3 lightReflection = reflect(-lightDirection, normal);

    // shading
    float shading = clamp(dot(normal, lightDirection), 0.0, 1.0);

    // specular
    float specular = - dot(lightReflection, viewDirection);
    specular = max(0.0, specular);
    specular = pow(specular, specularPower);

    // decay
    float decay = 1.0 - lightDistance * lightDecay;
    decay = max(0.0, decay);

    // return lightColor
    return lightColor * lightIntensity * decay * (shading + specular);
}