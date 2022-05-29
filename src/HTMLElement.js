var Mixin = require('./util/mixin.js')
var noop = require('./util/index.js').noop
var Element = require('./Element').Element
console.log("Mixin", Mixin)
console.log("Element", Element)
console.log("noop", noop)

class HTMLElement extends Element {
    constructor(tagName = '', level) {
        super()

        this.className = ''
        this.children = []

        this.focus = noop
        this.blur = noop

        this.insertBefore = noop
        this.appendChild = noop
        this.removeChild = noop
        this.remove = noop

        this.innerHTML = ''

        this.tagName = tagName.toUpperCase()

        Mixin.parentNode(this, null, level);
        Mixin.style(this);
        Mixin.classList(this);
        Mixin.clientRegion(this);
        Mixin.offsetRegion(this);
        Mixin.scrollRegion(this);
    }
}

exports.HTMLElement = HTMLElement;