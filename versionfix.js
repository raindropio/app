var fs = require('fs');
var json = JSON.parse(fs.readFileSync(__dirname + '/package.json').toString());
var tempVer = json.version.split('.');
json.version = tempVer[0]+"."+tempVer[1]+"."+(parseInt(tempVer[2])+1);

fs.writeFileSync(__dirname+'/package.json', JSON.stringify(json,null,2));