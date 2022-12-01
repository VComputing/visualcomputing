# Texturing

## Problem Statement

 Implement other coloring brightness tools such as HSV value V, HSL lightness L or Component average.
 Implement texture tinting by mixing color and texel interpolated data.


{{< p5-global-iframe id="pyramid" width="525" height="525" >}}

let Shader; let tex; let Binv = false, Bbaw = false, Bcam = false, Bten = false, Belm = false, Bhsl = false, Bluz = false; let c1, c2, c3, c4;

function preload(){ Shader = loadShader('/visualcomputing/sketches/texturingShader.vert', '/visualcomputing/sketches/texturingShader.frag'); tex = loadImage('/visualcomputing/sketches/mandrill.png'); }

function setup() { createCanvas(500, 500, WEBGL);

inputImg = createFileInput(handleFile); inputImg.position(255, 5); inputImg.size(240);

option = createSelect(); option.position(15, 5); option.option('Original'); option.option('Blanco y negro'); option.option('Invertir'); option.option('Teñido'); option.option('Eliminación'); option.option('Teñido 2'); option.option('Luz'); option.selected('Original'); option.changed(optionEvent);

colorPicker = createColorPicker('#ed225d'); colorPicker.position(15, 30);

//opacity = createSlider(0, 1, 1, 0.1); //opacity.position(80, 30); //opacity.style('width', '100px');

colorR = createButton('Randomize'); colorR.position(80, 30); colorR.mousePressed(randomizeColor);

randomizeColor(); }

function draw() {
    shader(Shader); Shader.setUniform('tex0', tex); Shader.setUniform('vid0', vid); Shader.setUniform('inv', Binv); Shader.setUniform('baw', Bbaw); Shader.setUniform('ten', Bten); Shader.setUniform('cam', Bcam); Shader.setUniform('elm', Belm); Shader.setUniform('luz', Bluz); Shader.setUniform('hsl', Bhsl); Shader.setUniform('mousePos', [mouseX/500,mouseY/500]); Shader.setUniform('colT', colorPicker.color()._array); Shader.setUniform('opc', 1);
    if(Bhsl){ beginShape(); fill(c1); vertex(0, 0); fill(c2); vertex(0, 1); fill(c3); vertex(1, 1); fill(c4); vertex(1, 0); endShape(); } rect(0,0,width, height); }


function optionEvent() { let opt = option.value(); if(opt=="Original"){ Bbaw = false; Binv = false; Bten = false; Belm = false; Bhsl = false; Bluz = false; }else if(opt=="Blanco y negro"){ Bbaw = true; Binv = false; Bten = false; Belm = false; Bhsl = false; Bluz = false; }else if(opt=="Invertir"){ Bbaw = false; Binv = true; Bten = false; Belm = false; Bhsl = false; Bluz = false; }else if(opt=="Teñido"){ Bbaw = false; Binv = false; Bten = true; Belm = false; Bhsl = false; Bluz = false; }else if(opt=="Eliminación"){ Bbaw = false; Binv = false; Bten = false; Belm = true; Bhsl = false; Bluz = false; }else if(opt=="Teñido 2"){ Bbaw = false; Binv = false; Bten = false; Belm = false; Bhsl = true; Bluz = false; }else if(opt=="Luz"){ Bbaw = false; Binv = false; Bten = false; Belm = false; Bhsl = false; Bluz = true; } }

function vidLoad() { tex.loop(); }

function myCheckedEvent() { if (media.checked()) { Bcam = true; } else { Bcam = false; } }

function randomizeColor() { c1 = [random(0,255),random(0,255),random(0,255)]; c2 = [random(0,255),random(0,255),random(0,255)]; c3 = [random(0,255),random(0,255),random(0,255)]; c4 = [random(0,255),random(0,255),random(0,255)]; }

{{< /p5-global-iframe >}}



{{< details "References" open >}}
 https://santiagovargasavendano.github.io/showcase/docs/shortcodes/Taller-3/texturing/
{{< /details >}}