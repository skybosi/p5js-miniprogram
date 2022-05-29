const { screenWidth, screenHeight, devicePixelRatio } = wx.getSystemInfoSync()

const innerWidth = screenWidth
const innerHeight = screenHeight
const screen = {
    width: screenWidth,
    height: screenHeight,
    availWidth: innerWidth,
    availHeight: innerHeight,
    availLeft: 0,
    availTop: 0,
}

module.exports = {
    innerWidth,
    innerHeight,
    screenWidth,
    screenHeight,
    devicePixelRatio,
    screen,
}