    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;


    attribute vec3 position;

    void main() {
        float fooBar = 0.1234;
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    }