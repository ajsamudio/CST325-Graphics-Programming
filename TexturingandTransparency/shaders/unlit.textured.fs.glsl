precision mediump float;

uniform sampler2D uTexture;
uniform float uAlpha;

// todo #3 - receive texture coordinates and verify correctness by 
// using them to set the pixel color 

	varying vec2 interpolation;
	float v;
	float u;
	

void main(void) {
  u = interpolation.x;
	v = interpolation.y;
    // todo #5
    
      gl_FragColor = texture2D(uTexture,interpolation, uAlpha);


      gl_FragColor[3]=uAlpha;

    // todo #3
    gl_FragColor = vec4(u, v, 0.0, uAlpha);
}
