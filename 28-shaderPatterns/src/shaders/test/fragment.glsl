varying vec2 vUv;

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
    float strength = step(0.8, mod(vUv.x * 10.0, 1.0));

    //pattern 11


    gl_FragColor = vec4(vec3(strength), 1.0);
}