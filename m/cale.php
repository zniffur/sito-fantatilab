<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<HTML xmlns="http://www.w3.org/1999/xhtml">
  <HEAD>
    <TITLE>Fantacalcio - Calendario</TITLE>
    <META content="text/html; charset=utf-8" http-equiv=Content-Type/>
    <META name=viewport
    content="width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;"/>
    <META name=GENERATOR content="MSHTML 8.00.7600.16466"/>
    <link href="styles_mobile.css" rel="stylesheet" type="text/css"/>
    <SCRIPT type=text/javascript src="../script.js"></SCRIPT>

    <SCRIPT type=text/javascript src="../js/fcmVariabili.js"></SCRIPT>
    <SCRIPT type=text/javascript src="../js/fcmGenerale.js"></SCRIPT>
    <SCRIPT type=text/javascript src="../js/fcmUtils.js"></SCRIPT>
    <SCRIPT type=text/javascript src="../js/fcmLegaDati.js"></SCRIPT>
    <SCRIPT type=text/javascript src="js/fcmSerieAFunzioni.js"></SCRIPT>
    <SCRIPT type=text/javascript src="../js/fcmSerieADati.js"></SCRIPT>
    <SCRIPT type=text/javascript src="../js/fcmTabelle.js"></SCRIPT>
    <SCRIPT type=text/javascript src="js/fcmCompetizioniFunzioni.js"></SCRIPT>
    <SCRIPT type=text/javascript src="../js/fcmCompetizioniDati.js"></SCRIPT>
    <SCRIPT type=text/javascript src="js/fcmCalendarioFunzioni.js"></SCRIPT>
    <SCRIPT type=text/javascript src="../js/fcmCalendarioDati.js"></SCRIPT>
    <SCRIPT type=text/javascript src="../menujs/dataA.js"></SCRIPT>


  </HEAD>
  <BODY>
<? include ('header.htm') ?>


<TABLE width="100%" cellPadding=0 cellSpacing=0 class=f><TBODY>    <TR bgcolor="#FFFFFF">
                            <TD>
                               <DIV class=nws_article><A class=nws_snipp_lst

            href="cale.php">
            <H3>CALENDARIO</H3>
            <P>Calendario degli incontri</P>
            </A></DIV>
</TD></TR>
                             <TR>
                            <TD align=middle>
                              <DIV>
                         <SCRIPT type=text/javascript>
var cDiv,cComp
if (CaricaDefault=="si") {
CaricaDefault=true } else {
CaricaDefault=false
}
cDiv = JSQueryString("Div")
cComp = JSQueryString("Comp")
if (cDiv == null) cDiv = ""
if (cComp == null) cComp = ""
GeneraIntestazioneCompetizioni(cComp,cDiv)
if ((CaricaDefault) || (!CaricaDefault && (!(cComp=="" && cDiv==""))))
GeneraCalendario(cComp,cDiv)
document.close()
Stato("Calendario")
</SCRIPT>
</DIV></TD></TR></TBODY></TABLE>

<? include ('footer.htm') ?>




</BODY></HTML>
