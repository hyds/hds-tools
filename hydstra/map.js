var mapping = require('./mapping.json');

module.exports = function (tableDefinition) {
  var tableDef = {};
  for (fieldnumber in tableDefinition){
    if (!tableDefinition.hasOwnProperty(fieldnumber)){continue;}
    var field = tableDefinition[fieldnumber];
    for (fieldname in field ){
      if (!field.hasOwnProperty(fieldname)){continue;}
      var schemaType = {};
      var fieldDefinition = field[fieldname];
      var lcFieldname = fieldname.toLowerCase();
      var fldtype = fieldDefinition.fldtype.toUpperCase();
      var typeMapping = mapping.fldtype[fldtype];

      schemaType['type'] = typeMapping;
      schemaType.key = fieldDefinition.keyfld;
      schemaType.uppercase = fieldDefinition.uppercase;
      tableDef[lcFieldname] = schemaType;
    }
  }
  return tableDef;
}