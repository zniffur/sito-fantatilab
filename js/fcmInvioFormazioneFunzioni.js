//-----------------------------------------------------------------------------
// fcmInvioFormazioneFunzioni.js
//
// Copyright (C) 2005 Marcello 'John Doe' Puri
//
// Versione 0.9.0 (15/09/2005)
// Versione 0.9.5 (28/09/2005)
//  * aggiunto il modulo di salvataggio automatico delle formazioni
//  * corretto il bug che non permetteva di gestire leghe con "panchina lunga"
//  * eliminato l'ordinamento per ruolo della panchina
//  * inserita l'opzione per l'ordinamento per ruolo della panchina
//  * inserite le opzioni per non consentire agli utenti la modifica della
//    giornata e degli incontri per cui � valida la formazione
//  * nel caso di un singolo incontro, il relativo checkbox � disabilitato,
//    non � quindi pi� possibile deselezionarlo
// Versione 0.9.6 (07/10/2005)
//  * modificata la modalit� di passaggio parametri al modulo d'invio e
//    salvataggio formazione per garantire la compatibilit� anche con
//    Internet Explorer
// Versione 1.0.0 (02/12/2005)
//  * inserita l'opzione per il controllo dell'ordine di tiro dei portieri
//    rigoristi secondo la regola ufficiale
//  * introdotta sostituzione dei caratteri nel nome della lega durante
//    l'invio delle e-mail. Le leghe che contenevano caratteri strani
//    (*, ", ', \, /, :, |, ?) non erano in grado di utilizzare la funzione
//    auto-ricevi formazioni
//  * corretto bug che richiamava il modulo server-side d'invio e salvataggio
//    formazione per diverse competizioni nello stessa finestra pop-up
//  * corretto bug che salvava in modo errato l'ordine dei rigoristi
//    (la e-mail era comunque corretta)
// Versione 1.1.0 (08/09/2006)
//  * corretto bug che visualizzava squadre partecipanti agli incontri di
//    giornata anche per incontri gran premio
//  * modificato controllo sulla correttezza dell'ID squadra dei giocatori
//    in rosa (il metodo precedente poteva non funzionare per campionati di A
//    non organizzati completamente con gironi all'italiana)
//Modificato da Guido Zerbinati per inserire controllo data e ora invio (21/10/2006)
//-----------------------------------------------------------------------------

// Oggetto Giocatore per Invio Formazione
function ifG(IDSquadra, ID, Ruolo, IDSquadraDiA, Affidabilita, Dati)
{
	this.IDSquadra = IDSquadra;
	this.ID = ID;
	this.Nome = "xg" + ID;
	this.Ruolo = Ruolo;
	this.IDSquadraDiA = IDSquadraDiA;
	this.SquadraDiA = "xa" + IDSquadraDiA;
	this.Affidabilita = Affidabilita;
	this.Dati = Dati;

	this.Formazione = 0;
	this.Rigorista = 0;
}

var arrRosa = new Array();
var arrFormazione = new Array();
var coloreRuoli = Array ( "", "G", "V", "R", "Blu" );
var coloreDati = Array ( "Rv", "CellaRvRosso", "CellaRvCiano", "CellaRvVerde" );
var ruoli = Array ( "", "P", "D", "C", "A" );

var moduloInserito = new Array( 0, 0, 0, 0, 0 );
var titolariInseriti = 0;
var riserveInserite = new Array( 0, 0, 0, 0, 0 );
var totaleRiserveInserite = 0;

var rigoristi = false;
var arrRigoristi = new Array();

var incontriValidi = new Array();

var idxFsq;

function GeneraIntestazioneInvioFormazione(cFsq, cGio)
// Questo codice genera l'intestazione per la scelta della fantasquadra
// e della giornata
// Utilizza MaxA definito nel SerieADati
{
	var arrF = new Object();
	arrF = arrFantasquadre;
	document.write("<form name='frmIF' id='frmIF' action='invform.php' method='get'>")
	document.write("<table width='100%' border='0' cellspacing='0' cellpadding='0'>")
	document.write("<tr><td width='5%' class='t-xxsB'><nobr>Fantasquadra:&nbsp;<select name='Fsq' class='t-xxs' id='Fsq'>")
	var i;
	for (i = 1; i < arrF.length; i++) {
		document.write("<option value='" + arrF[i].ID + "'");
		if (arrF[i].ID == cFsq) {
			document.write(" selected");
			idxFsq = i;
		}
		document.write(">" + arrF[i].Nome + "</option>");
	}
	document.write("</select></nobr></td>")

	if (cGio == "" || parseInt(cGio) == 0) cGio = 1;
	var attributes = disabilitaGiornata ? "disabled" : "";
	document.write("<td width='5%' class='t-xxsB'><nobr>&nbsp;&nbsp;Giornata:&nbsp;<select name='Gio' class='t-xxs' id='Gio' " + attributes + ">");
	for (i = 1; i <= MaxA; i++) {
		document.write("<option value='" + i + "'");
		if (i == cGio) document.write(" selected");
		document.write(">" + i + "</option>");
	}
	document.write("</select></nobr></td>");

	document.write("<td width='95%' class='t-xxsB'>&nbsp;&nbsp;<input name='Invia' type='submit' class='t-xxs' id='Invia' value='  Vai  '></td>");
	document.write("</tr></table></form>");
}

function GeneraSelezioneCompetizioni(cFsq, cGio)
{
	var i;

	// Ottiene incontri della giornata selezionata che interessano la squadra
	// controllando che non siano gi� stati giocati
	for (i = 1; i < arrIncontri.length; i++)
		if (
		arrIncontri[i].GiornataDiA == cGio &&
		(arrIncontri[i].IDSquadre.Casa == cFsq || arrIncontri[i].IDSquadre.Fuori == cFsq) &&
		arrIncontri[i].IDTipo != INC_RIPOSO &&
		arrIncontri[i].Giocato == 0 &&
		arrIncontri[i].IncAcc == 1
		)
			incontriValidi.push(i);

	// Se nessun incontro disponibile, lo segnala
	if (incontriValidi.length == 0) {
		document.write("<p class='t-xxsB'>Nessun incontro disponibile</p>");
		return false;
	}

	// Mostra check-box degli incontri disponibili
	var attributes = incontriValidi.length == 1 || disabilitaIncontri ? "disabled" : "";
	document.write("<form name='selInc' id='selInc' action='' method=''>")
	document.write("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");
	for (i = 0; i < incontriValidi.length; i++) {
		var ii = arrIncontri[incontriValidi[i]];

		if (ii.IDTipo == INC_ELIMDIRETTA_DIR ||
		ii.IDTipo == INC_ELIMDIRETTA_RIT ||
		ii.IDTipo == INC_ELIMDIRETTA_DIR_FC) rigoristi = true;

		document.write("<tr><td class='t-xxsB' valign='middle'><nobr>");
		document.write("<input class='t-xxs' type='checkbox' name='cbInc" + (i + 1) + "' value='" + incontriValidi[i] + "' id='cbInc" + (i + 1) + "' checked " + attributes + "></td>");
		document.write("<td width='100%' class='t-xxsB'>" + ii.Competizione + ": " + ii.Fantagiornata);
		if (ii.IDTipo != INC_GRANPREMIO) document.write(" (" + ii.Nomi.Casa + " - " + ii.Nomi.Fuori + ")");
		document.write("</td></tr>");
	}
	document.write("</table></form>");

	return true;
}

function GeneraTabellaGiocatori()
{
	document.write("<center><table width='95%' border='0' cellpadding='0' cellspacing='0'>");

	// Tabella di sinistra (rosa fantasquadra)
	document.write("<tr><td width='62.5%' align='center' valign='top'>");
	var tabR = new Tabella(1, 8);

	// Imposta propriet� della tabella
	tabR.nome = "Rosa fantasquadra";
	tabR.larghezza = 100;
	tabR.border = 0;
	tabR.cellpadding = 1;
	tabR.cellspacing = 0;
	tabR.stile = "ClassEl";
	tabR.SetLarghezzaColonna(1, 5);
	tabR.SetLarghezzaColonna(2, 25);
	tabR.SetLarghezzaColonna(3, 10);
	tabR.SetLarghezzaColonna(4, 10);
	tabR.SetLarghezzaColonna(5, 10);
	tabR.SetLarghezzaColonna(6, 10);
	tabR.SetLarghezzaColonna(7, 10);
	tabR.SetLarghezzaColonna(8, 20);

	// Header
	tabR.SetValore(1, 1, "R");
	tabR.SetValore(1, 2, "Nome&nbsp;(Squadra)");
	tabR.SetValore(1, 3, "Aff");
	tabR.SetValore(1, 4, "MVt");
	tabR.SetValore(1, 5, "FMt");
	tabR.SetValore(1, 6, "MVu");
	tabR.SetValore(1, 7, "FMu");
	tabR.SetValore(1, 8, "Sq Avv.");
	var c;
	for (c = 1; c <= 8; tabR.SetStile(1, c++, "IntRossoBlu"));

	// Riempie la tabella
	var cnt = 2;
	var g;
	for (g = 0; g < arrInvioFormazione.length; g++) {
		var gg = arrInvioFormazione[g];
		if (gg.IDSquadra != cFsq) continue;

		arrRosa.push(g);

		var pd = cnt % 2 ? "D" : "P";
		var dati = gg.Dati.split("%");

		tabR.SetStileRiga(cnt, "t-xxs");

		var colore = coloreRuoli[gg.Ruolo];

		// Ruolo
		tabR.SetValore(cnt, 1, "<span class='t-xxs" + colore + "B' id='r_ruolo" + g + "'>&nbsp;" + ruoli[gg.Ruolo] + "&nbsp;</span>");
		tabR.SetStile(cnt, 1, "Form" + pd + "Centro");
		// Nome (Squadra)
		tabR.SetValore(cnt, 2, "<nobr><span class='t-xxs" + colore + "B' style='cursor: pointer' id='r_nome" + g + "' onClick='ClickGiocatoreRosa(" + g + ")'>" + eval(gg.Nome) + " (" + eval(gg.SquadraDiA) + ")</span>");
		tabR.SetStile(cnt, 2, "Form" + pd);
		// Affidabilit�
		tabR.SetValore(cnt, 3, "<span class='t-xxs'>" + gg.Affidabilita + "</span>");
		tabR.SetStile(cnt, 3, "Form" + pd + "Centro");
		// Dati
		var d;
		for (d = 0; d < 4; d++) {
			if (dati[d * 2 + 1] == 0) {
				tabR.SetStile(cnt, 4 + d, coloreDati[0] + pd + "Centro");
				tabR.SetValore(cnt, 4 + d, dati[d * 2]);
			}
			else {
				tabR.SetStile(cnt, 4 + d, coloreDati[dati[d * 2 + 1]] + "Centro");
				tabR.SetValore(cnt, 4 + d, dati[d * 2]);
			}
		}

		// Squadra avversaria
		var nomeAvversaria = "---";
		var inTrasferta = false;
		if (gg.IDSquadraDiA < incontraInA.length) {
			var avversaria = incontraInA[gg.IDSquadraDiA][cGio];
			inTrasferta = avversaria >= 100;
			nomeAvversaria = eval("xa" + (avversaria % 100));
		}
		tabR.SetValore(cnt, 8, "<span class='t-xxs'>" + (inTrasferta ? nomeAvversaria : nomeAvversaria.toUpperCase()) + "</span>");
		tabR.SetStile(cnt, 8, "Form" + pd);

		cnt++;
	}

	// Stampa tabella
	tabR.Stampa();
	document.write("</td><td width='2.5%'>&nbsp;</td>");

	// Imposta 'totaleNumeroMassimoRiserve' se panchina libera
	// Inizializza array 'arrFormazione' e 'arrRigoristi'
	var i;
	if (totaleNumeroMassimoRiserve == -1) totaleNumeroMassimoRiserve = arrRosa.length - 11;
	for (i = 1; i <= 11 + totaleNumeroMassimoRiserve; arrFormazione[i] = arrRigoristi[i++] = -1);


	// Tabella di destra (formazione)
	document.write("<form name='selRig' id='selRig' action='' method=''>")
	document.write("<td width='35%' align='center' valign='top'>");
	var tabF = new Tabella(1, 4 + rigoristi == true);

	// Imposta propriet� della tabella
	tabF.Nome = "Formazione";
	tabF.Larghezza = 100;
	tabF.Border = 0;
	tabF.Cellpadding = 1;
	tabF.Cellspacing = 0;
	tabF.stile = "ClassEl";
	tabF.SetLarghezzaColonna(1, 7);
	tabF.SetLarghezzaColonna(2, 1);
	tabF.SetLarghezzaColonna(3, 7);
	tabF.SetLarghezzaColonna(4, 85 - 5 * (rigoristi == true));
	if (rigoristi) {
		tabF.SetLarghezzaColonna(5, 5);
		rigoristiOptions = "";
	}

	// Costruisce la tabella vuota
	var n = 1;
	var cnt;
	for (cnt = 1; cnt <= 11 + totaleNumeroMassimoRiserve + 2; cnt++) {

		var pd = cnt % 2 ? "D" : "P";
		if (cnt == 1 || cnt == 13) {
			// Header titolari o riserve
			tabF.SetSpan(cnt, 1, 4 + (rigoristi == true));
			tabF.SetSpanned(cnt, 2, true);
			tabF.SetSpanned(cnt, 3, true);
			tabF.SetSpanned(cnt, 4, true);
			if (rigoristi) tabF.SetSpanned(cnt, 5, true);
			tabF.SetStile(cnt, 1, "IntRossoBlu");
			if (cnt == 1) tabF.SetValore(cnt, 1, "<span id='f_titolari'>Titolari (0-0-0-0)</span>");
			else tabF.SetValore(cnt, 1, "<span id='f_riserve'>Riserve (0-0-0-0)</span>");
		}
		else {
			// Giocatore
			tabF.SetStileRiga(cnt, "t-xxs");
			tabF.SetValore(cnt, 1, "<span class='t-xxsB'>&nbsp;" + n + "&nbsp;</span>");
			tabF.SetStile(cnt, 1, "Form" + pd + "Centro");
			tabF.SetValore(cnt, 2, "<img src='img/spacer.gif' width='32' height='32' id='f_maglia" + n + "'");
			tabF.SetStile(cnt, 2, "Form" + pd + "Centro");
			tabF.SetValore(cnt, 3, "<span class='t-xxsB' id='f_ruolo" + n + "'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>");
			tabF.SetStile(cnt, 3, "Form" + pd + "Centro");
			tabF.SetValore(cnt, 4, "<span class='t-xxsB' style='cursor: pointer' id='f_nome" + n + "' onClick='ClickGiocatoreFormazione(" + n + ")'>&nbsp;</span>");
			tabF.SetStile(cnt, 4, "Form" + pd);

			if (rigoristi) {
				var r = n <= 11 ? (11 - n + 1) : n;
				var rigoristiOptions = "";
				for (i = 1; i <= 11 + totaleNumeroMassimoRiserve; i++)
					rigoristiOptions += "<option " + (r == i ? "selected " : "") + "value='" + i + "'>" + i + "</option>";
				tabF.SetValore(cnt, 5, "<select class='t-xxs' name='f_rigorista" + n + "' id='f_rigorista" + n + "'>" + rigoristiOptions + "</select>");
				tabF.SetStile(cnt, 5, "Form" + pd + "Centro");
			}
			n++;
		}
	}

	// Stampa tabella
	tabF.Stampa();

	document.write("</td></form></tr></table>");
	Stato("Invio formazione");
}

function ClickGiocatoreRosa(idG)
{
	var gg = arrInvioFormazione[idG];
	if (gg.Formazione == 0) {
		var result;
		if (titolariInseriti < 11) result = InserisciTitolare(gg, idG);
		else result = InserisciRiserva(gg, idG);
		if (result) CambiaAttributiGiocatoreRosa(idG, true);
	}
	else {
		if (gg.Formazione <= 11) RimuoviTitolare(gg, idG);
		else RimuoviRiserva(gg, idG);
		CambiaAttributiGiocatoreRosa(idG, false);
	}
}

function ClickGiocatoreFormazione(pos)
{
	var idG = arrFormazione[pos];
	if (idG == -1) return;

	var gg = arrInvioFormazione[idG];
	if (pos <= 11) RimuoviTitolare(gg, idG);
	else RimuoviRiserva(gg, idG);
	CambiaAttributiGiocatoreRosa(idG, false);
}

function InserisciTitolare(gg, idG)
{
	// Controlla se il nuovo modulo � compatibile
	moduloInserito[gg.Ruolo]++;

	var compatibile = false;
	for (m = 0; m < moduliAmmessi.length; m++)
		if (moduloInserito[1] <= moduliAmmessi[m][1] &&
		moduloInserito[2] <= moduliAmmessi[m][2] &&
		moduloInserito[3] <= moduliAmmessi[m][3] &&
		moduloInserito[4] <= moduliAmmessi[m][4]) {
			compatibile = true;
			break;
		}

	if (!compatibile) {
		moduloInserito[gg.Ruolo]--;
		alert("Impossibile inserire il giocatore in formazione: il modulo che ne deriverebbe non � ammesso nella competizione");
		return false;
	}

	// Cerca posizione d'inserimento
	var p;
	for (p = 1; p <= 11; p++)
		if (arrFormazione[p] == -1 || arrInvioFormazione[arrFormazione[p]].Ruolo > gg.Ruolo) break;

	// Sposta giocatori gi� inseriti
	var i;
	for (i = titolariInseriti; i >= p; i--) {
		arrFormazione[i + 1] = arrFormazione[i];
		arrInvioFormazione[arrFormazione[i]].Formazione = i + 1;
	}

	// Inserisci nuovo giocatore
	arrFormazione[p] = idG;
	gg.Formazione = p;
	titolariInseriti++;

	// Visualizza nuova formazione
	VisualizzaTabellaFormazione();
	return true;
}


function RimuoviTitolare(gg, idG)
{
	// Sposta giocatori gi� inseriti
	var i;
	for (i = gg.Formazione; i <= 11; i++) {
		if (i < titolariInseriti) {
			arrFormazione[i] = arrFormazione[i + 1];
			arrInvioFormazione[arrFormazione[i]].Formazione = i;
		}
		else arrFormazione[i] = -1;
	}

	// Rimuovi giocatore
	gg.Formazione = 0;
	titolariInseriti--;
	moduloInserito[gg.Ruolo]--;

	// Visualizza nuova formazione
	VisualizzaTabellaFormazione();
	return true;
}

function InserisciRiserva(gg, idG)
{
	// Controlla se � possibile inserire altre riserve
	if (totaleRiserveInserite >= totaleNumeroMassimoRiserve) {
		alert("Hai gi� inserito il numero massimo di riserve");
		return false;
	}
	if (numeroMassimoRiserve[gg.Ruolo] != -1 &&
	riserveInserite[gg.Ruolo] >= numeroMassimoRiserve[gg.Ruolo]) {
		alert("Hai gi� inserito il numero massimo di riserve in questo ruolo");
		return false;
	}

	// Cerca posizione d'inserimento
	var p;
	for (p = 12; p <= 11 + totaleNumeroMassimoRiserve; p++)
		if (arrFormazione[p] == -1 || (panchinaOrdinata && arrInvioFormazione[arrFormazione[p]].Ruolo > gg.Ruolo)) break;

	// Sposta giocatori gi� inseriti
	var i;
	for (i = 11 + totaleRiserveInserite; i >= p; i--) {
		arrFormazione[i + 1] = arrFormazione[i];
		arrInvioFormazione[arrFormazione[i]].Formazione = i + 1;
	}

	// Inserisci nuovo giocatore
	arrFormazione[p] = idG;
	gg.Formazione = p;
	totaleRiserveInserite++;
	riserveInserite[gg.Ruolo]++;

	// Visualizza nuova formazione
	VisualizzaTabellaFormazione();
	return true;
}

function RimuoviRiserva(gg, idG)
{
	// Sposta giocatori gi� inseriti
	var i;
	for (i = gg.Formazione; i <= 11 + totaleNumeroMassimoRiserve; i++) {
		if (i < 11 + totaleRiserveInserite) {
			arrFormazione[i] = arrFormazione[i + 1];
			arrInvioFormazione[arrFormazione[i]].Formazione = i;
		}
		else arrFormazione[i] = -1;
	}

	// Rimuovi giocatore
	gg.Formazione = 0;
	totaleRiserveInserite--;
	riserveInserite[gg.Ruolo]--;

	// Visualizza nuova formazione
	VisualizzaTabellaFormazione();
	return true;
}

function CambiaAttributiGiocatoreRosa(idG, sel)
{
	if (sel) {
		document.getElementById("r_ruolo" + idG).className = "t-xxsI";
		document.getElementById("r_nome" + idG).className = "t-xxsI";
	}
	else {
		document.getElementById("r_ruolo" + idG).className = "t-xxs" + coloreRuoli[arrInvioFormazione[idG].Ruolo] + "B";
		document.getElementById("r_nome" + idG).className = "t-xxs" + coloreRuoli[arrInvioFormazione[idG].Ruolo] + "B";
	}
}

function VisualizzaTabellaFormazione()
{
	document.getElementById("f_titolari").innerHTML = "Titolari (" + moduloInserito[1] + "-" + moduloInserito[2] + "-" + moduloInserito[3] + "-" + moduloInserito[4] + ")";
	document.getElementById("f_riserve").innerHTML = "Riserve (" + riserveInserite[1] + "-" + riserveInserite[2] + "-" + riserveInserite[3] + "-" + riserveInserite[4] + ")";

	var i;
	for (i = 1; i <= 11 + totaleNumeroMassimoRiserve; i++) {
		if (arrFormazione[i] == -1) {
			document.getElementById("f_maglia" + i).src = "img/spacer.gif";
			document.getElementById("f_ruolo" + i).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			document.getElementById("f_nome" + i).innerHTML = "&nbsp;";
		}
		else {
			var gg = arrInvioFormazione[arrFormazione[i]];
			document.getElementById("f_maglia" + i).src = "img/sq/" + eval(gg.SquadraDiA) + ".gif";
			document.getElementById("f_ruolo" + i).innerHTML = "&nbsp;" + ruoli[gg.Ruolo] + "&nbsp;";
			document.getElementById("f_ruolo" + i).className = "t-xxs" + coloreRuoli[gg.Ruolo] + "B";
			document.getElementById("f_nome" + i).innerHTML = eval(gg.Nome) + " (" + eval(gg.SquadraDiA) + ")";
			document.getElementById("f_nome" + i).className = "t-xxs" + coloreRuoli[gg.Ruolo] + "B";
		}
	}
}


function GeneraControlliPerInvio()
{
	document.write("<p>&nbsp;</p><center><table width='95%' border='0' cellpadding='0' cellspacing='0'><tr>");

	// Destinatari e-mail
	var destinatariName = new Array ( "", "Avversario", "Webmaster", "SeStessi", "Presidente", "Tutti" );
	var destinatariDesc = new Array ( "", "Avversario", "Webmaster", "Se stessi", "Presidente di lega", "Tutti i presidenti" );
	document.write("<td rowspan='2' valign='top'><table>");
	var i;
	for (i = 1; i <= 5; i++) {
		document.write("<tr><td class='t-xxsB' valign='middle'><nobr>");
		var attributes = destinatariEMail[i] & 0x01 ? "" : "disabled";
		attributes += destinatariEMail[i] & 0x02 ? " checked" : "";
		document.write("<input class='t-xxs' type='checkbox' name='cbDest" + i + "' value='" + destinatariName[i] + "' id='cbDest" + i + "' " + attributes + "></td>");
		document.write("<td width='100%' align='left' class='t-xxsB'>" + destinatariDesc[i]);
		document.write("</td></tr>");
	}
	document.write("</table></td>");

	// Comunicazioni
	document.write("<td colspan='2' width='80%' align='left' valign='top' class='t-xxsB'>Comunicazioni:<br>");
	document.write("<textarea name='taCom' id='taCom' class='t-xxs' rows='4' style='width: 100%'></textarea>");
	document.write("</td></tr>");

	// Password e Invia
	document.write("<tr><td align='left' valign='top' class='t-xxsB'>Password: ");
	document.write("<input type='password' id='inPwd' name='inPwd' value='' class='t-xxs'>");
	document.write("</td>");
	document.write("<td align='right'><input type='button' id='btInvia' name='btInvia' value='  Invia formazione  '  class='t-xxs' onClick='InviaFormazione()'></td>");

	document.write("</tr></table>");

	switch(tipoInvio) {
		case 0:	// client-side
			document.write("<form name='emailData' id='emailData' action='' method=''></form>");
		break;

		case 1:	// server-side
			document.write("<form name='emailData' id='emailData' action='' method='post' target='ssWindow'>");
			document.write("<input type='hidden' id='edUsername' name='username' value=''>");
			document.write("<input type='hidden' id='edPassword' name='password' value=''>");
			document.write("<input type='hidden' id='edSender' name='sender' value=''>");
			document.write("<input type='hidden' id='edRecipient' name='recipient' value=''>");
			document.write("<input type='hidden' id='edSubject' name='subject' value=''>");
			document.write("<input type='hidden' id='edBody' name='body' value=''>");
			document.write("<input type='hidden' id='edGiornataDiA' name='giornataDiA' value=''>");
			document.write("<input type='hidden' id='edIdSquadra' name='idSquadra' value=''>");
			document.write("<input type='hidden' id='edIdIncontro' name='idIncontro' value=''>");
			document.write("<input type='hidden' id='edSaveData' name='saveData' value=''>");
			document.write("<input type='hidden' id='i1' name='i1' value=''>");
			document.write("<input type='hidden' id='i2' name='i2' value=''>");
			document.write("</form>");
		break;
	}
}


function InviaFormazione()
{
	var destinatari, mail;

	if (tipoInvio == 0 && !VerificaPassword()) return;

	if (!ControllaFormazione()) return;

	var i; var j = 0;
	for (i = 1; document.getElementById("cbInc" + i) != null; i++)
		if (document.getElementById("cbInc" + i).checked == true) j++;
	if (j == 0) {
		alert("Impossibile inviare la formazione: nessun incontro selezionato");
		return;
	}

	var i; var x = 0; var y = 0;
	for (i = 1; document.getElementById("cbInc" + i) != null; i++)

		if (document.getElementById("cbInc" + i).checked == true) {
			var ii = arrIncontri[document.getElementById("cbInc" + i).value];
			if ((destinatari = OttieneDestinatari(ii)) == "") continue;
			mail = GeneraEMail(ii);

			switch(tipoInvio) {

				case 0:	// client-side
					var url = "mailto:" + destinatari;
					url += "?subject=" + escape(mail[0]);
					url += "&body=" + escape(mail[1]);

					document.getElementById("emailData").method = "post";
					document.getElementById("emailData").action = url;
					document.getElementById("emailData").submit();
				break;

				case 1:	// server-side
					var mittente = mittenteEMail != "" ? mittenteEMail : arrFantasquadre[idxFsq].Email;
					if (mittente == "") {
						alert("Impossibile inviare la formazione: indirizzo di e-mail del mittente non valido");
						return;
					}
					x += 20;
					y += 20;
					window.open("", "ssWindow" + i, "width=600,height=190,screenX=" + x + ",screenY=" + y);

					document.getElementById("i1").value = pluto;
					document.getElementById("i2").value = prova;
          document.getElementById("edUsername").value = cFsq;
					document.getElementById("edPassword").value = document.getElementById("inPwd").value;
					document.getElementById("edSender").value = mittente;
					document.getElementById("edRecipient").value = destinatari;
					document.getElementById("edSubject").value = mail[0];
					document.getElementById("edBody").value = mail[1];
					document.getElementById("edGiornataDiA").value = cGio;
					document.getElementById("edIdSquadra").value = cFsq;
					document.getElementById("edIdIncontro").value = ii.ID
					if (salvaFormazione) document.getElementById("edSaveData").value = GeneraFormazione(ii);
					document.getElementById("emailData").target = "ssWindow" + i;
					document.getElementById("emailData").action = sendmailURL;
					document.getElementById("emailData").submit();

				break;
			}
		}
}


function GeneraEMail(ii)
{
	// Determina incontro e se prevede rigoristi
	var r = (ii.IDTipo == INC_ELIMDIRETTA_DIR) || (ii.IDTipo == INC_ELIMDIRETTA_RIT) || (ii.IDTipo == INC_ELIMDIRETTA_DIR_FC);

	// Ottiene nome fantasquadra e nome della competizione
	var fsq = arrFantasquadre[idxFsq].Nome;
	var cmp = ii.Competizione;
	var fsq_cmp = fsq + (incontriValidi.length > 1 ? " [" + cmp + "]" : "");

	// Costruisce il subject
	var subject = "Formazione " + fsq_cmp +", " + cmp + ", " + nomelega + " [MessaggioFrmFCM:" + cGio + "]";

	// Costruisce l'header del messaggio
	var message1 = "Lega: " + nomelega + "\n";
	message1 += "Squadra: " + fsq_cmp +"\n"
	message1 += "Giornata: " + ii.Fantagiornata + "\n";
	message1 += "Data e ora compilazione: " + DataOraCorrente() + "\n";

	// Costruisce la parte del messaggio contenente la formazione
	var n = 1;
	var i, message2;
	for (i = 1; i <= 11 + totaleNumeroMassimoRiserve + 2; i++) {

		if (i == 1) message2 = "--- Titolari ---\n";
		else if (i == 13) message2 += "--- Riserve ---\n";
		else {
			if (arrFormazione[n] >= 0 && arrFormazione[n] < arrInvioFormazione.length) {
				var gg = arrInvioFormazione[arrFormazione[n]];
				message2 += ruoli[gg.Ruolo] + " " + eval(gg.Nome) + " (" + eval(gg.SquadraDiA) + ")";
				message2 += r ? " [R: " + arrRigoristi[n] + "]\n" : "\n";
			}
			n++;
		}
	}

	// Costruisce la terza parte del messaggio
	var message3 = "CODICI IDENTIFICATIVI FCM [*NON MODIFICARE*]\n";
	message3 += "[LEGA]=" + CorreggeNomeLega(nomelega) + "-" + stagione + "-" + anno.substr(0, 4) + "\\\\\n";
	message3 += "[IDSQUADRA]=" + cFsq + "\\\\\n";
	message3 += "[GIORNATADIA]=" + cGio + "\\\\\n";
	message3 += "[IDINCONTRO]=" + ii.ID + "\\\\\n";
	message3 += "[FRMCODE]=";
	var n;
	for (n = 1; n <= 11 + totaleNumeroMassimoRiserve; n++) {
		if (arrFormazione[n] >= 0 && arrFormazione[n] < arrInvioFormazione.length) {
			var gg = arrInvioFormazione[arrFormazione[n]];
			message3 += (n!= 1 ? "-" : "") + gg.ID;
			message3 += r ? "R" + arrRigoristi[n] : "";
		}
	}
	message3 += "\\\\\n\n";
	message3 += "Comunicazioni: " + document.getElementById("taCom").value;

	var message = message1 + "\n" + message2 + "\n" + message3;

	return new Array(subject, message);
}


function ControllaFormazione()
{
	// Controlla titolari inseriti
	if (titolariInseriti != 11) {
		alert("Impossibile inviare la formazione: uno o pi� titolari non inseriti");
		return false;
	}

	// Controlla riserve inserite
	if (totaleRiserveInserite < totaleNumeroMassimoRiserve)
		if (!confirm("La formazione � incompleta, vuoi inviarla comunque?")) return;

	// Determina se incontri selezionati richiedono rigoristi
	if (!rigoristi) return true;
	var r = false;
	var i;
	for (i = 1; document.getElementById("cbInc" + i) != null; i++)
		if (document.getElementById("cbInc" + i).checked == true) {
			var ii = arrIncontri[document.getElementById("cbInc" + i).value];
			if ((ii.IDTipo == INC_ELIMDIRETTA_DIR) || (ii.IDTipo == INC_ELIMDIRETTA_RIT) || (ii.IDTipo == INC_ELIMDIRETTA_DIR_FC)) r = true;
		}
	if (!r) return true;

	// Genera array rigoristi e lo controlla
	for (i = 1; i <= 11 + totaleNumeroMassimoRiserve; i++) {
		arrRigoristi[i] = document.getElementById("f_rigorista" + i).value;
		if (arrFormazione[i] != -1) arrInvioFormazione[arrFormazione[i]].Rigorista = arrRigoristi[i];
	}

	var j;
	for (i = 1; i <= 11 + totaleNumeroMassimoRiserve - 1; i++)
		for (j = i + 1; j <= 11 + totaleNumeroMassimoRiserve; j++)
			if (arrFormazione[i] != -1 && arrFormazione[j] != -1 && arrRigoristi[i] == arrRigoristi[j]) {
				alert("Impossibile inviare la formazione: ordine rigoristi non valido (duplicato)");
				return false;
			}

	if (regolaRigoristi)
		for (i = 1; i <= 11 + totaleNumeroMassimoRiserve; i++)
			if (arrFormazione[i] != -1 && arrRigoristi[i] < 11 && arrInvioFormazione[arrFormazione[i]].Ruolo == 1) {
				alert("Impossibile inviare la formazione: ordine rigoristi non valido (portiere < 11�)");
				return false;
			}

	return true;
}


function OttieneDestinatari(ii)
{
	var destinatari = new Array();

	// Webmaster
	if (document.getElementById("cbDest2").checked) arrayAdd(destinatari, WebmasterEmail);

	// Presidente di lega
	if (document.getElementById("cbDest4").checked) arrayAdd(destinatari, presidenteDiLegaEMail);

	// Tutti i presidenti
	if (document.getElementById("cbDest5").checked)
		for (f = 1; f < arrFantasquadre.length; f++) arrayAdd(destinatari, arrFantasquadre[f].Email);
	else {
		// Se stessi
		if (document.getElementById("cbDest3").checked) arrayAdd(destinatari, arrFantasquadre[idxFsq].Email);

		// Avversario
		if (document.getElementById("cbDest1").checked && ii.IDTipo != INC_GRANPREMIO) {
			var idAvv = ii.IDSquadre.Casa == cFsq ? ii.IDSquadre.Fuori : ii.IDSquadre.Casa;
			for (f = 1; f < arrFantasquadre.length; f++) if (arrFantasquadre[f].ID == idAvv) break;
			arrayAdd(destinatari, arrFantasquadre[f].Email);
		}
	}

	if (destinatari.length == 0) {
		alert("Impossibile inviare la formazione: nessun destinatario valido selezionato");
		return "";
	}

	return destinatari.join("; ");
}


function GeneraFormazione(ii)
{
	// Determina incontro e se prevede rigoristi
	var r = (ii.IDTipo == INC_ELIMDIRETTA_DIR) || (ii.IDTipo == INC_ELIMDIRETTA_RIT) || (ii.IDTipo == INC_ELIMDIRETTA_DIR_FC);

	// Costruisce la string di formazione
	var formazione = new Array();
	var idLega = ii.IDSquadre.Casa == cFsq ? ii.IDLegaSquadre.Casa : ii.IDLegaSquadre.Fuori;
	var i;
	for (i = 0; i < arrRosa.length; i++) {
		var gg = arrInvioFormazione[arrRosa[i]];
		var pos;
		if (gg.Formazione == 0) pos = -1;
		else if (gg.Formazione <= 11) pos = 0;
		else pos = gg.Formazione - 11;
		formazione.push(ii.ID + "," + cFsq + "," + idLega + "," + gg.Nome + "," + gg.SquadraDiA + "," + gg.Ruolo + "," + pos + "," + ((r && pos >= 0) ? gg.Rigorista : 0));
	}

	return formazione.join("|");
}


function VerificaPassword()
{
	var password = document.getElementById("inPwd").value;
	var crypted = Javacrypt.crypt("jd", password);

	if (crypted[0] != passwords[arrFantasquadre[idxFsq].ID]) {
		alert("Impossibile inviare la formazione: password non valida");
		return false;
	}

	return true;
}

function DataOraCorrente()
{
	var dataOra = new Date();

	var g = "0" + dataOra.getDate();
	g = g.substr(g.length - 2, 2);
	var m = "0" + (dataOra.getMonth() + 1);
	m = m.substr(m.length - 2, 2);
	var a = "000" + dataOra.getFullYear();
	a = a.substr(a.length - 4, 4);

	var hh = "0" + dataOra.getHours();
	hh = hh.substr(hh.length - 2, 2);
	var mm = "0" + dataOra.getMinutes();
	mm = mm.substr(mm.length - 2, 2);
	var ss = "0" + dataOra.getSeconds();
	ss = ss.substr(ss.length - 2, 2);

	return g + "/" + m + "/" + a + " " + hh + "." + mm + "." + ss;
}

function arrayAdd(arr, el)
{
	if (el == "") return;

	var i;
	for (i = 0; i < arr.length; i++)
		if (arr[i] == el) return;

	arr.push(el);
}

function CorreggeNomeLega(nomeLega)
{
	return nomeLega.replace(/[\*"'\\\/:\|\?]/g, "_");
}
