const location = {
  href: 'game.js',
  search: "",
  pathname: "",
  reload() {
  },

  replace(href) {
    this.href = href
  },
}

exports.location = location;
