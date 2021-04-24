
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

    // todo - specular contribution
    // 1. in world space, calculate the direction from the surface point to the eye (normalized)
    // 2. in world space, calculate the reflection vector (normalized)
    // 3. calculate the phong term

    // todo - combine
    // 1. apply light and material interaction for diffuse value by using the texture color as the material
    // 2. apply light and material interaction for phong, assume phong material color is (0.3, 0.3, 0.3)


// todo - diffuse contribution
    // 1. normalize the light direction and store in a separate variable
    vec3 normalLight= normalize(vec3(uLightDirection));
    // 2. normalize the world normal and store in a separate variable
    vec3 normalWorld= normalize(vec3(vWorldNormal));
    // 3. calculate the lambert term
    float lambert= max(dot(normalWorld,normalLight),0.0);

    

    // todo - specular contribution
    // 1. in world space, calculate the direction from the surface point to the eye (normalized)
    vec3 eyeWorld= normalize(vec3(uCameraPosition-vWorldPosition));
    // 2. in world space, calculate the reflection vector (normalized)
    
    vec3 reflection= normalize(2.0*dot(normalWorld,normalLight)*normalWorld-normalLight);
    // 3. calculate the phong term
    float phong= pow(max(dot(reflection, eyeWorld),0.0),64.0);

    // todo - combine
    // 1. apply light and material interaction for diffuse value by using the texture color as the material
    // 2. apply light and material i

    vec3 albedo = texture2D(uTexture, vTexcoords).rgb;

    vec3 ambient = albedo * 0.1;
    vec3 diffuseColor = lambert * albedo;
    vec3 specularColor = phong * vec3(0.3,0.3,0.3);

    // add "diffuseColor" and "specularColor" when /ready
//   vec3 finalColor = ambient; // + diffuseColor + //specularColor;


 //   gl_FragColor = vec4(finalColor, 1.0);
//}
vec3 albedo = texture2D(uTexture, vTexcoords).rgb;

    vec3 ambient = albedo * 0.1;
    vec3 diffuseColor = lamburrito*albedo;
    vec3 specularColor = phong*vec3(0.3, 0.3, 0.3);

    // add "diffuseColor" and "specularColor" when ready
    vec3 finalColor = ambient+ diffuseColor + specularColor;

    gl_FragColor = vec4(finalColor, 1.0);