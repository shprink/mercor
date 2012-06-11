/*
---

name: Mercor.Element

version: 1.0

description: A lightweight UI Library for Mootools

authors: Julien Renaux

repository: https://github.com/shprink/mercor

license: MIT

Copyright (c) 2012 Julien Renaux <contact@julienrenaux.fr>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

...
 */

Mercor.Element = new Class({

	Implements : [ Events, Options ],

	options : {
		container : {
			element : 'div',
			id : '',
			classes : '',
			styles : {}
		},
		node : {
			element : 'div',
			id : '',
			classes : '',
			template : '',
			styles : {}
		}
	},

	// Hash Object that contains template elements'
	template : {},

	initialize : function(options) {
		this.setOptions(options);
		this.setNode();
		this.setTemplate();
	},

	setTemplate : function() {
		// create a hash
		// http://mootools.net/docs/more/Types/Hash
		this.template = new Hash();

		// TODO return error message
		if (this.node)
			return;

		// set the close button element
		var close = this.node.getElement('.mercor-close');
		if (typeOf(close) == 'element')
			this.template.set('close', close);

		// set the header element
		var header = this.node.getElement('.mercor-header');
		if (typeOf(header) == 'element')
			this.template.set('header', header);

		// set the body element
		var body = this.node.getElement('.mercor-body');
		if (typeOf(body) == 'element')
			this.template.set('body', body);

		// set the footer element
		var footer = this.node.getElement('.mercor-footer');
		if (typeOf(footer) == 'element')
			this.template.set('footer', footer);
	},

	setNode : function() {
		// create the basic node
		this.node = new Element(this.options.node.element, {
			'id' : this.options.node.id,
			'class' : this.options.node.classes,
			'html' : this.options.node.template,
			'styles' : this.options.node.styles
		});
	},

	_injectNode : function() {
		// if a container exist load the node inside it
		// if not load directly the node in the document
		this.node.inject(this.container || document.body, 'bottom');
	},

	_injectContainer : function() {
		this.container = new Element(this.options.container.element, {
			'id' : this.options.container.id,
			'class' : this.options.node.classes,
			'styles' : this.options.node.styles
		}).inject(document.body, 'bottom');
	},
});