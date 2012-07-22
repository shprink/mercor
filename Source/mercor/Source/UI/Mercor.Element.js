/*
---

name: Mercor.Element

description: Basic Element Class

authors: Julien Renaux

requires: [/Mercor , More/Hash, Core/Events, Core/Options]

provides: [Mercor.Element]

...
 */

Mercor.Element = new Class(
		{
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
				},
				fade : {
					duration : 'short',
					transition : 'linear',
					start : {
						'opacity' : [ 0, 1 ]
					},
					stop : {
						'opacity' : [ 1, 0 ]
					}
				},
				buttons : []
			},

			// Hash Object that contains template elements'
			template : {},

			initialize : function(options) {
				this.setOptions(options);
				this.setNode();
				this.setTemplate();
				this._setupFade();
				if (this.options.buttons.length > 0	&& this.template.get('footer')) {
					this._injectButtons();
				} else {
					if (this.template.get('footer'))
						this.template.get('footer').destroy();
				}
			},

			setTemplate : function() {
				// create a hash
				// http://mootools.net/docs/more/Types/Hash
				this.template = new Hash();

				// TODO return error message
				if (!this.node)
					return;

				// set the close button element
				var close = this.node.getElement('.mercor-close');
				if (typeOf(close) == 'element')
					this.template.set('close', close);

				// set the header element
				var header = this.node.getElement('mercor-title');
				if (typeOf(header) == 'element')
					this.template.set('title', header);

				// set the body element
				var body = this.node.getElement('mercor-body');
				if (typeOf(body) == 'element')
					this.template.set('body', body);

				// set the footer element
				var footer = this.node.getElement('mercor-footer');
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

			_setupNode : function() {
				this.node.setStyles(this.options.node.styles);
			},

			_setupFade : function() {
				this.fade = new Fx.Morph(this.node, {
					duration : this.options.fade.duration,
					transition : this.options.fade.transition
				});
			},

			_fadeIn : function() {
				this.fade.start(this.options.fade.start);
			},

			_fadeOut : function() {
				this.fade.start(this.options.fade.stop);
			},

			_load : function() {
				if (this.template.get('title'))
					this.template.get('title').set('html', this.options.title);
				if (this.template.get('body'))
					this.template.get('body').set('html', this.options.html);
				this.fireEvent('complete');
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

			_injectButtons : function() {
				this.buttons = [];
				Array.each(this.options.buttons, function(button, index) {
					var event = JSON.decode(button.event).bind(this);
					var element = new Element((button.element || 'button'), {
						'html' : (button.html || 'button'),
						'class' : button.classes,
						'styles' : button.styles,
						'events' : {
							'click' : event
						}
					});
					element.inject(this.template.get('footer'));
					this.buttons[index] = {'element': element, 'event': event};
				}.bind(this));
			},

			close : function() {
				this.fireEvent('close');
			}
		});