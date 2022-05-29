var Node = require('./Node').Node
console.log("Node", Node)
class Element extends Node {
    constructor() {
        super()

        this.className = ''
        this.children = []
    }

    setAttribute(name, value) {
        this[name] = value
    }

    getAttribute(name) {
        return this[name]
    }

    setAttributeNS(name, value) {
        this[name] = value
    }

    getAttributeNS(name) {
        return this[name]
    }
}

exports.Element = Element;