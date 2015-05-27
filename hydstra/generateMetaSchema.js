var metaTransform = require('./metaTransform.js')
var through = require('through2').obj

module.exports = function (){
  var schemas = {}
  return through(function write(objBuffer, _, next) {
    var mastdict = objBuffer
    
    for (table in mastdict){
      if (!mastdict.hasOwnProperty(table)){ continue }
      var tableDefinition = mastdict[table]
      var lcTable = table.toLowerCase()
      schemas[lcTable] = metaTransform(tableDefinition)    
    }
    next()
  },
  function end(cb){
    this.push(schemas, 'utf8')
    cb()
  })
}