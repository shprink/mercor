/*
---

name: Behavior.Mercor.Tabs

description: Instantiates Bootstrap.Tabs based on HTML markup.

license: MIT-style license.

authors: [Aaron Newton]

requires:
 - Behavior/Behavior
 - Clientcide/Behavior.Tabs

provides: [Behavior.Mercor.Tabs]

...
*/
(function(){

	var tabs = Object.clone(Behavior.getFilter('Tabs'));

	Behavior.addGlobalFilters({
		'Mercor.Tabs': tabs.config
	});

	Behavior.setFilterDefaults('Mercor.Tabs', {
		'tabs-selector': 'a:not(.dropdown-toggle)',
		'sections-selector': '+.tab-content >',
		'selectedClass': 'active',
		smooth: false,
		smoothSize: false
	});

	Behavior.addGlobalPlugin('Mercor.Tabs', 'Mercor.Tabs.CSS', function(el, api, instance){
		instance.addEvent('active', function(index, section, tab){
			el.getElements('.active').removeClass('active');
			tab.getParent('li').addClass('active');
			var dropdown = tab.getParent('.dropdown');
			if (dropdown) dropdown.addClass('active');
		});
	});

})();