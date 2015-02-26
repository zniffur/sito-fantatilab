<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<!-- saved from url=(0038)http://fantabarmario.it/invform.php -->
<HTML xmlns="http://www.w3.org/1999/xhtml"><HEAD><TITLE>Fantacalcio - Invio Formazione</TITLE>
<META content="text/html; charset=iso-8859-1" http-equiv=Content-Type>
<META name=viewport 
content="width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">

<SCRIPT type=text/javascript src="../js/script.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/DataA.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/fcmVariabili.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/fcmLegaDati.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/fcmSerieAFunzioni.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/fcmSerieADati.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/fcmGenerale.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/fcmUtils.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/fcmTabelle.js"></SCRIPT>

<SCRIPT type=text/javascript 
src="js/fcmCompetizioniFunzioni.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/fcmCompetizioniDati.js"></SCRIPT>

<SCRIPT type=text/javascript 
src="js/fcmCalendarioFunzioni.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/fcmCalendarioDati.js"></SCRIPT>

<SCRIPT type=text/javascript 
src="js/fcmFantasquadreFunzioni.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/fcmFantasquadreDati.js"></SCRIPT>

<SCRIPT type=text/javascript src="../js/javacrypt.js"></SCRIPT>

<SCRIPT type=text/javascript 
src="js/fcmInvioFormazioneFunzioni.js"></SCRIPT>

<SCRIPT type=text/javascript 
src="../js/fcmInvioFormazioneDati.js"></SCRIPT>

<META name=GENERATOR content="MSHTML 8.00.7600.16625">
<link href="styles_mobile.css" rel="stylesheet" type="text/css">
</HEAD>
<BODY onload=document.form.submit() ;>
<? include ('header.htm') ?>
<?
// tira fuori data e ora dal server e li inverte per il controllo
$day = date("d");
$month = date("m");
$year = date("Y");
$grab_time= date('H:M:S');
$hour = date("H");
$min= date("i");
$timeinv= ("$year$month$day$hour$min");
$time= ("$day/$month/$year $hour.$min");
?>   

<TABLE width="100%" cellPadding=0 cellSpacing=0 class=f><TBODY>
                          <TR bgcolor="#FFFFFF">
                            <TD align=middle>
                               <DIV class=nws_article><A class=nws_snipp_lst 
         
            href="cale.php">
            <H3>INVIA FORMAZIONE</H3>
            <P>Inserisci i giocatori per la prossima giornata</P>
            </A></DIV>
</TD></TR>
                             <TR>
                            <TD align=middle>
                              <DIV>
                <script language="JavaScript" type="text/javascript">
				 	pippo =  ("<? echo "$time";?>");
					document.write ("<span class='t-xxsB'><b> DATA E ORA ATTUALI: </b></span><span class='t-xxs'>" + pippo)
					document.write (" - </span><span class='t-xxsB'><B> TERMINE INVIO FORMAZIONE: </B></span><span class='t-xxs'>" + TermineInviog + "/" + TermineInviom + "/" + TermineInvioa + " " + TermineInviohh + ":" + TermineInviomm + "</span>")
				 

				poppo = ("<? echo "$timeinv";?>");
				pluto = (TermineInvioa + TermineInviom + TermineInviog + TermineInviohh + 				TermineInviomm);
				prova = ( TermineInviog + "/" + TermineInviom + "/" + TermineInvioa + " " + TermineInviohh + "." + TermineInviomm);

//ATTIVARE QUESTA FUNZIONE PER CONTROLLARE LE CIFRE
//document.write ("<br> DATA E ORA ODIERNE INVERTITE: " + poppo + " - DATA E ORA MASSIMO INVIO INVERTITE: " + pluto)

				if (poppo < pluto) {
        
        var cGio,cFsq;
        cFsq = JSQueryString("Fsq");
        cGio = JSQueryString("Gio");
        
        if (CaricaDefault == "si") {
                CaricaDefault = true;
        } else {
                CaricaDefault = false;
        }
        if (CaricaDefault) {
                if (cFsq == null || cFsq=="") cFsq = arrFantasquadre[1].ID;
                if (cGio == null || cGio=="") cGio = GetProssimaGiornataDaGiocare();
        }
        var result;
        result = GeneraSelezioneCompetizioni(cFsq, cGio);
        
        if (result) {
		GeneraIntestazioneInvioFormazione(cFsq, cGio, "invform");
                GeneraTabellaGiocatori();
		GeneraControlliPerInvio();
        }
} else {
document.write ("<br> <p align='center'><b><font size='2' color='#FF0000'>IL TERMINE PER INVIARE LA FORMAZIONE E' SCADUTO.</font></b></p>");
}


</SCRIPT>           
</DIV></TD></TR></TBODY></TABLE>





                   
<? include ('footer.htm') ?>
                      </BODY></HTML>
