/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2)


/***/ },
/* 1 */
/***/ function(module, exports) {

	
	
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
	module.exports.node = node;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var rdf = __webpack_require__(1);
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


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTY3NWY3MmY4Njc3ZTJiMDZmOTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2VudHJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9rb25pZy1yZGYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL1hTRC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBOzs7Ozs7Ozs7QUNDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCO0FBQ0EsMkVBQTBFLFVBQVU7QUFDcEYsS0FBSSxZQUFZLE9BQU8sY0FBYztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBLGdDQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxZQUFXLE9BQU8sdURBQXVELEdBQUc7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLHNCQUFzQjtBQUNqQyxZQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGFBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxjQUFjO0FBQ3pCO0FBQ0E7QUFDQSxhQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEtBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImtvbmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYTY3NWY3MmY4Njc3ZTJiMDZmOTYiLCJyZXF1aXJlKCcuL2tvbmlnLXJkZicpO1xyXG5yZXF1aXJlKCcuL1hTRCcpXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2VudHJ5LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdWYWx1ZSBUaGUgc3RyaW5nIHZhbHVlIG9mIHRoaXMgTm9kZVxyXG4gKiBAY2xhc3NcclxuICogQGNsYXNzZGVzYyBUaGUgbW9zdCBnZW5lcmljIGtpbmQgb2YgTm9kZS4gQ29uY3JldGUgc3ViY2xhc3NlcyBpbmNsdWRlIHtAbGluayBJUkl9LFxyXG4gKiB7QGxpbmsgQk5vZGV9LCBhbmQge0BsaW5rIExpdGVyYWx9LlxyXG4gKi9cclxuZnVuY3Rpb24gTm9kZShzdHJpbmdWYWx1ZSkge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBzdHJpbmcgdmFsdWUgb2YgdGhpcyBub2RlLiAgVGhlIGNvbnRlbnQgb2YgdGhpcyBmaWVsZCBkZXBlbmRzIG9uIHRoZVxyXG4gICAqICAgdHlwZSBvZiBub2RlXHJcbiAgICogQHR5cGUge3N0cmluZ31cclxuICAgKi9cclxuICB0aGlzLnN0cmluZ1ZhbHVlID0gc3RyaW5nVmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHVuaXF1ZSBrZXkgZm9yIHRoaXMgbm9kZS5cclxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgdW5pcXVlIGtleSBmb3IgdGhpcyBOb2RlXHJcbiAqL1xyXG5Ob2RlLnByb3RvdHlwZS5rZXkgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4gdGhpcy5zdHJpbmdWYWx1ZTtcclxufVxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdWYWx1ZSBUaGUgc3RyaW5nIHZhbHVlIG9mIHRoaXMgTm9kZVxyXG4gKiBAZXh0ZW5kcyBOb2RlXHJcbiAqIEBjbGFzc1xyXG4gKiBAY2xhc3NkZXNjIEdlbmVyaWMgUmVzb3VyY2U7IHRoZSBzdXBlciBjbGFzcyBvZiBJUkkgYW5kIEJsYW5rTm9kZVxyXG4gKi9cclxuZnVuY3Rpb24gUmVzb3VyY2Uoc3RyaW5nVmFsdWUpIHtcclxuICBOb2RlLmNhbGwodGhpcywgc3RyaW5nVmFsdWUpO1xyXG59XHJcblxyXG5SZXNvdXJjZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE5vZGUucHJvdG90eXBlKTtcclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbi8qKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nVmFsdWUgVGhlIGZ1bGx5LXF1YWxpZmllZCBJUkkgdmFsdWUgYXMgYSBzdHJpbmdcclxuICpcclxuICogQGNsYXNzXHJcbiAqIEBjbGFzc2Rlc2MgIEFuIFtJbnRlcm5hdGlvbmFsaXplZCBSZXNvdXJjZSBJZGVudGlmaWVyXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JbnRlcm5hdGlvbmFsaXplZF9SZXNvdXJjZV9JZGVudGlmaWVyKVxyXG4gKiBAZXh0ZW5kcyBSZXNvdXJjZVxyXG4gKi9cclxuZnVuY3Rpb24gSVJJKHN0cmluZ1ZhbHVlKSB7XHJcblxyXG4gIFJlc291cmNlLmNhbGwodGhpcywgc3RyaW5nVmFsdWUpO1xyXG4gIHZhciBkZWxpbSA9XHJcblx0XHRNYXRoLm1heChzdHJpbmdWYWx1ZS5sYXN0SW5kZXhPZignIycpLHN0cmluZ1ZhbHVlLmxhc3RJbmRleE9mKCcvJykpO1xyXG5cclxuXHRpZiAoZGVsaW0gPj0gMCkge1xyXG5cdFx0dGhpcy5sb2NhbE5hbWUgPSBzdHJpbmdWYWx1ZS5zdWJzdHJpbmcoZGVsaW0rMSk7XHJcblx0XHR0aGlzLm5hbWVzcGFjZSA9IHN0cmluZ1ZhbHVlLnN1YnN0cmluZygwLCBkZWxpbSsxKTtcclxuXHR9XHJcbn1cclxuXHJcbklSSS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFJlc291cmNlLnByb3RvdHlwZSk7XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIEVpdGhlciB0aGUgQk5vZGUgaWQgb3IgYSBzdHJpbmcgb2YgdGhlIGZvcm0gYF86e2lkfWAuXHJcbiAqXHJcbiAqIEBjbGFzc1xyXG4gKiBAY2xhc3NkZXNjIEEgQmxhbmsgTm9kZVxyXG4gKiBAZXh0ZW5kcyBSZXNvdXJjZVxyXG4gKi9cclxuZnVuY3Rpb24gQk5vZGUodmFsdWUpIHtcclxuICB0aGlzLm5hbWVzcGFjZSA9IFwiXzpcIjtcclxuICBpZiAodmFsdWUuc3RhcnRzV2l0aChcIl86XCIpKSB7XHJcbiAgICB0aGlzLnN0cmluZ1ZhbHVlID0gdmFsdWU7XHJcbiAgICB0aGlzLmxvY2FsTmFtZSA9IHZhbHVlLnN1YnN0cmluZygyKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhpcy5sb2NhbE5hbWUgPSB2YWx1ZTtcclxuICAgIHRoaXMuc3RyaW5nVmFsdWUgPSBcIl86XCIgKyB2YWx1ZTtcclxuICB9XHJcbn1cclxuXHJcbkJOb2RlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUmVzb3VyY2UucHJvdG90eXBlKTtcclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4vKipcclxuICogQW4gUkRGIFtMaXRlcmFsXShodHRwczovL3d3dy53My5vcmcvVFIvcmRmMTEtY29uY2VwdHMvI3NlY3Rpb24tR3JhcGgtTGl0ZXJhbCkuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW58bnVtYmVyfSB2YWx1ZSAgICAgICAgICBUaGUgdmFsdWUgb2YgdGhlIExpdGVyYWxcclxuICogQHBhcmFtIHsoSVJJfHN0cmluZyl9IHR5cGVPckxhbmd1YWdlIEVpdGhlciBhbiBJUkkgZm9yIHRoZSBMaXRlcmFsIHR5cGUsXHJcbiogICAgICAgICAgIGEgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIGZ1bGx5LXF1YWxpZmllZCBJUkkgZm9yIHRoZSB0eXBlLFxyXG4qICAgICAgICAgICBvciBhIHN0cmluZyB0aGF0IGdpdmVzIGEgQkNQLTQ3IGxhbmd1YWdlIGNvZGUuXHJcbiAqL1xyXG5mdW5jdGlvbiBMaXRlcmFsKHZhbHVlLCB0eXBlT3JMYW5ndWFnZSkge1xyXG5cclxuICAgIHRoaXMuc3RyaW5nVmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdHlwZSBvZiB0aGlzIExpdGVyYWwgKHR5cGljYWxseSB0aGUgSVJJIGZvciBhbiBYTUwgU2NoZW1hIGRhdGF0eXBlKS5cclxuICAgKiBAdHlwZSB7SVJJfVxyXG4gICAqL1xyXG4gIHRoaXMudHlwZSA9IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBCQ1AtNDcgY29kZSBmb3IgdGhlIGxhbmd1YWdlIGluIHdoaWNoIHRoaXMgTGl0ZXJhbCBpcyBleHByZXNzZWQuXHJcbiAgICogQHR5cGUge3N0cmluZ31cclxuICAgKi9cclxuICB0aGlzLmxhbmd1YWdlID0gbnVsbDtcclxuICBpZiAodHlwZU9yTGFuZ3VhZ2UpIHtcclxuICAgIGlmICh0eXBlT3JMYW5ndWFnZSBpbnN0YW5jZW9mIElSSSkge1xyXG4gICAgICB0aGlzLnR5cGUgPSB0eXBlT3JMYW5ndWFnZTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mKHR5cGVPckxhbmd1YWdlKSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICBpZiAodHlwZU9yTGFuZ3VhZ2UuaW5kZXhPZignOicpICE9IC0xKSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gbmV3IElSSSh0eXBlT3JMYW5ndWFnZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZSA9IHR5cGVPckxhbmd1YWdlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0aGlzLl9rZXkgPSB0aGlzLnN0cmluZ1ZhbHVlICtcclxuICAgICh0aGlzLnR5cGUgPyAnXicgKyB0aGlzLnR5cGUuc3RyaW5nVmFsdWUgOlxyXG4gICAgdGhpcy5sYW5ndWFnZSA/ICdAJyArIHRoaXMubGFuZ3VhZ2UgOlxyXG4gICAgXCJcIiApO1xyXG59XHJcblxyXG5MaXRlcmFsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoTm9kZS5wcm90b3R5cGUpO1xyXG5cclxuTGl0ZXJhbC5wcm90b3R5cGUua2V5ID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHRoaXMuX2tleTtcclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4vKipcclxuICogQ29udmVydCB0byBhbiBSREYgTm9kZS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7KHN0cmluZ3xOb2RlKX0gdmFsdWUgIFRoZSB2YWx1ZSB0aGF0IHdpbGwgYmUgY29udmVydGVkIHRvIGFuIFJERiBOb2RlLlxyXG4gKiBAcmV0dXJuIEFuIFJERiBOb2RlLiAgSWYgdGhlIHN1cHBsaWVkIHZhbHVlIGlzIGFscmVhZHkgYSBOb2RlLCB0aGVuIHRoZSBzdXBwbGllZFxyXG4gKiB2YWx1ZSBpcyByZXR1cm5lZC4gIElmIHRoZSBzdXBwbGllZCB2YWx1ZSBpcyBhIHN0cmluZywgdGhlbiBhIExpdGVyYWwgaXMgcmV0dXJuZWQuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgc3VwcGxpZWQgdmFsdWUgaXMgbm90IGEgTm9kZSBvciBhIHN0cmluZy5cclxuICpcclxuICovXHJcbmZ1bmN0aW9uIG5vZGUodmFsdWUpIHtcclxuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mKHZhbHVlKSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgcmV0dXJuIG5ldyBMaXRlcmFsKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWVcIik7XHJcbn1cclxuQk5vZGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShSZXNvdXJjZS5wcm90b3R5cGUpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMuTm9kZSA9IE5vZGU7XHJcbm1vZHVsZS5leHBvcnRzLlJlc291cmNlID0gUmVzb3VyY2U7XHJcbm1vZHVsZS5leHBvcnRzLklSSSA9IElSSTtcclxubW9kdWxlLmV4cG9ydHMuQk5vZGUgPSBCTm9kZTtcclxubW9kdWxlLmV4cG9ydHMuTGl0ZXJhbCA9IExpdGVyYWw7XHJcbm1vZHVsZS5leHBvcnRzLm5vZGUgPSBub2RlO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9rb25pZy1yZGYuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHJkZiA9IHJlcXVpcmUoJy4va29uaWctcmRmJyk7XHJcbnZhciBJUkkgPSByZGYuSVJJO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0TkFNRVNQQUNFOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hI1wiLFxyXG5cdGludCA6IG5ldyBJUkkoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hI2ludCcpLFxyXG5cdGludGVnZXIgOiBuZXcgSVJJKCdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSNpbnRlZ2VyJyksXHJcblx0ZG91YmxlIDogbmV3IElSSSgnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjZG91YmxlJyksXHJcblx0c3RyaW5nIDogbmV3IElSSSgnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjc3RyaW5nJyksXHJcblx0ZGF0ZSA6IG5ldyBJUkkoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hI2RhdGUnKSxcclxuXHRkYXRlVGltZSA6IG5ldyBJUkkoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hI2RhdGVUaW1lJylcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvWFNELmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=