const noop = require('./util/index.js')
const Mixin = require('./util/mixin.js')
const Element = require('./Element').default
console.log("Mixin", Mixin)
console.log("Element", Element)
console.log("noop", noop)

export default class HTMLElement extends Element {

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

        Mixin.parentNode(this, level);
        Mixin.style(this);
        Mixin.classList(this);
        Mixin.clientRegion(this);
        Mixin.offsetRegion(this);
        Mixin.scrollRegion(this);
    }
}
