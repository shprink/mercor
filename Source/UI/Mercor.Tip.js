/*
---

name: Mercor.Tip

version: 1.0

description: A lightweight Mootools Class that provides tips

authors: Julien Renaux

repository: https://github.com/shprink/mercor

requires:
- Mercor/Mercor.Element

provides: Mercor.Tip

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
		focus: false,
		trigger : {
			on : 'mouseenter',
			off : 'mouseleave'
		},
		title : 'Empty',
		node : {
			element : 'div',
			id : 'mercor-tip-container',
			classes : 'mercor-element mercor-tip',
			template : '<div class="mercor-arrow"></div><div class="mercor-outer"><div class="mercor-inner"><button class="mercor-close close" title="Close" type="button">×</button><div class="mercor-body"></div></div></div>',
			styles : {
				'z-index': 1001
			},
			offset: null // {x:0, y:0}
		}
	/* Events */
	// onShow: function(){},
	// onHide: function(){},
	// onDestroy: function(){},
	// onAttach: function(element){},
	// onDetach: function(element){}
	},

	initialize : function(element, options) {
		this.parent(options);
		this.element = element;
		if (this.element.getProperty('title')) {
			this.options.title = this.element.getProperty('title');
			this.element.removeProperty('title');
		}
		this.node.isVisible = false;
		// define basic position
		this.position = new Hash();
		this.position.set('above', {position: {x: 'center', y: 'top'}, edge: {x: 'center', y: 'bottom'}, offset: {x:0, y:-5}});
		this.position.set('below', {position: {x: 'center', y: 'bottom'}, edge: {x: 'center', y: 'top'}, offset: {x:0, y:5}});
		this.position.set('left', {position: {x: 'left', y: 'center'}, edge: {x: 'right', y: 'center'}, offset: {x:-10, y:0}});
		this.position.set('right', {position: {x: 'right', y: 'center'}, edge: {x: 'left', y: 'center'}, offset: {x:10, y:0}});
		this._addEvents();
		this._addNodeEvents();
	},

	_setupNode : function() {
		this.parent();
		this.node.addClass('arrow-' + this.options.position);
		if (this.options.sticky) {
			this.node.addClass('mercor-tip-sticky');
		} else {
			this.template.get('close').destroy();
		}
	},
	
	_setPosition: function(){
		this.node.position({
			relativeTo: this.element,
			position: this.position.get(this.options.position).position,
			edge: this.position.get(this.options.position).edge,
			offset: (this.options.node.offset)? this.options.node.offset : this.position.get(this.options.position).offset
		}); 
	},
	
	_load : function() {
		if (this.template.get('body')){
			this.template.get('body').set('html', this.element.retrieve('tip:title') || this.options.title);
		}	
	},

	_addEvents : function() {
		window.addEvent('resize', function() {
			if (this.node.isVisible) this._setPosition();
		}.bind(this));
	
		this.element.addEvent(this.options.trigger.on, function() {
			if (!this.node.isVisible) this.show();
		}.bind(this));

		if (!this.options.sticky) {
			this.element.addEvent(this.options.trigger.off, function() {
				this.hide();
			}.bind(this));
		}
		this.fireEvent('attach');
	},
	
	_addNodeEvents : function() {
		if (this.options.sticky && this.template.get('close')) {
			this.template.get('close').addEvent('click', function() {
				this.hide();
			}.bind(this));
		}
	},
	
	_removeEvents: function()
	{
		// TODO
		this.element.removeEvent(this.options.trigger.on, function() {
			this.show();
		}.bind(this));
		this.fireEvent('detach');
	},

	show : function() {
		this._setupNode();
		this._addNodeEvents();
		this._load();
		this.node.setStyle('opacity', 0);
		this._injectNode();
		this._fadeIn();
		this._setPosition();
		this.node.isVisible = true;
		this.fireEvent('show');
	},

	hide: function(){
		this.node.destroy();
		this.node.isVisible = false;
		this.fireEvent('hide');
	},
	
	destroy: function(){
		this._removeEvents();
		this.node.destroy();
		this.node.isVisible = false;
		this.fireEvent('destroy');
	}
});

Mercor.Tip.Complexe = new Class({

	Implements : [ Events, Options ],

	Extends : Mercor.Tip,
	
	options : {
		html : 'Empty',
		node : {
			element : 'div',
			id : 'mercor-tip-container',
			classes : 'mercor-element mercor-tip-complexe',
			template : '<div class="mercor-arrow"></div><div class="mercor-outer"><div class="mercor-inner"><button class="mercor-close" title="Close">x</button><div class="mercor-header"></div><div class="mercor-body"></div><div class="mercor-footer"></div></div></div>'
		}
	},
	
	initialize : function(element, options) {
		this.parent(element,options);
	},
	
	_setupNode : function() {
		this.parent();
		this.node.addClass('arrow-' + this.options.position);
		if (this.options.sticky && this.template.get('close')) {
			this.node.addClass('mercor-tip-sticky');
			this.template.get('close').store('tip:title', this.template.get('close').getProperty('title') || 'Close');
			this.closetip = new Mercor.Tip(this.template.get('close'),{position:'below'});
		} else {
			this.template.get('close').destroy();
		}
	},
	
	_addNodeEvents : function() {
		if (this.options.sticky && this.template.get('close')) {
			this.template.get('close').addEvent('click', function() {
				this.hide();
			}.bind(this));
		}
		if (this.options.buttons.length > 0	&& this.template.get('footer')) {
			this.buttons.each(function(item, index){
				item.element.addEvent('click', item.event);
			});
		}
	},
	
	_load : function() {
		if (this.template.get('header')){
			this.template.get('header').set('html', this.element.retrieve('tip:title') || this.options.title);
		}
		if (this.template.get('body')){
			this.template.get('body').set('html', this.element.retrieve('tip:text') || this.options.html);
		}
	},
	
	hide: function(){
		if (this.closetip) this.closetip.hide();
		this.node.destroy();
		this.node.isVisible = false;
		this.fireEvent('hide');
	},
	
	destroy: function(){
		if (this.closetip) this.closetip.destroy();
		this._removeEvents();
		this.node.destroy();
		this.node.isVisible = false;
		this.fireEvent('destroy');
	}
});
	
	