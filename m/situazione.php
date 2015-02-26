<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<META name=viewport 
content="width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
<title>Fantacalcio - Classifiche</title>


<SCRIPT type=text/javascript src="../js/script.js"></SCRIPT>
<script src="../js/fcmVariabili.js" type="text/javascript"></script>
<script src="../js/fcmLegaDati.js" type="text/javascript"></script>
<script src="../js/fcmGenerale.js" type="text/javascript"></script>
<script src="../js/fcmUtils.js" type="text/javascript"></script>
<script src="../js/fcmTabelle.js" type="text/javascript"></script>
<script src="../js/fcmCompetizioniDati.js" type="text/javascript"></script>
<script src="../js/DataA.js" type="text/javascript"></script>
<script src="../js/fcmSerieADati.js" type="text/javascript"></script>
<script src="js/fcmSerieAFunzioni.js" type="text/javascript"></script>


<SCRIPT type=text/javascript src="js/fcmSerieAFunzioni.js"></SCRIPT>
<SCRIPT type=text/javascript src="js/fcmCompetizioniFunzioni.js"></SCRIPT>
<SCRIPT type=text/javascript src="js/fcmClassificaFunzioni.js"></SCRIPT>
<SCRIPT type=text/javascript src="js/fcmCalendarioFunzioni.js"></SCRIPT>
<SCRIPT type=text/javascript src="../js/fcmClassificaDati.js"></SCRIPT>
<SCRIPT type=text/javascript src="../js/fcmCalendarioDati.js"></SCRIPT>
<SCRIPT type=text/javascript src="js/fcmFantasquadreFunzioni.js"></SCRIPT>
<SCRIPT type=text/javascript src="../js/fcmFantasquadreDati.js"></SCRIPT>

<SCRIPT type=text/javascript src="js/fcmRisultatiFunzioni.js"></SCRIPT>

<LINK rel=stylesheet type=text/css href="styles_mobile.css">

</head>
<body>
<? include ('header.htm') ?>


<TABLE width="100%" cellPadding=0 cellSpacing=0 class=f><TBODY>    <TR bgcolor="#FFFFFF">
                            <TD>
                               <DIV class=nws_article><A class=nws_snipp_lst 
            href="class.php">
            <H3>CLASSIFICA</H3>
            <P>Classifica aggiornata all'ultimo turno</P>
            </A></DIV>
</TD></TR>
                             <TR>
                            <TD align=middle>
                                 <script language="JavaScript" type="text/javascript">
var cGio,cComp
	cGio = JSQueryString("Gio")
	cComp = JSQueryString("Comp")
	if (cGio == null) cGio = ""
	if (cComp == null) cComp = ""
	 GeneraClassifica(cComp)
	document.close()
	Stato("Risultati")
          </script>
                            
                              <DIV>
                              <SCRIPT language=JavaScript 
                              src="js/classifica.js"></SCRIPT>
                              <br>
                              
                              
                                     <DIV class=nws_article><A class=nws_snipp_lst 
            href="class.php">
            <H3>PROSSIMO TURNO</H3>
            <P>Incontri della prossima giornata</P>
            </A></DIV>
                                          <SCRIPT language=JavaScript 
                              src="js/prossimoturno.js"></SCRIPT>                 
                             
                              </DIV></TD></TR></TBODY></TABLE>
                               <? include ('footer.htm') ?>
</body>
</html>