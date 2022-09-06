new p5((p)=>{
    
    let c1,c2,a;
    p.setup = function() {
    p.createCanvas(400, 500);
    c1 = p.color(255);
    c2 = p.color(63, 191, 191);
    
    
    a=0;
    }
    p.draw= function() {
    for(let y=0; y<p.height; y++){
        n = p.map(y,0,p.height,0,1);
        let newc = p.lerpColor(c1,c2,n);
        p.stroke(newc);
        p.line(0,y,p.width, y);
    }
    p.square(150,a,55);
    p.fill(63, 191, 191)
    a = a - 0.5;
    if (a < 0) {
        a = p.height;
    }

    }

})