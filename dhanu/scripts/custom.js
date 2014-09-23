/* JS File */

// Start Ready
$(document).ready(function() {
    var url = "http://lawinfingertips.com/dhanu/search.php";
   // Icon Click Focus
    $('div.icon').click(function() {
        $('input#search').focus();
    });

    // Live Search
    // On Search Submit and Get Results
    function search() {
        var query_value = $('input#search').val();
        var stype = $('input:radio[name=stype]:checked').val();        
        //alert(stype);
        var n = 0,datas;
        $('b#search-string').html(query_value);
        if (query_value !== '') {
            $.ajax({
                type: "POST",
                url: url,
                data: {query: query_value,type:stype},
                cache: false,
                success: function(html) {
                    //$('p#srs').html(html);
                    var obj = jQuery.parseJSON(html);
                    n = obj.search.length;
                    if (n >= 1) {
                        for (var i = 0; i <= n; i++) {
                            datas="id="+obj.search[i].id+'&name='+obj.search[i].name+'&img='+obj.search[i].url+'&month='+obj.search[i].month+'&date='+obj.search[i].published_month;
                            
							   $("ul#results").append('<li onclick="test(this)"id="' + datas + '" > <img src="' + obj.search[i].url+'" width="50" height="70" style=" border:2px solid #cecece; " />\n\
                            '  +'<div style=" margin-bottom:30px; float:right; padding-top:25; font-size:13px; font-family:Open Sans;">' +'<br>'+'<br>' +obj.search[i].name +  '</div>' +'  </li>');
							    }
                        $("ul#results").listview("refresh");                    }
                }
            });
        }
        return false;

    }

    $("input#search").live("keyup", function(e) {
        $("ul#results").empty();
        // Set Timeout
        clearTimeout($.data(this, 'timer'));
        // Set Search String
        var search_string = $(this).val();

        // Do Search
        if (search_string == '') {
            $("ul#results").fadeOut();
            $('h4#results-text').fadeOut();
        } else {
            $("ul#results").fadeIn();
            $('h4#results-text').fadeIn();
            $(this).data('timer', setTimeout(search, 100));
        }
        ;
    });

});

function test(obj) {
    document.location.href="../lift-screen-1.html?"+obj.id;
    //alert(obj.id);
}
$('ul#results').children('li').on('click', function() {
    alert("hi");
});
