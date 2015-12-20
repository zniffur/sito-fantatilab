<?php

function get_all_stats_from_fg() {

	// require_once 'simple_html_dom.php';
	require_once 'url_to_absolute.php';
	require_once 'auto_login_2.php';
	require_once 'helper.php';

	$login_url = "http://www.fantagazzetta.com/";
	$url = "http://www.fantagazzetta.com/voti-fantagazzetta-serie-A";
	$post_data = "__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUIMjgxMzU3NjdkGAEFSmN0bDAwJEhlYWRlck1hc3RlclBhZ2VLbm9iJFJlZ2lzdHJhemlvbmUxJE9wZW5BdXRoUHJvdmlkZXJzMSRwcm92aWRlcnNMaXN0DxQrAA5kZGRkZGRkFCsAAWQCAWRkZGYC%2F%2F%2F%2F%2Fw9kqs%2Bx9ktCq0IAe8gJ4IiLPJNmVEw%3D&__VIEWSTATEGENERATOR=8D0E13E6&__EVENTVALIDATION=%2FwEdAAcMm7hjVdh5a9Y%2FTwJYDocm5126SdI5cH%2FexPLifNENm2hKE0VpzwjgoRGZQ8MF%2FamKKzao9vFcme%2BNmQ0yf2tWGV58mExs2H6p%2FqKf4qu9Jrz8DPGBlZ4hfV7pAI%2F%2FL%2BL0Txe3QmN96w1lx2aicDsj6KHa9bYh6lS00UHc0aVnUFwbrBY%3D&ctl00%24HeaderMasterPageKnob%24LoginMasterKnob%24TextBoxUserName=pbranigade&ctl00%24HeaderMasterPageKnob%24LoginMasterKnob%24TextBoxPassword=1234abcd&ctl00%24HeaderMasterPageKnob%24LoginMasterKnob%24ButtonSubmit=Login&ctl00%24ContentPlaceHolder1%24CercaHome1%24TextBoxSearch=";

	login($login_url, $post_data);

	$html = grab_page($url);
	$dom = new DOMDocument();
	@$dom->loadHTML($html);
	$xpath = new DOMXpath($dom);

	//echo "Nome V AE Gf Gr Gs Rp Rs Au As BM TOT<br/>";


	$obj = array();

	# for each names
	$teamobjs = $xpath->query('//div[@id="allvotes"]');
	foreach ($teamobjs as $teamobj){
		// $teams = $xpath->query('div[1]/div[1]', $teamobj);
		// foreach ($teams as $team) {
		// 	echo $team->nodeValue."<br>";
		// }
		# for each player
		$players = $xpath->query('div[1]/table[1]//tr[@class="P"]',$teamobj);
		foreach ($players as $player) {
			//echo $player->nodeValue."<br/>";
			// $roles = $xpath->query('td[@class="r"]', $player);
			// foreach ($roles as $role) { //only one
			// 	$ruo = $role->nodeValue; ##
			// }
			$names = $xpath->query('td[@class="n"]', $player);
			$bm = 0;
			$v = 0;
			foreach ($names as $name) { //only one
				// Nome
				// echo $name->nodeValue." ";
				$nome = strtoupper($name->nodeValue); ##
				// Voto
				$voto = $name->nextSibling;
				
				$v = GetFloat(substr($voto->nodeValue, 0, -1)); #
                
                if ($voto->attributes->item(0)->nodeValue == 'u') {
                    $v = 0;
                } else {
                    // echo $voto->nodeValue." ";
                    $v = GetFloat(substr($voto->nodeValue, 0, -1));    
                }
				// Amm. o Esp.
				if ($voto->attributes->item(0)->nodeValue == 'vamm') {
					// echo "AMM ";
					$ae = 'AMM';
					$bm = $bm - 0.5;
				} elseif ($voto->attributes->item(0)->nodeValue == 'vesp') {
					// echo "ESP ";
					$ae = 'ESP';
					$bm = $bm - 1;
				} else {
					// echo "- ";
					$ae = '-';
				}
				// Gf
				$gf = $voto->nextSibling;
				// echo $gf->nodeValue." ";
				$gol_f = $gf->nodeValue;
				if ($gf->nodeValue > 0) {$bm = $bm + ($gf->nodeValue)*3;}
				//Gr
				$gr = $gf->nextSibling;
				$gol_r = $gr->nodeValue; 
				// echo $gr->nodeValue." ";
				if ($gr->nodeValue > 0) {$bm = $bm + ($gr->nodeValue)*3;}
				//Gs
				$gs = $gr->nextSibling;
				// echo $gs->nodeValue." ";
				$gol_s = $gs->nodeValue;
				if ($gs->nodeValue > 0) {$bm = $bm - ($gs->nodeValue)*1;}
				//Rp
				$rp = $gs->nextSibling;
				// echo $rp->nodeValue." ";
				$rig_p = $rp->nodeValue;
				if ($rp->nodeValue > 0) {$bm = $bm + ($rp->nodeValue)*3;}
				//Rs
				$rs = $rp->nextSibling;
				// echo $rs->nodeValue." ";
				$rig_s = $rs->nodeValue;
				if ($rs->nodeValue > 0) {$bm = $bm - ($rs->nodeValue)*3;}
				//Au
				$au = $rs->nextSibling;
				// echo $au->nodeValue." ";
				$aut_r = $au->nodeValue;
				if ($au->nodeValue > 0) {$bm = $bm - ($au->nodeValue)*2;}
			}

			// # assist
			$assists = $xpath->query('td[@class="a green "]', $player);
			$numAssist = $assists->item(1)->nodeValue;
			if ($numAssist > 0) {
				//echo "Assist: ".$numAssist;
				//echo " ".$numAssist;
				$bm = $bm + ($numAssist)*1;
			}



			// echo "BM: ".$bm." ";
			// echo "TOT: ".($bm + $v)." ";
			//echo " ".$bm." ";
			//echo " ".($bm + $v)." ";
			//echo "<br/>";

			//echo "Nome Ruo V AE Gf Gr Gs Rp Rs Au As BM TOT<br/>";
			//$obj[$nome] = array($ruo, $v, $ae, $gol_f, $gol_r, $gol_s, $rig_p, $rig_s, $aut_r, $numAssist, $bm, ($bm + $v));
			$obj[$nome] = array($v, $ae, $gol_f, $gol_r, $gol_s, $rig_p, $rig_s, $aut_r, $numAssist, $bm, ($bm + $v));
		}
	}
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
			if ($cogn == 'DONNARUMMA') $cogn = 'DONNARUMMA G';
			if ($cogn == 'MARIO') $cogn = $cogn." ".$pieces[1];
			if ($cogn == 'JUAN') $cogn = 'JUAN JESUS';
			if ($cogn == 'FELIPE') $cogn = 'FELIPE MELO';
			if ($cogn == 'DIAKITE') $cogn = 'DIAKITE\'';
			if ($cogn_nome == 'ROMAGNOLI Alessio') $cogn = 'ROMAGNOLI A';
			if ($cogn_nome == 'PISANO Eros') $cogn = 'PISANO E';
			if ($cogn == 'DIOUSSE') $cogn = 'DIOUSSE\'';

			// cercalo in $stats
		    $tmpstats = $stats[$cogn];
		    // prepend ruolo a $tmpstats
		    if (!(empty($tmpstats)))
		    	array_unshift($tmpstats, $ruo);

			// assegna le stats per quel calciatore al nome in result
		    if ($obj[$i]->{'Pos'} == 0) {
				$result[$obj[$i]->{'Nome'}] = $tmpstats;
			} else {
				$riserve[$obj[$i]->{'Nome'}] = $tmpstats;
			}
			//$result[$obj[$i]->{'Nome'}] = $cogn;
			// $result['Aguirre'] = $tmpstats;
		}
	}

	$json['result'] = $result;
	$json['riserve'] = $riserve;
}

echo json_encode($json);
//echo json_encode($stats);

?>
