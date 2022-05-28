
import { atob } from './Base64';
import XMLHttpRequest from './XMLHttpRequest'
import window from './window'
var DOMParser = require("./xmldom").DOMParser;
import TouchEvent from "./touchEvent"
import performance from "./performance"
import { screen } from './WindowProperties';

export function createP5JS (canvas, stageWidth, canvas2d) {
    let ratio = stageWidth / canvas.width;
    let evtArr = {};
    canvas.style = { width: canvas.width + 'px', height: canvas.height + 'px' }
    canvas.parentElement = true;
    canvas.getBoundingClientRect = function () {
        return { left: 0, top: 0, right: canvas.width, bottom: canvas.height, width: canvas.width, height: canvas.height };
    };
    canvas.addEventListener = function (eventName, eventFun) {
        window.addEventListener(eventName, eventFun);
    }
    canvas.removeEventListener = function (eventName, eventFun) {
        window.removeEventListener(eventName, eventFun);
    }
    if (canvas2d) {
        canvas2d.addEventListener = function () { }
        canvas2d.removeEventListener = function () { }
    }
    window.performance = performance
    const requestAnimationFrame = canvas.requestAnimationFrame;
    const cancelAnimationFrame = canvas.cancelAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;
    const HTMLVideoElement = function () { };
    const HTMLCanvasElement = function () { };
    const HTMLImageElement = function () { };
    const MouseEvent = function () { };
    const navigator = {
        userAgent: ""
    };
    const Image = function () {
        let img = canvas.createImage();
        img.crossOrigin = "";
        return img;
    }
    const document = {
        clientLeft: 0,
        clientTop: 0,
        body: {
            clientLeft: 0,
            clientTop: 0,
        },
        createElement (tagName) {
            tagName = tagName.toLowerCase();

            switch (tagName) {
                case "canvas":
                    return canvas2d;
                case "img":
                case "image":
                    let img = canvas.createImage();
                    img.crossOrigin = "";
                    return img;
                case "a":
                    return { href: "" }
            }
        },
        createElementNS (nameSpace, tagName) {
            return this.createElement(tagName);
        },
        createTextNode (text) {
            // TODO: Do we need the TextNode Class ???
            return text;
        },

        getElementById (id) {
            if (id === window.canvas.id) {
                return window.canvas
            }
            return null
        },
        getElementsByTagName (tagName) {
            tagName = tagName.toLowerCase();
            if (tagName === 'head') {
                return [document.head]
            } else if (tagName === 'body') {
                return [document.body]
            } else if (tagName === 'canvas') {
                return [window.canvas]
            }
            return []
        },
        getElementsByTagNameNS (nameSpace, tagName) {
            return this.getElementsByTagName(tagName);
        },
        getElementsByName (tagName) {
            if (tagName === 'head') {
                return [document.head]
            } else if (tagName === 'body') {
                return [document.body]
            } else if (tagName === 'canvas') {
                return [window.canvas]
            }
            return []
        },
        querySelector (query) {
            if (query === 'head') {
                return document.head
            } else if (query === 'body') {
                return document.body
            } else if (query === 'canvas') {
                return window.canvas
            } else if (query === `#${window.canvas.id}`) {
                return window.canvas
            }
            return null
        },
        querySelectorAll (query) {
            if (query === 'head') {
                return [document.head]
            } else if (query === 'body') {
                return [document.body]
            } else if (query === 'canvas') {
                return [window.canvas]
            }
            return []
        },
        //#### for p5js
        /**
         * Confirms if the window a p5.js program is in is "focused," meaning that
         * the sketch will accept mouse or keyboard input. This variable is
         * "true" if the window is focused and "false" if not.
         */
        hasFocus () {
            return true;
        }
    };
    window.document = document;
    // eslint-disable-next-line
    const atob = (a) => {
        return atob(a)
    }
    window.screen = screen;
    __INJECT_P5JS__
    p5js.dispatchEvent = function (event) {
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
    return p5js
}