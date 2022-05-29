const s = (sketch) => {
  const flowers = []
  const flowers_num = 50
  const bg_color = 'white'
  const step = 12

  sketch.setup = () => {
    sketch.createCanvas(windowWidth, windowHeight)
    sketch.background(bg_color)
    sketch.colorMode(sketch.HSB, 360)
    sketch.noFill()
    for (let i = flowers_num; i--;)
      flowers[i] = sketch.createVector(sketch.random(sketch.width * .1, sketch.width * .9), sketch.random(sketch.height * .1, sketch.height * .9))
  }

  sketch.draw = () => {
    const sec = sketch.frameCount / 30
    sketch.stroke(sketch.map(sketch.sin(sec), -1, 1, 0, 360), 360, 360)
    sketch.strokeWeight(.05)
    for (let { x, y } of flowers) {
      sketch.beginShape()
      for (let i = 200; i--;) {
        let degree = sec
        for (const b of flowers) degree += sketch.atan2(b.y - y, b.x - x) * 2
        sketch.vertex(x += sketch.cos(degree) * step, y += sketch.sin(degree) * step)
        if (flowers.some(e => (e.x - x) ** 2 + (e.y - y) ** 2 < step)) break
      }
      sketch.endShape()
    }
  }
};