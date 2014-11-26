#Submarine Cable Taps

[Documents](http://international.sueddeutsche.de/post/103543418200/snowden-leaks-how-vodafone-subsidiary-cable) published on November 25, 2014 by *Süddeutsche Zeitung* revealed more specific details about submarine cables currently tapped by GCHQ. [Previous reporting](http://www.theregister.co.uk/2014/11/26/snowden_doc_leak_lists_all_the_compromised_cables/) had made it clear that GCHQ had submarine cable taps created in collusion with companies like Vodafone and BT Cable, but not which specific cables. 

Seeing Telegeography publishes landing point maps and [submarine cable maps](http://submarinecablemap.com) it seemed like a worthwhile exercise to better understand what, exactly, the reach of GCHQ's submarine cable tapping might look like. 

##Some caution

Initial methods are very, very messy here. There's a lot of data cleanup that is probably going to need to happen. Reasons for the messiness:

- The PDF list of cables was hella dirty and it OCR-ed poorly, there's the possibility of manual cleanup errors.
- Names of cables in the GCHQ doc are not always exactly matched up to cables in the Telegeography data. I did a really sloppy table join and caught a few manual ones, but here are some cables listed in the GCHQ document that I haven't found a match for: 
	- Americas II
	- Antilles 1
	- APCN
	- Carac
	- Denmark-Russia 1
	- Guam-Phillipines
	- PEC
	- Southern Cross
	- TPC-5
	- UK-Germany 6
	- UK-Netherlands 1

What I'm saying is don't just run with this dataset, it really needs some thorough double-checking. 

##References

- Obviously so grateful that Süddeutsche Zeitung put all these documents [online](https://drive.google.com/file/d/0B9F6ub8wD7gqaDJIOEhfaG9PQzA/view).
- [pypdfocr](https://pypi.python.org/pypi/pypdfocr) is a goddamn lifesaver command line tool. Seriously. 
- [Tabula](http://tabula.technology/) is great for quick-and-dirty csv-ifying of OCR-ed PDF tables.
- [Joiner](http://github.com/mhkeller/joiner) is a nice little node module by my friend Michael Keller that lets you do the kind of table joins you want to do in GIS software but with jsons. 

##Onward

Other things I really should do: 
- Since the submarine cable map is converted from a Google Fusion Table, the geojson has all this useful information trapped inside a `description` property--specifically, all the landing points. It would be cool to rescue these!