# Filtros de Convolución

## Problem Statement

Implement an image processing web app supporting different image kernels and supporting:

Image histogram visualization.
Different lightness (coloring brightness) tools.

{{< details "Background" open >}}
Un kernel es una matriz generalmente de 3x3, cuyos valores son operados con los pixeles de una imagen determinada para producir diversos efectos.
{{< /details >}}
{{< hint info >}}
**Instrucciones de Uso**  
→: Siguiente filtro.
←: Filtro anterior.
↑: Aumentar div.
↓: Disminuir div.
w: Aumentar Brillo.
s: Disminuir Brillo.
d: Imagen siguiente.
a: imagen anterior.
ESPACIO: Visualizar histogramas.
ENTER: Guardar imagen en memoria.
r: Reset.
{{< /hint >}}

{{< hint info >}}
**Filtros Implementados**
Filtro identidad
Desenfoque / Blur (media)
Desenfoque sin pérdida de detalles (media ponderada)
Gausiano 3x3
Media negativo
Laplace
Enfoque / Sharpen (Laplace negativo)
Realzar bordes
Repujado
Direccional norte
Direccional este
Direccional sur
Direccional oeste
Sobel C
Sobel F
{{< /hint >}}

{{< p5-global-iframe width="625" height="625" >}}

var pictures;
let img;
let c;

const kernels = [
  //Identidad
  [[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], 
   [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]],
   [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]],
  
  //Desenfoque / Blur (media)
  [[[1/9, 1/9, 1/9, 0], [1/9, 1/9, 1/9, 0], [1/9, 1/9, 1/9, 0]], 
   [[1/9, 1/9, 1/9, 0], [1/9, 1/9, 1/9, 1], [1/9, 1/9, 1/9, 0]],
   [[1/9, 1/9, 1/9, 0], [1/9, 1/9, 1/9, 0], [1/9, 1/9, 1/9, 0]]],
  
  
  //Media ponderada para no perder detalle
  [[[1/9, 1/9, 1/9, 0], [1/9, 1/9, 1/9, 0], [1/9, 1/9, 1/9, 0]], 
   [[1/9, 1/9, 1/9, 0], [2/9, 2/9, 2/9, 1], [1/9, 1/9, 1/9, 0]],
   [[1/9, 1/9, 1/9, 0], [1/9, 1/9, 1/9, 0], [1/9, 1/9, 1/9, 0]]],
  
  //Blur gausiano 
  [[[1/16, 1/16, 1/16, 0], [2/16, 2/16, 2/16, 0], [1/16, 1/16, 1/16, 0]], 
   [[2/16, 2/16, 2/16, 0], [4/16, 4/16, 4/16, 1], [2/16, 2/16, 2/16, 0]],
   [[1/16, 1/16, 1/16, 0], [2/16, 2/16, 2/16, 0], [1/16, 1/16, 1/16, 0]]],
  
  //PASA ALTOS
  //Menos media
  [[[-1/9, -1/9, -1/9, 0], [-1/9, -1/9, -1/9, 0], [-1/9, -1/9, -1/9, 0]], 
   [[-1/9, -1/9, -1/9, 0], [8/9, 8/9, 8/9, 1], [-1/9, -1/9, -1/9, 0]],
   [[-1/9, -1/9, -1/9, 0], [-1/9, -1/9, -1/9, 0], [-1/9, -1/9, -1/9, 0]]],
  
  //Laplace
  [[[0, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0]], 
   [[1, 1, 1, 0], [-4, -4, -4, 1], [1, 1, 1, 0]],
   [[0, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0]]],
  
  //Enfoque / sharpen (Menos laplace)
  [[[0, 0, 0, 0], [-1, -1, -1, -1], [0, 0, 0, 0]], 
   [[-1, -1, -1, -1], [5, 5, 5, 5], [-1, -1, -1, -1]],
   [[0, 0, 0, 0], [-1, -1, -1, -1], [0, 0, 0, 0]]],
  
  //Realzar bordes
  [[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], 
   [[1, 1, 1, 1], [-1, -1, -1, -1], [0, 0, 0, 0]],
   [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]],
  
  //Repujado
  [[[-2, -2, -2, -2], [-1, -1, -1, -1], [0, 0, 0, 0]], 
   [[-1, -1, -1, -1], [1, 1, 1, 1], [1, 1, 1, 1]],
   [[0, 0, 0, 0], [1, 1, 1, 1], [2, 2, 2, 2]]], 
  
  //DIRECCIONALES
  //Norte
  [[[1, 1, 1, 0], [1, 1, 1, 0], [1, 1, 1, 0]], 
   [[1, 1, 1, 0], [-2, -2, -2, 1], [1, 1, 1, 0]],
   [[-1, -1, -1, 0], [-1, -1, -1, 0], [-1, -1, -1, 0]]],
  
  //Este
  [[[-1, -1, -1, 0], [1, 1, 1, 0], [1, 1, 1, 0]], 
   [[-1, -1, -1, 0], [-2, -2, -2, 1], [1, 1, 1, 0]],
   [[-1, -1, -1, 0], [1, 1, 1, 0], [1, 1, 1, 0]]], 
  
  //Sur
  [[[-1, -1, -1, 0], [-1, -1, -1, 0], [-1, -1, -1, 0]], 
   [[1, 1, 1, 0], [-2, -2, -2, 1], [1, 1, 1, 0]],
   [[1, 1, 1, 0], [1, 1, 1, 0], [1, 1, 1, 0]]],
  
  //Oeste
  [[[1, 1, 1, 0], [1, 1, 1, 0], [-1, -1, -1, 0]], 
   [[1, 1, 1, 0], [-2, -2, -2, 1], [-1, -1, -1, 0]],
   [[1, 1, 1, 0], [1, 1, 1, 0], [-1, -1, -1, 0]]],
  
  //Sobel
  //C 
  [[[-1, -1, -1, -1], [0, 0, 0, 0], [1, 1, 1, 1]], 
   [[-2, -2, -2, -2], [0, 0, 0, 0], [2, 2, 2, 2]],
   [[-1, -1, -1, -1], [0, 0, 0, 0], [1, 1, 1, 1]]],
  
  //F
  [[[-1, -1, -1, -1], [-2, -2, -2, -2], [-1, -1, -1, -1]], 
   [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
   [[1, 1, 1, 1], [2, 2, 2, 2], [1, 1, 1, 1]]]
  
]

function preload() {
  //Aqui se carga una lista de imagenes
  pictures = new Array();
  
  pictures.push(loadImage('imgs/image0.jpg'));
  
  pictures.push(loadImage('imgs/image1.jpg'));
  pictures.push(loadImage('imgs/image2.jpg'));
  pictures.push(loadImage('imgs/image3.jpg'));
  pictures.push(loadImage('imgs/image4.jpg'));
  
  }


function setup() {
  createCanvas(600, 600);
  colorMode(RGB);
  //background(0);
  pixelDensity();
  
}

function imagen(a, b){
  r = createImage(a, b);
  r.loadPixels();
  for (let i = 0; i < a; i++){
    for (let j = 0; j < b; j++){
      r.set(i, j, color(i * 255 / a, j * 255 / b, (i + j) *255 /(a + b) ));
    }
  }
  r.updatePixels();
  return r;
}

function seePixels(img, pars){
  img.loadPixels();
  let s = "";
  for (let i = 0; i < img.height; i++){
    for (let j = 0; j < img.width; j++){
      let idx = (i * img.width + j) * pars;
      for (let k = 0; k < pars; k++){
        s = s + " " + img.pixels[idx + k];
      }
      s = s + "\t";
    }
    s = s + "\n"
  }
  return s;
}

function seeMatrix(m){
  let s = "";
  for (let i = 0; i < m.length; i++){
    for (let j = 0; j < m[0].length; j++){
      s = s + "\t" + m[i][j];
    }
    s = s + "\n";
  }
  return s;
}

function img2matrix(img, pars){
  let w = img.width;
  let h = img.height;
  img.loadPixels();
  let t = img.pixels;
  let m = new Array();
  
  for (let i = 0; i < h; i++){
    m.push(new Array());
  }
  
  for (let i = 0; i < h; i++){
    for (let j = 0; j < w; j++){
      let idx = (i * w + j) * pars;
      m[i][j] = [];
      for (let k = 0; k < pars; k++){
        m[i][j].push(t[idx + k]);  
      }
    
    }
  }
  //print(seeMatrix(m));
  return m;
}

function vToroidales(m, i, j){
  let toro = new Array();
  let iLBorder = i % m.length === 0; 
  let iRBorder = (i + 1) % m.length === 0;
  let jUBorder = j % m[0].length === 0;
  let jDBorder = (j + 1) % m[0].length === 0;
  
  let iBack = iLBorder ? 0: 1;
  let iFront = iRBorder ? 1: 2;
  let jUp = jUBorder ? 0: 1;
  let jDown = jDBorder ? 1: 2;
  
  let i0 = i - iBack;
  let i1 = i + iFront;
  let j0 = j - jUp;
  let j1 = j + jDown;
  
  for (let k = 0; k < i1 - i0; k++){
    toro[k] = new Array();
  }
  
  let delta = j1 - j0;
  for (let a = 0; a < toro.length; a++){
    let jd = j0;
    for (let b = 0; b < delta; b++){
      toro[a][b] = m[i0][jd];
      jd++;
    }
    i0++;
  }
  return toro;
}



function convolution(m, ker, pars, f, off){
  let s = [];
  for (let k = 0; k < pars - 1; k++){
    s.push(0);
    for (let i = 0; i < m.length; i++){
      for (let j = 0; j < m[0].length; j++){
        
       s[k] = s[k] + m[i][j][k] * ker[i][j][k]; 
        
      }
    }
    
    s[k] = s[k] / f + off;
    s[k] = s[k] > 255 ? 255: s[k];
    s[k] = s[k] < 0? 0: s[k];
    
  }
  s[3] = 255;
  return s;
}

function transform(m, ker, pars, f, off){
  let mFinal = new Array();
  let kul = vToroidales(ker, 2, 2);
  let kuc = vToroidales(ker, 2, 1);
  let kur = vToroidales(ker, 2, 0);
  let kcl = vToroidales(ker, 1, 2);
  let kcr = vToroidales(ker, 1, 0);
  let kdl = vToroidales(ker, 0, 2);
  let kdc = vToroidales(ker, 0, 1);
  let kdr = vToroidales(ker, 0, 0);
  
  for (let i = 0; i < m.length; i++){
    mFinal.push(new Array());
    for (let j = 0; j < m[0].length; j++){
      let val;
      if (i === 0 && j === 0){
        val = kul;
      } else if (i === 0 && j < m[0].length - 1){
        val = kuc;
      } else if (i === 0 && j === m[0].length - 1){
        val = kur;
      } else if (i < m.length - 1 && j === 0){
        val = kcl;
      } else if (i < m.length - 1 && j === m[0].length - 1){
        val = kcr;
      } else if (i === m.length - 1 && j === 0){
        val = kdl;
      } else if (i === m.length - 1 && j < m[0].length - 1){
        val = kdc;
      } else if (i === m.length - 1 && j === m[0].length - 1){
        val = kdr;
      } else {
        val = ker;
      }
      
      
      
      mFinal[i][j] = convolution(vToroidales(m, i, j), val, pars, f, off);
      
    }
    
  }
  return mFinal;
}


function matrix2img(m, pars){
  let im = createImage(m[0].length, m.length);
  im.loadPixels();
  for (let i = 0; i < im.height; i++){
    for (let j = 0; j < im.width; j++){
      let idx = (i * im.width + j) * pars;
      for (let k = 0; k < pars; k++){
        im.pixels[idx + k] = m[i][j][k]; 
      }
      
    }
  }
  im.updatePixels();
  return im;
}

function applyFilter(im, pars, kernel, f, off, times){
  let pic = createImage(im.width, im.height);
  
  for (let i = 0; i < times; i++){
    let m = img2matrix(im, pars);
    let t = transform(m, kernel, pars, f, off);
    im = matrix2img(t, pars);
  }
  return im;
}

function histogramData(im){
  let hists = new Array();
  for (let i = 0; i < 5; i++){
    hists[i] = new Array(100);
    for (let j = 0; j < 100; j++){
      hists[i][j] = 0;
    }
  }
  
  let m = img2matrix(im, 4);
  for (let i = 0; i < m.length; i++){
    for (let j = 0; j < m[0].length; j++){
      let ba = lightness(color(m[i][j]));
      hists[0][parseInt(ba)]++;
      for (let k = 0; k < 4; k++){
        let bc = lightness(color(m[i][j][k]));
        hists[k + 1][parseInt(bc)]++;
      }
    }
  }
  return hists;
}

function histogram(im, x, y){
  fill(0);
  stroke(255);
  square(x, y, width / 2);
  
  let data = histogramData(im);
  let mgnx = x + 10;
  let mgny = height - 10;
  let factor = 2 * height;
  let st = height / 4;
  
  line(x, y + st, x + width / 2, y + st);
  
  for (let i = 0; i < data[0].length; i++){
    let h = mgny - st - data[0][i] / factor;
    line(mgnx + i, mgny - st, mgnx + i, h > y ? h: y + 10);
  }
  let base = 155;
  for (let k = 1; k < 4; k++){
    let d = data[k];
    let c = [0, 0, 0, 155];
    for (let i = 0; i < d.length; i++){
      let h = mgny - data[k][i] / factor;
      c[k - 1] = base + i;
      line(mgnx + i, mgny, mgnx + i, h > y + st? h: y + st + 5);
      stroke(color(c));
    }
  }
}

var filt = 0;
var bri = 0;
var fac = 1;
var im = 0;
var img2;
var his = false;
function draw() {
  //noLoop();
  
  background(0);
  img = pictures[im];
  img2 = applyFilter(img, 4, kernels[filt], fac, bri, 1);
  
  image(img, 0, 0, width / 2, height / 2);
  image(img2, width / 2, 0, width / 2, height / 2);
  if (his){
    histogram(img, 0, height / 2);
    histogram(img2, width / 2, height / 2);
  }
}

function keyPressed(){
  if (keyCode === RIGHT_ARROW){
    filt++;
  } else if (keyCode === LEFT_ARROW){
    filt--;
    if (filt < 0){
        filt = kernels.length - 1;
    }
  } else if (keyCode === UP_ARROW){
    fac++;
    fac = fac === 0 ? 1: fac;
  } else if (keyCode === DOWN_ARROW){
    fac--;
    fac = fac === 0 ? -1: fac; 
  } else if (keyCode === 87){
    bri+=5;
  } else if (keyCode === 83){
    bri-=5;
  } else if (keyCode === 65){
    im--;
    if (im < 0){
        im = pictures.length - 1;
    }
  } else if (keyCode === 68){
    im++;
  } else if (keyCode === 82){
    filt = 0;
    bri = 0;
    fac = 1;
  } else if (keyCode === ENTER){
    pictures.push(img2);
  }
  
  if (keyCode === 32){
    his = true;
  }
  
  filt = filt % kernels.length;
  bri = bri >= 255 ? 250: bri;
  bri = bri <= -255 ? - 250: bri;
  im = im % pictures.length;  
  return false;
}

function keyReleased(){
  his = false;
  return false;
}
{{< /p5-global-iframe >}}


{{< details "References" open >}}
  https://docs.gimp.org/2.6/es/plug-in-convmatrix.html
  https://bryanmed.github.io/kernelsConv/
  https://youtu.be/ISBg0p0gYiM
  https://en.wikipedia.org/wiki/Kernel_(image_processing)
  https://www.um.es/geograf/sigmur/teledet/tema06.pdf
{{< /details >}}
