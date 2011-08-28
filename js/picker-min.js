/*!
 * jQuery Picker Plugin v1.0.0
 * https://github.com/johnvpetersen/jQuery-Picker-Plugin
 *
 * Copyright 2011, John V. Petersen
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes jquery-1.6.2.js
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 
 * Includes jQuery UI 1.8.16
 *
 * Copyright 2011, (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 *
 * Date: Sat Aug 27 19:25:00 2011 -0400
 */
function createOption(a,b){return $("<option></option>").val(a).html(b)}function appendOption(a,b){a.append(b)}function deselectAll(a){var b=$(domElements.picker).find("#selectOne");domElements.sourceList.bind("dblclick",function(){selectOne(b)});domElements.sourceList.append($("option",domElements.selectedList));setButtonStatus(domElements.picker)}function deselectOne(a){var b=$(domElements.picker).find("#selectOne");var c=$(domElements.selectedList).find(":selected");c.removeAttr("selected");c.bind("dblclick",function(){selectOne(b)});c.appendTo(domElements.sourceList);setButtonStatus(domElements.picker)}function selectAll(a){var b=$(domElements.picker).find("#deselectOne");domElements.selectedList.bind("dblclick",function(){deselectOne(b)});$(domElements.selectedList).append($("option",domElements.sourceList));setButtonStatus(domElements.picker)}function selectOne(a){var b=$(domElements.picker).find("#deselectOne");var c=$(domElements.sourceList).find(":selected");c.removeAttr("selected");c.bind("dblclick",function(){deselectOne(b)});c.appendTo(domElements.selectedList);setButtonStatus(domElements.picker)}function bindButtonClick(buttons){buttons.click(function(){var buttonId=$(this).attr("id");eval(buttonId+"(this);")})}function setButtonStatus(a){var b=$(a).find("#sourceListItems").find("option").length;var c=$(a).find("#selectedListItems").find("option").length;var d=a.find("button");var e=d[0];var f=d[1];var g=d[2];var h=d[3];$(d).removeClass("ui-state-disabled");if(b==0){$(e).addClass("ui-state-disabled");$(f).addClass("ui-state-disabled")}if(c==0){$(g).addClass("ui-state-disabled");$(h).addClass("ui-state-disabled")}}function loadPicker(a,b,c){var d=a.find("li").clone();var e=a.parent().html(pickerHtml()).hide();var f=e.find("#selectOne");var g=e.find("deselectOne");var h=e.find("#sourceListItems");var i=e.find("#selectedListItems");var j=-1;$(d).each(function(a,c){var d=createOption(c.value,c.innerHTML);if(b!=null&&$.inArray(c.value,b)>-1){d.bind("dblclick",function(){deselectOne(g)});appendOption(i,d)}else{d.bind("dblclick",function(){selectOne(f)});appendOption(h,d)}});bindButtonClick(e.find("button"));hydrateDomElements(e);setButtonStatus(e);e.show()}function hydrateDomElements(a){domElements.picker=a;domElements.sourceList=$(domElements.picker).find("#sourceListItems");domElements.selectedList=$(domElements.picker).find("#selectedListItems")}function pickerHtml(){return'<div id="sourceList" class="list"> <select id="sourceListItems" class="select ui-state-default" size="10"></select> </div> <div class="buttons"> <p><button id="selectAll" class="button ui-state-default">>></button></p> <p><button id="selectOne" class="button ui-state-default">></button></p> <p><button id="deselectAll" class="button ui-state-default"><< </button></p> <p><button id="deselectOne" class="button ui-state-default"><</button></p> </div> <div id="selectedList" class="list"> <select id="selectedListItems" class="select ui-state-default" size="10"></select> </div>'}(function(a){a.fn.picker=function(b){var c={selectedItems:null};if(this[0].tagName=="UL"&&a(this[0]).parent()[0].tagName=="DIV"){if(b){a.extend(c,b)}loadPicker(this,c.selectedItems)}else{a(this).html("You need to provide a UL as the data source and the UL must be contained in a DIV!!")}}})(jQuery);var domElements=function(){this.picker=null;this.picker=null;this.sourceList=null;this.selectedList=null}