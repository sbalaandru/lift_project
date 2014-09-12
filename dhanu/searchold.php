<?php

mysql_connect("localhost", "creativ4_lift", "icefreaker55_$") or die(mysql_error());
mysql_select_db("creativ4_lift") or die(mysql_error());

// Get Search
$search_string = preg_replace("/[^A-Za-z0-9]/", " ", $_POST['query']);//$_POST['query'] $_GET['query']

if (strlen($search_string) >= 1 && $search_string !== ' ') {
    $result = mysql_query("select a.book_id'id',a.book_name 'name',book_icon 'url',b.category_id 'c_id',a.published_month 'p_m',
    MONTHNAME(a.published_month) 'month',c.category,b.sub_category_id 's_id',d.sub_category,b.sub_title
    from lift_book_details a,lift_book_contents b,category c,sub_category d where a.book_id=b.book_id and b.category_id=c.category_id and
    b.sub_category_id=d.sub_category_id  and b.sub_title like '%" . $search_string . "%'") or die(mysql_error());
    $match = mysql_num_rows($result);
    if ($match > 0) {
        display($result, 'search');
    }
}

function display($rs, $name) {
    while ($post = mysql_fetch_object($rs)) {
        $posts[] = $post;
    }
    echo json_encode(array($name => $posts));
}

?>