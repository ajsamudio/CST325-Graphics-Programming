'use strict'

var gl;

var appInput = new Input();
var time = new Time();
var camera = new OrbitCamera(appInput); // used to create the view matrix for our normal "eye"
var lightCamera = new Camera();         // used to create the view matrix for our light's point of view

var teapotGeometry = null;
var groundGeometry = null;

// the projection from our normal eye's view space to its clip space
var projectionMatrix = new Matrix4();

// the projection from the light's view space to its clip space
var shadowProjectionMatrix = new Matrix4();

// although our light will be a directional light, we need to render depth from its point of view starting somewhere relatively close
var lightPos = new Vector4(5, 3, 0, 1);
var directionToLight = new Vector4(lightPos.x, lightPos.y, lightPos.z, 0).normalize();

// the shader used to render depth values from the light's point of view
var depthWriteProgram;

// the shader program used to apply phong shading (will include shadow test)
var phongShaderProgram;

// variables holding references to things we need to render to an offscreen texture
var fbo;
var renderTexture;
var renderBuffer;

window.onload = window['initializeAndStartRendering'];

var loadedAssets = {
    phongTextVS: null, phongTextFS: null,
    depthWriteVS: null, depthWriteFS: null,
    teapotJSON: null,
    marbleImage: null,
    woodImage: null
};
