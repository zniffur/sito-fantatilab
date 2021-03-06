﻿//-----------------------------------------------------------------------------
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
//    giornata e degli incontri per cui è valida la formazione
//  * nel caso di un singolo incontro, il relativo checkbox è disabilitato,
//    non è quindi più possibile deselezionarlo
// Versione 0.9.6 (07/10/2005)
//  * modificata la modalità di passaggio parametri al modulo d'invio e
//    salvataggio formazione per garantire la compatibilità anche con
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

function GeneraIntestazioneInvioFormazione(cFsq, cGio, fname)
// Questo codice genera l'intestazione per la scelta della fantasquadra
// e della giornata
// Utilizza MaxA definito nel SerieADati
{
	var arrF = new Object();
	arrF = arrFantasquadre;
	document.write("<form name='frmIF' id='frmIF' action='" + fname + ".php' method='get'>")
	document.write("<table width='100%' border='0' cellspacing='0' cellpadding='0'>")
	document.write("<tr><td width='5%' class='t-xxsB' align='left'><nobr>&nbsp;<select name='Fsq' class='t-xxs' id='Fsq' onChange='frmIF.submit();'>")
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
	document.write("<td width='95%' class='t-xxsB' align='left'><nobr>&nbsp;&nbsp;Giornata:&nbsp;<select name='Gio' class='t-xxs' id='Gio' " + attributes + " disabled='disabled' >");
	for (i = 1; i <= MaxA; i++) {
		document.write("<option value='" + i + "'");
		if (i == cGio) document.write(" selected");
		document.write(">" + i + "</option>");
	}
	document.write("</select></nobr></td></tr>");
	document.write("<tr><td colspan=2 width='100%' align='center' class='testo-10'><input name='Invia'  type='image' src='img/vai.png' class='testo-10' id='Invia' value='  Vai  '></td>")
	document.write("</tr></table></form>");
}

function GeneraSelezioneCompetizioni(cFsq, cGio)
{
	var i;

	// Ottiene incontri della giornata selezionata che interessano la squadra
	// controllando che non siano già stati giocati
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
		document.write("<td width='100%' class='t-xxsB' align='left'>" + ii.Competizione + ":");
		if (ii.IDTipo != INC_GRANPREMIO) document.write("<br> (" + ii.Nomi.Casa + " - " + ii.Nomi.Fuori + ")");
		document.write("</td></tr>");
	}
	document.write("</table></form>");

	return true;
}

function GeneraTabellaGiocatori()
{
	document.write("<table width='100%' border='0' cellpadding='0' cellspacing='0'>");

	// Tabella di sinistra (rosa fantasquadra)
	document.write("<tr><td width='52.5%' align='center' valign='top'>");
	var tabR = new Tabella(1, 5);

	// Imposta proprietà della tabella
	tabR.nome = "Rosa fantasquadra";
	tabR.larghezza = 100;
	tabR.border = 1;
	tabR.cellpadding = 1;
	tabR.cellspacing = 0;
	tabR.stile = "c";
	tabR.SetLarghezzaColonna(1, 5);
	tabR.SetLarghezzaColonna(2, 25);
	tabR.SetLarghezzaColonna(3, 10);
	tabR.SetLarghezzaColonna(4, 10);
	tabR.SetLarghezzaColonna(5, 10);
	//tabR.SetLarghezzaColonna(6, 10);
	//tabR.SetLarghezzaColonna(7, 10);
	//tabR.SetLarghezzaColonna(8, 20);

	// Header
	tabR.SetValore(1, 1, "R");
	tabR.SetValore(1, 2, "Nome");
	//tabR.SetValore(1, 3, "Aff");
	tabR.SetValore(1, 3, "MVt");
	tabR.SetValore(1, 4, "FMt");
	//tabR.SetValore(1, 6, "MVu");
	//tabR.SetValore(1, 7, "FMu");
	tabR.SetValore(1, 5, "Avv");
	var c;
	for (c = 1; c <= 5; tabR.SetStile(1, c++, "q"));

	// Riempie la tabella
	var cnt = 2;
	var g;
	for (g = 0; g < arrInvioFormazione.length; g++) {
		var gg = arrInvioFormazione[g];
		if (gg.IDSquadra != cFsq) continue;

		arrRosa.push(g);

		var pd = cnt % 2 ? "D" : "P";
		var dati = gg.Dati.split("%");

		tabR.SetStileRiga(cnt, "h");

		var colore = coloreRuoli[gg.Ruolo];

		// Ruolo
		tabR.SetValore(cnt, 1, "<span class='t-xxs" + colore + "B' id='r_ruolo" + g + "'>&nbsp;" + ruoli[gg.Ruolo] + "&nbsp;</span>");
		tabR.SetStile(cnt, 1, "Form" + pd + "Centro");
		// Nome (Squadra)
		tabR.SetValore(cnt, 2, "<nobr><span class='t-xxs" + colore + "B' style='cursor: pointer' id='r_nome" + g + "' onClick='ClickGiocatoreRosa(" + g + ")'>" + toProperCase(filterSpecial(filter(eval(gg.Nome)))));
		tabR.SetStile(cnt, 2, "Form" + pd);
		// Affidabilità
		//tabR.SetValore(cnt, 3, "<span class='t-xxs'>" + gg.Affidabilita + "</span>");
		//tabR.SetStile(cnt, 3, "Form" + pd + "Centro");
		// Dati
		var d;
		for (d = 0; d < 2; d++) {
			if (dati[d * 2 + 1] == 0) {
				tabR.SetStile(cnt, 3 + d, coloreDati[0] + pd + "Centro");
				tabR.SetValore(cnt, 3 + d, quattro(dati[d * 2]));
			}
			else {
				tabR.SetStile(cnt, 3 + d, coloreDati[dati[d * 2 + 1]] + "Centro");
				tabR.SetValore(cnt, 3 + d, quattro(dati[d * 2]));
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
		tabR.SetValore(cnt, 5, "<span class='t-xxs'>" + (inTrasferta ? toProperCase(trelettere(parentesi(nomeAvversaria))) : ((toProperCase(trelettere(parentesi(nomeAvversaria))))).toUpperCase()) + "</span>");
		tabR.SetStile(cnt, 5, "Form" + pd);

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
	document.write("<td width='45%' align='center' valign='top'>");
	var tabF = new Tabella(1, 3 + rigoristi == true);

	// Imposta proprietà della tabella
	tabF.Nome = "Formazione";
	tabF.Larghezza = 100;
	tabF.Border = 0;
	tabF.Cellpadding = 0;
	tabF.Cellspacing = 0;
	tabF.stile = "h";
	tabF.SetLarghezzaColonna(1, 1);
	//tabF.SetLarghezzaColonna(2, 1);
	tabF.SetLarghezzaColonna(2, 1);
	tabF.SetLarghezzaColonna(3, 98 - 1 * (rigoristi == true));
	if (rigoristi) {
		tabF.SetLarghezzaColonna(5, 1);
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
			//tabF.SetSpanned(cnt, 4, true);
			if (rigoristi) tabF.SetSpanned(cnt, 5, true);
			tabF.SetStile(cnt, 1, "IntRossoBlu");
			if (cnt == 1){ tabF.SetValore(cnt, 1, "<span id='f_titolari'>Titolari<br>(0-0-0-0)</span>");
			tabF.SetStile(cnt, 1, "q");}
			else {tabF.SetValore(cnt, 1, "<span id='f_riserve'>Riserve<br>(0-0-0-0)</span>");
			tabF.SetStile(cnt, 1, "q");}
		}
		else {
			// Giocatore
			tabF.SetStileRiga(cnt, "t-xxs");
			tabF.SetValore(cnt, 1, "<span class='t-xxsB'>" + n + "</span>");
			tabF.SetStile(cnt, 1, "Form" + pd + "Centro");
			//tabF.SetValore(cnt, 2, "<img src='img/spacer.gif' width='32' height='32' id='f_maglia" + n + "'");
			//tabF.SetStile(cnt, 2, "Form" + pd + "Centro");
			tabF.SetValore(cnt, 2, "<span class='t-xxsB' id='f_ruolo" + n + "'></span>");
			tabF.SetStile(cnt, 2, "Form" + pd + "Centro");
			tabF.SetValore(cnt, 3, "<span class='t-xxsB' style='cursor: pointer' id='f_nome" + n + "' onClick='ClickGiocatoreFormazione(" + n + ")'></span>");
			tabF.SetStile(cnt, 3, "Form" + pd + "Centro");

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
	// Controlla se il nuovo modulo è compatibile
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
		alert("Impossibile inserire il giocatore in formazione: il modulo che ne deriverebbe non è ammesso nella competizione");
		return false;
	}

	// Cerca posizione d'inserimento
	var p;
	for (p = 1; p <= 11; p++)
		if (arrFormazione[p] == -1 || arrInvioFormazione[arrFormazione[p]].Ruolo > gg.Ruolo) break;

	// Sposta giocatori già inseriti
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
	// Sposta giocatori già inseriti
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
	// Controlla se è possibile inserire altre riserve
	if (totaleRiserveInserite >= totaleNumeroMassimoRiserve) {
		alert("Hai già inserito il numero massimo di riserve");
		return false;
	}

           
	if (numeroMassimoRiserve[gg.Ruolo] != -1 &&
	riserveInserite[gg.Ruolo] >= numeroMassimoRiserve[gg.Ruolo]) {
		alert("Hai già inserito il numero massimo di riserve in questo ruolo");
		return false;
	}

if (numeroMassimoRiserve[gg.Ruolo] == -1 && gg.Ruolo != 1 && totaleRiserveInserite >= ((totaleNumeroMassimoRiserve)-1) && riserveInserite[1]==0) {
		alert("Puoi inserire solo il portiere di riserva");
		return false;
	}




	// Cerca posizione d'inserimento
	var p;
	for (p = 12; p <= 11 + totaleNumeroMassimoRiserve; p++) 

		if (arrFormazione[p] == -1 || (panchinaOrdinata && arrInvioFormazione[arrFormazione[p]].Ruolo > gg.Ruolo)) break;

	// Sposta giocatori già inseriti
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
	// Sposta giocatori già inseriti
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
	document.getElementById("f_titolari").innerHTML = "Titolari<br>(" + moduloInserito[1] + "-" + moduloInserito[2] + "-" + moduloInserito[3] + "-" + moduloInserito[4] + ")";
	document.getElementById("f_riserve").innerHTML = "Riserve<br>(" + riserveInserite[1] + "-" + riserveInserite[2] + "-" + riserveInserite[3] + "-" + riserveInserite[4] + ")";

	var i;
	for (i = 1; i <= 11 + totaleNumeroMassimoRiserve; i++) {
		if (arrFormazione[i] == -1) {
			//document.getElementById("f_maglia" + i).src = "img/spacer.gif";
			document.getElementById("f_ruolo" + i).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			document.getElementById("f_nome" + i).innerHTML = "&nbsp;";
		}
		else {
			var gg = arrInvioFormazione[arrFormazione[i]];
			//document.getElementById("f_maglia" + i).src = "img/sq/" + eval(gg.SquadraDiA) + ".gif";
			document.getElementById("f_ruolo" + i).innerHTML = ruoli[gg.Ruolo];
			document.getElementById("f_ruolo" + i).className = "t-xxs" + coloreRuoli[gg.Ruolo] + "B";
			document.getElementById("f_nome" + i).innerHTML = "<nobr>" + toProperCase(filterSpecial(filter(eval(gg.Nome))));
			document.getElementById("f_nome" + i).className = "t-xxs" + coloreRuoli[gg.Ruolo] + "B";
		}
	}
}


function GeneraControlliPerInvio()
{
	document.write("<table align='left' width='100%' border='0' cellpadding='0' cellspacing='0'><tr>");

	// Destinatari e-mail
	var destinatariName = new Array ( "", "Avversario", "Webmaster", "SeStessi", "Presidente", "Tutti" );
	var destinatariDesc = new Array ( "", "Avversario", "Webmaster", "Se stessi", "Presidente di lega", "Tutti i presidenti" );
	document.write("<td colspan='2' rowspan='1' align='left' valign='top'><table><tr><td class='t-xxsB' width='100%' align='left' valign='top' style='padding-left:5px;'><nobr>");
	var i;
	for (i = 1; i <= 5; i++) {
	if ((i % 2) == 0) {
				pd="right"
			} else {
				pd="left"
			}
		document.write("<div style='float:"+pd+"; width:49%;'>");
		var attributes = destinatariEMail[i] & 0x01 ? "" : "disabled";
		attributes += destinatariEMail[i] & 0x02 ? " checked" : "";
		document.write("<input style='height:10px; width:10px; padding:0px; margin:0px;' class='t-xxs' type='checkbox' size='10' name='cbDest" + i + "' value='" + destinatariName[i] + "' id='cbDest" + i + "' " + attributes + ">");
		document.write("&nbsp;" + destinatariDesc[i]);
		document.write("</div>");
	}
	document.write("</td></tr></table></td></tr>");
//
	// Comunicazioni
	document.write("<tr><td align='center'  colspan=2 width=100% valign='bottom' class='t-xxsB' style='padding-left:5px;'>Comunicazioni:<br>");
	document.write("<textarea name='taCom' id='taCom' style='background:scroll #c5d2ed' class='t-xxs' rows='3' style='width: 100%'></textarea>");
	document.write("</td></tr>");

	// Password e Invia
	document.write("<tr><td align='center'  colspan=2 width=100% valign='bottom' class='t-xxsB' style='padding-left:5px;'>Password:<br>");
	document.write("<input type='password' id='inPwd' name='inPwd' value='' class='t-xxs' style='background:scroll #c5d2ed url(wap/header_repeater4.png) center top repeat-x;'>");
	document.write("<BR>");
	document.write("<input  id='btInvia' style='margin-left:10px;margin-bottom:2px;font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 12pt;' name='btInvia' value='  Invia formazione  '  type='image' src='img/invia.png' onClick='InviaFormazione()'></td>");

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
			document.write("<input type='hidden' id='edInserimentoTitolari' name='InserimentoTitolari' value=''>");
			document.write("<input type='hidden' id='i1' name='i1' value=''>");
			document.write("<input type='hidden' id='i2' name='i2' value=''>");
			document.write("<input type='hidden' id='edOrarioInvio' name='orarioInvio' value=''>");
			document.write("</form>");
			document.write("</td></tr></table>");
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
					//document.getElementById("i2").value = prova;
					document.getElementById("edOrarioInvio").value = GeneraOrarioInvio(ii);
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
					if (salvaFormazione) document.getElementById("edInserimentoTitolari").value = GeneraInserimentoTitolari(ii);
					document.getElementById("emailData").target = "ssWindow" + i;
					document.getElementById("emailData").action = "../"+sendmailURL;
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
//	message3 += "Comunicazioni: " + document.getElementById("taCom").value;

	var message = message1 + "\n" + message2 + "\n" + message3;

	return new Array(subject, message);
}


function ControllaFormazione()
{
	// Controlla titolari inseriti
	if (titolariInseriti != 11) {
		alert("Impossibile inviare la formazione: uno o più titolari non inseriti");
		return false;
	}

	// Controlla riserve inserite
	if (totaleRiserveInserite < totaleNumeroMassimoRiserve)
		if (!confirm("La formazione è incompleta, vuoi inviarla comunque?")) return;

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
				alert("Impossibile inviare la formazione: ordine rigoristi non valido (portiere < 11°)");
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

function GeneraInserimentoTitolari(ii)
{
	var inserimento = new Array();
	var idLega = ii.IDSquadre.Casa == cFsq ? ii.IDLegaSquadre.Casa : ii.IDLegaSquadre.Fuori;
	var i;
	for (i = 1; i <= 11; i++) {

      if (arrFormazione[i] != -1) { 
         var gg = arrInvioFormazione[arrFormazione[i]]; 
	inserimento.push(ii.ID + "," + cFsq + "," + idLega + "," + gg.Nome + "," + i);
      } 
}

	return inserimento.join("|");
}


function GeneraOrarioInvio(ii)
{

var weekday=new Array(7);
weekday[0]="Domenica";
weekday[1]="Lunedi";
weekday[2]="Martedi";
weekday[3]="Mercoledi";
weekday[4]="Giovedi";
weekday[5]="Venerdi";
weekday[6]="Sabato";


oggi= new Date();
ora = oggi.getHours(); //Ottieni oraria
minuti = oggi.getMinutes(); //Ottieni minuti
secondi = oggi.getSeconds(); //Ottieni secondi
if (secondi < 10)
secondi0 = "0";
else
secondi0 = "";
if (minuti < 10)
minuti0 = "0";
else
minuti0 = "";
if (ora < 10)
ora0 = "0";
else
ora0 = "";
       OrarioFinale = 'da WAP '+weekday[oggi.getDay()]+' '+oggi.getDate()+'/'+(oggi.getMonth()+1)+'/'+oggi.getYear()+' alle ore '+ora0 + ora + ':' + minuti0 + minuti + ':' + secondi0 + secondi;


	// Costruisce la string di orario
	var orario = new Array();
	var idLega = ii.IDSquadre.Casa == cFsq ? ii.IDLegaSquadre.Casa : ii.IDLegaSquadre.Fuori;
	

		orario.push(ii.ID + ',' + cFsq + ',"' + OrarioFinale + '"');

	return orario.join("|");
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


//FUNZIONCINE UTILI

//Elimina solo gli spazi. Non la uso
function removeSpaces(string) {
	var tstring = "";
	string = '' + string;
	splitstring = string.split(" ");
	for(i = 0; i < splitstring.length; i++)
	tstring += splitstring[i];
	return tstring;
}

function quattro(str) {
return str.substring(0,4);
}

function trelettere(str) {
return str.substring(0,3);
}

//elimina le minuscole e l'apice dalla stringa in input
function filterSpecial(str) {
	re = /\?|\"|'/g;
	// remove special characters like "$" and "," etc...
	return str.replace(re, "´");
}

//elimina le minuscole e l'apice dalla stringa in input
function filter(str) {
	re = /a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|à|è|ì|ò|(|)|ù|\./g;
	// remove special characters like "$" and "," etc...
	return str.replace(re, "");


}
function parentesi(str) {
	re = /(|)/g;
	// remove special characters like "$" and "," etc...
	return str.replace(re, "");


}


//elimina le iniziali maiuscole  dei Nomi che rimangono.. 
//Non la uso perchè così viene tagliata anche la seconda iniziale di chi ha un cognome doppio: Julio Cesar > Julioesar
function refine(str) {
	re = / A| B| C| D| E| F| G| H| I| J| K| L| M| N| O| P| Q| R| S| T| U| V| W| X| Y| Z|\./g;
	// remove special characters like "$" and "," etc...
	return str.replace(re, "");
}

//Mette l'iniziale di ogni parola in maiuscolo e il resto in minuscolo: In Questo Modo Qui
	// proper case function (JScript 5.5+)
	function toProperCase(s){
		return s.toLowerCase().replace(/^(.)|\s(.)/g,
		function($1) { return $1.toUpperCase(); });
	}