/*
---

name: Mercor.Tip

version: 1.0

description: A lightweight Mootools Class that provides tips

authors: Julien Renaux

repository: https://github.com/shprink/mercor

requires: 
- Mootools Core/Element.Event
- Mootools More

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

Mercor.Tip = new Class({

	Implements : [ Events, Options ],

	Extends : Mercor.Element,

	options : {
		'location' : 'right', // left, right, above, below
		'sticky' : false,
		'html' : 'Empty',
		node : {
			element : 'div',
			id : 'mercor-tip-container',
			classes : 'mercor-element mercor-tip',
			template : '<div class="mercor-arrow"></div><div class="mercor-outer"><div class="mercor-inner"><button class="mercor-close close" type="button">×</button><div class="mercor-body"></div></div></div>',
			styles : {}
		}
	/* Events */
	// onShow: function(){},
	// onHide: function(){},
	// onDestroy: function(){}
	},

	initialize : function(options) {
		this.parent(options);
	},

	_injectNode : function() {
		this.node.inject(this.container);
	},

	_fadeIn : function() {
		this.fade.start(this.options.fade.start);
	},

	_fadeOut : function() {
		this.fade.start(this.options.fade.stop);
	},

	show : function() {
	},

	destroy : function() {
	}
});