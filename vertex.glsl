precision mediump float;

attribute vec3 vPosition;
attribute vec3 vColor;
attribute vec3 vNormal;

varying vec3 fColor;
varying vec3 fNormal;
varying vec3 fPosition;

uniform float theta;
uniform float scaleX;
uniform float scaleY;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

void main(){

    vec3 translasi = vec3(-0.5, 0.5, 0.0);

    mat4 matrixTranslasi = mat4(
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        translasi, 1.0
    );

    mat4 matrixRotasi = mat4(
        cos(theta), sin(theta), 0.0, 0.0,
        -sin(theta), cos(theta), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    );

    mat4 matrixSkalasi = mat4(
        scaleX, 0.0, 0.0, 0.0,
        0.0, scaleY, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    );
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vPosition, 1.0);

    fColor = vColor;
    fNormal = normalize(normalMatrix * vNormal);
    fPosition = vec3(modelMatrix * vec4(vPosition, 1.0));
}