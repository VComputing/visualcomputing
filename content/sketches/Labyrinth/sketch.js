let fbo1, fbo2;
let cam1, cam2;
let length = 600;
const size = 30
let foreshortening = true;
let laberinto;
let x, z;
let me;

function setup() {
  createCanvas(length, length / 2, WEBGL);
  angleMode(DEGREES);
  cam1 = createCamera();
  
  laberinto = generate(5, 5);
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
      noStroke();
      fill(c);
      push();
      translate(x * base, -prof / 2, y * altu);
      box(base, prof, altu);
      
      pop();
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
  buildLaberynth(laberinto);
  
  push();
    translate(x, -5, z);
    fill(0,0,255);
    //sphere(5);  
    
  pop();
  let speed = 0.5;
  let posX = parseInt((cam1.eyeX ) / me[0]);
  let posZ = parseInt((cam1.eyeZ) / me[1]);
  let colide = laberinto.m[posX][posZ] === 1; 
  let bound = colide || posX < 0 || posX > laberinto.m.length || posZ < 0 || posZ > laberinto.m[0].length; 
  let deltaZ = (keyIsDown(UP_ARROW) && !bound)? speed: (keyIsDown(DOWN_ARROW) && !bound)? -speed: 0;
  let deltaW = (keyIsDown(RIGHT_ARROW))? -1: (keyIsDown(LEFT_ARROW))? 1: 0;
  let boing = (colide)? 1: (bound && !colide)? -1: 0;
  console.log(posX, posZ);
  cam1.move(0, 0, -deltaZ);
  cam1.pan(deltaW);
  
  //cam1.lookAt(x, -5, z);
  
}

function keyPressed(){
  if (keyCode === RIGHT_ARROW && x < 10*me[0] ){
    //cam1.move(0, 0, -5);
    x++;
  }
  if (keyCode === LEFT_ARROW && x > 0){
    //cam1.move(0, 0, 5);
    x--;
  }
  if (keyCode === DOWN_ARROW && z > 0){
    //cam1.pan(-5);
    z--;
  }
  if (keyCode === UP_ARROW && z < me[1] * 10){
    //cam1.pan(5);
    z++;
  }
  if (keyCode === ENTER){
    cam1.pan(90);
    
  }
  
}