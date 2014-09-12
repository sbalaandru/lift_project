<?php

if (isset($_REQUEST['query']) && !empty($_REQUEST['query']) && isset($_REQUEST['type']) && !empty($_REQUEST['type'])) {
    $type = $_REQUEST['type'];
    mysql_connect("localhost", "lawinfin_lift", "icefreaker55_$") or die(mysql_error());
    mysql_select_db("lawinfin_lift_final") or die(mysql_error());
    $name = 'search';#$_REQUEST[''];
// Get Search
    $search_string = preg_replace("/[^A-Za-z0-9]/", " ", $_REQUEST['query']); //$_POST['query'] $_GET['query']

    if (strlen($search_string) >= 1 && $search_string !== ' ') {
        switch (strtolower($type)) {
            case 'legislation':
                $result = mysql_query("select a.book_id 'id',c.state_id,c.state,a.book_name 'name',a.book_icon 'url',a.published_month,monthname(a.published_month) 'month',
                b.name 'l_name',b.act_no,b.enacted_by,b.receiver_by_president_on,b.published_in,b.came_in_force,b.salient_features,b.brief_deatils,b.ref_url
                from lift_book_details a,lift_book_legislation b,state_details c where a.book_id=b.book_id and b.state_id=c.state_id and
                b.name like '%" . $search_string . "%'") or die(mysql_error());
                $match = mysql_num_rows($result);
                if ($match > 0) {
                    while ($post = mysql_fetch_object($result)) {
                        $posts[] = $post;
                    }
                    echo json_encode(array($name => $posts));
                }
                break;
            case 'caselaw':
                $result = mysql_query("select b.book_id 'id',b.book_name 'name',b.book_icon 'url',b.published_month 'year', MONTHNAME(b.published_month) 'month',c.court,a.title,
                a.context,a.question,a.answer,a.reference from lift_book_case_law a,lift_book_details b,court_details c 
                where b.book_id=a.book_id and c.court_id=a.court_id and a.question like '%" . $search_string . "%'") or die(mysql_error());
                $match = mysql_num_rows($result);
                if ($match > 0) {
                    while ($post = mysql_fetch_object($result)) {
                        $posts[] = $post;
                    }
                    echo json_encode(array($name => $posts));
                }
                break;
            case 'thoughts':

                $result = mysql_query("select b.book_id 'id',b.book_name 'name',b.book_icon 'url',b.published_month 'year', MONTHNAME(b.published_month) 'month',a.title,
                a.content,a.said_by 'author' from lift_book_details b,lift_book_thoughts a 
                where b.book_id=a.book_id and a.content  like '%" . $search_string . "%'") or die(mysql_error());
                $match = mysql_num_rows($result);
                if ($match > 0) {
                    while ($post = mysql_fetch_object($result)) {
                        $posts[] = $post;
                    }
                    echo json_encode(array($name => $posts));
                }
                break;
            default:
                break;
        }

        function display($rs, $name) {
            echo '<br />test : ' . $name;
            while ($post = mysql_fetch_object($rs)) {
                $posts[] = $post;
            }
            echo json_encode(array($name => $posts));
        }

    }
}
?>