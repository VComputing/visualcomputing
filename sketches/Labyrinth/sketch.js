function setup() {
    createCanvas(400, 400);
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
  
  function drawMatrix(m){
    let base = width / m.length;
    let altu = height / m[0].length;
    for (let x = 0; x < m.length; x++){
      for (let y = 0; y < m.length; y++){
        c = (m[x][y] == 0)? 255: 0;
        stroke(c);
        fill(c);
        rect(y * altu, x * base, altu, base);
      }
    }
  }
  
  function pared(m, i, j){
    rounds = {}
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
    return m;
  }
  
  var laberinto = generate(20, 20);
  
  function draw() {
    background(0);
    drawMatrix(laberinto);
  }