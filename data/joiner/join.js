var fs = require('fs'),
    joiner = require('./src/joiner.js'),
    jf = require('jsonfile');

var geo_key   = 'name';
var value_key = 'Cable';

var geo_data = JSON.parse(fs.readFileSync('submarine_cables.geojson'))

var value_data = JSON.parse(fs.readFileSync('partner_cables.json'))

var joined_data = joiner.geoJson(geo_data, geo_key, value_data, value_key, 'properties')

var file = 'joined.json'

var obj = joined_data

//var file = 'joined.geojson'
//var obj = joined_data.data

jf.writeFile(file, obj, function(err) {
 if (err) return console.log(err);
 console.log(joined_data.report.prose.summary);
})