/*
---

name: Mercor.Tip

description: A lightweight Mootools Class that provides tips

authors: Julien Renaux

requires: [/Mercor.Element, Core/Events, Core/Options]

provides: [Mercor.Tip]

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
			template : '<div class="mercor-arrow"></div><div class="mercor-outer"><div class="mercor-inner"><button class="mercor-close close" title="Close" type="button">×</button><div class="mercor-body"><mercor-title></mercor-title></div></div></div>',
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
		if (this.template.get('title')){
			this.template.get('title').set('html', this.element.retrieve('tip:title') || this.options.title);
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
			template : '<div class="mercor-arrow"></div><div class="mercor-outer"><div class="mercor-inner"><button class="mercor-close" title="Close">x</button><div class="mercor-header"><h3><mercor-title></mercor-title></h3></div><div class="mercor-body"><mercor-body></mercor-body></div><div class="mercor-footer"><mercor-footer></mercor-footer></div></div></div>'
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
		if (this.template.get('title')){
			this.template.get('title').set('html', this.element.retrieve('tip:title') || this.options.title);
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

Mercor.Tip.Bootstrap = Mercor.Tip.BS = new Class({

	Implements : [ Events, Options ],

	Extends : Mercor.Tip,
	
	options : { 
		node : {
			classes : 'mercor-bootstrap-element tooltip',
			template : '<div class="tooltip-arrow"></div><div class="tooltip-inner"><mercor-title></mercor-title><button class="mercor-close close" title="Close">x</button></div>'
		}
	},
	
	initialize : function(element, options) {
		this.parent(element,options);
		
	},
	
	_setupNode : function() {
		this.node.setStyles(this.options.node.styles);
		var position ='';
		switch (this.options.position) {
		case 'above':
			position = 'top';
			break;
		
		case 'below':
			position = 'bottom';
			break;

		default:
			position = this.options.position;
		}
		this.node.addClass(position);
		if (this.options.sticky) {
			this.node.addClass('mercor-tip-sticky');
		} else {
			this.template.get('close').destroy();
		}
	},

});

Mercor.Tip.Complexe.Bootstrap = Mercor.Tip.Complexe.BS = new Class({

	Implements : [ Events, Options ],

	Extends : Mercor.Tip.Complexe,
	
	options : { 
		node : {
			classes : 'mercor-bootstrap-element popover in',
			template : '<div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"><mercor-title></mercor-title><button class="mercor-close close" title="Close">x</button></h3><div class="popover-content"><mercor-body></mercor-body><br/><mercor-footer></mercor-footer></div></div>'
		}
	},
	
	initialize : function(element, options) {
		this.parent(element,options);
	},
	
	_setupNode : function() {
		this.node.setStyles(this.options.node.styles);
		var position ='';
		switch (this.options.position) {
		case 'above':
			position = 'top';
			break;
		
		case 'below':
			position = 'bottom';
			break;

		default:
			position = this.options.position;
		}
		this.node.addClass(position);
		if (this.options.sticky && this.template.get('close')) {
			this.node.addClass('mercor-tip-sticky');
			this.template.get('close').store('tip:title', this.template.get('close').getProperty('title') || 'Close');
			this.closetip = new Mercor.Tip(this.template.get('close'),{position:'below'});
		} else {
			this.template.get('close').destroy();
		}
	}
});
	
	