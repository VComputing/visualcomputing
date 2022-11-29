let cam;
let ambient, difuse, specular;
let x, y, z, vy;
let aLvl, aClr;
let a, b, c;
let u1, cols, c1, c2; 

function preload(){
  ambient = readShader('/visualcomputing/sketches/Shaders/Light/shaders/ambient.frag', 
                        {varyings: Tree.NONE });
  difuse = readShader('/visualcomputing/sketches/Shaders/Light/shaders/difuse.frag',
                        {varyings: Tree.normal3 | Tree.position4});
  specular = readShader('/visualcomputing/sketches/Shaders/Light/shaders/specular.frag',
                        {varyings: Tree.normal3 | Tree.position4});
}

function setup() {
  createCanvas(575, 400, WEBGL);
  angleMode(DEGREES);
  colorMode(RGB, 1);
  noLights();
  
  aLvl = createSlider(0, 1, 0.5, 0.05);
  aClr = createColorPicker(color(1, 1, 0, 0));
  a = createSlider(0, 1, 0.0, 0.05);
  b = createSlider(0, 1, 0.0, 0.05);
  c = createSlider(0, 1, 1.0, 0.05);
  c1 = createColorPicker(color(1, 1, 0, 1));
  c2 = createColorPicker(color(1, 0, 1, 0));

  aLvl.style('width', '80px'); 
  aClr.style('width', '80px');
  a.style('width', '80px'); 
  b.style('width', '80px'); 
  c.style('width', '80px');
  c1.style('width', '80px');
  c2.style('width', '80px');

  shader(ambient);
  shader(difuse);
  shader(specular);
  aLvl.input(() => { 
    ambient.setUniform('ambient', aLvl.value());
    difuse.setUniform('ambient', aLvl.value());
    specular.setUniform('ambient', aLvl.value()); 
  });
  aClr.input(() => {
    u1 = aClr.color();
    ambient.setUniform('lightColor', [red(u1), green(u1), blue(u1), 1.0]);
    difuse.setUniform('lightColor', [red(u1), green(u1), blue(u1), 1.0]);
    specular.setUniform('lightColor', [red(u1), green(u1), blue(u1), 1.0]);
  });
  ambient.setUniform('lightColor', [1.0, 1.0, 1.0, 1.0]);
  difuse.setUniform('lightColor', [1.0, 1.0, 1.0, 1.0]);
  specular.setUniform('lightColor', [1.0, 1.0, 1.0, 1.0]);
  a.input(() => { 
    difuse.setUniform('a', a.value());
    specular.setUniform('a', a.value()); 
  });
  b.input(() => { 
    difuse.setUniform('b', b.value());
    specular.setUniform('b', b.value()); 
  });
  c.input(() => { 
    difuse.setUniform('c', c.value());
    specular.setUniform('c', c.value()); 
  });

  ambient.setUniform('ambient', aLvl.value());
  
  difuse.setUniform('ambient', aLvl.value());
  difuse.setUniform('a', a.value());
  difuse.setUniform('b', b.value());
  difuse.setUniform('c', c.value());

  specular.setUniform('ambient', aLvl.value());
  specular.setUniform('a', a.value());
  specular.setUniform('b', b.value()); 
  specular.setUniform('c', c.value());  
  
  cols = [col(), col(), col(), col(), col(), col()]
  cam = createCamera();
  
  cam.camera(0, -100, 100);
  cam.lookAt(0, -100, 0);
  //c.frustum();

  x = 0;
  y = -10;
  z = 0;
  vy = 1;
}

function draw() {
  background(0);
  orbitControl();
  resetShader();


  push();
  shader(ambient);
    fill(aClr.color());  
    translate(x, y, z)
    
    sphere(5);
    resetShader();
    x = Math.sin(frameCount * (0.04)) * 90;
    y -= vy;
    z = Math.cos(frameCount * (0.04)) * 90;
    
    let xp = Math.cos(frameCount * (0.01)) * 90;
    let zp = Math.sin(frameCount * (0.01)) * 90;

    vy = (y <= -190 || y >= -10)? -vy: vy;
    
    cam.camera(xp, y, zp);
    //cam.lookAt(x, y, z);
   

  pop();

  noStroke();

  //shader(ambient);
  //shader(difuse);
  difuse.setUniform('uLightPosition', treeLocation(createVector(x, y, z), 
  { from: Tree.WORLD, to: Tree.EYE }).array());
  //shader(specular);
  specular.setUniform('uLightPosition', treeLocation(createVector(x, y, z), 
  { from: Tree.WORLD, to: Tree.EYE }).array());
  
  push();
    translate(0, -100, 0);
    rotateX(45);
    rotateY(45);
    //rotateZ(45);
    shader(specular);
    fill(c1.color());
    box(50);
    resetShader();
    shader(difuse);
    fill(c2.color());
    sphere(32.5);
    resetShader();
  pop();

  //Izquierda
  push();
    shader(difuse);
    fill(cols[0]);
    translate(-100, -100, 0);
    rotateY(90);
    plane(200, 200);
    resetShader();
  pop();
  //Derecha
  push();
    shader(difuse);
    fill(cols[1]);
    translate(100, -100, 0);
    rotateY(270);
    plane(200, 200);
    resetShader();
  pop();
  //Atras
  push();
    shader(specular);
    fill(cols[2]);
    translate(0, -100, -100);
    plane(200, 200);
    resetShader();
  pop();
  //Frontal
  push();
    shader(specular);
    fill(cols[3]);
    translate(0, -100, 100);
    rotateY(180);
    plane(200, 200);
    resetShader();
  pop();
  //Abajo
  push();
    shader(difuse);
    fill(cols[4]);
    rotateX(90);
    plane(200, 200);
    resetShader();
  pop();
  //plano superior
  push();
    shader(specular);
    fill(cols[5]);
    rotateX(270);
    translate(0, 0, -200);
    plane(200, 200);
    resetShader();
  pop();
  
  
}

function col(){
  r = Math.random();
  g = Math.random();
  b = Math.random();
  a = Math.random();
  return color(r, g, b, a);
}