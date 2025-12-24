
vec3 pointLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower, vec3 position, float lightDecay) {
    vec3 lightDelta = lightPosition - position;
    float lightDistance = length(lightDelta);
    vec3 lightDirection = normalize(lightDelta);
    float shading = max(0.0, dot(normal, lightDirection));
    vec3 lightReflection = reflect(-lightDirection, normal);
    float specular =  max(0.0,-dot(lightReflection, viewDirection));
    specular = pow(specular, specularPower);
    float decay = max(0.0,1.0 - lightDistance * lightDecay);

    return lightColor * lightIntensity * (shading + specular) * decay;
}