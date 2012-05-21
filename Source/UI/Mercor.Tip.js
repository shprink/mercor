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

	Implements : [Events, Options],
	
	options:{		
		'container': {
			'id': 'mercor-tips-container',
			'el': ''
		},
		'fade': {
			'active': true,
			'duration': 'short',
		    'transition': 'linear',
		    'start':{
		    	'opacity': [0, 1]
		    },
		    'stop':{
		    	'opacity': [1, 0]
		    }
		},
		'styles': {
			'max-width' : 300
			/* only css here */
		},
		'location': 'right', //left, right, above, below
		'persistent': false,
		'title': 'Mercor Tip',
		'html' : 'Empty',
		'id': 'mercor-tip',
		'template':	'<div class="mercor-inner">'
			+'<div class="mercor-close" title="Close"></div>'
			+'<div class="mercor-header"></div>'
			+'<div class="mercor-body"></div>'
			+'<div class="mercor-footer"></div>'
		+'</div>',
		buttons : []
		/* Events */
		//onShow: function(){},
		//onHide:  function(){},
		//onDestroy:  function(){}
	},

	initialize: function(options){
		this.setOptions(options);
		this._injectContainer();
		this._injectNode();
		this._setupNode();
		this._addEvents();
	},

	_injectContainer: function(){
		// If the container already exist we skip this function
		this.container = $(this.options.container.id);
		if(this.container) return;
		this.container = new Element('div',{
			'id': this.options.container.id,
			'class': this.options.container.position
		}).inject(this.options.container.el || document.body,'bottom');
	},
	
	_injectNode: function(){
		if (this.node) return this.node;
		this.node = new Element('div',{
			'id': this.options.id,
			'html': this.options.template,
			'styles' : this.options.styles
		});
		this.node.inject(this.container);	
	},
	
	_injectButtons : function() {
		Array.each(this.options.buttons, function(button, index){
			new Element( (button.element || 'button'), {
				'html' :  (button.html || 'button'),
				'styles': button.styles,
				'events':{
					'click': button.event.bind(this)
				}
			}).inject(this.footer);
		}.bind(this));
	},
	
	_addEvents: function()
	{
		var o = this;
		this.buttonClose.addEvent('click',function(event){
			o.close();
			event.stop();
		});
		if (this.options.keyboard.active){
			this.keyboard = new Keyboard({
			    defaultEventType: this.options.keyboard.type
			});
			Object.each(this.options.keyboard.keys, function(action, key){
				this.keyboard.addEvent(key,action.bind(this));
			}.bind(this));
			this.keyboard.activate();
		}
	},
	
	_setupNode: function(){
		this.buttonClose = this.node.getElement('.mercor-close');
		this.header = this.node.getElement('.mercor-header');
		this.body = this.node.getElement('.mercor-body');
		this.footer = this.node.getElement('.mercor-footer');
		if (this.options.persistent) this._drag();
		this.fade = new Fx.Morph(this.node, {
			duration: this.options.fade.duration,
			transition: this.options.fade.transition
		});
	},
	
	_drag: function(){
		new Drag(this.node,{
			'handle': this.header
		});
		this.header.setStyle('cursor','move');
	},
	
	_fadeIn: function(){
		this.fade.start(this.options.fade.start);
	},
	
	_fadeOut: function(){
		this.fade.start(this.options.fade.stop);
	},
	
	_load: function(){
		this.header.set('html',this.options.title);
	},
			
	show: function(){
		this.node = $(this.options.id);
		if(this.node) return;
		this._load();
		this._fadeIn();
		this.fireEvent('show');
	},
	
	hide: function(){
		if (this.fade){
			this.fade.addEvent('onChainComplete',function(){
				this.fireEvent('hide');
			}.bind(this));
			this._fadeOut();
		}
	},

	destroy: function(){
		if(!this.node) return;
		this.node.destroy();
		this.container.destroy();
		this.fireEvent('destroy');
	}
});