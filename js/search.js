// Search Jquery Document
$(document).ready(function(e) {
	var lifttype;
	$(window).load(function()
	{
		lifttype = $('input[type="radio"]:checked').val();
	});
	
	
	$('input[name="stype"]:radio').change(function()
	{
		$('#searchlift').val('');
		lifttype = $(this).val();
	});
	
	
	
    

$(function() {
		function log( message ) {
		  $( "<div>" ).text( message ).prependTo( "#log" );
		  $( "#log" ).scrollTop( 0 );
		}
	
		$( "#searchlift" ).autocomplete({
		  source: function( request, response ) {
			$.ajax({
			  type: "POST",
			  url: "http://54.255.134.169/streetsmart/v1/searchenginesuggested",
			  dataType: "json",
			  data: {lawtype: lifttype,word:request.term },
			  success: function(data) {
				response(data.result);
			  }
			});
		  },
	 
		  minLength: 1,
		  select: function( event, ui ) {
			log( ui.item ? "Selected: " + ui.item.label : "Nothing selected, input was " + this.value);
		  },
		  open: function() {
			$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
		  },
		  close: function() {
			$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
		  }
		});
	  });
	  
	  $('.buttonn').click(function()
	  {
		  //alert('hi...');
		  var lawtypeval = $('input[type="radio"]:checked').val();
		  var searchtext = $('#searchlift').val();
		  if(lawtypeval != "" && searchtext !=="")
		  {
			  location.href = "../search-booklist.html?lawtype="+lawtypeval+"&word="+searchtext;
			
		  }else
		  {
			  alert('Please fill your fields');
		  }
	  });
	  
});//end document ready function