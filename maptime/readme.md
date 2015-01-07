#Maptime Tutorial 1/14/15 Notes

##All The Things Used For This Map
- PDF &rarr; json
	- [pypdfocr](https://pypi.python.org/pypi/pypdfocr): command-line tool for converting image PDFs into OCR PDFs. 
	- [Tabula](http://tabula.technology): tool for converting OCR PDFs into csvs
	- [csvtojson](https://www.npmjs.com/package/csvtojson): command-line tool that does what it sounds like it does.
- Google Fusion Tables &rarr; geoJSON
	- [togeojson](https://www.npmjs.com/package/togeojson): tool for converting .gpx and .kml files into geojson
- join geoJSON to JSON
	- [joiner](https://github.com/mhkeller/joiner): tool for joining geojson and json data. also outputs a report summarizing matches and non-matches in your join. 
- filter geoJSONs 
	- [CartoDB](http://cartodb.com): because I am very, very lazy and PostGIS still scares me a little bit	
