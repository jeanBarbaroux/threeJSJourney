#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
    cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
    cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main()
{
      //pattern3
//    float strength = vUv.x;

    //patern 4
//    float strength = vUv.y;

    //patern 5
//    float strength= 1.0 - vUv.y;

    //patern 6
//    float strength = vUv.y * 10.0;

    //patern 7
//    float strength = mod(vUv.y * 10.0, 1.0);

    //pattern 8
//    float strength = round(mod(vUv.y * 10.0, 1.0));

    //pattern 9
//    float strength = step(0.8, mod(vUv.y * 10.0, 1.0));

    //pattern 10
//    float strength = step(0.8, mod(vUv.x * 10.0, 1.0));

    //pattern 11
//    float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
//    strength += step(0.8, mod(vUv.y * 10.0, 1.0));

    //pattern 12
//    float strength = step(0.8, mod(vUv.y * 10.0, 1.0));
//    strength *= step(0.8, mod(vUv.x * 10.0, 1.0));

    //pattern 13
//    float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
//    barX *= step(0.8, mod(vUv.y * 10.0, 1.0));
//    float barY = step(0.8, mod(vUv.x * 10.0, 1.0));
//    barY *= step(0.4, mod(vUv.y * 10.0, 1.0));
//    float stregth = barX + barY;

    //pattern 14
//    float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
//    barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));
//    float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
//    barY *= step(0.4, mod(vUv.y * 10.0, 1.0));
//    float strength = barX + barY;

    //pattern 16
    //float strength = abs(vUv.x - 0.5);

    //pattern 17
//    float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    //pattern 18
    //float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    //pattern 19
//    float strength = step(0.2,max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    //pattern 20
//    float square1 = step(0.2,max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
//    float square2 = 1.0 - step(0.25,max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
//    float strength = square1 * square2;

    //pattern 21
//    float strength = floor(vUv.x * 10.0) / 10.0;

    //pattern 22
//    float strength = floor(vUv.x * 10.0) / 10.0;
//    strength *= floor(vUv.y * 10.0) / 10.0;

    //pattern 23
    //float strength = random(vUv);

    //pattern 24
//    vec2 pattern = vec2(
//        floor(vUv.x * 10.0) / 10.0,
//        floor(vUv.y * 10.0) / 10.0
//    );
//    float strength = random(pattern);

    //pattern 25
//    vec2 pattern = vec2(
//        floor(vUv.x * 10.0) / 10.0,
//        floor((vUv.y + vUv.x * 0.5) * 10.0) / 10.0
//    );
//    float strength = random(pattern);

    //pattern 26
//    float strength = length(vUv) ;

    //pattern 27
//    float strength = length(vec2(vUv.x - 0.5, vUv.y - 0.5));
//     ou
//    float strength = distance(vUv, vec2(0.5));

    //pattern 28
//    float strength = 1.0 - distance(vUv, vec2(0.5));

    //pattern 29
//    float strength = 0.015 / distance(vUv, vec2(0.5));

    //pattern 30
//    float strength = 0.15 / distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5));

    //pattern 31
//    float strength = 0.15 / distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5));
//    strength *= 0.15 / distance(vec2((vUv.x - 0.5) * 5.0 + 0.5, vUv.y), vec2(0.5));

    //pattern 32
//    vec2 rotatedUV = rotate(vUv, PI * 0.25, vec2(0.5));
//    vec2 lightUvX = vec2(rotatedUV.x * 0.1 + 0.45, rotatedUV.y * 0.5 + 0.25);
//    float lightX = 0.015 / distance(lightUvX, vec2(0.5));
//
//    vec2 lightUvY = vec2(rotatedUV.y * 0.1 + 0.45, rotatedUV.x * 0.5 + 0.25);
//    float lightY = 0.015 / distance(lightUvY, vec2(0.5));
//
//    float strength = lightX * lightY;

    //pattern 33
//    float strength = step(0.3,distance(vUv, vec2(0.5)));

    //pattern 34
//    float strength = abs(distance(vUv, vec2(0.5)) - 0.25);

    //pattern 35
//    float strength = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    //pattern 36
    float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    gl_FragColor = vec4(vec3(strength), 1.0);
}