<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Conti cesso</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
</head>
<body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->

<?php

function mytrim($mystring){
    $string = preg_replace("/\s/",'',$mystring);
    $string = htmlentities($string, null, 'utf-8');
    $string = str_replace("&nbsp;", "-", $string);
    return $string;
}


$url = 'http://www.pianetafantacalcio.it/Voti_Ufficiali.asp';
$url = 'http://www.pianetafantacalcio.it/Voti-Ufficiali.asp?GiornataA=34&Tipolink=0';

$ch = curl_init();
$timeout = 5;
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
$html = curl_exec($ch);
curl_close($ch);


$dom = new DOMDocument();
@$dom->loadHTML($html);
$xpath = new DOMXpath($dom);

//squadre
$items = $xpath->query('//table[contains(@class,"genericodue")]');

foreach ($items as $item) { // per ogni squadra
    
    // nome squadra
    $teams = $xpath->query('tr[2]/td[3]', $item);
    foreach  ($teams as $team) {
        echo $team->nodeValue; // TBD
    }
    echo '</br>';
    
    // dati calciatori per ogni squadra
    $players = $xpath->query('tr[contains(@class,"tabella")]',$item);
    foreach  ($players as $player) { //per ogni player
        
        $dati = $player->childNodes;
//        $i=0;
//        for ($i=0;$i<=$dati->length;$i++) {
//          echo $i.' '.$dati->item($i)->nodeValue.'</br>';  
//        }
        
        $nome =  $dati->item(4)->nodeValue; // no trim, altrimenti nome attaccato a cognome
        $ruolo = mytrim($dati->item(2)->nodeValue);
        $v = mytrim($dati->item(12)->nodeValue);
        $gf = mytrim($dati->item(14)->nodeValue);
        $gs = mytrim($dati->item(16)->nodeValue);
        $au = mytrim($dati->item(18)->nodeValue);
        $as = mytrim($dati->item(20)->nodeValue);
        $rp = mytrim($dati->item(44)->nodeValue);
        $rs = mytrim($dati->item(42)->nodeValue);
        $amm = $xpath->query('td[@class="cart-giallo"]', $player);
        $esp = $xpath->query('td[@class="cart-rosso"]', $player);
        
        $v = (float)$v;
        $bm = (float)$gf*3-(float)$gs-(float)$au*2+(float)$as+(float)$rp*3-(float)$rs*3;
            
        echo $nome.' '.$ruolo.' '.$v.' '.$gf.' '.$gs.' '.$au.' '.$as.' '.$rp.' '.$rs;
        if ($amm->length > 0) {echo ' AMM '; $bm = $bm -0.5;}
        if ($esp->length > 0) {echo ' ESP '; $bm = $bm -1;}
        echo ' '.$bm.' ';
        echo '<b>'.($v + $bm).'</b>';
        
        echo '</br>'; // fine player
                
    }
    echo '</br>'; // fine squadra
}
echo "-- by Zniff --";

?>
</body>
</html>
