<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html><head>
<META name=viewport 
content="width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
<meta content="text/html; charset=ISO-8859-1" http-equiv="content-type">
<title>Fantacalcio - Classifica</title>
<script src="../js/fcmVariabili.js" type="text/javascript"></script>
<script src="../js/fcmLegaDati.js" type="text/javascript"></script>
<script src="../js/fcmGenerale.js" type="text/javascript"></script>
<script src="../js/fcmUtils.js" type="text/javascript"></script>
<script src="../js/fcmTabelle.js" type="text/javascript"></script>
<script src="js/fcmCompetizioniFunzioni.js" type="text/javascript"></script>
<script src="../js/fcmCompetizioniDati.js" type="text/javascript"></script>
<script src="js/fcmClassificaFunzioniWap.js" type="text/javascript"></script>
<script src="../js/fcmClassificaDati.js" type="text/javascript"></script>
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
var cGir, cComp

	cGir = JSQueryString("Gir")
	cComp = JSQueryString("Comp")
	if (cGir == null) cGir = ""
	if (cComp == null) cComp = ""
	GeneraIntestazioneCompetizioniPerClassifica(cComp,cGir)

		if (cGir == "") cGir=arrGironi[1].ID
		if (cComp == "") cComp=arrCompetizioni[1].ID


	if (parseInt(cGir) == 0) {
		if (cComp!="") GeneraClassifica(cComp)
	} else {
		if (cGir!="") GeneraClassifica(cGir)
	}
	
	
	document.close()

</script>   

 <DIV class=nws_article><A class=nws_snipp_lst 
            href="class.php">
            <H3>PROSSIMO TURNO</H3>
            <P>Incontri della prossima giornata</P>
            </A></DIV>
                                          <SCRIPT language=JavaScript 
                              src="js/prossimoturno.js"></SCRIPT>                 
                             
                              </DIV>
                           </TD></TR></TBODY></TABLE>






<? include ('footer.htm') ?>
</body>
</html>