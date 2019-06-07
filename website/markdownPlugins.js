module.exports = [
  /**
   * Enable some defaults on the Markdown class
   */
  function enableInlineRuler(md) {
    md.inline.ruler.enable([
      'sub',
      'sup'
    ]);
  },
];
