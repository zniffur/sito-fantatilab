<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Risultati incontri</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta name="Content-Script-Type" content="text/javascript" />
<meta name="author" content="Pasquale Puterio" />
<meta name="generator" content="HTML-Kit" />
<meta name="keywords" content="Fantacalcio">
<link href="highblue.css" rel="stylesheet" type="text/css" />
<script src="script.js" type="text/javascript"></script>

<script src="js/fcmVariabili.js" type="text/javascript"></script>
<script src="js/fcmLegaDati.js" type="text/javascript"></script>
<script src="js/fcmSerieAFunzioni.js" type="text/javascript"></script>
<script src="js/fcmSerieADati.js" type="text/javascript"></script>
<script src="js/fcmGenerale.js" type="text/javascript"></script>
<script src="js/fcmUtils.js" type="text/javascript"></script>
<script src="js/fcmTabelle.js" type="text/javascript"></script>
<script src="js/fcmCompetizioniFunzioni.js" type="text/javascript"></script>
<script src="js/fcmCompetizioniDati.js" type="text/javascript"></script>
<script src="js/fcmCalendarioFunzioni.js" type="text/javascript"></script>
<script src="js/fcmCalendarioDati.js" type="text/javascript"></script>
<script src="js/fcmFantasquadreFunzioni.js" type="text/javascript"></script>
<script src="js/fcmFantasquadreDati.js" type="text/javascript"></script>
<script src="js/fcmRisultatiFunzioni.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript">
	cGio = JSQueryString("Gio")
	if (CaricaDefault=="si") {
		CaricaDefault=true 
	} else {
		CaricaDefault=false
	}

	if (CaricaDefault) {	
		if (cGio==null||cGio=="") cGio=GetUltimaGiornataGiocata()	
	}
	if (cGio!="" && cGio!=null) document.write("<script src='js/fcmRisultatiDati"+cGio+".js' type='text/javascript'></scr" + "ipt>")	
</script>

</head>
<body>
<div id="container">
	<div id="header">
		<script type="text/javascript">Header()</script>
	</div>
	<div id="navigation">
  	<ul>
      <li><a href="index.html" title="Home page">Home</a></li>
      <li><a href="class.htm" title="Classifiche">Classifiche</a></li>
      <li><a href="cale.htm" title="Calendario">Calendario</a></li>
      <li><a href="rose.htm" title="Rose">Rose</a></li>
      <li><a href="form.php" title="Formazioni schierate">Formazioni</a></li>
      <li><a href="ris.php" title="Risultati" id="activelink">Risultati</a></li>
      <li><a href="rv.htm" title="Registro voti">Registri</a></li>
      <li><a href="stats.htm" title="Statistiche">Statistiche</a></li>
      <li><a href="albo.htm" title="Albo D'Oro">Albo&nbsp;d'Oro</a></li>
      <li><a href="fantam/fantam.php" title="Fantamister">Fantamister</a></li>
		<!-- <li><a href="ProbabiliFormazioni.htm" title="Probabili Formazioni">Probabili Formazioni</a></li> -->
		<!-- <li><a href="televideo.php" title="Televideo">Televideo</a></li> -->
    </ul>
	</div>
  <div id="content">
		<h2 class="title">Risultati</h2>
		<div class="agg2">
      <script language="JavaScript" type="text/javascript">
      var cGio,cComp
      	cGio = JSQueryString("Gio")
      	cComp = JSQueryString("Comp")
      	if (cGio == null) cGio = ""
      	if (cComp == null) cComp = ""
      	if (CaricaDefault) {
      		if (cGio==null||cGio=="") cGio=GetUltimaGiornataGiocata()	
					if ((cComp==null) || (cComp=="")) cComp="0" 
      		GeneraIntestazioneGiornateIncontri(cGio,cComp,"ris")
      	} else {
      		GeneraIntestazioneGiornateIncontri(GetUltimaGiornataGiocata(),cComp,"ris")
      	}
      	if (cGio!="" && cGio!=null && cComp!=null && cComp!="") GeneraRisultati(cGio,cComp)
      	document.close()
      	Stato("Risultati")
      </script>
		</div>
	</div>
	<div id="footer">
		<script type="text/javascript">Footer()</script>
	</div>
</div>
<div class="counter">
	<script type="text/javascript">Contatore()</script>
</div>
</body>
</html>
