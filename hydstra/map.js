var mapping = require('./mapping.json');
var lookup = require('./lookups.json');

module.exports = function (data) {
  var mappedData = {};
  for (row in data){
    if (!data.hasOwnProperty(row)){continue;}
    var row = data[row];
    for (fieldname in row ){
      if (!row.hasOwnProperty(fieldname)){continue;}
      var value = row[fieldname];
      
      var mappedFieldname = fieldname;
      if ( typeof mapping[fieldname] !== 'undefined' ){
        mappedFieldname = mapping[fieldname];
      }

      if ( lookup[value] !== 'undefined' ){
        mappedData[mappedFieldname] = lookup[value];
      }
      else {
        mappedData[mappedFieldname] = value;
      }
    }  
  }
  return mappedData;
}