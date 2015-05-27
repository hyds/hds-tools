var mapping = require('./mapping.json')
var customFields = require('./customFields.json')

module.exports = function (table){
  var definition = {}
  var properties = {}
  var required = []  
  var dbName

  for (fieldnumber in table){
    if (!table.hasOwnProperty(fieldnumber)){continue}
    var field = table[fieldnumber]
    
    for (fieldname in field ){
      if (!field.hasOwnProperty(fieldname)){continue}
      
      var property = {}
      
      var fieldDefinition = field[fieldname]
      var lcFieldname = fieldname.toLowerCase()
      var fieldType = fieldDefinition.fldtype.toUpperCase()
      var typeMapping = mapping.fldtype[fieldType]
      var maxLength = fieldDefinition.fldlen
      var decimals = fieldDefinition.flddec

      //REQUIRED array. "required": ["name", "email"]
      if (fieldDefinition.keyfld){
        required.push(lcFieldname)
      }

      //STATION pattern
      if ( ( fieldDefinition.validcode && fieldDefinition.validcode.toLowerCase() == 'siteid' ) || lcFieldname == 'station' || lcFieldname == 'site' ) {
        var valCode = fieldDefinition.validcode.toLowerCase()
        property['pattern'] = mapping.validcode['siteid']
      }      
      //HOW TO HANDLE DECIMALS?
      //"flddec": 8
      else if ( lcFieldname == 'latitude' ){
        property['pattern'] = "[-+]?(90(\.{1}[0]{1,8})?|[1-8]?[0-9](\.{1}[0-9]{1,8})?)"
      }
      else if ( lcFieldname == 'longitude' ){
        property['pattern'] = "[-]?(180(\.{1}[0]{1,8}))?|((1[0-7][]])|([1-9]?[0-9]))(\.{1}[0-9]{1,8}})?))[-]?(180(\.{1}[0]{1,8})?|(([1]?[0-7]?[0-9])|([1-9]?[0-9]))(\.{1}[0-9]{1,8})?)"
      }
      else if ( decimals > 0 ){ 
        var posNo = maxLength - decimals - 1
        var negNo = posNo - 1
        property['pattern'] = "^([-]?[0-9]{1,"+negNo+"}|[0-9]{1,"+posNo+"})(\.{1}[0-9]{0,"+decimals+"})?$"
      }

      //MAX & MIN VALIDATION
      if (! fieldDefinition.rangehi === 0 ) { property[maximum] = fieldDefinition.rangehi }
      if (! fieldDefinition.rangelo === 0 ) { property[minimum] = fieldDefinition.rangelo }

      //HOW TO HANDLE FIELD ORDER?
      //"fldnum": 10,

      //HOW TO HANDLE FIELD CASE? 
      //"uppercase": false,

      //HOW TO HANDLE DEFAULTS? 
      //property[description] = fieldDefinition.defvalue

      dbName = fieldDefinition.dbname

      for (typeMap in typeMapping ){
        if (!typeMapping.hasOwnProperty(typeMap)){continue}
        property[typeMap] = typeMapping[typeMap]
      }

      //STANDARD mapping
      property['maxLength'] = maxLength
      property['description'] = fieldDefinition.doco

      //PROPERTIES object
      properties[lcFieldname] = property

      //CUSTOM fields 
      for (fld in customFields ){
        if (!customFields.hasOwnProperty(fld)){continue}
        var fldDefinition = customFields[fld]; 
        if ( fldDefinition.required ){
          required.push(fld)
          
          delete fldDefinition.required
        }
        properties[fld] = fldDefinition
      }

    }
  }

  definition['title'] = dbName.toLowerCase()
  definition['type'] = "object"
  definition['required'] = required
  definition['properties'] = properties

  return definition
}
