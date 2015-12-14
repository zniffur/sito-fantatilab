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
			$names = $xpath->query('td[@class="n"]', $player);
			$bm = 0;
			$v = 0;
			foreach ($names as $name) { //only one
				// Nome
				// echo $name->nodeValue." ";
				$nome = $name->nodeValue; ##
				// Voto
				$voto = $name->nextSibling;
				// echo $voto->nodeValue." ";
				$v = GetFloat(substr($voto->nodeValue, 0, -1)); #
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
			$assists = $xpath->query('td[@class="af1"]', $player);
			$numAssist = $assists->item(0)->nodeValue;
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

			//echo "Nome V AE Gf Gr Gs Rp Rs Au As BM TOT<br/>";
			$obj[$nome] = array($v, $ae, $gol_f, $gol_r, $gol_s, $rig_p, $rig_s, $aut_r, $numAssist, $bm, ($bm + $v));

		}
	}
	return $obj;

}


$stats = get_all_stats_from_fg();

header('Content-type: text/javascript');

$json = array(
	'success' => false,
	'result' => ""
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

	// for ($i=1; $i < count($obj); $i++) { 
	// 	if ($obj[$i]->{'IDSquadra'} == $sq && $obj[$i]->{'Pos'} >= 0) {
	// 		$result[$obj[$i]->{'Nome'}] = $obj[$i]->{'Pos'};
	// 	}
	// }

	//for ($i=1; $i < count($obj); $i++) { 
	//	if ($obj[$i]->{'IDSquadra'} == $sq && $obj[$i]->{'Pos'} >= 0) {
			
			// strippa il cognome da $obj[$i]->{'Nome'}
			$cogn = 'Aguirre';
			// cercalo in $stats
			$tmpstats = $stats[$cogn];
			// assegna le stats per quel calciatore al nome in result

			//$result[$obj[$i]->{'Nome'}] = $tmpstats;
			$result['Aguirre'] = $tmpstats;
	//	}
	//}

	$json['result'] = $result;
}

echo json_encode($json);
//echo json_encode($stats);

?>
