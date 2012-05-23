window.addEvent('domready',function(){
	$$('[mercor-modal]').each(function(button){
		var options = JSON.decode(button.get('mercor-modal'));
		button.removeProperty('mercor-modal');
		button.addEvent('click',function(e){
			switch (options.type) {
				case 'iframe':
					var modal = new Mercor.Modal.Iframe(options);
					break;
				case 'confirm':
					var modal = new Mercor.Modal.Confirm(options);
					break;
				case 'request':
					var modal = new Mercor.Modal.Request(options);
					break;
				case 'requestHTML':
					var requestType = {'request':{'type':'html'}};
					var modal = new Mercor.Modal.Request(Object.merge(options, requestType));
					break;
				default:
					var modal = new Mercor.Modal(options);
				break;
			}
			modal.open();
			e.stop();
		});
	});
});