<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<HTML xmlns="http://www.w3.org/1999/xhtml"><HEAD><TITLE>Fantacalcio - Statistiche</TITLE>
<META content="text/html; charset=utf-8" http-equiv=Content-Type>
<META name=viewport 
content="width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">


<SCRIPT type=text/javascript src="../js/script.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/fcmVariabili.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/fcmGenerale.js"></SCRIPT>

<SCRIPT type=text/javascript src="js/fcmUtils.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/fcmLegaDati.js"></SCRIPT>

<SCRIPT type=text/javascript src="js/fcmSerieAFunzioni.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/fcmSerieADati.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/fcmTabelle.js"></SCRIPT>

<SCRIPT type=text/javascript 
src="js/fcmCompetizioniFunzioni.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/fcmCompetizioniDati.js"></SCRIPT>


<SCRIPT type=text/javascript src="js/fcmCalendarioFunzioni.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/fcmCalendarioDati.js"></SCRIPT>

<SCRIPT type=text/javascript 
src="js/fcmFormazioniFunzioniPrint.js"></SCRIPT>


<script src="js/fcmFantasquadreFunzioni.js" type="text/javascript"></script>
<script src="../js/fcmFantasquadreDati.js" type="text/javascript"></script>

<SCRIPT type=text/javascript src="../js/fcmSerieADatiDettaglio.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/DataA.js"></SCRIPT>


<SCRIPT language=javascript type=text/javascript>

		cGio = JSQueryString("Gio")

		if (cGio==null||cGio=="") cGio=GetProssimaGiornataDaGiocare();

		document.write("<script src='../js/fcmFormazioniDati"+cGio+".js' type='text/javascript'></scr" + "ipt>")	

	</SCRIPT>
    
    
<script src="js/fcmRegistriFunzioni.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript">
	cSq = JSQueryString("Sq")
	if (CaricaDefault=="si") {
		CaricaDefault=true 
	} else {
		CaricaDefault=false
	}

	if (CaricaDefault) {
		if (cSq==null||cSq=="") cSq=arrFantasquadre[1].ID
	}
	if (cSq!=null && cSq!="") document.write("<script src='../js/fcmRegistriDati"+cSq+".js' type='text/javascript'></scr" + "ipt>")	
</script>

<META name=GENERATOR content="MSHTML 8.00.7600.16466">
<link href="styles_mobile.css" rel="stylesheet" type="text/css">
</HEAD>
<BODY>
<? include ('header.htm') ?>


<TABLE width="100%" cellPadding=0 cellSpacing=0 class=f><TBODY>    <TR bgcolor="#FFFFFF">
                            <TD>
                               <DIV class=nws_article><A class=nws_snipp_lst 
         
            href="form.php">
            <H3>STATISTICHE</H3>
            <P>Statistiche</P>
            </A></DIV>
</TD></TR>
                             <TR>
                            <TD align=middle>
                              <DIV>
                                <script language="javascript" type="text/javascript">
if (IntestazioniFisse=="no") {
	document.write("<div class='nooverflow'>")
	}
</script>
<script language="JavaScript" type="text/javascript">
var cSq,cQuot
	cSq = JSQueryString("Sq")
	cQuot = JSQueryString("Quot")
	if (cSq == null) cSq = ""
	if (cQuot == null) cQuot = ""
	if (CaricaDefault) {
		if (cSq==null||cSq=="") cSq=arrFantasquadre[1].ID
	}
	if (cQuot=="") cQuot=arrQuotidiani[1].ID
	GeneraIntestazioneFantasquadreQuotidiani(cSq,cQuot)
	if (cSq!="" && cSq!=null) GeneraRegistroVoti(cSq,cQuot)
	document.close()
	Stato("Registro Voti")
</script>
<script language="JavaScript" type="text/javascript">
if (IntestazioniFisse=="no") {
	document.write("</div>")
} else {
	if(typeof tableScroll == 'function'){tableScroll('tabellaDati');}
}
</script>   </DIV></TD></TR></TBODY></TABLE>

<? include ('footer.htm') ?>




</BODY></HTML>
