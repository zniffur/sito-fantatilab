

// <?php

// # Use the Curl extension to query Google and get back a page of results
// $url = "http://www.fantagazzetta.com";
// $ch = curl_init();
// $timeout = 5;
// curl_setopt($ch, CURLOPT_URL, $url);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
// $html = curl_exec($ch);
// curl_close($ch);
// //echo $html;

// # Create a DOM parser object
// $dom = new DOMDocument();

// # Parse the HTML.
// # The @ before the method call suppresses any warnings that
// # loadHTML might throw because of invalid HTML in the page.
// @$dom->loadHTML($html);

// # Iterate over all the <a> tags
// foreach($dom->getElementsByTagName('a') as $link) {
//         # Show the <a href>
//         echo $link->getAttribute('href');
//         echo "<br />";
// }
// ?>


<?php 

require_once 'simple_html_dom.php';
require_once 'url_to_absolute.php';

$url = "http://www.fantagazzetta.com";
$html = file_get_html( $url );

//$link = $html->find('a[title="Voti Serie A"]', 0);

foreach ($html->find('a') as $element) {
	echo url_to_absolute($url, $element->href), "<br>\n";
}


echo "<br>SIMO<br>"


// $url = $link->attr['href'];
// $title = $link->innertext;
// echo $title, "\n", $url, "\n\n<br>";




// $items = $html->find('li[class=first]');

// foreach ($items as $item) {
// 	$link = $item->find('a',0);
// 	$url = $link->attr['href'];
// 	$title = $link->innertext;

// 	echo $title, "\n", $url, "\n\n<br>";
// }

?>