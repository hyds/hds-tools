var fs = require('fs');

module.exports = function (schemas){
  var tables = [];
  for (table in schemas){
    if (!schemas.hasOwnProperty(table)){ continue; }

    var definitionFile = './db/schemas/'+ table +'.json';

    fs.writeFile(definitionFile,JSON.stringify(schemas[table]),function(err){
      if (err) throw err;
      console.log("saved ["+definitionFile+"]");
    });

    tables.push(table);
  }
  return tables;
}

