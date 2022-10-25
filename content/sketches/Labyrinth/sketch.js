let fbo1, fbo2;
let cam1, cam2;
let length = 600;
const size = 30
let tapiz, alfombra, luz1, luz2, luces;
let laberinto;
let lm;
let x, z;
let me;

function preload(){
  tapiz = loadImage("textures/tapiz.jpg");
  alfombra = loadImage("textures/alfombra.jpg");
  luz1 = createVideo("textures/luz1.mp4");
  luz1.hide();
  luz2 = createVideo("textures/luz2.mp4");
  luz2.hide();
}

function setup() {
  createCanvas(length, length, WEBGL);
  frameRate(60);
  angleMode(DEGREES);
  cam1 = createCamera();
  luces = [luz1, luz2];
  laberinto = generate(6, 6);
  let entry = laberinto.entry;
  me = laberinto.metrics;
  x = entry[0] * me[0];
  z = entry[1] * me[1];
  cam1.frustum(-0.1, 0.1, 0.1, -0.1, 0.1);
  cam1.camera(x, -5, z-0.1);
  cam1.lookAt(x, -5, z);
  //fbo1 = createGraphics(width / 2, height, WEBGL);
  //fbo2 = createGraphics(width / 2, height, WEBGL);
  
}
  
function printM(m){
  let s = "";
  for (let i = 0; i < m.length; i++){
    s = s + "\n";
    for (let j = 0; j < m[0].length; j++){
      s = s + " " + m[i][j];
    }
  }
  console.log(s);
}
  
function buildLaberynth(labyrinth){
  //let base = width / m.length;
  let m = labyrinth.m;
  let base = labyrinth.metrics[0];
  let altu = labyrinth.metrics[1];
  let entry = labyrinth.entry;
  let prof;
  //let altu = height / m[0].length;
  for (let x = 0; x < m[0].length; x++){
    for (let y = 0; y < m.length; y++){
      c = (m[x][y] == 0)? 255: 100;
      prof = (m[x][y] === 0)? 0: 10;
      //noStroke();
      if (prof === 0){
        texture(alfombra);
      } else {
        texture(tapiz);
      }
      push();
      
      translate(x * base, -prof / 2, y * altu);
      box(base, prof, altu);
      
      pop();
      fill(255,0,0);
      push();
      //textureWrap(CLAMP);
      texture(luces[parseInt(Math.random() * 2)]);
      translate(x * base, -11 , y * altu);
      box(base, 0, altu);
      
      //plane(base, altu);
      pop();
      luz1.loop();
      luz2.loop();
      //rect(y * altu, x * base, altu, base);
    } 
  }
}
  
function pared(m, i, j){
  let rounds = {}
  rounds.up = i - 1 === 0;
  rounds.right = j + 2 === m[1].length;
  rounds.down = i + 2 === m.length;
  rounds.left = j - 1 === 0;
  rounds.bound = rounds.left || rounds.right || rounds.down || rounds.up;
  return rounds;
}
  
function adj(arr, m, i, j){
  let ret = arr;
  let rnds = pared(m, i, j);
  if (!rnds.up && m[i - 2][j] > 0){
    ret.push([i - 2, j, i, j]);
    m[i - 2][j] = -1;
  }
  if (!rnds.right && m[i][j + 2] > 0){
    ret.push([i, j + 2, i, j]);
    m[i][j + 2] = -1;
  }
  if (!rnds.down && m[i + 2][j] > 0){
    ret.push([i + 2, j, i, j]);
    m[i + 2][j] = -1;
  }
  if (!rnds.left && m[i][j - 2] > 0){
    ret.push([i, j - 2, i, j]);
    m[i][j - 2] = -1;
  }
  
  return ret;
}

function generate(cellH, cellV){
  let h = 2 * cellH + 1;
  let v = 2 * cellV + 1;
  let m = [];
  let salas = [];
  

  for (let i = 0; i < v; i++){
    m[i] = []
    for (let j = 0; j < h; j++){
      m[i][j] = 1;
    }
  }
  let init = 2 * parseInt(Math.random() * cellH) + 1;
  let end = 0;
  do {
    end = 2 * parseInt(Math.random() * cellH) + 1;
  } while (end === init);
  salas = adj(salas, m, init, 1);
  m[init][1] = 0;
  m[init][0] = 0;
  m[end][h - 1] = 0;
  let a = 0;
  while (salas.length > 0){
    let sel = parseInt(Math.random() * salas.length);
    let i0 = salas[sel][0];
    let j0 = salas[sel][1];
    let i = salas[sel][2];
    let j = salas[sel][3];
    m[i][j] = 0;
    
    let wall = [];
    wall[0] = (i0 === i)? i: parseInt((i0 + i) / 2);
    wall[1] = (j0 === j)? j: parseInt((j0 + j) / 2);
    m[wall[0]][wall[1]] = 0;
    m[i0][j0] = 0;
    salas = adj(salas, m, i0, j0)

    salas.splice(sel, 1);
  }
  let labyrinth = {
    m: m,
    metrics: [10, 10],
    entry: [init, 0], 
    exit: [end, h - 1]
  }
  return labyrinth;
}

  

function draw() {
  background(0);
  orbitControl();
  let fr = Math.random() * (frameCount % 100);
  ambientLight(0, 100 + fr, 0);
  
  buildLaberynth(laberinto);
  console.log(cam1.centerX, cam1.centerY, cam1.centerZ);
  
  let speed = 0.25;
  
  let posX = parseInt((cam1.eyeX ) / me[0]);
  let posZ = parseInt((cam1.eyeZ) / me[1]);
   
  let bound = posX < 0 || posX >= laberinto.m.length || posZ < 0 || posZ >= laberinto.m[0].length; 
  let colide = (bound)? true: laberinto.m[posX][posZ] === 1;
  
  let deltaZ = (keyIsDown(UP_ARROW))? -speed: (keyIsDown(DOWN_ARROW))? speed: 0;
  let deltaW = (keyIsDown(RIGHT_ARROW))? -1: (keyIsDown(LEFT_ARROW))? 1: 0;
  let boingB = ((deltaZ > 0 || lm === 'B') && colide)? -speed: 0;
  let boingF = ((deltaZ < 0 || lm === 'F') && colide)? speed: 0;
  
  cam1.move(0, 0, deltaZ + boingF + boingB);
  cam1.pan(deltaW)
  
}

function keyPressed(){
  if (keyCode === DOWN_ARROW){
    lm = 'B';
  }
  if (keyCode === UP_ARROW){
    lm = 'F';
  }
}