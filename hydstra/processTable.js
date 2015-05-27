var mapping = require('./mapping.json');  
var fs = require('fs');

module.exports = function (tableDefinition) {
  var tableDef = {};
  var required = [];  

  /*
  for (fieldnumber in tableDefinition){
    if (!tableDefinition.hasOwnProperty(fieldnumber)){continue;}
    var field = tableDefinition[fieldnumber];
    for (fieldname in field ){
      if (!field.hasOwnProperty(fieldname)){continue;}
      
      var schemaType = {};
      var fieldDefinition = field[fieldname];
      var lcFieldname = fieldname.toLowerCase();
      var fieldtype = fieldDefinition.fldtype.toUpperCase();
      var typeMapping = mapping.fldtype[fieldtype];

      typeMapping.minLength
      typeMapping.maxLength
      typeMapping.minimum
      typeMapping.maximum
      
      "required": ["name", "email"]
      if (field.key){

        required.push(lcFieldname);
      }
      
      schemaType['type'] = typeMapping;
      schemaType.key = fieldDefinition.keyfld;
      schemaType.uppercase = fieldDefinition.uppercase;
      tableDef[lcFieldname] = schemaType;


    }
  }
  tableDef[required] = required;
  */
  //return tableDef;
  return tableDefinition;
}

/*
"type": "string",
"pattern": "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$"
"555-1212"

"pattern": "^[0-9]{real}\\.[0-9]{decimal}$" 


"fldtype" : {
      "C":{ "type": "string"}, 
      "N":{ "type": "number"},
      "D":{ "type": "string", "format": ""},
      "L":{ "type": "boolean" }
    }


"minLength": 2,
  "maxLength": 3


"minimum": 0,
  "maximum": 100,
  "exclusiveMaximum": true




  "station":{"type":"String","key":true,"uppercase":true},
  
  "station":{"type": "string","minLength": 2,"maxLength": 3,"key":true,"uppercase":true},
  "lastupdate":{"type":"Date","default":"Date.now"},
  "lastupdate":{"type":"string","format":"date-time"},


{"buff_required": 14423719, 
"buff_supplied": 15144904, 
"error_num": 0, 
"_return": { "rows": {
  "zzzzzz_081099": {"usermod": "WISYS", "stname": "KATUNGA (CBM)", "mapname": "", "timemod": 1509, "datemod": 20111111, "category11": "", "category13": "", "category2": "", "latitude": "-35.99850000", "enteredby": "", "orgcode": "CBM", "dbver38": false, "category9": "", "longitude": "145.75130000", "parent": "", "posacc": "", "timezone": "0.0", "category7": "", "local_map": "", "region": "EXT", "active": false, "barcode": "", "category8": "", "category6": "", "category14": "", "meridian": "", "category3": "", "shortname": "", "category4": "", "elevacc": "", "zone": 55, "timecreate": 0, "category10": "", "range": "", "category5": "", "quarter": "", "section": 0, "stntype": "WEA", "elev": "-5.311", "grdatum": "MGA94", "spare2": "", "category15": "", "northing": "6015499.8", "commence": 18991230, "cease": 18991230, "lldatum": "GDA94", "easting": "387450.0", "spare1": "", "owner": "HYDADM", "station": "081099", "township": "", "category1": "", "datecreate": 18991230, "category12": "", "checkedby": "", "comment": "", "usercreate": "", "qquarter": ""}, 
  */