const s = (sketch) => {
  let rescale = 0.8;

  let repeat = 10;

  let length = 80;
  let rotateAngle = 20;

  let colorstep = repeat - 2;
  let colordrad = 15;

  let angleRandomRange = 15;
  let lengthScaleRandomRage = 0.3;


  let flowesRandomRange = 10;

  sketch.setup = () => {
    sketch.createCanvas(windowWidth, windowHeight);
    sketch.background(0);

    sketch.angleMode(sketch.DEGREES);
    sketch.stroke(255, 255, 255);
    sketch.strokeWeight(2);

  }

  sketch.draw = () => {
    sketch.translate(-sketch.width * .35, -sketch.height * .75);
    sketch.scale(1.8);
    let firstAngle = sketch.random(-angleRandomRange, angleRandomRange);
    tree(sketch.width * 0.5, sketch.height, length, firstAngle, repeat);
    sketch.noLoop();
  }

  function tree(x, y, len, angle, step) {
    //main
    if (step < colorstep) {
      let gb = 255 - (colorstep - step) * colordrad;
      sketch.stroke(255, gb, gb);
      sketch.fill(255, gb, gb);

    }

    sketch.translate(x, y);
    sketch.rotate(angle);
    sketch.line(0, 0, 0, -len);

    if (step < colorstep) {
      sketch.noStroke();
      drawFlowers();
      drawFlowers();
      drawFlowers();
    }

    if (step > 0) {
      //right branch
      sketch.push();
      tree(0, -len,
        len * rescale * getLengthScaleRandomRange(),
        - rotateAngle - getAngleRandomRange(),
        step - 1);
      sketch.pop();

      //left branch
      sketch.push();
      tree(0, -len,
        len * rescale * getLengthScaleRandomRange(),
        + rotateAngle + getAngleRandomRange(),
        step - 1);
      sketch.pop();
    }
  }

  function drawFlowers() {
    let size = sketch.random(2, 10);
    let x = sketch.random(-10, 10);
    let y = sketch.random(-10, 10);
    sketch.circle(x, y, size);
  }

  function getLengthScaleRandomRange() {
    return sketch.random(1 - lengthScaleRandomRage, 1 + lengthScaleRandomRage);
  }

  function getAngleRandomRange() {
    return sketch.random(-angleRandomRange, angleRandomRange);
  }
};