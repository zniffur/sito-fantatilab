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
      <h1 align="center">Voti ultima giornata</h1>
      
      <?php 
      
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
      
      echo '<div class="container">';
      echo '<table class="table table-bordered table-condensed"><thead><tr>';

      echo "<th>Nome <th>V <th>AE <th>Gf <th>Gr <th>Gs <th>Rp <th>Rs <th>Au <th>As <th>BM <th>TOT";
      
      echo "</tr></thead>";
      echo "<tbody>";
      //echo "<td> test<td> test<td> test<td> test<td> test<td> test<td> test<td> test<td> test<td> test<td> test<td> test";
      //echo '<tr><td colspan="12" align="center">TEST</td></tr>';
      
      # get team names
      $teamobjs = $xpath->query('//div[@id="allvotes"]');
      foreach ($teamobjs as $teamobj){
      	$teams = $xpath->query('div[1]/div[1]', $teamobj);
      	foreach ($teams as $team) {
                  // riga nome squadra A
      		echo '<tr><td colspan="12" align="center">'.$team->nodeValue.'</td></tr>';
      	}	
      	$players = $xpath->query('div[1]/table[1]//tr[@class="P"]',$teamobj);
      	foreach ($players as $player) {
      		//echo $player->nodeValue."<br/>";
      		$names = $xpath->query('td[@class="n"]', $player);
      		$bm = 0;
      		$v = 0;
      		foreach ($names as $name) { //only one
      			// Nome
                        echo '<tr>';
      			echo "<td>".$name->nodeValue." ";
      			// Voto
      			$voto = $name->nextSibling;
      			echo "<td>".$voto->nodeValue." ";
      			$v = GetFloat(substr($voto->nodeValue, 0, -1));
      			// Amm. o Esp.
      			if ($voto->attributes->item(0)->nodeValue == 'vamm') {
      				echo "<td>"."AMM ";
      				$bm = $bm - 0.5;
      			} elseif ($voto->attributes->item(0)->nodeValue == 'vesp') {
      				echo "<td>"."ESP ";
      				$bm = $bm - 1;
      			} else {
      				echo "<td>"."- ";
      			}
      			// Gf
      			$gf = $voto->nextSibling;
      			echo "<td>".$gf->nodeValue." ";
      			if ($gf->nodeValue > 0) {$bm = $bm + ($gf->nodeValue)*3;}
      			//Gr
      			$gr = $gf->nextSibling;
      			echo "<td>".$gr->nodeValue." ";
      			if ($gr->nodeValue > 0) {$bm = $bm + ($gr->nodeValue)*3;}
      			//Gs
      			$gs = $gr->nextSibling;
      			echo "<td>".$gs->nodeValue." ";
      			if ($gs->nodeValue > 0) {$bm = $bm - ($gs->nodeValue)*1;}
      			//Rp
      			$rp = $gs->nextSibling;
      			echo "<td>".$rp->nodeValue." ";
      			if ($rp->nodeValue > 0) {$bm = $bm + ($rp->nodeValue)*3;}
      			//Rs
      			$rs = $rp->nextSibling;
      			echo "<td>".$rs->nodeValue." ";
      			if ($rs->nodeValue > 0) {$bm = $bm - ($rs->nodeValue)*1;}
      			//Au
      			$au = $rs->nextSibling;
      			echo "<td>".$au->nodeValue." ";
      			if ($au->nodeValue > 0) {$bm = $bm - ($au->nodeValue)*2;}
      		}
      
      		// # assist
      		$assists = $xpath->query('td[@class="af1"]', $player);
      		$numAssist = $assists->item(0)->nodeValue;
      		if ($numAssist > 0) {
      			//echo "Assist: ".$numAssist;
      			echo "<td>".$numAssist;
      			$bm = $bm + ($numAssist)*1;
      		} else {
                        echo "<td>"."- ";
                  }
      		// echo "BM: ".$bm." ";
      		// echo "TOT: ".($bm + $v)." ";
      		echo "<td>".$bm." ";
      		echo "<td>".($bm + $v)." ";
                  echo '</tr>';
      	}
      }
      exit(0);

      echo "</tbody></table></div>";
      
      echo "<br>-- by Zniff --<br>";
      
      ?>
    </body>
</html>

