<?php 

// require_once 'simple_html_dom.php';
require_once 'url_to_absolute.php';
require_once 'auto_login_2.php';

$login_url = "http://www.fantagazzetta.com/";
$url = "http://www.fantagazzetta.com/voti-fantagazzetta-serie-A";
$post_data = "__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUIMjgxMzU3NjdkGAEFSmN0bDAwJEhlYWRlck1hc3RlclBhZ2VLbm9iJFJlZ2lzdHJhemlvbmUxJE9wZW5BdXRoUHJvdmlkZXJzMSRwcm92aWRlcnNMaXN0DxQrAA5kZGRkZGRkFCsAAWQCAWRkZGYC%2F%2F%2F%2F%2Fw9kqs%2Bx9ktCq0IAe8gJ4IiLPJNmVEw%3D&__VIEWSTATEGENERATOR=8D0E13E6&__EVENTVALIDATION=%2FwEdAAcMm7hjVdh5a9Y%2FTwJYDocm5126SdI5cH%2FexPLifNENm2hKE0VpzwjgoRGZQ8MF%2FamKKzao9vFcme%2BNmQ0yf2tWGV58mExs2H6p%2FqKf4qu9Jrz8DPGBlZ4hfV7pAI%2F%2FL%2BL0Txe3QmN96w1lx2aicDsj6KHa9bYh6lS00UHc0aVnUFwbrBY%3D&ctl00%24HeaderMasterPageKnob%24LoginMasterKnob%24TextBoxUserName=pbranigade&ctl00%24HeaderMasterPageKnob%24LoginMasterKnob%24TextBoxPassword=1234abcd&ctl00%24HeaderMasterPageKnob%24LoginMasterKnob%24ButtonSubmit=Login&ctl00%24ContentPlaceHolder1%24CercaHome1%24TextBoxSearch=";

login($login_url, $post_data);

$html = grab_page($url);

$dom = new DOMDocument();

@$dom->loadHTML($html);

#print all players names

$xpath = new DOMXpath($dom);
$player_names = $xpath->query('//td[@class="n"]');
foreach ($player_names as $container) {
	// print player name
	$arr = $container->getElementsByTagName("a");
	foreach ($arr as $link) {
	    $l = $link->getAttribute('href');
	    $t = $link->nodeValue;
	    echo $t;
	}
	echo "&nbsp;&nbsp;";
	
	// next sibling: voto Milano
	$voto_container = $container->nextSibling;
	echo $voto_container->textContent, "<br />";
	// check element type for class vamm, vesp etc. 
	$p = $voto_container;
	if ($p->hasAttributes()) {
	  foreach ($p->attributes as $attr) {
	    $name = $attr->nodeName;
	    $value = $attr->nodeValue;
	    echo "Attribute '$name' :: '$value'<br />";
	  }
	}

	// Bonus calc.

	// next sibling: Gf
	// next sibling: Gr
	// next sibling: Gs
	// next sibling: Rp
	// next sibling: Rs
	// next sibling: Au, skip
	// next sibling: As, skip
	// next siblings (Roma): V, Gf, Gr, Gs, Rp, Rs, Au - all skipped
	// next sibling: As
}

// foreach($dom->getElementsByTagName('a') as $link) {

//     $l = $link->getAttribute('href');
//     $t = $link->nodeValue;
//     echo $l,"<br />";
// }

echo "<br>-- by Zniff --<br>";

?>


