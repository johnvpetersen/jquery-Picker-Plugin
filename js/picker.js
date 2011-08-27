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
 (function( $ ){
  $.fn.picker = function(options) {
	
		var settings = {
			selectedItems : null
		};

	if (this[0].tagName == "UL" && $(this[0]).parent()[0].tagName == "DIV"){

		if (options) {
			$.extend(settings,options)
		}

   loadPicker(this,settings.selectedItems);
   
   
	}
    else
	{
	   $(this).html("You need to provide a UL as the data source and the UL must be contained in a DIV!!")
	} 
  };
})( jQuery );

function pickerHtml(){
	return "<div id=\"sourceList\" class=\"list\"> <select id=\"sourceListItems\" class=\"select ui-state-default\" size=\"10\"></select> </div> <div class=\"buttons\"> <p><button id=\"selectAll\" class=\"button ui-state-default\">&gt;&gt;</button></p> <p><button id=\"selectOne\" class=\"button ui-state-default\">&gt;</button></p> <p><button id=\"deselectAll\" class=\"button ui-state-default\">&lt;&lt; </button></p> <p><button id=\"deselectOne\" class=\"button ui-state-default\">&lt;</button></p> </div> <div id=\"selectedList\" class=\"list\"> <select id=\"selectedListItems\" class=\"select ui-state-default\" size=\"10\"></select> </div>"

}

var domElements = function() {
   this.picker = null;
   this.picker = null;
   this.sourceList = null;
   this.selectedList = null;	
}

function hydrateDomElements(destination) {
      domElements.picker = destination; 
	  domElements.sourceList = $(domElements.picker).find("#sourceListItems");
	  domElements.selectedList = $(domElements.picker).find("#selectedListItems");
}

function loadPicker(list,selectedItems,themeRoll) {

   var items = list.find('li').clone();

   var picker = list.parent().html(pickerHtml()).hide();
 
   var selectOneButton = picker.find('#selectOne');
   var deselectOneButton = picker.find("deselectOne");

   var sourceListItems = picker.find("#sourceListItems");	
   var selectedListItems = picker.find("#selectedListItems");	

   var count = -1;
   $(items).each(function(key,item) {

      var option = createOption(item.value,item.innerHTML);
	   
	    if (selectedItems != null && $.inArray(item.value,selectedItems) > -1) {
		    option.bind("dblclick",function() {deselectOne(deselectOneButton);});
		    appendOption(selectedListItems,option)
		}
	else
	{
		option.bind("dblclick",function() {selectOne(selectOneButton);});
	    appendOption(sourceListItems,option)
	}
    });	
   
   bindButtonClick(picker.find("button"));
   hydrateDomElements(picker);

   setButtonStatus(picker);

   picker.show();		

}

function setButtonStatus(destination) {
	
	var sourceLength = $(destination).find("#sourceListItems").find("option").length;
	var selectedLength = $(destination).find("#selectedListItems").find("option").length;
	var buttons = destination.find("button");
	var selectAll = buttons[0];
	var selectOne = buttons[1];
	var deselectAll = buttons[2];
	var deselectOne = buttons[3];
	
	$(buttons).removeClass('ui-state-disabled');
	
	if (sourceLength == 0)
		{
			$(selectAll).addClass('ui-state-disabled');
			$(selectOne).addClass('ui-state-disabled');
		}

	if (selectedLength == 0)
		{
			$(deselectAll).addClass('ui-state-disabled');
			$(deselectOne).addClass('ui-state-disabled');
		}
}

function bindButtonClick(buttons) {

  buttons.click(function(){
			var buttonId = $(this).attr("id");
        	eval(buttonId + "(this);");
     		});

}

function selectOne(button) {
    
    var deselectOneButton = $(domElements.picker).find('#deselectOne');

	var selectedItem = $(domElements.sourceList).find(":selected");
	selectedItem.removeAttr("selected");

	selectedItem.bind("dblclick",function() {deselectOne(deselectOneButton);});
	selectedItem.appendTo(domElements.selectedList);

	setButtonStatus(domElements.picker);
}

function selectAll(button) {


    var deselectOneButton = $(domElements.picker).find('#deselectOne');
	
    domElements.selectedList.bind("dblclick",function() {deselectOne(deselectOneButton);});
	$(domElements.selectedList).append($('option', domElements.sourceList));	

	setButtonStatus(domElements.picker);
}

function deselectOne(button) {

    var selectOneButton = $(domElements.picker).find('#selectOne');

	var deselectedItem = $(domElements.selectedList).find(":selected");
	deselectedItem.removeAttr("selected");

	deselectedItem.bind("dblclick",function() {selectOne(selectOneButton);});
	deselectedItem.appendTo(domElements.sourceList);

	setButtonStatus(domElements.picker);
}

function deselectAll(button) {

   var selectOneButton = $(domElements.picker).find('#selectOne');

	domElements.sourceList.bind("dblclick",function() {selectOne(selectOneButton);});
	domElements.sourceList.append($('option', domElements.selectedList));

	setButtonStatus(domElements.picker);
}

function appendOption(selectList,option) {
	selectList.append(option);
}

function createOption(id,text) {
   return $('<option></option>').val(id).html(text);
}