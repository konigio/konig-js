var assert = require('assert');
var expect = require("chai").expect;
var rdf = require('../src/js/konig-rdf');
var IRI = rdf.IRI;
var BNode = rdf.BNode;
var Literal = rdf.Literal;
var Statement = rdf.Statement;

describe('IRI', function(){
  describe('constructor', function(){
    it('namespace with trailing slash', function(){
      var iri = new IRI('http://example.com/person/alice');
      expect(iri.localName).to.equal('alice');
      expect(iri.namespace).to.equal('http://example.com/person/');
    });
    it('namespace with trailing hash', function(){
      var iri = new IRI('http://example.com/people#alice');
      expect(iri.localName).to.equal('alice');
      expect(iri.namespace).to.equal('http://example.com/people#');
    });
  });
  describe("key()", function() {
    it('returns stringValue', function(){
      var iri = new IRI('http://example.com/person/alice');
      expect(iri.key()).to.equal(iri.stringValue);
    })
  })
});

describe('BNode', function() {
  describe('constructor', function() {
    it('value is BNode id', function(){
      var bnode = new BNode("foo");
      expect(bnode.stringValue).to.equal('_:foo');
      expect(bnode.localName).to.equal('foo');
      expect(bnode.namespace).to.equal('_:');
    });
    it("value is string of form '_:{id}'", function() {
      var bnode = new BNode("_:bar");
      expect(bnode.stringValue).to.equal('_:bar');
      expect(bnode.localName).to.equal('bar');
      expect(bnode.namespace).to.equal('_:');
    })
  })
});

describe('Literal', function(){
  describe('constructor', function() {
    it ('language string', function () {
      var literal = new Literal("cheese", "en-us");
      expect(literal.stringValue).to.equal("cheese");
      expect(literal.language).to.equal("en-us");
      expect(literal.type).to.be.null;
      expect(literal.key()).to.equal("cheese@en-us");
    });
    it('type is IRI object', function() {
      var type = new IRI("http://schema.org/Text");
      var literal = new Literal("foobar", type);
      expect(literal.stringValue).to.equal('foobar');
      expect(literal.type).to.equal(type);

    });
    it('type is IRI string', function() {
      var type = "http://schema.org/Text";
      var iri = new IRI(type);
      var literal = new Literal("foobar", type);
      expect(literal.stringValue).to.equal('foobar');
      assert.deepEqual(literal.type, iri, "bad type value");
      expect(literal.key()).to.equal("foobar^http://schema.org/Text")
    });
    it('plain-literal', function(){
      var literal = new Literal("apple");
      expect(literal.stringValue).to.equal("apple");
      expect(literal.language).to.be.null;
      expect(literal.type).to.be.null;
    });
    it('boolean value', function(){
      var literal = new Literal(true);
      expect(literal.stringValue).to.equal("true");
      expect(literal.language).to.be.null;
      expect(literal.type).to.be.null;
    });
    it('numeric value', function() {
      var literal = new Literal(1.25);
      expect(literal.stringValue).to.equal("1.25");
      expect(literal.language).to.be.null;
      expect(literal.type).to.be.null;
    });
  });
});

describe('Statement', function() {
  it('constructor', function() {
    var subject = new IRI("http://example.com/alice");
    var predicate = new IRI("http://schema.org/givenName");
    var object = new Literal("Alice");
    var statement = new Statement(subject, predicate, object);
    assert.deepEqual(statement.subject, subject, "invalid subject");
    assert.deepEqual(statement.predicate, predicate, "invalid predicate");
    assert.deepEqual(statement.object, object, "invalid object");
  });
});
