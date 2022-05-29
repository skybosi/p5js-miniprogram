
const s = (sketch) => {

  let particlesQuantity = 13333;

  const posX = [],
    posY = [],
    velX = [],
    velY = [];
  velX.length = particlesQuantity;
  velY.length = particlesQuantity;
  velX.fill(0);
  velY.fill(0);

  sketch.setup = () => {
    sketch.createCanvas(windowWidth - 4, windowHeight - 4);

    for (let particle = 1; particle < particlesQuantity; particle++) {
      posX[particle] = sketch.random(sketch.width);
      posY[particle] = sketch.random(sketch.height);
    }

    posX[0] = 0;
    posY[0] = 0;
  }

  sketch.draw = () => {
    sketch.background(0, 128);

    velX[0] = velX[0] * 0.5 + (sketch.mouseX - posX[0]) * 0.1;
    velY[0] = velY[0] * 0.5 + (sketch.mouseY - posY[0]) * 0.1;

    posX[0] += velX[0];
    posY[0] += velY[0];

    for (let particle = 1; particle < particlesQuantity; particle++) {
      var whatever = 1024 / (sketch.sq(posX[0] - posX[particle]) + sketch.sq(posY[0] - posY[particle]));

      velX[particle] = velX[particle] * 0.95 + (velX[0] - velX[particle]) * whatever;
      velY[particle] = velY[particle] * 0.95 + (velY[0] - velY[particle]) * whatever;

      posX[particle] += velX[particle];
      posY[particle] += velY[particle];

      if ((posX[particle] < 0 && velX[particle] < 0) || (posX[particle] > sketch.width && velX[particle] > 0))
        velX[particle] = -velX[particle];


      if ((posY[particle] < 0 && velY[particle] < 0) || (posY[particle] > sketch.height && velY[particle] > 0))
        velY[particle] = -velY[particle];


      sketch.stroke(posX[particle], posY[particle]);

      sketch.point(posX[particle], posY[particle]);
    }
  }

  sketch.mousePressed = () => {
    for (let particle = 1; particle < particlesQuantity; particle++) {
      posX[particle] = sketch.random(0, sketch.width);
      posY[particle] = sketch.random(0, sketch.height);
    }
  }

  sketch.windowResized = () => {
    resizeCanvas(windowWidth - 4, windowHeight - 4);
  }
};