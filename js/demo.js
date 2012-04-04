
window.addEvent('domready',function(){
	/* Index.html */
	var tabs = document.getElements('#tabs-nav li');
	var containers = document.getElements('section.first');
	
	tabs.each(function(tab, index) {
	
		// add events
		tab.addEvents({
		click : function(event) {
			event.stop();

			tabs.removeClass('active');
			tabs[index].addClass('active');

			containers.hide();
			containers[index].show();
		}
		});
	});
	containers.each(function(section){
		var subTabs = section.getElements('ul.sub-section-nav li');
		var subContainers = section.getElements('section.second');
		
		subTabs.each(function(tab, index) {
		
			// add events
			tab.addEvents({
			click : function(event) {
				event.stop();

				subTabs.removeClass('active');
				subTabs[index].addClass('active');

				subContainers.hide();
				subContainers[index].show();
			}
			});
		});
	});
	
	
	$$('.expand-link').each(function(link, offset){
		var slide = new Fx.Slide($$('.expand-content')[offset]),
		i = link.getElement('i');
		slide.hide();
		
		link.addEvent('click',function(e){
			
			
			if (i.get('class') == 'icon-plus'){
				slide.slideIn();
				i.set('class','icon-minus');
			}
			else if (i.get('class') == 'icon-minus'){
				slide.slideOut();
				i.set('class','icon-plus');
			};
			//(i.get('class') == 'icon-plus')? i.set('class','icon-minus'): i.set('class','icon-plus');
		});
		
	});
	/* Modal */
	
	$('modal-footer').addEvent('click',function(e){
		var modal = new MercorModal({
			'styles': {
				'width' : 400,
				'height' : 200
			},
			'title': 'My Modal with footer',
			'html': '<p>My HTML content</p>',
			'buttons':[{ html: 'Close', styles: {}, event: function() { this.close(); }}]
		});
		modal.open();
		e.stop();
	});
	
	$('modal-iframe').addEvent('click',function(e){
		var modal = new MercorModal.Iframe({
			'iframe':{
				'link':'http://google.com'
			}
		});
		modal.open();
		e.stop();
	});
	
	$('modal-custom').addEvent('click',function(e){
		var modal = new MercorModal.Iframe({
			'fullScreen': {
				'active': true
			},
			'iframe':{
				'link':'http://google.com'
			},
			'overlay': {
				'styles': {
					'background': 'red'
				}
			},
			'buttons':[{ html: 'Close', styles: {}, event: function() { this.close(); }},
			           { html: 'Do not click me', styles: {}, event: function() { alert('I told you not to!'); }}]
		});
		modal.open('', '');
		e.stop();
	});
	
	$('modal-confirm').addEvent('click',function(e){
		var button = this;
		var modal = new MercorModal.Confirm({
			'title': 'Confirm',
			'html': 'Do you want to change the button color?',
			'confirm':{
				'callback': function(){
					button.setStyle('background-color',['pink', 'red', 'green', 'purple'].getRandom());
				}
			}
		});
		modal.open();
		e.stop();
	});
	
	$('modal-request').addEvent('click',function(e){
		var button = this;
		var modal = new MercorModal.Request({
			'title': 'Request',
			'request':{
				'url': 'demo/data.json',
				
				'success': function(responseText){
					var  items = JSON.decode(responseText), ol = new Element('ol');
					Array.each(items, function(item, offset) {
						var li = new Element('li',{
							html: '<h1>' + item.title + '</h1><br/><span>' + item.desc + '</span>'
						});
						li.inject(ol);
					}.bind(this));
					return ol;
				}
		
			}
		});
		modal.open();
		e.stop();
	});
	
	$('modal-request-html').addEvent('click',function(e){
		var button = this;
		var modal = new MercorModal.Request({
			'title': 'HTML Request',
			'request':{
				'type': 'html',
				'url': 'demo/data.html'
			}
		});
		modal.open();
		e.stop();
	});
	/* Alert */
	
	var alert = new MercorAlert({
		'node': {
			'delay':10000,
			'opacity': 1
		}
	});
	alert.open({
		'title': 'Welcome to Mercor Library',
		'text': 'Help me creating a better product by sending feedbacks, comments or by getting involved.',
		'type': 'notice' // notice, error, success
	});
	
	$$('.alertSuccess').addEvent('click',function(e){
		var alert = new MercorAlert;
		alert.open({
			'title': 'Praesent bibendum',
			'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent bibendum, justo sit.',
			'type': 'success' // notice, error, success
		});
		e.stop();
	});
	
	$$('.alertNotice').addEvent('click',function(e){
		var alert = new MercorAlert;
		alert.open({
			'title': 'Praesent bibendum',
			'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent bibendum, justo sit.',
			'type': 'notice' // notice, error, success
		});
		e.stop();
	});
	
	$$('.alertError').addEvent('click',function(e){
		var alert = new MercorAlert;
		alert.open({
			'title': 'Praesent bibendum',
			'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent bibendum, justo sit.',
			'type': 'error' // notice, error, success
		});
		e.stop();
	});	
	
});