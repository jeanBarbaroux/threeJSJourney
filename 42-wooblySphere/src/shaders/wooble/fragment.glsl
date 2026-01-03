uniform vec3 uColorA;
uniform vec3 uColorB;

varying float vWobble;

void main() {
    float colorMix = smoothstep(-1.0, 1.0, vWobble);
    vec3 color = mix(uColorA, uColorB, colorMix);
    csm_DiffuseColor.rgb = color;

//    //mirror step
//    csm_Metalness = step(0.25, vWobble);
//    csm_Roughness = 1.0 - csm_Metalness;

    //shiny tip
    csm_Roughness = 1.0 - colorMix;
}