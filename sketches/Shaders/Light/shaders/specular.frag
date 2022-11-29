precision mediump float;

uniform float ambient;
uniform vec4 uMaterialColor;
// uLightPosition is given in eye space
uniform vec3 uLightPosition;
// both, normal3 and position4 are given in eye space as well
varying vec3 normal3;
varying vec4 position4;

uniform vec4 lightColor;
uniform float a;
uniform float b;
uniform float c;

void main() {
  vec3 direction3 = uLightPosition - position4.xyz;
  vec3 reflected3 = reflect(-direction3, normalize(normal3));
  float d = distance(uLightPosition, position4.xyz);
  // solve the diffuse light equation discarding negative values
  // see: https://thebookofshaders.com/glossary/?search=max
  // see: https://thebookofshaders.com/glossary/?search=dot
  
  float specular = max(0.0, dot(normalize(reflected3), normalize(-position4.xyz)));
  
  float aten =   1.0 / (a*d*d + b*d + c);
  gl_FragColor = (ambient + specular * aten) * uMaterialColor * lightColor;
}


