const s = (sketch) => {
  const pos = {},          target = {};
  sketch.setup = () => {
    sketch.createCanvas(windowWidth, windowHeight);
    sketch.noStroke();

    //set target positon
    target.x = sketch.width * 0.5;
    target.y = sketch.height * 0.5;

  }

  sketch.draw = () => {
    sketch.background('#030711');

    //set smileyFace position
    pos.x = sketch.mouseX;
    pos.y = sketch.mouseY;


    //set angle to pass to smileyFace()
    let angleTo = sketch.radians((sketch.atan2(getDist().y, getDist().x) * 180 / sketch.PI));


    //vusuals
    drawTargetVisual();
    smileyFace(angleTo);

  }

  //get distance from smileyface to target to use in updating the angle
  function getDist() {
    return {
      x: pos.x - target.x,
      y: pos.y - target.y
    }
  }

  function drawTargetVisual() {
    sketch.fill('yellow')
    sketch.ellipse(target.x, target.y, 13)
  }

  function smileyFace(angle) {
    sketch.translate(pos.x, pos.y);

    //update the angle based on the updateAngleTo() calculation
    sketch.rotate(angle);

    //face
    sketch.push();
    sketch.fill('yellow');
    sketch.ellipse(0, 0, 100);
    sketch.pop();

    //eyes
    sketch.push();
    sketch.fill('#131721');
    sketch.ellipse(20, -20, 20);
    sketch.ellipse(20, 20, 20);
    sketch.pop();

    //smile
    sketch.push();
    sketch.noFill();
    sketch.stroke('#131721');
    sketch.strokeWeight(3);
    sketch.translate(10, 0);
    sketch.rotate(sketch.radians(90));
    sketch.arc(0, 0, 80, 80, 0.1 * sketch.PI, 0.9 * sketch.PI);
    sketch.pop();
  }




  // let x = 100;
  // let y = 100;


  // sketch.draw = () => {
  //   sketch.noStroke();
  //   sketch.colorMode(sketch.RGB, 100);
  //   for (let i = 0; i < 100; i++) {
  //     for (let j = 0; j < 100; j++) {
  //       sketch.stroke(i, j, 0);
  //       sketch.point(i, j);
  //     }
  //   }
  //   // sketch.background(0);
  //   // sketch.fill(255);
  //   // sketch.rect(100, 100, 50, 50);
  //   // console.log(sketch.mouseX, sketch.mouseY)
  //   // sketch.circle(sketch.mouseX, sketch.mouseY, 50);
  // };
};