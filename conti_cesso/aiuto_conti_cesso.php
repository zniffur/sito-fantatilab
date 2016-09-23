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


//$url = 'http://www.pianetafantacalcio.it/Voti_Ufficiali.asp';
//$url = 'http://www.pianetafantacalcio.it/Voti-Ufficiali.asp?GiornataA=34&Tipolink=0';
$url = 'http://www.pianetafantacalcio.it/Voti-Ufficiosi.asp';

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

echo '<div class="container">';
echo '<p></p>';
echo '<a href="conti_cesso.html" class="btn btn-info btn-md" role="button">Back</a>';
echo '<h1 align="center">Voti ultima giornata</h1>';
echo '<table class="table table-bordered table-condensed"><thead><tr>';

echo "<th>Nome <th>R <th>V <th>FV <th>AE <th>Gf <th>Gs <th>Rp <th>Rs <th>Au <th>As <th>BM";

echo "</tr></thead>";
echo "<tbody>";

    
//squadre
$items = $xpath->query('//table[contains(@class,"genericodue")]');

foreach ($items as $item) { // per ogni squadra
    
    // nome squadra
    $teams = $xpath->query('tr[3]/td[2]', $item); 
    foreach  ($teams as $team) {		
        //echo $team->nodeValue; // TBD
        echo '<tr><td colspan="12" align="center"><h4>'.$team->nodeValue.'</h4></td></tr>';
    }
    
    // dati calciatori per ogni squadra
    $players = $xpath->query('tr[contains(@class,"tabella")]',$item);
    foreach  ($players as $player) { //per ogni player
        
        $dati = $player->childNodes;
        /*$i=0;
        for ($i=0;$i<=$dati->length;$i++) {
          echo $i.' '.$dati->item($i)->nodeValue.'</br>';  
        }*/
        
        $ruolo = mytrim($dati->item(0)->nodeValue);
		$nome =  $dati->item(2)->nodeValue; // no trim, altrimenti nome attaccato a cognome
        $v = mytrim($dati->item(4)->nodeValue);
        $gf = mytrim($dati->item(6)->nodeValue);
        $gs = mytrim($dati->item(8)->nodeValue);
        $au = mytrim($dati->item(10)->nodeValue);
        $as = mytrim($dati->item(12)->nodeValue); //assist dal CorrieredS
        $rs = mytrim($dati->item(34)->nodeValue);
		$rp = mytrim($dati->item(36)->nodeValue);
        
        $amm = $xpath->query('td[@class="cart-giallo"]', $player);
        $esp = $xpath->query('td[@class="cart-rosso"]', $player);
        
        $v = (float)$v;
        $bm = (float)$gf*3-(float)$gs-(float)$au*2+(float)$as+(float)$rp*3-(float)$rs*3;
        
        // stampa semplice
//        echo $nome.' '.$ruolo.' '.$v.' '.$gf.' '.$gs.' '.$au.' '.$as.' '.$rp.' '.$rs;
        $ae = '-';
        if ($amm->length > 0) {$bm = $bm -0.5; $ae='AMM';}
        if ($esp->length > 0) {$bm = $bm -1; $ae='ESP';}
//        echo ' '.$bm.' ';
//        echo '<b>'.($v + $bm).'</b>';
//        echo '</br>'; 
        
        
        // stampa tabella (riga player)
        echo '<tr>';
        echo '<td>'.$nome.'</td>';
        echo '<td>'.$ruolo.'</td>';
        echo '<td>'.$v.'</td>';
        echo '<td><b>'.($v + $bm).'</b></td>';
        echo '<td>'.$ae.'</td>';
        echo '<td>'.$gf.'</td>';
        echo '<td>'.$gs.'</td>';
        echo '<td>'.$rp.'</td>';
        echo '<td>'.$rs.'</td>';
        echo '<td>'.$au.'</td>';
        echo '<td>'.$as.'</td>';
        echo '<td>'.$bm.'</td>';
        
        echo '</tr>';
        
        // fine player        
    }
    //echo '</br>'; // fine squadra
}
//echo "-- by Zniff --";

?>
</body>
</html>
