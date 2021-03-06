/*
---

name: Mercor.Modal

version: 1.0

description: A lightweight Mootools Class that provides modal

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

Mercor.Modal = new Class({

	Implements : [Events, Options],
	
	options:{		
		'container': {
			'id': 'mercor-modal-container',
			'el': ''
		},
		'overlay': {
			'id': 'mercor-modal-overlay',
			'el': '',
			'styles': {
				'position': 'absolute',
				'opacity': 0.6,
				'filter': 'alpha(opacity = 90)',
				'-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=90)',
				'z-index': 999,
				'background': '#000'
			}
		},
		'spinner': {
			'classes': 'mercor-spinner',
			'message': 'Loading, please wait.',
			'styles': {
				'position': 'absolute',
				'opacity': 0.9,
				'filter': 'alpha(opacity = 90)',
				'-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=90)',
				'z-index': 999,
				'background': '#fff'
			}
		},
		'node': {
			'id': 'mercor-modal',
			'classes': '',
			'styles': {
				'width' : 800,
				'height' : 500,
				'z-index' : 1000,
				'position' : 'fixed',
				'opacity': 0
			}
		},
		'header': {
			'styles': {}
		},
		'body': {
			'styles': {
				'margin-top': 40,
				'margin-right': 5,
				'margin-bottom': 5,
				'margin-left': 5,
				'overflow': 'hidden',
				'display': 'block',
			    'position': 'absolute',
			    'height': 'auto',
			    'bottom': 0,
			    'top': 0,
			    'left': 0,
			    'right': 0
			}
		},
		'content': {
			'styles': {}
		},
		'footer': {
			'heightWithButtons': 46,
			'styles': {
				'height': 30,
				'text-align': 'left',
				'left': 5,
		    	'right': 5,
		    	'bottom': 0,
		    	'position': 'absolute'
			}
		},
		'fade': {
			'duration': 'short',
		    'transition': 'linear'
		},
		'fullScreen': {
			'active': false,
			'styles': {
				'width' : 'auto',
				'height' : 'auto',
				'max-width' : 'none',
				'max-height' : 'none',
				'bottom' : 5,
				'left' : 5,
				'right' : 5,
				'top': 5,
				'opacity': 0
			}
		},
		'keyboard': {
			'active': true,
			'type': 'keydown',
			'keys': {
				'esc': function() {this.close();}
			}
		},
		'bootstrap': {
			'active': false,
			'title': '<h3>Mercor Modal</h3>',
			'node': {
				'id': 'mercor-modal-custom',
				'classes': 'modal',
				'styles': {
					'margin' : 0
				}
			},
			'template':'<div class="close mercor-close" title="Close"></div>'
				+'<div class="modal-header mercor-header"></div>'
				+'<div class="modal-body mercor-body"></div>'
				+'<div class="modal-footer mercor-footer"></div>',
			'footer': {
				'heightWithButtons': 61,
				'styles': {
					'height': 30,
					'left': 0,
			    	'right': 0
				}
			},
			'body': {
				'styles': {
					'margin-top': 46,
					'margin-bottom': 1,
					'margin-right': 1,
					'margin-left': 1,
					'padding':15
				}
			},
		},
		onOpen: null,
		onClose: null,
		onFadeIn: null,
		onFadeOut: null,
		onRequest: null,
		onFailure: null,
		onSuccess: null,
		onComplete: null,
		'type': null, // can be iframe,confirm,request,requestHTML or null
		'draggable': true,
		'html' : 'Empty',
		'htmlError' : 'Something wrong happened.',
		'title': 'Mercor Modal',
		'template':	'<div class="mercor-inner">'
			+'<div class="mercor-close" title="Close"></div>'
			+'<div class="mercor-header"></div>'
			+'<div class="mercor-body"></div>'
			+'<div class="mercor-footer"></div>'
		+'</div>',
		buttons : []
	},

	initialize: function(options){
		this.setOptions(options);
		// bootstrap support
		if (this.options.bootstrap.active) Object.merge(this.options, this.options.bootstrap);
		this._injectContainer();
		this._injectOverlay();
		this.screen = document.body.getSize();
		this.top = (this.screen.y - this.options.node.styles.height) / 2;
		this.left = (this.screen.x - this.options.node.styles.width) / 2;
	},

	
	
	_injectOverlay: function(){
		this.overlay = new Mask(this.options.overlay.el,{
			id: this.options.overlay.id,
			style: this.options.overlay.styles
		});
	},
	
	_injectSpinner: function(){
		this.spinner = new Spinner(this.body, {
			'class': this.options.spinner.classes,
			message: this.options.spinner.message,
			style: this.options.spinner.styles,
			fxOptions:{
				duration: 500
			}
		});
		this.spinnerImage = this.node.getElement('.spinner-img');
		this.spinnerMessage = this.node.getElement('.spinner-msg');
	},
	
	_injectButtons : function() {
		Array.each(this.options.buttons, function(button, index){
			new Element( (button.element || 'button'), {
				'html' :  (button.html || 'button'),
				'class' : button.classes,
				'styles': button.styles,
				'events':{
					'click': button.event.bind(this)
				}
			}).inject(this.footer);
		}.bind(this));
	},
	
	_drag: function(){
		new Drag(this.node,{
			'handle': this.header
		});
		this.header.setStyle('cursor','move');
	},
	
	_failure: function(){
		this.spinner.show();
		this.spinnerImage.set('class','error-img');
		this.spinnerMessage.set('html', this.options.htmlError);
	},
	
	_addEvents: function()
	{
		var o = this;
		this.overlay.addEvent('click', function(event) {
			o.close();
			event.stop();
		});
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
		//TODO handle resize event
		/*
		this.resizeEvent = this.options.constrain ? function(e) {
			this._resize();
			}.bind(this) : function() {
			this._position();
			}.bind(this);
			window.addEvent('resize',this.resizeEvent);
			*/
	},
	
	_setupNode: function(){
		this.buttonClose = this.node.getElement('.mercor-close');
		this.header = this.node.getElement('.mercor-header');
		this.body = this.node.getElement('.mercor-body');
		this.footer = this.node.getElement('.mercor-footer');
		this.content = new Element('div', {
			'styles': this.options.content.styles
		});
		this.header.setStyles(this.options.header.styles);
		this.body.setStyles(this.options.body.styles);
		this.footer.setStyles(this.options.footer.styles);	
		if (this.options.draggable && !this.options.fullScreen.active) this._drag();
		
		// TODO Find another way to handle footer
		if (this.options.buttons.length > 0){
			this.body.setStyle('margin-bottom', this.options.footer.heightWithButtons);
			this._injectButtons();
		}
		else{
			this.footer.destroy();
		}
		this.fade = new Fx.Morph(this.node, {
			duration: this.options.fade.duration,
			transition: this.options.fade.transition
		});
		this._setSizes();
	},
	
	_setSizes: function(){
		
		if (this.options.fullScreen.active){
			this.node.setStyles(this.options.fullScreen.styles);
		}
		else{
			this.node.setStyles({left : this.left});
		}
		this._fadeIn();
	},
	
	_fadeIn: function(){
		if (this.options.fullScreen.active){
			this.fade.start({'opacity': [0, 1]});
		}
		else {
			this.fade.start({
			    'opacity': [0, 1],
			    'top': [this.top -50, this.top]
			});
		}
		this.fireEvent('fadeIn');
	},
	
	_fadeOut: function(){
		var position = this.node.getPosition();
		if (this.options.fullScreen.active){
			this.fade.start({'opacity': [1,0]});
		}
		else{
			this.fade.start({
			    'opacity': [1,0],
			    'top': [position.y, position.y + 50]
			});
		}
		this.fireEvent('fadeOut');
	},
	
	_loadStart: function(){
		this.content.fade('hide');
		this.spinner.show();
	},

	_load: function(){
		this.header.set('html',this.options.title);
		this.content.set('html',this.options.html);
		this.content.inject(this.body);
		this.fireEvent('complete');
	},
	
	_loadStop: function(){
		this.spinner.hide();
		var fade = function(){
			this.content.fade('in');
		}.bind(this);
		fade.delay(500);
	},
		
	open: function(){
		this.node = $(this.options.node.id);
		if(this.node) return;
		this.overlay.show();
		this._injectNode();
		this._setupNode();
		this._injectSpinner();
		this._addEvents();
		this._load();
		this.fireEvent('open');
	},

	close: function(){
		if (this.fade){
			this.fade.addEvent('onChainComplete',function(){
		    	this.overlay.hide();
				if(!this.node) return;
				this.node.destroy();
				this.container.destroy();
				this.overlay.destroy();
			}.bind(this));
			this._fadeOut();
		}
		this.fireEvent('close');
	}
});

Mercor.Modal.Confirm = new Class({
	
	Extends: MercorModal,

	Implements : [Events, Options],
	
	options:{
		'node': {
			'styles': {
				'width' : 230,
				'height' : 120
			}
		},
		'confirm':{
			'callback': function(){alert('You clicked yes!');}
		},
		'title': 'Confirm',
		'html': 'Are you sure?',
		'buttons':[{ html: 'Yes', styles: {}, event: function() { this.options.confirm.callback(); this.close(); }},
		           { html: 'No', styles: {}, event: function() { this.close(); }}]
	},
	
	initialize: function(options){
		this.parent(options);
	}
});

Mercor.Modal.Iframe = new Class({
	
	Extends: MercorModal,

	Implements : [Events, Options],
	
	options:{
		'iframe': {
			'url': 'http://mercor.julienrenaux.fr/library.html',
			'styles': {
		        width: '100%',
		        height: '100%',
		        border: '0px'
			}
	    }
	},
	
	initialize: function(options){
		this.parent(options);
	},
	
	_setupNode: function(){
		this.parent();
		this.content = new IFrame({
		    events: {
		    	load: function() {
		    		this._loadStop();
		    		this.content.fade('in');
		    		this.fireEvent('complete');
		    	}.bind(this)
		    }
		});
	},
	
	_load: function(){
		this._loadStart();
		this.header.set('html',this.options.title);
		this.content.set('src',this.options.iframe.url);
		this.content.setStyles(this.options.iframe.styles);
		this.content.inject(this.body);
	}
});

Mercor.Modal.Request = new Class({
	
	Extends: MercorModal,

	Implements : [Events, Options],
	
	options:{
		'request': {
			'type': null,
			'url': '',
			'method': 'get',
			'asynch': true,
			'data': '',
			'success': function(responseText, body){body.set('text', responseText);}
	    }
	},
	
	initialize: function(options){
		this.parent(options);
	},
	
	_load: function() {
		this.header.set('html',this.options.title);
		var requestOptions = {
			url : this.options.request.url,
			data : this.options.request.data,
			async : this.options.request.async,
			method : this.options.request.method,
			onRequest: function(){
				this._loadStart();
				this.fireEvent('request');
			}.bind(this),
			onSuccess: function(responseText){
				this.options.request.success(responseText).inject(this.content);
				this.fireEvent('success');
			}.bind(this),
			onFailure: function() {
				this._failure();
				this.fireEvent('failure');
			}.bind(this),
			onComplete: function() {
				this.content.inject(this.body);
				this._loadStop();
				this.fireEvent('complete');
			}.bind(this)
		};
		switch (this.options.request.type) {
		case 'html':
			var requestOptionsHTML = {
				update : this.content,
				onSuccess: function(responseTree, responseElements, responseHTML, responseJavaScript){
					this.fireEvent('success');
				}.bind(this)
			};
			this.request = new Request.HTML(Object.merge(requestOptions,requestOptionsHTML));
		break;

		default:
			this.request = new Request(requestOptions);
		break;
		}
		this.request.send();
	}

});