'use strict'

var gl;

var appInput = new Input();
var time = new Time();
var camera = new FlyCamera(appInput);

// var sphereGeometry = null; // this will be created after loading from a file
var groundGeometry = null;
var particleSystemGeometry = null;

var projectionMatrix = new Matrix4();

// the shader that will be used by each piece of geometry (they could each use their own shader but in this case it will be the same)
var colorProgram;
var particleProgram;

// auto start the app when the html page is ready
window.onload = window['initializeAndStartRendering'];

// we need to asynchronously fetch files from the "server" (your local hard drive)
var loadedAssets = {
    phongTextVS: null, phongTextFS: null,
    unlitColorVS: null, unlitColorFS: null,
    unlitColorBillboardVS: null, unlitColorBillboardFS: null,
    particeImage: null
};

// -------------------------------------------------------------------------
function initializeAndStartRendering() {
    initGL();
    loadAssets(function() {
        createShaders(loadedAssets);
        createScene();

        camera.position.set(0, 1, 10);

        updateAndRender();
    });
}

// -------------------------------------------------------------------------
function initGL(canvas) {
    var canvas = document.getElementById("webgl-canvas");

    try {
        gl = canvas.getContext("webgl");
        gl.canvasWidth = canvas.width;
        gl.canvasHeight = canvas.height;

        gl.enable(gl.DEPTH_TEST);
    } catch (e) {}

    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

// -------------------------------------------------------------------------
function loadAssets(onLoadedCB) {
    var filePromises = [
        fetch('./shaders/color.unlit.vs.glsl').then((response) => { return response.text(); }),
        fetch('./shaders/color.unlit.fs.glsl').then((response) => { return response.text(); }),
        fetch('./shaders/particle.vs.glsl').then((response) => { return response.text(); }),
        fetch('./shaders/particle.fs.glsl').then((response) => { return response.text(); }),
        loadImage('./data/particle.png')
    ];

    Promise.all(filePromises).then(function(values) {
        // Assign loaded data to our named variables
        loadedAssets.unlitColorVS = values[0];
        loadedAssets.unlitColorFS = values[1];
        loadedAssets.unlitColorBillboardVS = values[2];
        loadedAssets.unlitColorBillboardFS = values[3];
        loadedAssets.particeImage = values[4];
    }).catch(function(error) {
        console.error(error.message);
    }).finally(function() {
        onLoadedCB();
    });
}

// -------------------------------------------------------------------------
function createShaders(loadedAssets) {
    colorProgram = createCompiledAndLinkedShaderProgram(loadedAssets.unlitColorVS, loadedAssets.unlitColorFS);
    gl.useProgram(colorProgram);

    colorProgram.attributes = {
        vertexPositionAttribute: gl.getAttribLocation(colorProgram, "aVertexPosition"),
        vertexColorsAttribute: gl.getAttribLocation(colorProgram, "aVertexColor"),
    };

    colorProgram.uniforms = {
        worldMatrixUniform: gl.getUniformLocation(colorProgram, "uWorldMatrix"),
        viewMatrixUniform: gl.getUniformLocation(colorProgram, "uViewMatrix"),
        projectionMatrixUniform: gl.getUniformLocation(colorProgram, "uProjectionMatrix"),
        colorUniform: gl.getUniformLocation(colorProgram, "uColor")
    };

    particleProgram = createCompiledAndLinkedShaderProgram(loadedAssets.unlitColorBillboardVS, loadedAssets.unlitColorBillboardFS);
    gl.useProgram(particleProgram, loadedAssets.particeImage);

    particleProgram.attributes = {
        vertexPositionAttribute: gl.getAttribLocation(particleProgram, "aVertexPosition"),
        vertexColorAttribute: gl.getAttribLocation(particleProgram, "aVertexColor"),
    };

    particleProgram.uniforms = {
        worldMatrixUniform: gl.getUniformLocation(particleProgram, "uWorldMatrix"),
        viewMatrixUniform: gl.getUniformLocation(particleProgram, "uViewMatrix"),
        projectionMatrixUniform: gl.getUniformLocation(particleProgram, "uProjectionMatrix"),
        colorUniform: gl.getUniformLocation(particleProgram, "uColor"),
        textureUniform: gl.getUniformLocation(particleProgram, "uTexture"),
    };
}

// -------------------------------------------------------------------------
function createScene() {
    groundGeometry = new WebGLGeometryQuad(gl);
    groundGeometry.create();

    var scale = new Matrix4().scale(10.0, 10.0, 10.0);

    // compensate for the model being flipped on its side
    var rotation = new Matrix4().setRotationX(-90);

    groundGeometry.worldMatrix.setIdentity();
    groundGeometry.worldMatrix.multiplyRightSide(rotation);
    groundGeometry.worldMatrix.multiplyRightSide(scale);

    particleSystemGeometry = new WebGLGeometryParticles(gl, 1000);
    particleSystemGeometry.create(loadedAssets.particeImage);

    // raise it by the radius to make it sit on the ground
    particleSystemGeometry.worldMatrix.translate(0, 1, 0);
}

// -------------------------------------------------------------------------
function updateAndRender() {
    requestAnimationFrame(updateAndRender);

    var aspectRatio = gl.canvasWidth / gl.canvasHeight;

    time.update();
    camera.update(time.deltaTime);

    var cosTime = Math.cos(time.secondsElapsedSinceStart);
    var sinTime = Math.sin(time.secondsElapsedSinceStart);

    // specify what portion of the canvas we want to draw to (all of it, full width and height)
    gl.viewport(0, 0, gl.canvasWidth, gl.canvasHeight);

    // this is a new frame so let's clear out whatever happened last frame
    gl.clearColor(0.707, 0.707, 1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    projectionMatrix.setPerspective(45, aspectRatio, 0.1, 1000);

    gl.useProgram(colorProgram);
    gl.uniform4f(colorProgram.uniforms.colorUniform, 0.5, 0.5, 0.5, 1.0);
    groundGeometry.render(camera, projectionMatrix, colorProgram);

    gl.useProgram(particleProgram);
    gl.uniform4f(particleProgram.uniforms.colorUniform, 1.0, 1.0, 0.5, 1.0);
    particleSystemGeometry.update(time.deltaTime, time.secondsElapsedSinceStart);
    particleSystemGeometry.render(camera, projectionMatrix, particleProgram);
}
