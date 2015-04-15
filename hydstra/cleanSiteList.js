var through = require('through2');

module.exports = function (){
  var sites;
  var ret;
  return through({ objectMode: true },function write(buffer, _, next) {
    var line = buffer.toString().replace(/;$/g,"");
    var chunk = JSON.parse(line);
    
    // return key not consistent from Hydstra webservice between agencies!!!
    // It's an outrage sir!!!
    
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

    var retrn = chunk[ret];
    sites = retrn.sites;
    next();
  },
  function end(cb){
    this.push(sites, 'utf8');
    cb();
  })
}