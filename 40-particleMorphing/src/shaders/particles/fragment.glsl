uniform vec3 uFirstColor;
uniform vec3 uSecondColor;

varying vec3 vColor;
varying float vNoise;

void main()
{
    vec2 uv = gl_PointCoord;
    float distanceToCenter = length(uv - 0.5);
    float alpha = 0.05 / distanceToCenter - 0.1;
    vec3 color = mix(uFirstColor, uSecondColor, vNoise);

    gl_FragColor = vec4(color, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}