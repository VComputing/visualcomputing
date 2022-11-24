let ambient;
let x, y, z, vx, vy, vz;
let aLvl;

function preload(){
  ambient = readShader('./shaders/ambient.frag', 
                        {varyings: Tree.NONE });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
  colorMode(RGB, 1);
  noLights();
  aLvl = createSlider(0, 1, 0.5, 0.05);
  aLvl.style('width', '80px');
  aLvl.input(() => { ambient.setUniform('ambient', aLvl.value()) });
  shader(ambient);
  ambient.setUniform('ambient', aLvl.value());
  x = 0;
  y = 0;
  z = 0;
  vx = 1;
  vy = -1;
  vz = 2;
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
    ejes(100);
  pop();
  
  shader(ambient);
  
  push();
    noStroke();
    fill(0.5);
    rotateX(90);
    translate(0, 10, 0);
    plane(200, 200);
  pop();
  
  push();
    noStroke();
    fill(0,1,0);  
    translate(x, y, z);
    
    
    rotateX(x);
    rotateY(y);
    rotateZ(z);
    //ejes(20);
    //shader(ambient);  
    sphere(5);
    push();
      ejes(20);
    pop();
    x += vx;
    y += vy;
    z += vz;
    vx = (Math.abs(x) >= 100)? -vx: vx;
    vy = (y <= -100 || y >= 0)? -vy: vy;
    vz = (Math.abs(z) >= 100)? -vz: vz;
    
  pop();
}
