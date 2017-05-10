var rdf = require('./konig-rdf');
var xsd = require('./xsd')

var IRI = rdf.IRI;

/*****************************************************************************/

function node(individual) {
  var id = rdf.node(individual);
  if (id) return id;

  if (individual instanceof Vertex) {
    return individual.id;
  }
  return null;
}

/*****************************************************************************/
/**
 * @class
 * @classdesc A Graph that contains a collection of Vertices connected by edges
 * which are called Statements.
 */
function Graph() {

  this.vertexMap = {};



}
/**
 * Register an IRI with this graph.
 * @param  {string|IRI|Vertex} value The fully-qualified IRI string value, an IRI object, or a Vertex.
 * @return {Vertex}  The Vertex object for the specified IRI value.
 */
Graph.prototype.iri = function(value) {

  var id = null;
  if (typeof(value)==="string") {
    id = new IRI(value);
  } else if (value instanceof IRI) {
    id = value;

  } else if (value instanceof Vertex) {
    id = value.id;
    if (!(id instanceof IRI)) {
      throw new Error("Invalid value: " + id.stringValue);
    }
  }

  var result = this.vertexMap[id.stringValue];
  if (!result) {
    result = new Vertex(id, this);
    this.vertexMap[id.stringValue] = result;
  }
  return result;
}



/*****************************************************************************/
/**
 * Create a Vertex.  This constructor should not be called directly.  Instead,
 * use the factory methods on the Graph.
 * @param {Resource} id    The RDF Resource that this Vertex represents.
 * @param {Graph} graph  The Graph within which this Vertex is contained.
 *
 * @class
 * @classdesc
 * A Vertex represention of an RDF Resource.  This object provides methods
 * to perform vertex-centric graph traversals using a programming model
 * inspired by [Apache TinkerPop](https://tinkerpop.apache.org/).
 */
function Vertex(id, graph) {
  this.id = id;
  this.graph = graph;
  this.statementMap = {};
}

module.exports.Graph = Graph;
module.exports.Vertex = Vertex;
