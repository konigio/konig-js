var sha1 = require('./sha1');

/**
 *
 * @param {string} stringValue The string value of this Node
 * @class
 * @classdesc The most generic kind of Node. Concrete subclasses include {@link IRI},
 * {@link BNode}, and {@link Literal}.
 */
function Node(stringValue) {
  /**
   * The string value of this node.  The content of this field depends on the
   *   type of node
   * @type {string}
   */
  this.stringValue = stringValue;
}

/**
 * Get the unique key for this node.
 * @return {string} The unique key for this Node
 */
Node.prototype.key = function() {
  return this.stringValue;
}


/*****************************************************************************/
/**
 *
 * @param {string} stringValue The string value of this Node
 * @extends Node
 * @class
 * @classdesc Generic Resource; the super class of IRI and BlankNode
 */
function Resource(stringValue) {
  Node.call(this, stringValue);
}

Resource.prototype = Object.create(Node.prototype);


/*****************************************************************************/
/**
 * @param {string} stringValue The fully-qualified IRI value as a string
 *
 * @class
 * @classdesc  An [Internationalized Resource Identifier](https://en.wikipedia.org/wiki/Internationalized_Resource_Identifier)
 * @extends Resource
 */
function IRI(stringValue) {

  Resource.call(this, stringValue);
  var delim =
		Math.max(stringValue.lastIndexOf('#'),stringValue.lastIndexOf('/'));

	if (delim >= 0) {
		this.localName = stringValue.substring(delim+1);
		this.namespace = stringValue.substring(0, delim+1);
	}
}

IRI.prototype = Object.create(Resource.prototype);

/*****************************************************************************/

/**
 * @param {string} value Either the BNode id or a string of the form `_:{id}`.
 *
 * @class
 * @classdesc A Blank Node
 * @extends Resource
 */
function BNode(value) {
  this.namespace = "_:";
  if (value.startsWith("_:")) {
    this.stringValue = value;
    this.localName = value.substring(2);
  } else {
    this.localName = value;
    this.stringValue = "_:" + value;
  }
}

BNode.prototype = Object.create(Resource.prototype);
/*****************************************************************************/
/**
 * An RDF [Literal](https://www.w3.org/TR/rdf11-concepts/#section-Graph-Literal).
 * @param {string|boolean|number} value          The value of the Literal
 * @param {(IRI|string)} typeOrLanguage Either an IRI for the Literal type,
*           a string containing the fully-qualified IRI for the type,
*           or a string that gives a BCP-47 language code.
 */
function Literal(value, typeOrLanguage) {

    this.stringValue = value.toString();

  /**
   * The type of this Literal (typically the IRI for an XML Schema datatype).
   * @type {IRI}
   */
  this.type = null;

  /**
   * The BCP-47 code for the language in which this Literal is expressed.
   * @type {string}
   */
  this.language = null;
  if (typeOrLanguage) {
    if (typeOrLanguage instanceof IRI) {
      this.type = typeOrLanguage;
    } else if (typeof(typeOrLanguage) === "string") {
      if (typeOrLanguage.indexOf(':') != -1) {
        this.type = new IRI(typeOrLanguage);
      } else {
        this.language = typeOrLanguage;
      }
    }
  }

  this._key = this.stringValue +
    (this.type ? '^' + this.type.stringValue :
    this.language ? '@' + this.language :
    "" );
}

Literal.prototype = Object.create(Node.prototype);

Literal.prototype.key = function() {
  return this._key;
}

/*****************************************************************************/

function Statement(subject, predicate, object) {
  this.subject = subject;
  this.predicate = predicate;
  this.object = object;
  this._key = null;
}

Statement.prototype.key = function() {
  if (!this._key) {
    var data = this.subject.key() + '|' + this.predicate.key() + '|' + this.object.key();
    this._key = sha1.hash(data);
  }
  return this._key;
}

/*****************************************************************************/
/**
 * Convert to an RDF Node.
 * @function
 * @param {(string|Node)} value  The value that will be converted to an RDF Node.
 * @return An RDF Node.  If the supplied value is already a Node, then the supplied
 * value is returned.  If the supplied value is a string, then a Literal is returned.
 * @throws {Error} If the supplied value is not a Node or a string.
 *
 */
function node(value) {
  if (value instanceof Node) {
    return value;
  }

  if (typeof(value) === "string") {
    return new Literal(value);
  }

  throw new Error("Invalid value");
}
BNode.prototype = Object.create(Resource.prototype);

module.exports.Node = Node;
module.exports.Resource = Resource;
module.exports.IRI = IRI;
module.exports.BNode = BNode;
module.exports.Literal = Literal;
module.exports.Statement = Statement;
module.exports.node = node;
