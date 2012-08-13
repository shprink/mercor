/*
---

name: Behavior.Mercor.Accordion

description: Mercor Behavior for Accordion

requires: [Behavior/Behavior, More/Fx.Accordion]

provides: [Behavior.Mercor.Accordion]

...
 */

Behavior.addGlobalFilters({
    'Mercor.Accordion' : function(element, api) {
    	var options = JSON.decode(api.get('options'));
        if (!options.onActive) options.onActive = function(toggler, element){toggler.addClass('active');};
        if (!options.onBackground) options.onBackground = function(toggler, element){toggler.removeClass('active');};
        var togglers = (api.get('togglers'))? element.getElements(api.get('togglers')) : element.getElements('.toggle');
        var sections = (api.get('togglers'))? element.getElements(api.get('sections')) : element.getElements('.section');
        if (togglers.length == 0 || sections.length == 0) api.fail('There are no togglers or sections for this accordion.');
        if (togglers.length != sections.length) api.warn('There is a mismatch in the number of togglers and sections for this accordion.');
        var accordion = new Fx.Accordion(togglers, sections, options);
        api.onCleanup(function() {
            accordion.detach();
        });
        return accordion; //note that the instance is always returned!
    }
});