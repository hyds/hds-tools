var through = require('through2');

module.exports = function (){
  var sites;
  return through(function write(buffer, _, next) {
    var ret;
    var line = buffer.toString().replace(/;$/g,"");
    // return key not consistent from Hydstra webservice between agencies!!!
    // It's an outrage sir!!!
    for (objKey in line){
      if (!line.hasOwnProperty(objKey)){ continue; }
      console.log('objKey [',objKey,']');
      switch (objKey){
        case 'return':
         ret = 'return';
         break;
        case '_return':
         ret = '_return';
         break;
      }
    }
    
    var ret = line[ret];
    sites = ret.sites;
    console.log('sits [',sites,']');
    next();
  },
  function end(cb){
    this.push(sites, 'utf8');
    cb();
  })
}