let uMaterial1, uMaterial2;
let blendShader;
let c1, c2;

function preload(){
  blendShader = readShader('shaders/blend.frag',
                          { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  colorMode(RGB, 1);
  c1 = createColorPicker(color(1, 1, 0, 0));
  c1.position(0, 0);
  c2 = createColorPicker(color(0, 1, 1, 0));
  c2.position(width / 2, 0);
  //shader(blendShader)
}

function draw() {
  background(0);
  resetShader();
  u1 = c1.color();
  u2 = c2.color();
  fill(u1);
  square(-width /2, -height/2 + 20, width / 2);
  resetShader();
  fill(u2);
  square(0, -height/2 + 20, width / 2);
  //shader(blendShader);
  blendShader.setUniform('uMaterial1', [red(u1), green(u1), blue(u1), 0]);
  blendShader.setUniform('uMaterial2', [red(u2), green(u2), blue(u2), 0]);
  
  //rect(0, height / 2, width, height);
  circle(0, 60, 50);
}
