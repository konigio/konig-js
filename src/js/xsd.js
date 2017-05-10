var rdf = require('./konig-rdf');
var IRI = rdf.IRI;

module.exports = {
	NAMESPACE: "http://www.w3.org/2001/XMLSchema#",
	int : new IRI('http://www.w3.org/2001/XMLSchema#int'),
	integer : new IRI('http://www.w3.org/2001/XMLSchema#integer'),
	double : new IRI('http://www.w3.org/2001/XMLSchema#double'),
	string : new IRI('http://www.w3.org/2001/XMLSchema#string'),
	date : new IRI('http://www.w3.org/2001/XMLSchema#date'),
	dateTime : new IRI('http://www.w3.org/2001/XMLSchema#dateTime')
};
