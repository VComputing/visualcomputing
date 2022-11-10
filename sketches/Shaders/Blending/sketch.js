let uMaterial1, uMaterial2;
let blendShader;
let c1, c2;

function preload(){
  blendShader = readShader('shaders/blend.frag',
                          { matrices: Tree.NONE, varyings: Tree.color4 });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  c1 = createColorPicker(color(255, 0, 0, 0));
  c1.position(0, 0);
  c2 = createColorPicker(color(0, 255, 0, 0));
  c2.position(width / 2, 0);
  shader(blendShader)
}

function draw() {
  background(0);
  uMaterial1 = c1.color();
  uMaterial2 = c2.color();
  fill(uMaterial1);
  square(-width /2, -height/2 + 20, width / 2);
  fill(uMaterial2);
  square(0, -height/2 + 20, width / 2);
  
  blendShader.setUniform('uMaterial1', [255, 0, 0, 0]);
  blendShader.setUniform('uMaterial2', [0, 255, 0, 0]);
  //shader(blendShader);
  rect(-width/2, 10, width, height/2)
}
