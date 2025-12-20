varying vec3 vPosition;
varying vec3 vNormal;

uniform float uTime;

#include random2D/random2D.glsl

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float glitchTime = uTime + modelPosition.y;
    float glitchStrengt = sin(glitchTime) + sin(glitchTime * 3.45) + sin(glitchTime * 8.76);
    glitchStrengt /= 3.0;
    glitchStrengt = smoothstep(0.3, 1.0, glitchStrengt);
    glitchStrengt *= 0.25;
    modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrengt;
    modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchStrengt;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    vPosition = modelPosition.xyz;
    vNormal = modelNormal.xyz;
}