<?php

function mytrim($mystring){
    $string = preg_replace("/\s/",'',$mystring);
    $string = htmlentities($string, null, 'utf-8');
    $string = str_replace("&nbsp;", "-", $string);
    return $string;
}

function get_all_stats_from_fg() {
	
	// test
    //$url = 'http://www.pianetafantacalcio.it/Voti_Ufficiali.asp';
    //$url = 'http://www.pianetafantacalcio.it/Voti-Ufficiali.asp?GiornataA=34&Tipolink=0';
	//$url = 'http://www.pianetafantacalcio.it/Voti-Ufficiosi.asp?GiornataA=5&Tipolink=0';

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
		$players = $xpath->query('tr[contains(@class,"portiere-tabella") or contains(@class,"difensore-tabella") or contains(@class,"centrocampista-tabella") or contains(@class,"attaccante-tabella") ]',$item);
		
        foreach  ($players as $player) { //per ogni player
			
            $dati = $player->childNodes;

			$ruolo = mytrim($dati->item(0)->nodeValue);
			
            $nome_ext =  $dati->item(2)->childNodes;  // 2016: cella nome contiene altri dati
            // nodo figlio 0 contiene il nome del calciatore
            $nometmp = $nome_ext->item(0)->nodeValue; // no trim, altrimenti nome attaccato a cognome
			//$pieces = explode(" ", $nometmp);
			//$nome = $pieces[0]; // solo cognome (NOTA: PER MOLTI CALCIATORI FUNZIONA)
            $nome = $nometmp; // cognome + iniziale nome + '.' BUFFON G.

            // ammonizioni e espulsioni
            if ($nome_ext->item(4)) {
                // attributo class del 4o nodo figlio di $nome_ext contiene i cartellini
                $aec = $nome_ext->item(4)->attributes->getNamedItem("class")->nodeValue;
                $amm = 0;
                $esp = 0;
                if ($aec == 'cart-giallo') {$amm=-0.5;$ae='AMM';}
                if ($aec == 'cart-rosso') {$esp=-1;$ae='ESP';}
            } else {
                $ae = '-';
                $amm = 0;
                $esp = 0;
            }

			$v = mytrim($dati->item(4)->nodeValue);
			$gf = mytrim($dati->item(6)->nodeValue);
			$gs = mytrim($dati->item(8)->nodeValue);
			$au = mytrim($dati->item(10)->nodeValue);
			$as = mytrim($dati->item(12)->nodeValue); //assist dal CorrieredS
			$rs = mytrim($dati->item(34)->nodeValue);
			$rp = mytrim($dati->item(36)->nodeValue);
			

            $v = (float)$v;
            $bm = (float)$gf*3-(float)$gs-(float)$au*2+(float)$as+(float)$rp*3-(float)$rs*3+(float)$amm+(float)$esp;;
			
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

	for ($i=1; $i < count($obj); $i++) {  // per ogni calciatore delle formazioni della giornata (frmz)
        
		if ($obj[$i]->{'IDSquadra'} == $sq && $obj[$i]->{'Pos'} >= 0) {  // se è della squadra fSquadra e se è titolare o riserva (Pos>0)

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

			// il nome del calciatore su pianetafantacalcio è COGNOME N., il nome su FCM è COGNOME NOME 
			// bisogna che siano nello stesso formato, altrimenti non si ottiene un match sull'array stats
			
			// strippa il cognome da $obj[$i]->{'Nome'}
			$nome_fcm = $obj[$i]->{'Nome'}; // cognome e nome completo FCM
			$pieces = explode(" ", $nome_fcm);
			$p0 = $pieces[0];
			$p1 = $pieces[1];
            
			# gestione eccezioni cognomi
			if ($p0 == 'DE' || $p1 == 'DI') {
                $cognome = $p0." ".$p1;
                $nome = $pieces[2];
            } else {
                $cognome = $p0;
                $nome = $p1;
            }
            
			// prendo l'iniziale del Nome e la unisco al cognome
			
			$iniz = substr($nome, 0, 1);	
			$cogn = $cognome." ".$iniz.".";  // cognome + iniziale + '.'
			
            
            if ($cognome == 'JOAO' && $nome == 'PEDRO') $cogn = 'JOAO PEDRO';
            if ($cognome == 'PUCCIARELLI') $cogn = 'PUCCIARELLI M';
            if ($cognome == 'BERNARDESCHI') $cogn = 'BERNARDESCHI ';
            if ($cognome == 'BOYE') $cogn = 'BOYÃ L.';
            if ($cognome == 'MILINKOVIC-SAVIC') $cogn = 'MILINKOVIC S.';
            if ($cognome == 'BRUNO' && $nome == 'HENRIQUE') $cogn = 'HENRIQUE B.';
            if ($cognome == 'BONAVENTURA') $cogn = 'BONAVENTURA G';
            if ($cognome == 'HERNANES') $cogn = 'HERNANES';
            if ($cognome == 'JORGINHO') $cogn = 'JORGINHO F.';
            if ($cognome == 'SUSO') $cogn = 'SUSO';
            if ($cognome == 'JOAO' && $nome == 'MARIO') $cogn = 'JOAO MARIO';
            if ($cognome == 'VALERO') $cogn = 'VALERO BORJA';
			if ($cognome == 'DANI' && $nome == 'ALVES') $cogn = 'ALVES D.';
            if ($cognome == 'QUAGLIARELLA') $cogn = 'QUAGLIARELLA ';
			if ($cognome == 'EL' && $nome == 'SHAARAWY') $cogn = 'EL SHAARAWY S';
			if ($cognome == 'RADOVANOVIC') $cogn = 'RADOVANOVIC I';
			if ($cognome == 'EDER') $cogn = 'EDER C.';
			if ($cognome == 'NESTOROVSKI') $cogn = 'NESTOROVSKI I';
            
			/*
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
*/
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
