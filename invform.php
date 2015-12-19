<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!--
        invform.htm

        (C) 2005 Marcello 'John Doe' Puri

        Versione 0.9.0 (15/09/2005)
        Versione 0.9.5 (28/09/2005)
        Versione 0.9.6 (07/10/2005)
         * Modificato titolo della pagina
        Versione 1.0.0 (02/12/2005)
        Versione 1.1.0 (08/09/2006)
-->
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Invio Formazione</title>
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
    <script src="js/javacrypt.js" type="text/javascript"></script>
    <script src="js/fcmInvioFormazioneFunzioni.js" type="text/javascript"></script>
    <script src="js/fcmInvioFormazioneDati.js" type="text/javascript"></script>

  </head>
  <body onLoad="document.form.submit()";>
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
          <li><a href="ris.php" title="Risultati">Risultati</a></li>
          <li><a href="rv.htm" title="Registro voti">Registri</a></li>
          <li><a href="stats.htm" title="Statistiche">Statistiche</a></li>
          <li><a href="albo.htm" title="Albo D'Oro">Albo&nbsp;d'Oro</a></li>
      <!-- <li><a href="ProbabiliFormazioni.htm" title="Probabili Formazioni">Probabili Formazioni</a></li> -->
      <!-- <li><a href="televideo.php" title="Televideo">Televideo</a></li> -->
        </ul>
      </div>

      <div id="content">
        <h2 class="title">Invio formazione</h2>
        <div class="agg2">

          <?php
            // tira fuori data e ora dal server e li inverte per il controllo
            $day = date("d",time());
            $month = date("m",time());
            $year = date("Y",time());
            $hour = date("H", time());
            $min= date("i", time());
            $timeinv= ("$year$month$day$hour$min");
            $time= ("$day/$month/$year $hour.$min");
          ?>
          <script language="JavaScript" type="text/javascript">

            pippo =  ("<?php echo "$time";?>");
            document.write ("<b> DATA E ORA ATTUALI: </b>" + pippo)
            document.write (" - <B> TERMINE INVIO FORMAZIONE: </B>" + TermineInviog + "/" + TermineInviom + "/" + TermineInvioa + " " + TermineInviohh + "." + TermineInviomm)

            poppo = ("<?php echo "$timeinv";?>");
            pluto = (TermineInvioa + TermineInviom + TermineInviog + TermineInviohh + TermineInviomm);
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
                    GeneraIntestazioneInvioFormazione(cFsq, cGio);

                    var result;
                    result = GeneraSelezioneCompetizioni(cFsq, cGio);

                    if (result) {
                            GeneraTabellaGiocatori();
                            GeneraControlliPerInvio();
                    }
            } else {
            document.write ("<br> <p align='center'><b><font size='4' color='#FF0000'>IL TERMINE PER INVIARE LA FORMAZIONE E' SCADUTO.</font></b></p>");
            }
          </script>

              </td>
            </tr>
          </table>
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
