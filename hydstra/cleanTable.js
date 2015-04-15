var through = require('through2');

module.exports = function (){
  var retrn;
  return through(function write(buffer, _, next) {
    var ret;
    var line = buffer.toString().replace(/;$/g,"");
    console.log('line [',line,']');
    // return key not consistent from Hydstra webservice between agencies!!!
    // It's an outrage sir!!!
    for (objKey in line){
      if (!line.hasOwnProperty(objKey)){ continue; }
      switch (objKey){
        case 'return':
         ret = 'return';
         break;
        case '_return':
         ret = '_return';
         break;
      }
    }
    
    retrn = line[ret];
    next();
  },
  function end(cb){
    this.push(retrn.rows, 'utf8');
    cb();
  })
}
