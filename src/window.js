var DOMParser = require("./xmldom").DOMParser;
import performance from "./performance"
import { screen } from "./WindowProperties";
import location from "./location";
const events = {}
export default {
    AudioContext: function () { },
    URL: {},
    navigator: { userAgent: '' },
    performance: performance,
    screen: screen,
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
