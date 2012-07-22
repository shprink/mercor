/*
---

name: Behavior.Mercor.Tip

description: Behavior for Mercor.Tip

authors: Julien Renaux

requires: [Behavior/Behavior, Mercor/Mercor.Tip]

provides: [Behavior.Mercor.Tip]

...
 */

Behavior.addGlobalFilters({
	'Mercor.Tip' : function(element, api) {
		var options = JSON.decode(api.get('options'));

		if (options.html) {
			var mercorTip = new Mercor.Tip.Complexe(element, options);
		} else {
			var mercorTip = new Mercor.Tip(element, options);
		}
		// clean up element
		element.removeProperty('title').removeProperty('data-behavior')
				.removeProperty('data-mercor-tip-options');
		return mercorTip;
	},
	'Mercor.Tip.Complexe' : function(element, api) {
		var options = JSON.decode(api.get('options'));
		var mercorTip = new Mercor.Tip.Complexe(element, options);
		// clean up element
		element.removeProperty('title').removeProperty('data-behavior')
				.removeProperty('data-mercor-tip-complexe-options');
		return mercorTip;
	},
	'Mercor.Tip.Bootstrap' : function(element, api) {
		var options = JSON.decode(api.get('options'));

		if (options.html) {
			var mercorTip = new Mercor.Tip.Complexe.Bootstrap(element, options);
		} else {
			var mercorTip = new Mercor.Tip.Bootstrap(element, options);
		}
		// clean up element
		element.removeProperty('title').removeProperty('data-behavior')
				.removeProperty('data-mercor-tip-bootstrap-options');
		return mercorTip;
	},
	'Mercor.Tip.Complexe.Bootstrap' : function(element, api) {
		var options = JSON.decode(api.get('options'));
		var mercorTip = new Mercor.Tip.Complexe.Bootstrap(element, options);
		// clean up element
		element.removeProperty('title').removeProperty('data-behavior')
				.removeProperty('data-mercor-tip-complexe-bootstrap-options');
		return mercorTip;
	}
});