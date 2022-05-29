var HTMLElement = require('./HTMLElement').HTMLElement

class DocumentElement extends HTMLElement {
    constructor() {
        super('html', 0)
    }
}

exports.DocumentElement = DocumentElement;