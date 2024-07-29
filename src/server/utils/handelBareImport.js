
const { bare_prefix } = require('./const')

exports.transformBareImport = function (str) {
  return str.replace(/ from ['"](.+)['"]/g, function(s1, s2) {
    if (s2.startsWith('/') || s2.startsWith('./') || s2.startsWith('../')) {
      return s1
    } else {
      return ` from "${bare_prefix}/${s2}"`
    }
  })
}

