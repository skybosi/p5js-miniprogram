var noop = require('./util/index.js').noop

class Event {
    constructor(type) {

        this.cancelBubble = false
        this.cancelable = false
        this.target = null
        this.currentTarget = null
        this.preventDefault = noop
        this.stopPropagation = noop

        this.type = type
        this.timeStamp = Date.now()
    }
}

exports.Event = Event;
