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
        
        $nome = mytrim($dati->item(4)->nodeValue);
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
    
        
        echo $nome.' '.$ruolo.' '.$v.' '.$gf.' '.$gs.' '.$au.' '.$as.' '.$rp.' '.$rs;
        if ($amm->length > 0) echo ' AMM ';        
        if ($esp->length > 0) echo ' ESP ';
        
        echo '</br>'; // fine player
                
    }
    echo '</br>'; // fine squadra
}
echo "-- by Zniff --";
exit(0);

?>