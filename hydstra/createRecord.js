var through = require('through2');
var levelup = require('levelup');

var baseUrl = 'http://localhost:8080/',
    makeRequest = require('request');
    //token = '2f6b43db34b1f685c99695f85f0c0f3d'; // comes from login
    //token = '55640dcd78ecc2be1214f49e;'

    var levelup = require('levelup');
    var db = levelup('./tableSchemas');



module.exports = function (table){
  var retrn;
  return through(function write(buffer, _, next) {
    console.log('table passed in: ',table);
    var line = buffer.toString();
    var data;
    
    if (! line || line == 'undefined'){ 
        console.log('data: ', line, ', next()');
        next(); 
    }
    else{
        try { data  = JSON.parse(line); }
        catch(err) { return this.emit('data parse error',err) } 

        try { lookupSchemaID(data, 'kisters_hydstra' +'_' + table, table) }
        catch(err) { return this.emit('login error',err) } 

        retrn = 'done';
        next();
    }
  },
  function end(cb){
    this.push(retrn, 'utf8');
    cb();
  })
}


function login(data, schemaId, table){
    // Login and get a token
    makeRequest(
        {
            url: baseUrl + 'login',
            method: 'POST',
            json: {
                userName: 'admin',
                password: 'linuxminty1$'
            }
        },
        function(error, response, body){
            if (error){console.log("error: ", error)};
            var token = body.token; 
            for (row in data){
                if (!data.hasOwnProperty(row)){ continue; }
                var dat = data[row];
                var recordId;
                //console.log('dat: ', dat, ', schemaId: ',schemaId, ', token: ',token);
                try { 
                    return recordId = createRecord(dat, schemaId, token)
                }
                catch(err) { return this.emit('login error',err) } 
                
            }  
        }
    );
}

function createRecord(data, schemaId, token){
    if (typeof(data) !== 'object'){
        console.log('not an object', data)
        data = JSON.parse(data);
    }
    
    var req = {
            url: baseUrl + 'records',
            method: 'POST',
            json: {
                data: data,
                schemaId: schemaId,
                schemaVersion: 1
            },
            headers: {
                authorization: 'bearer ' + token
            }
        }; 

    makeRequest( req, function(error, response, body){
            if (error){console.log("error: ", error)};
            var recordId = body.id;
            console.log('response body: ',body);
            return response;                      
        }
    );    
}



function lookupSchemaID(dat, lookupKey,table){
    //log.info('lookupKey',lookupKey);
    db.createReadStream()
    .on('data', function (data) {
        //var dat = JSON.stringify(data).match(lookupKey)
        if (data['key'] == lookupKey){
            var schemaId = data.value;
            console.log('schemaId value: ', schemaId)
            login(dat,schemaId,table);    
        }
        // console.log('data[key]: "', data)
        // console.log('opt: "', opt)
        //console.log('dat: "', dat)
    
    })
}
