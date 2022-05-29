var HTMLMediaElement = require('./HTMLMediaElement').HTMLMediaElement
class HTMLVideoElement extends HTMLMediaElement {
    constructor() {
        super('video')
    }
};

exports.HTMLVideoElement = HTMLVideoElement