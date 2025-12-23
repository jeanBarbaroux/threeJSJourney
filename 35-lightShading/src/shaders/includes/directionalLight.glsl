vec3 directiolanLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower) {
    vec3 lightDirection = normalize(lightPosition);
    float shading = max(0.0, dot(normal, lightDirection));
    vec3 lightReflection = reflect(-lightDirection, normal);
    float specular =  max(0.0,-dot(lightReflection, viewDirection));
    specular = pow(specular, specularPower);
    return lightColor * lightIntensity * (shading + specular);
}
