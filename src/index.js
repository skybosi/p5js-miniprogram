
var window = require('./window')
var doc = require('./document').document
var Mixin = require('./util/mixin.js')
var screen = require('./WindowProperties').screen
var atob = require('./Base64').atob
var TouchEvent = require('./touchEvent').TouchEvent
var HTMLElement = require('./HTMLElement').HTMLElement
var HTMLVideoElement = require('./HTMLVideoElement').HTMLVideoElement

module.exports.createP5JS = function (canvas) {
    canvas.style = { width: canvas.width + 'px', height: canvas.height + 'px' }
    canvas.parentElement = true;
    canvas.getBoundingClientRect = function () {
        return { left: 0, top: 0, right: canvas.width, bottom: canvas.height, width: canvas.width, height: canvas.height };
    };
    console.log("window", window)
    canvas.addEventListener = function (eventName, eventFun) {
        window.addEventListener(eventName, eventFun);
    }
    canvas.removeEventListener = function (eventName, eventFun) {
        window.removeEventListener(eventName, eventFun);
    }

    const requestAnimationFrame = canvas.requestAnimationFrame;
    const cancelAnimationFrame = canvas.cancelAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;
    window.canvas = canvas;
    window.screen = screen;
    screen = screen;

    // 构造doucument
    var document = doc
    console.log("document", document)
    Object.assign(document, {
        createElement (tagName) {
            tagName = tagName.toLowerCase();
            console.log('DEBUG: createElement(' + tagName + ')');
            switch (tagName) {
                case "canvas":
                    return canvas;
                case "img":
                case "image":
                    var img = canvas.createImage();
                    img.crossOrigin = "";
                    return img;
                case "video":
                    return new HTMLVideoElement()
                case "a":
                    return { href: "" }
                default:
                    return new HTMLElement(tagName)
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
        addEventListener (type, listener) {
            if (!events[type]) {
                events[type] = []
            }
            events[type].push(listener)
        },
        removeEventListener (type, listener) {
            const listeners = events[type]

            if (listeners && listeners.length > 0) {
                for (let i = listeners.length; i--; i > 0) {
                    if (listeners[i] === listener) {
                        listeners.splice(i, 1)
                        break
                    }
                }
            }
        },
        dispatchEvent (event) {
            const type = event.type;
            const listeners = events[type]

            if (listeners) {
                for (let i = 0; i < listeners.length; i++) {
                    listeners[i](event)
                }
            }

            if (event.target && typeof event.target['on' + type] === 'function') {
                event.target['on' + type](event)
            }
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
    });
    window.document = document;
    // eslint-disable-next-line
    window.atob = (a) => {
        return atob(a)
    }
    Mixin.parentNode(canvas, document);
    Mixin.style(canvas);
    Mixin.classList(canvas);
    Mixin.clientRegion(canvas);
    Mixin.offsetRegion(canvas);
    Mixin.dataset(canvas);// add for p5js
    // return p5js
    console.log("DEBUG: load ok!")
    return {
        window,
        screen,
        document,
        canvas
    }
}