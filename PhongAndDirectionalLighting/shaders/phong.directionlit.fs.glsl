precision mediump float;

uniform vec3 uLightDirection;
uniform vec3 uCameraPosition;
uniform sampler2D uTexture;

varying vec2 vTexcoords;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;

void main(void) {
    // todo - diffuse contribution
    // 1. normalize the light direction and store in a separate variable
    // 2. normalize the world normal and store in a separate variable
    // 3. calculate the lambert term

    vec3 light = normalize(vec3(uLightDirection));
    vec3 world = normalize(vec3(vWorldNormal));
    //float lamb = (dot(world, light), 0.0);
    float lamb = max(dot(world, light), 0.0);

    // todo - specular contribution
    // 1. in world space, calculate the direction from the surface point to the eye (normalized)
    // 2. in world space, calculate the reflection vector (normalized)
    // 3. calculate the phong term

    //vec3 eyeStuff = normalize(vec3(vWorldPosition-uCameraPosition));
    vec3 eyeStuff = normalize(vec3(uCameraPosition-vWorldPosition));
    vec3 vecReflection = normalize(3.0*dot(world,light)* world-light);
    float phong = pow(max(dot(vecReflection, eyeStuff),0.0), 64.0);
    // todo - combine
    // 1. apply light and material interaction for diffuse value by using the texture color as the material
    // 2. apply light and material interaction for phong, assume phong material color is (0.3, 0.3, 0.3)


    vec3 albedo = texture2D(uTexture, vTexcoords).rgb;

    vec3 ambient = albedo * 0.1;

    vec3 diffuseColor = albedo * lamb;
    vec3 specularColor = phong*vec3(0.3, 0.3, 0.3);

    // add "diffuseColor" and "specularColor" when ready
    
    vec3 finalColor = ambient + diffuseColor + specularColor;

    gl_FragColor = vec4( finalColor, 1.0);
}
