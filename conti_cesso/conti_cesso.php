<?php

function mytrim($mystring){
    $string = preg_replace("/\s/",'',$mystring);
    $string = htmlentities($string, null, 'utf-8');
    $string = str_replace("&nbsp;", "-", $string);
    return $string;
}

function get_all_stats_from_fg() {
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

	//echo "Nome V AE Gf Gr Gs Rp Rs Au As BM TOT<br/>";


	$obj = array();

    //squadre
    $items = $xpath->query('//table[contains(@class,"genericodue")]');
	foreach ($items as $item) { // per ogni squadra
        
		// dati calciatori per ogni squadra
        $players = $xpath->query('tr[contains(@class,"tabella")]',$item);
		
        foreach  ($players as $player) { //per ogni player
			
            $dati = $player->childNodes;

            $nome =  $dati->item(4)->nodeValue; // no trim, altrimenti nome attaccato a cognome
            $ruolo = mytrim($dati->item(2)->nodeValue);
            $v = mytrim($dati->item(12)->nodeValue);
            $gf = mytrim($dati->item(14)->nodeValue);
            $gs = mytrim($dati->item(16)->nodeValue);
            $au = mytrim($dati->item(18)->nodeValue);
            $as = mytrim($dati->item(30)->nodeValue); //assist dal CorrieredS
            $rp = mytrim($dati->item(44)->nodeValue);
            $rs = mytrim($dati->item(42)->nodeValue);
            $amm = $xpath->query('td[@class="cart-giallo"]', $player);
            $esp = $xpath->query('td[@class="cart-rosso"]', $player);

            $v = (float)$v;
            $bm = (float)$gf*3-(float)$gs-(float)$au*2+(float)$as+(float)$rp*3-(float)$rs*3;

            $ae = '-';
            if ($amm->length > 0) {$bm = $bm -0.5; $ae='AMM';}
            if ($esp->length > 0) {$bm = $bm -1; $ae='ESP';}

			$obj[$nome] = array(($bm + $v), $v, $ae, $gf, $gs, $rp, $rs, $au, $as, $bm);
		}// fine player
	} // fine squadra
	return $obj;
}


$stats = get_all_stats_from_fg();

header('Content-type: text/javascript');

// return JSON structure
$json = array(
	'success' => false,
	'result' => "",
	'riserve' => ""
);

if(isset($_POST['frmz'],$_POST['fSquadra'])){
	$obj = json_decode($_POST['frmz']);
	$sq = json_decode($_POST['fSquadra']);

	$json['success'] = true;

	// $result = array(
	// 	'Nome' => $obj[1]->{'Nome'},
	// 	'SquadraDiA' => $obj[1]->{'SquadraDiA'},
	// 	'fSquadra' => $sq
	// 	);
	$result = array();
	$riserve = array();

	for ($i=1; $i < count($obj); $i++) { 
        // per ogni calciatore delle formazioni della giornata (frmz)
        // se è della squadra fSquadra e se è titolare o riserva (Pos>0)
		if ($obj[$i]->{'IDSquadra'} == $sq && $obj[$i]->{'Pos'} >= 0) {

			// $result[$obj[$i]->{'Nome'}] = $obj[$i]->{'Pos'};

			// ruolo
			$tmpruo = $obj[$i]->{'Ruolo'};
			switch ($tmpruo) {
				case '1':
					$ruo = 'P';
					break;
				case '2':
					$ruo = 'D';
					break;
				case '3':
					$ruo = 'C';
					break;
				case '4':
					$ruo = 'A';
					break;
			}

			// strippa il cognome da $obj[$i]->{'Nome'}
			$cogn_nome = $obj[$i]->{'Nome'};
			$pieces = explode(" ", $cogn_nome);
			$cogn = $pieces[0];
			# gestione eccezioni cognomi
			if ($cogn == 'DE'||$cogn=='DI') $cogn = $cogn." ".$pieces[1];
			if ($cogn == 'DONNARUMMA') $cogn = 'DONNARUMMA G.';
			if ($cogn == 'MARIO') $cogn = $cogn." ".$pieces[1];
			if ($cogn == 'JUAN') $cogn = 'JUAN JESUS';
			//if ($cogn == 'FELIPE') $cogn = 'FELIPE MELO';
			if ($cogn == 'DIAKITE') $cogn = 'DIAKITE\'';
			if ($cogn_nome == 'ROMAGNOLI Alessio') $cogn = 'ROMAGNOLI A.';
			if ($cogn_nome == 'ROMAGNOLI Simone') $cogn = 'ROMAGNOLI S.';
			if ($cogn_nome == 'PISANO Eros') $cogn = 'PISANO E.';
			if ($cogn == 'DIOUSSE') $cogn = 'DIOUSSE\'';
            if ($cogn == 'BARRETO') $cogn = 'BARRETO E.';
            if ($cogn_nome == 'FERNANDES Bruno Miguel') $cogn = 'FERNANDES';
            //if ($cogn_nome == 'GOMEZ Juan Ignacio') $cogn = 'JUANITO GOMEZ';
            if ($cogn_nome == 'SANSONE Nicola Domenico') $cogn = 'SANSONE N.';
            if ($cogn_nome == 'LOPEZ Maximiliano Gaston') $cogn = 'MAXI LOPEZ';
            if ($cogn_nome == 'ZAPATA Cristian') $cogn = 'ZAPATA C.';
            if ($cogn_nome == 'ZAPATA Duvan') $cogn = 'ZAPATA D.';
            if ($cogn_nome == 'PERES Bruno da Silva') $cogn = 'PERES';
            if ($cogn == 'FLORO') $cogn = 'FLORO FLORES';
            if ($cogn == 'IAGO') $cogn = 'IAGO FALQUE';
			if ($cogn_nome == 'GONZALEZ Giancarlo') $cogn = 'GONZALEZ G.';
			if ($cogn_nome == 'RODRIGUEZ Gonzalo Javier') $cogn = 'RODRIGUEZ GO';
			if ($cogn_nome == 'ALONSO Marcos') $cogn = 'MARCOS ALONSO';
			if ($cogn_nome == 'VALERO Borja Iglesias') $cogn = 'BORJA VALERO';
			if ($cogn_nome == 'KEITA Balde Diao') $cogn = 'KEITA B.';
			if ($cogn_nome == 'MELO Felipe') $cogn = 'FELIPE MELO';
			if ($cogn_nome == 'EL KADDOURI Omar') $cogn = 'EL KADDOURI';
			if ($cogn_nome == 'ALEX SANDRO Lobo Silva') $cogn =  'ALEX SANDRO';
			if ($cogn_nome == 'CIOFANI Daniel') $cogn =  'CIOFANI D.';
			if ($cogn_nome == 'KEITA Seydou') $cogn =  'KEITA S.';
			if ($cogn_nome == 'ALVAREZ Ricardo Gabriel') $cogn =  'ALVAREZ R.';
			if ($cogn_nome == 'EL SHAARAWY Stephan') $cogn =  'EL SHAARAWY';
			if ($cogn_nome == 'M\'POKU Paul-Jose') $cogn =  'MPOKU';

			// cercalo in $stats
		    $tmpstats = $stats[$cogn];
		    
            // se il calciatore ha statistiche su pianetafantacalcio
		    if (!(empty($tmpstats))) {
                // prepend ruolo a $tmpstats
		    	array_unshift($tmpstats, $ruo);

                // assegna le stats per quel calciatore al nome in result
                $pos = $obj[$i]->{'Pos'};
                if ($pos == 0) {
                    array_unshift($tmpstats, $pos);
                    $result[$obj[$i]->{'Nome'}] = $tmpstats;
                } else {
                    // prepende a ruolo+tmpstats la posizione del calciatore nella lista delle riserve 
                    array_unshift($tmpstats, $pos);
                    $riserve[$obj[$i]->{'Nome'}] = $tmpstats;
                }
            } else {
                // il calciatore non ha statistiche. Riempio result o riserve con 
                // la posizione, ruolo  e tutti '-'
                // result(Nome -> POS Ruo FV V AE Gf Gs Rp Rs Au As BM, ...)
                $pos = $obj[$i]->{'Pos'};
                if ($pos == 0) {
                    $result[$obj[$i]->{'Nome'}] = array($pos, $ruo, "-","-","-","-","-","-","-","-","-","-");
                } else {
                    $riserve[$obj[$i]->{'Nome'}] = array($pos, $ruo, "-","-","-","-","-","-","-","-","-","-");
                }
            }

			//$result[$obj[$i]->{'Nome'}] = $cogn;
			// $result['Aguirre'] = $tmpstats;
		}
	}

    // result(Nome -> POS Ruo FV V AE Gf Gr Gs Rp Rs Au As BM, ...)
	$json['result'] = $result;
    // riserve(Nome -> POS Ruo FV V AE Gf Gr Gs Rp Rs Au As BM, ...)
	$json['riserve'] = $riserve;
}

echo json_encode($json);
//echo json_encode($stats);

?>
