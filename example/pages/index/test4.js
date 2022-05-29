const s = (sketch) => {
  let colors = ['#9b5de5', '#f15bb5', '#fee440', '#00bbf9', '#00f5d4', '#13070c', '#f58216'];

  sketch.setup = () => {
    sketch.createCanvas(800, 800);
    sketch.background(0);
    sketch.blendMode(sketch.ADD);
    for (let i = 0; i < 5000; i++) {
      let x = sketch.randomGaussian(0.5, 0.21) * sketch.width;
      let y = sketch.randomGaussian(0.5, 0.21) * sketch.height;
      let d = sketch.random(sketch.random(sketch.random(sketch.random(sketch.random(sketch.random(sketch.random(sketch.width * 0.5)))))));
      movingCircle(x, y, d, sketch.floor(sketch.random(sketch.random(300))) + 1);
    }
    sketch.noLoop()
  }

  sketch.draw = () => {
    // let d = sketch.random(sketch.random(sketch.random(sketch.random(sketch.random(sketch.random(sketch.random(sketch.width * 0.5)))))));
    // movingCircle(sketch.mouseX, sketch.mouseY, d, sketch.floor(sketch.random(sketch.random(300))) + 1);
  }

  function movingCircle(x, y, d, n) {
    let a = sketch.floor(sketch.random(8)) * sketch.PI * 0.25;
    let step = sketch.random(5);
    let aStep = sketch.random(-1, 1) * sketch.random(0.1);
    let col = sketch.color(sketch.random(colors));
    let l = sketch.random(d);
    col.setAlpha(sketch.random(10));
    if (sketch.random() < 0.5) {
      sketch.noStroke();
      sketch.fill(col);
    } else {
      sketch.noFill();
      sketch.stroke(col);
    }

    for (let i = 0; i < n; i++) {
      sketch.push();
      sketch.translate(x, y);
      sketch.rotate(a);
      sketch.circle(l, 0, d);
      sketch.pop();
      x += sketch.random(-1, 1) * step;
      y += sketch.random(-1, 1) * step;
      a += sketch.random() * aStep;
    }
  }
};