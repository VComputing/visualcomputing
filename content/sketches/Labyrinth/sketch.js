
let cam1;
const size = 30
let tapiz, alfombra, ambiente, luz3, luces;
let laberinto;
let lm;
let x, z, xf, zf;
let me;
let dirs;
let flag;
let dificult, inp, btm, lv;
let isSound;

function preload(){
  // /visualcomputing/sketches/Labyrinth/
  tapiz = loadImage("/visualcomputing/sketches/Labyrinth/textures/tapiz.jpg");
  alfombra = loadImage("/visualcomputing/sketches/Labyrinth/textures/alfombra.jpg");
  luz3 = loadImage("/visualcomputing/sketches/Labyrinth/textures/luz3.jpeg");
  ambiente = loadSound("/visualcomputing/sketches/Labyrinth/sound/ambiente2.mp3");
}

function setup() {
  createCanvas(800, 500, WEBGL);
  frameRate(60);
  getAudioContext().suspend();
  
  angleMode(DEGREES);
  cam1 = createCamera();
  
  dificult = 1;
  inp = createInput();
  inp.size(30);
  inp.position(width / 2 -15, 0);
  btm = createButton('Ir');
  btm.position(width / 2 + 30, 0);
  btm.mousePressed(setDificult);
  lv = createElement("h2", "Dificultad: " + dificult);
  lv.position(10, height - 80);
  
  //ambiente.loop();
  
  avanti(dificult);
  isSound = false;
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
  for (let x = 0; x < m.length; x++){
    for (let y = 0; y < m[0].length; y++){
      c = (m[x][y] == 0)? 255: 100;
      prof = (m[x][y] === 0 || m[x][y] === 7)? 0: 10;
      tint(255);
      if (prof === 0){
        if (m[x][y] === 7){
          tint(255, 0, 0);
        }
        texture(alfombra);
      } else {
        texture(tapiz);
      }
      push();
      
      translate(x * base, -prof / 2, y * altu);
      box(base, prof, altu);
      
      pop();
      //fill(255,0,0);
      push();
      tint(255);
      texture(luz3);
      translate(x * base, -10 , y * altu);
      box(base, 0, altu);
      
      
      pop();
      
      //plane(base, altu);
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
  
  let init = 2 * parseInt(Math.random() * cellV) + 1;
  
  let end = 0;
  do {
    end = 2 * parseInt(Math.random() * cellV) + 1;
    
  } while (end === init && cellV != cellH && cellV > 1);
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

function avanti(d){
  laberinto = generate(d, d);
  let entry = laberinto.entry;
  let exit = laberinto.exit;
  me = laberinto.metrics;
  x = entry[0] * me[0];
  z = entry[1] * me[1];
  xf = exit[0] * me[0];
  zf = exit[1] * me[1];
  cam1.frustum(-1, 1, 1, -1, 1);
  cam1.camera(x, -5, z);
  cam1.lookAt(x, -5, z+0.1);
  
}

function setDificult(){
  dificult = parseInt(inp.value());
  dificult = (dificult <= 0)? 1: dificult;
  lv.html("Dificultad: " + dificult);
  inp.value('');
  avanti(dificult);
}

function cords(x, z){
  let px = parseInt((x + me[0]/2 )/ me[0]) ;
  let pz = parseInt((z + me[1]/2) / me[1]) ;
  return [px, pz];
}

function mp(x, z){
  let c = cords(x, z);
  let px = c[0];
  let pz = c[1]; ;
  let l = laberinto.m;
  let r = (px >= 0 && pz >= 0 && px < l.length && pz < l[0].length)? l[px][pz]: 1; 
  return r;
}

function movF(speed){
  let deltaZ = (keyIsDown(87))? -speed: 0;
  cam1.move(0, 0, deltaZ );
  flag = 1;
  return 1;
}  

function movB(speed){
  let deltaZ = (keyIsDown(83))? speed: 0;
  cam1.move(0, 0, deltaZ );
  flag = 2;
  return 1;
}

function girar(wSpeed){
  let deltaW = (keyIsDown(68))? -wSpeed: (keyIsDown(65))? wSpeed: 0;
  cam1.pan(deltaW);
  return 1;
}

function boing(speed){
  cam1.move(0, 0, -speed);
}

function draw() {
  background(255,100,0);
  
  let fr = Math.random() * (frameCount % 105);
  let col = 150 + fr;
  ambientLight(col, col, col);
  
  buildLaberynth(laberinto);
  
  let cx = cam1.eyeX;
  let cz = cam1.eyeZ;
  let px = cam1.centerX;
  let pz = cam1.centerZ;
   
  let speed = 0.25;
  
  let mf = mp(px, pz + 2 ) === 1 || mp(px, pz - 2) === 1 || mp(px - 2, pz) === 1 || mp(px + 2, pz) === 1;
  let mb = mp( (px - 0.2), (pz - 0.2) + 2 ) === 1 || mp((px - 0.2), (pz - 0.2) - 2) === 1 || mp((px - 0.2) - 2, (pz - 0.2)) === 1 || mp((px - 0.2) + 2, (pz - 0.2)) === 1;
  
  console.log(mf, mb);

  let w = 1;
  let m = (!mf)? movF(speed): 0;
  let m2 = (!mb)? movB(speed): 0;
  
  if (m === 0 && flag === 1){
    boing(-speed);
  }
  
  
  if (m2 === 0 && flag === 2){
    boing(speed);
  }

  let c = cords(cx, cz);
  laberinto.m[c[0]][c[1]] = (laberinto.m[c[0]][c[1]] === 0 || laberinto.m[c[0]][c[1]] === 7)? 7: 1;

  if (cz >= zf){
    dificult++;
    avanti(dificult);
  } else if (cz < z){
    dificult = (dificult <= 1)? 1: dificult - 1;
    avanti(dificult);
  }
  lv.html("Dificultad: " + dificult);
 
  let g = girar(w);
}

function mousePressed(){
  userStartAudio();
  if (!isSound){
    ambiente.loop();
    isSound = true;
  } else {
    ambiente.stop();
    isSound = False;
  }
}