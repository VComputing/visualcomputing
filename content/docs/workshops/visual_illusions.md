# Visual Illusions

## Problem Statement

Study, implement and discuss possible applications of some known visual phenomena and optical illusions.



{{< details "Chromatic Induction" open >}}
Sometimes your brain can change the colors of what you are seeing, based on the colors of surrounding the object. This fenomenom is caused by the *chromatic induction effect* "the change in perceived color of a light caused by a nearby inducing stimulus", and thats how the moving square illusion works. The square will move up and down across a background with different colors and it will seem to change color to your eyes. 
{{< /details >}}

{{< details "Code and results" >}}
```tpl
let c1,c2,a,sp;
function setup() {
  createCanvas(400, 500);
  c1 = color(255, 182, 193);
  c2 = color(63, 191, 191);
  
  
  a=0;
  sp=0.5;
}
function draw() {
  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
  square(150,a,55);
  fill(210, 187, 192)
  a = a + sp;
 
  if(a > height-65 || a < 0.5){
    sp = -sp;
  }
}

```
{{< /details >}}


{{< p5-global-iframe id="breath" width="425" height="525" >}}
let c1,c2,a,sp;
function setup() {
  createCanvas(400, 500);
  c1 = color(255, 182, 193);
  c2 = color(63, 191, 191);
  
  
  a=0;
  sp=0.5;
}
function draw() {
  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
  square(150,a,55);
  fill(210, 187, 192)
  a = a + sp;
 
  if(a > height-65 || a < 0.5){
    sp = -sp;
  }
}
{{< /p5-global-iframe  >}}

{{< details "Moiré Pattern" open >}}
"The Moiré Pattern is an interference pattern produced by placing the similar templates , slightly offset by spacing or angle." The tubes in the next illusion appear to be moving upside down because the vertical grid offsets the circles an angle.
{{< /details >}}
{{< details "Code and results" >}}
```tpl
function setup() {
  createCanvas(720, 500);
}

function draw() {
 background(220)
  for (let j = 0; j <1000; j += 7) {
  
    stroke(0)
    strokeWeight(3)
    line(j + mouseX, 0, j + mouseX, height)

    stroke('yellow')
    strokeWeight(3)
    noFill()
    ellipse(100, j, 100, 100)
    stroke('turquoise')
    ellipse(200, j, 100, 100)
    stroke('coral')
    ellipse(300, j, 100, 100)
    stroke('pink')
    ellipse(400, j, 100, 100)
    stroke(0,255,0)
    ellipse(500, j, 100, 100)
    stroke(255)
    ellipse(600, j, 100, 100)   
 
  }
}
```
{{< /details >}}
{{< p5-global-iframe id="breath" width="800" height="550" >}}
function setup() {
  createCanvas(720, 500);
}

function draw() {
 background(220)
  for (let j = 0; j <1000; j += 7) {
  
    stroke(0)
    strokeWeight(3)
    line(j + mouseX, 0, j + mouseX, height)

    stroke('yellow')
    strokeWeight(3)
    noFill()
    ellipse(100, j, 100, 100)
    stroke('turquoise')
    ellipse(200, j, 100, 100)
    stroke('coral')
    ellipse(300, j, 100, 100)
    stroke('pink')
    ellipse(400, j, 100, 100)
    stroke(0,255,0)
    ellipse(500, j, 100, 100)
    stroke(255)
    ellipse(600, j, 100, 100)   
 
  }
}
{{< /p5-global-iframe  >}}

{{< details "References" open >}}
  https://petapixel.com/2022/08/03/the-square-in-this-optical-illusion-isnt-actually-changing-color/
  https://editor.p5js.org/Jaemi13/sketches/gAS-FB5Sx
  Steven K Shevell, Jianping Wei,
  Chromatic induction: border contrast or adaptation to surrounding light?,
  Vision Research,
  Volume 38, Issue 11,
  1998,
  Pages 1561-1566,
  ISSN 0042-6989,
  https://doi.org/10.1016/S0042-6989(98)00006-6.
  (https://www.sciencedirect.com/science/article/pii/S0042698998000066)
  https://naziafakhruddin.medium.com/the-mysterious-moir%C3%A9-pattern-49d797897355
{{< /details >}}