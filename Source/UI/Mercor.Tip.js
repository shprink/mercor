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
		position : 'above', // left, right, above, below
		sticky : false,
		'html' : 'Empty',
		offset: null, // {x:0, y:0}
		node : {
			element : 'div',
			id : 'mercor-tip-container',
			classes : 'mercor-element mercor-tip',
			template : '<div class="mercor-arrow"></div><div class="mercor-outer"><div class="mercor-inner"><button class="mercor-close close" title="Close" type="button">×</button><div class="mercor-body"></div></div></div>',
			styles : {}
		}
	/* Events */
	// onShow: function(){},
	// onHide: function(){},
	// onDestroy: function(){},
	// onAttach: function(element){},
	// onDetach: function(element){},
	},

	initialize : function(element, options) {
		this.parent(options);
		this.element = element;
		
		// define basic position
		this.position = new Hash();
		this.position.set('above', {position: {x: 'center', y: 'top'}, edge: {x: 'center', y: 'bottom'}, offset: {x:0, y:-5}});
		this.position.set('below', {position: {x: 'center', y: 'bottom'}, edge: {x: 'center', y: 'top'}, offset: {x:0, y:5}});
		this.position.set('left', {position: {x: 'left', y: 'center'}, edge: {x: 'right', y: 'center'}, offset: {x:-10, y:0}});
		this.position.set('right', {position: {x: 'right', y: 'center'}, edge: {x: 'left', y: 'center'}, offset: {x:10, y:0}});
	},

	_fadeIn : function() {
		this.fade.start(this.options.fade.start);
	},

	_fadeOut : function() {
		this.fade.start(this.options.fade.stop);
	},

	_setupNode: function(){
		this.node.setStyles(this.options.node.styles);
		this.node.addClass('arrow-' + this.options.position);
		if (this.options.sticky)
		{
			this.node.addClass('mercor-tip-sticky');
		}
		else
		{
			this.template.get('close').destroy();
		}
	},

	_attach: function(){

	},

	_detach: function(){

	},
	
	_setPosition: function(){
		this.node.position({
			relativeTo: this.element,
			position: this.position.get(this.options.position).position,
			edge: this.position.get(this.options.position).edge,
			offset: (this.options.offset)? this.options.offset : this.position.get(this.options.position).offset
		}); 
	},
	
	_addEvents: function()
	{
		// re-set the node position
		window.addEvent('resize',function(){
			this._setPosition();
		}.bind(this));
	},

	show : function() {
		this._setupNode();
		this._load();
		this._injectNode();
		this._setPosition();
		this._addEvents();
		this.fireEvent('show');
	},

	hide: function(){
		this.fireEvent('hide');
	}
});