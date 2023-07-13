const prettier = require("@charrue/prettier")

module.exports = {
  ...prettier,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
};