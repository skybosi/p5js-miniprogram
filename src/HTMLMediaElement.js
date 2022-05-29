var HTMLElement = require('./HTMLElement').HTMLElement

class HTMLMediaElement extends HTMLElement {
    constructor(tagName) {
        super(tagName)
    }

    addTextTrack () { }

    captureStream () { }

    fastSeek () { }

    load () { }

    pause () { }

    play () { }
}

exports.HTMLMediaElement = HTMLMediaElement