function getMoviesJsonTest() {
    module("When using the getMoviesJson function");

    var movieCallBackFunction = function(data){
		   test("Given that all movies are requested", function() {
		   expect(1);
	       equal(data.length,3,"The expected number and actual number of movies are equal");
        });
	};  

    getMoviesJson("movies.json",movieCallBackFunction);
}


function getMoviesTest() {
	
	
    var movieEndPoint = "movies.json";
    var expectedNumberOfMovies = 3;
    var actualNumberOfMovies = null;
    var movieCallBackFunction = function(data){actualNumberOfMovies = data.length;};   
	
	
	module("When using the getMovies1 function");
	
	test("Given that all movies are requested", function() {
		
		expect(1);

	    var movies = getMovies1(movieEndPoint);

	    actualNumberOfMovies = movies.length;
	
	    equal(actualNumberOfMovies,expectedNumberOfMovies,"The expected number and actual number of movies are equal");

    });

		module("When using the getMovies2 function");


		test("Given that all movies are requested", function() {

			expect(1);

		    var movies = getMovies2(movieEndPoint);

		    actualNumberOfMovies = movies.length;
		    equal(actualNumberOfMovies,expectedNumberOfMovies,"The expected number and actual number of movies are equal");

	    });




   module("When using the getMovies4 function");

	test("Given that all movies are requested", function() {

		expect(1);



	    getMovies4(movieEndPoint,movieCallBackFunction);

	    equal(actualNumberOfMovies,expectedNumberOfMovies,"The expected number and actual number of movies are equal");

   });

}

function createOptionTest() {

	module("When using the createOption function");
	
	test("Given that an id and text are supplied", function() {
		
		expect(4);

		var expectedOptionValue = "1";
		var expectedOptionText = "OptionText";
		var expectedHtml =  "<option value=\"1\">OptionText</option>";
		var expectedTagName = "OPTION";
	    var actualHtml = null;

	    var option = createOption(expectedOptionValue,expectedOptionText);
	    actualHtml = $("<div></div>").html(option).html();
		
	    equal(option[0].value,expectedOptionValue,"The option will have the correct value");
	    equal(option[0].text,expectedOptionText,"The option will have the correct text");
	    equal(actualHtml,expectedHtml,"The correct HTML Option will be created");
	    equal(option[0].tagName,expectedTagName,"The option will have the correct tag");
    });
}

function appendOptionTest() {
	
	module("When using the appendOption function");
    
    var picker = $("<div id = \"picker\"></div>");

    picker.load("pickerFragment.html", function() {
		
   	   test("Given that an option has been created", function() {

  	      expect(1);

  	       var option = createOption("1","OptionText");
	       
		   var expectedHtml = "<option value=\"1\">OptionText</option>"

  	       var selectedList = $(picker).find("#selectedListItems");
		   var sourceList = $(picker).find("#sourceListItems");
		    
		   appendOption(sourceList,option);

		   var actualHtml = sourceList.html();

		   equal(actualHtml,expectedHtml,"The option will be appended to the source list.");
	   });
    });
}

function selectOptionTest() {	
	
	module("When using the appendOption function");
    
    var picker = $("<div id = \"picker\"></div>");

    picker.load("pickerFragment.html", function() {
		
   	   test("Given that an option has been selected", function() {

  	      expect(1);

  	       var option = createOption("1","OptionText");

		   $(option).attr("selected","selected");

           option.bind("dblclick",function() {selectOne();});
	       
		   var expectedHtml = "<option value=\"1\">OptionText</option>"

  	       var selectedList = $(picker).find("#selectedListItems");
		   var sourceList = $(picker).find("#sourceListItems");
		    
		   appendOption(sourceList,option);

		   var buttons = picker.find("button");		  
           setButtonStatus(picker);
           bindButtonClick(buttons);

		   $(buttons[1]).click();


		   var actualHtml = sourceList.html();

		   equal(actualHtml,expectedHtml,"The option will be appended to the source list.");
	   });
    });
}


function preselectedItemsTest() {
   
	module("When loading the picker plugin");


   var html = "<div id=\"picker\"><ul id=\"pickerDataSource\"><li value=\"1\">Star Wars</li><li value=\"2\">Jaws</li><li value=\"3\">Planet of the Apes</li></ul></div>"
   var picker = $(html);

   picker.find("#pickerDataSource").picker({selectedItems: [1,2]});

   var sourceList = $(picker).find("#sourceListItems"); 
   var selectedList = $(picker).find("#selectedListItems");
   var expectedSourceListCount = 1;
   var expectedSelectedListCount = 2;
   
	test("Given that 2 pre-selcted items where specified", function() {
        expect(2);

		equal(sourceList[0].options.length,expectedSourceListCount,"The initial source list count will be correct");
		equal(selectedList[0].options.length,expectedSelectedListCount,"The initial selected list count will be correct");

	});
	
}


function nonConformingElementTest() {
	
	module("When attempting to load the html picker to a non-conforming element");
    var html = "<div></div>";	
    var picker = $(html);
	var expectedHtml = "You need to provide a UL as the data source and the UL must be contained in a DIV!!"

	test("Given that the picker plugin has been invoked", function() {
        expect(1);

		picker.picker();
		
		equal(picker.html(),expectedHtml,"The error message will properly display.");
	});
}


function loadPickerTest() {
	module("When loading the html picker");
	
   var html = "<div id=\"picker\"><ul id=\"pickerDataSource\"><li value=\"1\">Star Wars</li><li value=\"2\">Jaws</li><li value=\"3\">Planet of the Apes</li></ul></div>"

   var picker = $(html);

   picker.find("#pickerDataSource").picker();

	 test("Given that a destination, picker html and data source have been provided.", function() {

		 var sourceList = $(picker).find("#sourceListItems"); 
		 var selectedList = $(picker).find("#selectedListItems"); 

  	    expect(2);
		
	    equal(sourceList[0].options.length,3,"The source list will have three options");
	    equal(selectedList[0].options.length,0,"The selected list will have no options");
	 });

	 test("Given that the first item is selected", function() {

		 var sourceList = $(picker).find("#sourceListItems"); 
		 var selectedList = $(picker).find("#selectedListItems"); 

		 expect(1);

         $(sourceList[0].options[0]).attr("selected","selected");
		
		 var selectedItem = $(sourceList).find(":selected");
		
	    equal($(selectedItem).attr("selected"),"selected","The selected attribute has been properly set.");
	 });

	 test("Given that the first item is selected and the selectOne Button is clicked", function() {

		 var sourceList = $(picker).find("#sourceListItems"); 
		 var selectedList = $(picker).find("#selectedListItems"); 

		 expect(2);

		var selectOne = $(picker).find("#selectOne");
		selectOne.click();
		
		var selectedItem = $(sourceList).find(":selected");
		
	    equal(selectedList[0].options.length,1,"The selected list will have one option");
	    equal(sourceList[0].options.length,2,"The source list will have two options");
	 });
	
	
	
	
	
	
}