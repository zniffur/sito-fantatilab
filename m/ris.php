<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<META name=viewport 
content="width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
<title>Fantacalcio - Risultati</title>
<script src="../js/fcmVariabili.js" type="text/javascript"></script>
<script src="../js/fcmLegaDati.js" type="text/javascript"></script>
<script src="../js/fcmSerieAFunzioni.js" type="text/javascript"></script>
<script src="../js/fcmSerieADati.js" type="text/javascript"></script>
<script src="../js/fcmSerieADatiDettaglio.js" type="text/javascript"></script>
<script src="../js/fcmGenerale.js" type="text/javascript"></script>
<script src="js/fcmUtils.js" type="text/javascript"></script>
<script src="../js/fcmTabelle.js" type="text/javascript"></script>
<script src="js/fcmCompetizioniFunzioni.js" type="text/javascript"></script>
<script src="../js/fcmCompetizioniDati.js" type="text/javascript"></script>
<script src="js/fcmCalendarioFunzioni.js" type="text/javascript"></script>
<script src="../js/fcmCalendarioDati.js" type="text/javascript"></script>
<script src="js/fcmFantasquadreFunzioni.js" type="text/javascript"></script>
<script src="../js/fcmFantasquadreDati.js" type="text/javascript"></script>
<script src="js/fcmRisultatiFunzioni.js" type="text/javascript"></script>
<script src="../js/fcmPuffinJolly.js" type="text/javascript"></script>
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
	if (cGio!="" && cGio!=null) document.write("<script src='../js/fcmRisultatiDati"+cGio+".js' type='text/javascript'></scr" + "ipt>")	
</script>


    
    <!--//img hover -->

<link href="styles_mobile.css" rel="stylesheet" type="text/css">
</head>
<body>
<? include ('header.htm') ?>


          
          
          
          <TABLE width="100%" cellPadding=0 cellSpacing=0 class=f><TBODY>    <TR bgcolor="#FFFFFF">
                            <TD>
                               <DIV class=nws_article><A class=nws_snipp_lst 
         
            href="ris.php">
            <H3>RISULTATI</H3>
            <P>Tabellini dell'ultima giornata</P>
            </A></DIV>
</TD></TR>
                             <TR>
                            <TD align=middle>
                                    
                            
                                         <script language="javascript" type="text/javascript">
			if(VotiUfficiali=="no") {
			document.write("<div align='center' class='CellaRvRosso'>I VOTI DELLA "+GetUltimaGiornataGiocata()+"a GIORNATA SONO UNICAMENTE INDICATIVI E NON UFFICIALI</div>")
			} else {
			document.write("<div align='center' class='CellaRvVerde'>I VOTI DELLA "+GetUltimaGiornataGiocata()+"a GIORNATA SONO UFFICIALI</div>")
			}
             </script>
  		  
<SCRIPT language=JavaScript 
                              src="js/ultimoturno.js"></SCRIPT>
          
          <script language="JavaScript" type="text/javascript">
          	if ((cGio==GetUltimaGiornataGiocata()) && (VotiUfficiali=='no')){
				document.write("<div class='CellaRvRosso'><B>VOTI NON UFFICIALI</B></div>")
			}
          </script>
          <script language="JavaScript" type="text/javascript">
var cGio,cComp
	cGio = JSQueryString("Gio")
	cComp = JSQueryString("Comp")
	if (cGio == null) cGio = ""
	if (cComp == null) cComp = ""
	if (CaricaDefault) {
		if (cGio==null||cGio=="") cGio=GetUltimaGiornataGiocata()
		if (cComp==null||cComp=="") cComp="0"	
		GeneraIntestazioneGiornateIncontri(cGio,cComp,"ris")
	} else {
		GeneraIntestazioneGiornateIncontri(GetUltimaGiornataGiocata(),cComp,"ris")
	}
	if (cGio!="" && cGio!=null && cComp!=null && cComp!="") GeneraRisultati(cGio,cComp)
	document.close()
	Stato("Risultati")
          </script></TD></TR></TBODY></TABLE>
          
          

<? include ('footer.htm') ?>
</body>
</html>