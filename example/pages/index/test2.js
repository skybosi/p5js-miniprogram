const s = (sketch) => {

  let res = 15, cols, rows;

  const fields = [];

  sketch.setup = () =>{
    sketch.createCanvas(400, 400);
    sketch.background('#a4a4a4');
    cols = 1 + sketch.width / res;
    rows = 1 + sketch.height / res;

    for (let i = 0; i < cols; i++) {
      fields[i] = [];
    }

    let xoff = 0;

    for (let y = 0; y < cols; y++) {
      for (let x = 0; x < rows; x++) {
        fields[x][y] = sketch.floor(sketch.noise(xoff) * 2);
        xoff += 0.75;
      }
    }

    // console.log(fields);
  }

  let xoff = 0;

  sketch.draw = () => {

    for (let y = 0; y < cols; y++) {
      for (let x = 0; x < rows; x++) {
        sketch.stroke(fields[x][y] * 255);
        sketch.strokeWeight(res * 0.4);
        sketch.point(x * res, y * res);
      }
    }

    for (let y = 0; y < cols - 1; y++) {
      for (let x = 0; x < rows - 1; x++) {

        let pos = {
          x: x * res,
          y: y * res
        };

        let a = sketch.createVector(pos.x + res * 0.5, pos.y);
        let b = sketch.createVector(pos.x + res, pos.y + res * 0.5);
        let c = sketch.createVector(pos.x + res * 0.5, pos.y + res);
        let d = sketch.createVector(pos.x, pos.y + res * 0.5);
        let state = getState(
          fields[x][y],
          fields[x + 1][y],
          fields[x + 1][y + 1],
          fields[x][y + 1]
        );
        sketch.stroke(255);
        sketch.strokeWeight(1);

        const cellIndexLookup = cell => {
          const cellIndex = {
            1: _ => {
              return myLine(c, d);
            },
            2: _ => {
              return myLine(b, c);
            },
            3: _ => {
              return myLine(b, d);
            },
            4: _ => {
              return myLine(a, b);
            },
            5: _ => {
              return (myLine(a, d),
                myLine(b, c));
            },
            6: _ => {
              return myLine(a, c);
            },
            7: _ => {
              return myLine(a, d);
            },
            8: _ => {
              return myLine(a, d);
            },
            9: _ => {
              return myLine(a, c);
            },
            10: _ => {
              return (myLine(a, b),
                myLine(c, d));
            },
            11: _ => {
              return myLine(a, b);
            },
            12: _ => {
              return myLine(b, d);
            },
            13: _ => {
              return myLine(b, c);
            },
            14: _ => {
              return myLine(c, d);
            }
          };

          if (typeof cellIndex[cell] !== 'function') return;

          return cellIndex[cell]();
        }

        cellIndexLookup(state)
      }
    }
  }

  function myLine(v1, v2) {
    sketch.line(v1.x, v1.y, v2.x, v2.y);
  }

  function getState(a, b, c, d) {
    return a * 8 + b * 4 + c * 2 + d * 1;
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