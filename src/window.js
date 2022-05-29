var DOMParser = require("./xmldom").DOMParser;
var performance = require('./performance').performance
var WindowProperties = require('./WindowProperties')
var location = require('./location').location
var navigator = require('./navigator').navigator
var events = {}

var window = {
    AudioContext: function () { },
    URL: {},
    navigator: navigator,
    performance: performance,
    location: location,
    ontouchstart: true,
    DOMParser: DOMParser,
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
        const listeners = events[event.type]
        if (listeners) {
            for (let i = 0; i < listeners.length; i++) {
                listeners[i](event)
            }
        }
    }
}
Object.assign(window, WindowProperties);
module.exports = window

