const createP5JS = require("../../libs/p5js.miniprogram").createP5JS
var gloabal = {};
var window = {}, document = {}, canvas = {};
var p5js = {};
let sysInfo = wx.getSystemInfoSync();
let windowWidth = sysInfo.windowWidth;
let windowHeight = sysInfo.windowHeight;
var app = getApp()
Page({
  onLoad: function () {
    var query2d = wx.createSelectorQuery();
    query2d.select('#defaultCanvas0').fields({ node: true, size: true }).exec((res2d) => {
      var canvas2d = res2d[0].node;
      canvas2d.id = "defaultCanvas0"
      gloabal = createP5JS(canvas2d);
      document = gloabal.document
      canvas = gloabal.canvas
      window = gloabal.window
      window.canvas = canvas
      gloabal.screen = window.screen
      console.log(window, document, canvas)

      var p5 = require('../../libs/p5.min')(gloabal)
      console.log("psjs", p5js)

      // https://github.com/processing/p5.js/wiki/Global-and-instance-mode#when-is-global-mode-assumed
      const s = (sketch) => {
        // 此处写p5的代码
        // 针对p5的内置变量，全部从sketch里获取
        let pa = [], gr = 2, pindex = 1, chue = -23;

        sketch.setup = () => {
          sketch.createCanvas(windowWidth, windowHeight);

          sketch.background(0);
          sketch.colorMode(sketch.HSB);

          for (let i = 0; i < 2010; i++) pa.push([0.5]);
        }

        sketch.draw =  () => {
          for (let i = 0; i < 20; i++) {
            sketch.colorMode(sketch.HSB)
            let scol = sketch.color(chue, 80, 100);
            scol.setAlpha(0.5);
            sketch.stroke(scol);
            let ind = sketch.round(1000 * (gr - 2));
            pa[ind].push(pa[ind][pindex - 1] * gr * (1 - pa[ind][pindex - 1]))
            if (ind > 0) {
              sketch.line(
                sketch.round(sketch.map(gr - 0.001, 2, 4, 0, sketch.width)),
                sketch.round(sketch.map(pa[ind - 1][pindex], 0, 1, sketch.height, 0)),
                sketch.round(sketch.map(gr, 2, 4, 0, sketch.width)),
                sketch.round(sketch.map(pa[ind][pindex], 0, 1, sketch.height, 0)),
              );
            }
            gr += 0.001;
            if (gr >= 4) {
              gr = 2;
              pindex++;
              chue += 23;
              chue %= 360;
              sketch.colorMode(sketch.RGB)
              sketch.background(0, 0, 0, 20);
            }
          }
        }
      };
      p5js = new p5(s);
      p5js.dispatchEvent = function (event) {
        // console.log(event.touches[0])
        class TouchEvent {
          target = ""
          currentTarget = ""
          touches = []
          targetTouches = []
          changedTouches = []
          preventDefault = function () { }
          stopPropagation = function () { }
          constructor(type) {
            this.type = type
          }
        }
        var ratio = 1;
        const touchEvent = new TouchEvent(event.type)
        for (var i = 0; i < event.touches.length; i++) {
          event.touches[i].clientX = event.touches[i].x * ratio;
          event.touches[i].clientY = event.touches[i].y * ratio;
          event.touches[i].layerX = event.touches[i].x * ratio;
          event.touches[i].layerY = event.touches[i].y * ratio;
          event.touches[i].pageX = event.touches[i].x * ratio;
          event.touches[i].pageY = event.touches[i].y * ratio;
        }
        for (var i = 0; i < event.changedTouches.length; i++) {
          event.changedTouches[i].clientX = event.changedTouches[i].x * ratio;
          event.changedTouches[i].clientY = event.changedTouches[i].y * ratio;
          event.changedTouches[i].layerX = event.changedTouches[i].x * ratio;
          event.changedTouches[i].layerY = event.changedTouches[i].y * ratio;
          event.changedTouches[i].pageX = event.changedTouches[i].x * ratio;
          event.changedTouches[i].pageY = event.changedTouches[i].y * ratio;
        }
        touchEvent.target = canvas
        touchEvent.touches = event.touches
        touchEvent.targetTouches = Array.prototype.slice.call(event.touches)
        touchEvent.changedTouches = event.changedTouches
        touchEvent.timeStamp = event.timeStamp
        window.dispatchEvent(touchEvent)
      }
    });
  },
  touchEvent: function (e) {
    p5js.dispatchEvent(e);
  }
})