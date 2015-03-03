

<?php 

// require_once 'simple_html_dom.php';
require_once 'url_to_absolute.php';


function get_page($url)
{
	$ch = curl_init();
	$timeout = 5;
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	$html = curl_exec($ch);
	curl_close($ch);
	return $html;
}

$url = "http://www.fantagazzetta.com";
$html = get_page($url);

# Create a DOM parser object
$dom = new DOMDocument();

# Parse the HTML.
# The @ before the method call suppresses any warnings that
# loadHTML might throw because of invalid HTML in the page.
@$dom->loadHTML($html);

// Empty array to hold all links to return
$links = array();

$pattern = '/voti-fanta/';

# Iterate over all the <a> tags
foreach($dom->getElementsByTagName('a') as $link) {
    $links[] = array('url' => $link->getAttribute('href'), 'text' => $link->nodeValue);
    # Show the <a href>
    $l = $link->getAttribute('href');
    if (preg_match($pattern, $l ,$matches)) {
		// print_r($matches);
		$link_voti = url_to_absolute($url, $l);
		// echo $link_voti;
    	// echo "< THIS IS A MATCH !!br />";
    }
}

// echo $links[26]['url'];

# retrieve voti page
$url = $link_voti;
$html = get_page($url);
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

echo "<br>SIMO<br>";

?>


