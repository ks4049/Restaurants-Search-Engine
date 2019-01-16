$(document).ready(() => {			
 $('#readButton').click(() => {
	 alert();
    const requestURL = 'restaurants/' + $('#searchField').val();
    console.log('making ajax request to:', requestURL);
    // From: http://learn.jquery.com/ajax/jquery-ajax-methods/
    // Using the core $.ajax() method since it's the most flexible.
    // ($.get() and $.getJSON() are nicer convenience functions)
   $.ajax({
      // all URLs are relative to http://localhost:3000/
     url: requestURL,
     type: 'GET',
     dataType : 'json', // this URL returns data in JSON format
     success: (data) => {
       console.log('You received some data!', data);
	   $('#div1').html('Successfully fetched data: ' + JSON.stringify(data));
     },
    });
	//alert();
  });
   $('.search-panel .dropdown-menu').find('a').click(function(e) {
		e.preventDefault();
		var param = $(this).attr("href").replace("#","");
		var concept = $(this).text();
		$('.search-panel span#search_concept').text(concept);
		$('.input-group #search_param').val(param);
	});
  });