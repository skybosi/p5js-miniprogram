var Body = require('./Body').Body
var Event = require('./Event').Event
var location = require('./location').location
var DocumentElement = require('./DocumentElement').DocumentElement
var HTMLElement = require('./HTMLElement').HTMLElement

var document = {
    readyState: 'complete',
    visibilityState: 'visible', // 'visible' , 'hidden'
    hidden: false,
    fullscreen: true,
    location: location,
    scripts: [],
    style: {},
    ontouchstart: null,
    ontouchmove: null,
    ontouchend: null,
    onvisibilitychange: null,
    parentNode: null,
    parentElement: null,
    clientLeft: 0,
    clientTop: 0,
}

document.documentElement = new DocumentElement()
document.head = new HTMLElement('head')
document.body = new Body()

function onVisibilityChange (visible) {

    return function () {

        document.visibilityState = visible ? 'visible' : 'hidden';

        const hidden = !visible;
        if (document.hidden === hidden) {
            return;
        }
        document.hidden = hidden;

        const event = new Event('visibilitychange');

        event.target = document;
        event.timeStamp = Date.now();

        document.dispatchEvent(event);
    }
}

if (wx.onHide) {
    wx.onHide(onVisibilityChange(false));
}
if (wx.onShow) {
    wx.onShow(onVisibilityChange(true));
}

exports.document = document
