var through = require('through2').obj;

module.exports = function (){
  var retrn;
  return through(function write(buffer, _, next) {
    var ret;
    var line = buffer.toString().replace(/;$/g,"");
    var chunk;
  
    try { chunk  = JSON.parse(line); }
    catch(err) { return this.emit('error',err) } 
    
    // return key not consistent from Hydstra webservice between agencies!!!
    // It's an outrage sir!!!
    //_return": {"rows": {"QWRSITE": {"zzzzzz_11": {"RIPARIANE": {"textdb":

    for (objKey in chunk){
      if (!chunk.hasOwnProperty(objKey)){ continue; }

      switch (objKey){
        case 'return':
         ret = 'return';
         break;
        case '_return':
         ret = '_return';
         break;
      }
    }
    
    if ( !chunk[ret] ) { 
      retrn = 'undefined'; 
      next(); 
    }
    else{ 
      retrn = chunk[ret].rows;
      retrn = JSON.stringify(retrn);
      next();
    }
  },
  function end(cb){
    this.push(retrn, 'utf8');
    cb();
  })
}
