let c;
let ambient, difuse, specular;
let x, y, z, vx, vy, vz;
let aLvl;

function preload(){
  ambient = readShader('./shaders/ambient.frag', 
                        {varyings: Tree.NONE });
  difuse = readShader('./shaders/difuse.frag',
                        {varyings: Tree.normal3 | Tree.position4});
}

function setup() {
  createCanvas(1000, 500, WEBGL);
  angleMode(DEGREES);
  colorMode(RGB, 1);
  noLights();
  
  aLvl = createSlider(0, 1, 0.5, 0.05);
  aLvl.style('width', '80px');
  aLvl.input(() => { 
    ambient.setUniform('ambient', aLvl.value());
    difuse.setUniform('ambient', aLvl.value()); 
  });
  shader(ambient);
  ambient.setUniform('ambient', aLvl.value());
  difuse.setUniform('ambient', aLvl.value());
  
  c = createCamera();
  
  c.camera(0, -100, 0);
  //c.lookAt(0, 0, 1);
  //c.frustum();

  x = 0;
  y = 0;
  z = 0;
  vx = 1;
  vy = 1;
  vz = 1;
}

function ejes(l){
  stroke(1);
  line(-l, 0, 0, l, 0, 0);
  line(0, -l, 0, 0, 0, 0);
  line(0, 0, -l, 0, 0, l);
}

function draw() {
  background(0);
  orbitControl();
  resetShader();
  push();
    fill(1,0,1, 0.1);  
    translate(x, y, z)
    
    rotateX(x);
    rotateY(y);
    rotateZ(z);
     
    sphere(5);
    /*push();
      ejes(20);
    pop();*/
    x = Math.sin(frameCount * 0.01) * 90;
    y = -Math.cos(frameCount * 0.01) - 90;
    z = Math.cos(frameCount * 0.03) * 90;
    vx = (Math.abs(x) >= 90)? -vx: vx;
    vy = (y <= -90 || y >= 0)? -vy: vy;
    vz = (Math.abs(z) >= 90)? -vz: vz;
    c.lookAt(x, y, z);
  pop();

  noStroke();
  //shader(ambient);
  shader(difuse);
  difuse.setUniform('uLightPosition', treeLocation(createVector(x, y, z), 
  { from: Tree.WORLD, to: Tree.EYE }).array());

  push();
    fill(1, 0, 0, 0.8);
    translate(-100, -100, 0);
    rotateY(90);
    plane(200, 200);
  pop();
  push();
    fill(0, 0, 1, 0.8);
    translate(100, -100, 0);
    rotateY(270);
    plane(200, 200);
  pop();
  push();
    fill(0, 0, 1, 0.8);
    translate(0, -100, -100);
    plane(200, 200);
  pop();
  
  push();
    fill(1, 0, 0, 0.8);
    translate(0, -100, 100);
    rotateY(180);
    plane(200, 200);
  pop();
  push();
    fill(1, 0, 0, 0.8);
    rotateX(90);
    plane(200, 200);
  pop();
  
  push();
    //shader(difuse);
    fill(0, 0, 1, 0.8);
    rotateX(270);
    translate(0, 0, -200);
    plane(200, 200);
  pop();
  
  
}
