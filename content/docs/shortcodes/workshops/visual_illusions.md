# Visual Illusions

## Problem Statement

Study, implement and discuss possible applications of some known visual phenomena and optical illusions.



{{< details "Background" open >}}
Sometimes your brain can change the colors of what you are seeing, based on the colors of surrounding the object, the moviing square illusion (https://petapixel.com/2022/08/03/the-square-in-this-optical-illusion-isnt-actually-changing-color/) show this. To recreate this illusion the following code was used as reference for the background: https://editor.p5js.org/Jaemi13/sketches/gAS-FB5Sx
{{< /details >}}

{{< details "Code and results" >}}
```tpl
let c1,c2,a;
function setup() {
  createCanvas(400, 500);
  c1 = color(255);
  c2 = color(63, 191, 191);
  
  
  a=0;
}
function draw() {
  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
  square(150,a,55);
  fill(63, 191, 191)
  a = a - 0.5;
  if (a < 0) {
    a = height;
  }

}

```
{{< /details >}}


{{< p5-global-iframe id="breath" width="425" height="525" >}}
let c1,c2,a;
function setup() {
  createCanvas(400, 500);
  c1 = color(255);
  c2 = color(63, 191, 191);
  
  
  a=0;
}
function draw() {
  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
  square(150,a,55);
  fill(63, 191, 191)
  a = a - 0.5;
  if (a < 0) {
    a = height;
  }

}
{{< /p5-global-iframe  >}}
{{< details "Conclusions" open >}}
The square seems to get darker as it goues up however if you check the code you can see that it is always the same shade of blur, the human eye can be tricked using surrounding colors.
{{< /details >}}