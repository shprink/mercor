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
    'Mercor.Tip': function(element, api) {
        var mercorTip = new Mercor.Tip(element,JSON.decode(api.get('options')));
        return mercorTip;
    }
});

//Behavior.addGlobalFilters({
//    Accordion: function(element, api) {
//        var togglers = element.getElements(api.get('togglers'));
//        var sections = element.getElements(api.get('target'));
//        togglers.setStyle('background-color','red');
//        sections.setStyle('background-color','blue');
//        if (togglers.length == 0 || sections.length == 0) api.fail('There are no togglers or sections for this accordion.');
//        if (togglers.length != sections.length) api.warn('There is a mismatch in the number of togglers and sections for this accordion.');
//        var accordion = new Fx.Accordion(togglers, sections);
//        api.onCleanup(function() {
//            accordion.detach();
//        });
//        return accordion; //note that the instance is always returned!
//    }
//});