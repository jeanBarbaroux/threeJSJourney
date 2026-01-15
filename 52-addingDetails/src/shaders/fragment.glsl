uniform vec3 uBaseColor;
uniform float uTime;
uniform float uSpeed;
uniform float uStrength;
uniform float uDistance;

varying vec2 vUv;

#include includes/simplexNoise2d.glsl

void main()
{
    // Displace the UV
    vec2 displacedUv = vUv + cnoise(vec3(vUv * uStrength, uTime * .1 * uSpeed));

    // Perlin noise
    float strength = cnoise(vec3(displacedUv * uStrength, uTime * .2 * uSpeed));


    float outerGlow = distance(vUv, vec2(0.5)) * uStrength - uDistance;
    strength += outerGlow;

    vec3 color = mix(vec3(0.), uBaseColor, strength);

    gl_FragColor = vec4(color, strength);
}