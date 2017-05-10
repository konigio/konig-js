var assert = require("chai").assert;
var expect = require("chai").expect;
var rdf = require('../src/js/konig-rdf');
var kg = require('../src/js/konig-graph');

var Graph = kg.Graph;
var Vertex = kg.Vertex;

describe('Graph', function(){
  it('iri', function(){
    var g = new Graph();
    var a = g.iri("http://example.com/alice");

    assert.instanceOf(a, Vertex, "result is a Vertex");
    var b = g.iri("http://example.com/alice");
    expect(a).to.equal(b);

  });
});
