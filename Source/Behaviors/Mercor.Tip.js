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
	}
});