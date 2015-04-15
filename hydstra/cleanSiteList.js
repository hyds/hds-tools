var through = require('through2');

module.exports = function (){
  var sites;
  return through({ objectMode: true },function write(buffer, _, next) {
    var ret;
    //var line = buffer.toString();
    // return key not consistent from Hydstra webservice between agencies!!!
    // It's an outrage sir!!!
    console.log('line [',buffer,']');
    for (objKey in buffer){
      if (!buffer.hasOwnProperty(objKey)){ continue; }
      switch (objKey){
        case 'return':
         ret = 'return';
         break;
        case '_return':
         ret = '_return';
         break;
      }
    }

    var ret = buffer[ret];
    sites = ret.sites;
    console.log('sits [',sites,']');
    next();
  },
  function end(cb){
    this.push(sites, 'utf8');
    cb();
  })
}