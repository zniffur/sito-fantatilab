// SELEZIONE PREDEFINITA DESTINATARI INVIO MAIL
var cDefTuttiPresidenti = 0					// 0 -> no, 1 -> si  (se = 1 non prende in considerazione cDefInvioAvversario e cDefInvioPresidenteSquadra, poiché sono compresi in cDefTuttiPresidenti)
var cDefInvioAvversario = 1					// 0 -> no, 1 -> si
var cDefInvioWebMaster = 1					// 0 -> no, 1 -> si
var cDefInvioPresidenteLega = 1				// 0 -> no, 1 -> si
var cDefInvioPresidenteSquadra = 1			// 0 -> no, 1 -> si
var emailPresidente="mail@presidente.it"	//specificare l'email del presidente di lega per l'invio formazione

// MOSTRA/NASCONDI RIGA DI SELEZIONE INVIO MAIL A DESTINATARIO
var cDefVediInvioAvversario = 1				// 0 -> no, 1 -> si
var cDefVediInvioWebMaster = 1				// 0 -> no, 1 -> si
var cDefVediInvioPresidenteLega = 0			// 0 -> no, 1 -> si
var cDefVediInvioPresidenteSquadra = 1		// 0 -> no, 1 -> si
var cDefVediTuttiPresidenti = 1				// 0 -> no, 1 -> si

// SELEZIONE TIPO INVIO MAIL (ASP,PHP, JS)
var cDefTipoInvio = 2		// 0 -> ASP (cdosys), 1 -> ASP (cdonts), 2 -> PHP, 3 -> JS (outlook)
var cDefServerURL = ""		//lasciare il campo vuoto se il sito supporta ASP o PHP, altrimenti specificare il nome del server utilizzato per l'invio comprensivo di "/" finale (es. http://www.mioserver.it/test/), dove avremo caricato i file .asp o .php presenti nel pacchetto

// UTILIZZO RISERVE LIBERE
var cDefRiserveLibere = 1			//0 -> no, 1 -> si

// CAMPI PER LA GESTIONE DELLE RISERVE LIBERE
var portiereobbligatorio = 1		//0 -> no, 1 -> si
var cDefMinRiserveTotali = -1		//-1 -> non controllato, >0 minimo riserve totali (compreso il portiere)
var cDefMaxRiserveTotali = 7		//-1 -> non controllato, >0 massimo riserve totali (compreso il portiere)
var cDefMinRiserveLibereRuolo = -1	//-1 -> non controllato, >0 minimo riserve libere per ruolo
var cDefMaxRiserveLibereRuolo = -1	//-1 -> non controllato, >0 massimo riserve libere per ruolo

// CAMPI PER LA GESTIONE DELLE RISERVE FISSE
var cDefRiserveDifensori = 2		//numero riserve difesa
var cDefRiserveCentrocampisti = 2	//numero riserve centrocampo
var cDefRiserveAttaccanti = 2		//numero riserve attacco

// MOSTRA/NASCONDI SCELTA GIORNATA
var cDefMostraGiornata = 1			// 0 -> no, 1 -> si

// MOSTRA/NASCONDI SCELTA COMPETIZIONI
var cDefMostraCompetizione = 1		// 0 -> no, 1 -> si

// USA CAMPO PASSWORD
var cDefUsaPassword = 0				// 0 -> no, 1 -> si

// LINK A CUI SI VUOLE RIMANDARE TRAMITE TASTO
var cDefLinkPulsante = "index.htm"	// indirizzo
var cDefNomePulsante = "Home"		// nome che appare sul pulsante

// EMAIL MITTENTE x PHP
// Se uguale a 1 il mittente è il nome del presidente che invia la formazione e la sua mail. 
// Qualora o il nome o la mail non siano state settate, verranno utilizzate quelle sotto.
var cDefMittente = 1				// 0 -> no, 1 -> si
var cDefNomeMittente = "FANTACALCIO 2004/05 Nome Lega"
var cDefMailMittente = "server@sito.it"

//MODULI DISPONIBILI
var arrModuliPossibili=new Array()
a=arrModuliPossibili
a[1]=new M(1,"3-4-3",3,4,3)
a[2]=new M(2,"3-5-2",3,5,2)
a[3]=new M(3,"4-3-3",4,3,3)
a[4]=new M(4,"4-4-2",4,4,2)
a[5]=new M(5,"4-5-1",4,5,1)
a[6]=new M(6,"5-3-2",5,3,2)
a[7]=new M(7,"5-4-1",5,4,1)
a[8]=new M(8,"6-3-1",6,3,1)

//PERSONALIZZAZIONE COLORI E FONT

	// colori e font
	stile_testo_normale = "font-size:8pt;font-family:arial,verdana,sans-serif;font-weight:normal;color:blue"
	col_intestazionetabella = "#003366"		// colore dell'intestazione delle tabelle
	stile_titolo_tabella = "font-size:8pt;font-family:arial,verdana,sans-serif;font-weight:bold;color:white"
	col_bordotabella = "#000000"			// colore del bordo delle tabelle
	col_sfondotabella = "#ffffff"			// colore dello sfondo delle celle
	col_sfondotabella_vuota = "#ffffff"		// colore dello sfondo delle celle (righe vuote)
	col_cursore = "#ffffcc"					// colore del cursore di evidenzazione giocatori
	col_cursore_text = "black"				// colore della scritta evidenziata dal cursore
	stile_tabella_sin = ";font-size:8pt;font-family:arial,verdana,sans-serif;font-weight:normal;"
	col_testointerno = "black"				// colore dei voti
	col_testointerno7 = "green"				// colore dei voti se >7
	col_testointerno5 = "red"				// colore dei voti se <6
	col_gioc_selezionato = "#cccccc"		// colore giocatore inserito in formazione
	col_intestazione_squadra = "font-size:10pt;font-family:arial,verdana,sans-serif;font-weight:normal;color:black"

	// stile delle scritte giocatore-ruolo-squadra
	font_gioc = "font-size:8pt;font-family:arial,verdana,sans-serif;font-weight:bold;"
	colore_gioc_P = "#999900"
	colore_gioc_D = "#009900"
	colore_gioc_C = "#cc0000"
	colore_gioc_A = "#3300ff"
	stile_gioc_P = font_gioc + "color:" + colore_gioc_P
	stile_gioc_D = font_gioc + "color:" + colore_gioc_D
	stile_gioc_C = font_gioc + "color:" + colore_gioc_C
	stile_gioc_A = font_gioc + "color:" + colore_gioc_A

	stile_titolo_legenda = "font-size:8pt;font-family:arial,sans-serif;font-weight:bold;color:black;text-align:center"
	stile_testo_legenda = "font-size:8pt;font-family:arial,sans-serif;font-weight:normal;color:black;text-align:center"
	stile_scritta_schema = "font-size:10pt;font-family:arial,sans-serif;font-weight:bold;color:#003366"
	stile_testo_mail = "font-size:8pt;font-family:arial,sans-serif;font-weight:bold;color:black;text-align:left"

// **************************************************
// VARIABILI CALCOLATE (da qui in poi non modificare)
// **************************************************

// variabile che conta se almeno un invio mail deve essere visibile
var cDefInvio = cDefVediInvioAvversario + cDefVediInvioWebMaster + cDefVediInvioPresidenteLega + cDefVediInvioPresidenteSquadra + cDefVediTuttiPresidenti

//numero totale riserve
var cDefRiserveTotali =0
if (cDefRiserveLibere==0) {
	//CALCOLO TOTALE PANCHINARI PER RISERVE FISSE
	cDefRiserveTotali = 1+cDefRiserveDifensori+cDefRiserveCentrocampisti+cDefRiserveAttaccanti
}
else
{
	if (cDefMaxRiserveTotali>-1){
		//CALCOLO TOTALE PANCHINARI PER RISERVE LIBERE
		cDefRiserveTotali = cDefMaxRiserveTotali
	}
	else
	{
		//CALCOLO TOTALE PANCHINARI PER RISERVE LIBERE
		cDefRiserveTotali = (cDefMaxRiserveLibereRuolo * 3) + 1
	}
}

var avversari=new Array()
avversari[0] = ['MILAN','lecce','juventus','SIENA','livorno','PARMA','SAMPDORIA','messina','UDINESE','roma','FIORENTINA','chievo','PALERMO','inter','REGGINA','cagliari','TREVISO','lazio','EMPOLI','milan','LECCE','JUVENTUS','siena','LIVORNO','parma','sampdoria','MESSINA','udinese','ROMA','fiornetina','CHIEVO','palermo','INTER','reggina','CAGLIARI','treviso','LAZIO','empoli']
avversari[1] = ['siena','LAZIO','MESSINA','empoli','ROMA','lecce','MILAN','chievo','LIVORNO','fiorentina','TREVISO','reggina','SAMPDORIA','palermo','juventus','ASCOLI','parma','UDINESE','inter','SIENA','lazio','messina','EMPOLI','roma','LECCE','milan','CHIEVO','livorno','FIORENTINA','treviso','REGINA','sampdoria','PALERMO','JUVENTUS','ascoli','PARMA','udinese','INTER','siena']
avversari[2] = ['juventus','PARMA','reggina','INTER','sampdoria','TREVISO','palermo','CAGLIARI','lazio','EMPOLI','siena','ASCOLI','livorno','MILAN','messina','UDINESE','roma','LECCE','fiorentina','JUVENTUS','parma','REGGINA','inter','SAMPDORIA','treviso','PALERMO','cagliari','LAZIO','empoli','SIENA','ascoli','LIVORNO','milan','MESSINA','udinese','ROMA','lecce','FIORENTINA']
avversari[3] = ['udinese','JUVENTUS','palermo','CAGLIARI','LECCE','palermo','ROMA','treviso','MILAN','chievo','REGGINA','livorno','LAZIO','sampdoria','siena','FIORENTINA','inter','MESSINA','ascoli','UDINESE','juventus','PALERMO','cagliari','lecce','PALERMO','roma','TREVISO','milan','CHIEVO','reggina','LIVORNO','lazio','SAMPDORIA','SIENA','fiorentina','INTER','messina','ASCOLI']
avversari[4] = ['SAMPDORIA','messina','UDINESE','lecce','inter','LIVORNO','lazio','PARMA','siena','CAGLIARI','ascoli','MILAN','roma','JUVENTUS','TREVISO','empoli','PALERMO','reggina','CHIEVO','sampdoria','MESSINA','udinese','LECCE','INTER','livorno','LAZIO','parma','SIENA','cagliari','ASCOLI','milan','ROMA','juventus','treviso','EMPOLI','palermo','REGGINA','chievo']
avversari[5] = ['TREVISO','palermo','LECCE','chievo','FIORENTINA','juventus','LIVORNO','udinese','ROMA','sampdoria','lazio','PARMA','messina','ASCOLI','MILAN','reggina','EMPOLI','siena','CAGLIARI','treviso','PALERMO','lecce','CHIEVO','fiorentina','JUVENTUS','livorno','UDINESE','roma','SAMPDORIA','LAZIO','parma','MESSINA','ascoli','milan','REGGINA','empoli','SIENA','cagliari']
avversari[6] = ['CHIEVO','empoli','ASCOLI','udinese','parma','INTER','MESSINA','lecce','SAMPDORIA','milan','LIVORNO','roma','TREVISO','fiorentina','CAGLIARI','lazio','SIENA','palermo','REGGINA','chievo','EMPOLI','ascoli','UDINESE','PARMA','inter','messina','LECCE','sampdoria','MILAN','livorno','ROMA','treviso','FIORENTINA','cagliari','LAZIO','siena','PALERMO','reggina']
avversari[7] = ['MESSINA','cagliari','TREVISO','milan','PALERMO','udinese','FIORENTINA','roma','CHIEVO','reggina','INTER','sampdoria','empoli','SIENA','livorno','JUVENTUS','lecce','ASCOLI','parma','messina','CAGLIARI','treviso','MILAN','palermo','UDINESE','fiorentina','ROMA','chievo','REGGINA','inter','SAMPDORIA','EMPOLI','siena','LIVORNO','juventus','LECCE','ascoli','PARMA']
avversari[8] = ['livorno','ASCOLI','inter','FIORENTINA','empoli','CAGLIARI','reggina','JUVENTUS','palermo','MESSINA','parma','SIENA','milan','ROMA','udinese','treviso','LAZIO','chievo','SAMPDORIA','LIVORNO','ascoli','INTER','fiorentina','EMPOLI','cagliari','REGGINA','juventus','PALERMO','messina','PARMA','siena','MILAN','roma','UDINESE','TREVISO','lazio','CHIEVO','sampdoria']
avversari[9] = ['LECCE','treviso','ROMA','messina','ASCOLI','fiorentina','inter','REGGINA','cagliari','PARMA','juventus','EMPOLI','CHIEVO','udinese','LAZIO','palermo','MILAN','sampdoria','SIENA','lecce','TREVISO','roma','MESSINA','ascoli','FIORENTINA','INTER','reggina','CAGLIARI','parma','JUVENTUS','empoli','chievo','UDINESE','lazio','PALERMO','milan','SAMPDORIA','siena']
avversari[10] = ['lazio','FIORENTINA','cagliari','LIVORNO','siena','SAMPDORIA','juventus','ASCOLI','parma','lecce','ROMA','udinese','INTER','treviso','CHIEVO','milan','REGGINA','empoli','PALERMO','LAZIO','fiorentina','CAGLIARI','livorno','SIENA','sampdoria','JUVENTUS','ascoli','PARMA','LECCE','roma','UDINESE','inter','TREVISO','chievo','MILAN','reggina','EMPOLI','palermo']
avversari[11] = ['ascoli','SIENA','sampdoria','LAZIO','treviso','REGGINA','cagliari','PALERMO','empoli','JUVENTUS','UDINESE','fiorentina','LECCE','chievo','inter','MESSINA','livorno','PARMA','roma','ASCOLI','siena','SAMPDORIA','lazio','TREVISO','reggina','CAGLIARI','palermo','EMPOLI','juventus','udinese','FIORENTINA','lecce','CHIEVO','INTER','messina','LIVORNO','parma','ROMA']
avversari[12] = ['parma','INTER','siena','REGGINA','lazio','EMPOLI','CHIEVO','milan','LECCE','udinese','SAMPDORIA','treviso','ascoli','CAGLIARI','roma','LIVORNO','fiorentina','JUVENTUS','messina','PARMA','inter','SIENA','reggina','LAZIO','empoli','chievo','MILAN','lecce','UDINESE','sampdoria','TREVISO','ASCOLI','cagliari','ROMA','livorno','FIORENTINA','juventus','MESSINA']
avversari[13] = ['PALERMO','chievo','EMPOLI','roma','JUVENTUS','ascoli','TREVISO','fiorentina','MESSINA','livorno','LECCE','inter','UDINESE','reggina','SAMPDORIA','siena','CAGLIARI','milan','LAZIO','palermo','CHIEVO','empoli','ROMA','juventus','ASCOLI','treviso','FIORENTINA','messina','LIVORNO','lecce','INTER','udinese','REGGINA','sampdoria','SIENA','cagliari','MILAN','lazio']
avversari[14] = ['ROMA','sampdoria','CHIEVO','palermo','UDINESE','milan','LECCE','livorno','TREVISO','LAZIO','empoli','CAGLIARI','siena','PARMA','ascoli','INTER','messina','FIORENTINA','juventus','roma','SAMPDORIA','chievo','PALERMO','udinese','MILAN','lecce','LIVORNO','treviso','lazio','EMPOLI','cagliari','SIENA','parma','ASCOLI','inter','MESSINA','fiorentina','JUVENTUS']
avversari[15] = ['reggina','UDINESE','livorno','PARMA','cagliari','SIENA','empoli','LAZIO','inter','ASCOLI','messina','JUVENTUS','FIORENTINA','lecce','PALERMO','sampdoria','CHIEVO','treviso','MILAN','REGGINA','udinese','LIVORNO','parma','CAGLIARI','siena','EMPOLI','lazio','INTER','ascoli','MESSINA','juventus','fiorentina','LECCE','palermo','SAMPDORIA','chievo','TREVISO','milan']
avversari[16] = ['fiorentina','REGGINA','MILAN','treviso','CHIEVO','messina','ascoli','SIENA','juventus','INTER','palermo','LAZIO','cagliari','EMPOLI','parma','ROMA','udinese','LIVORNO','lecce','FIORENTINA','reggina','milan','TREVISO','chievo','MESSINA','ASCOLI','siena','JUVENTUS','inter','PALERMO','lazio','CAGLIARI','empoli','PARMA','roma','UDINESE','livorno','LECCE']
avversari[17] = ['CAGLIARI','milan','PALERMO','ascoli','MESSINA','roma','UDINESE','sampdoria','FIORENTINA','treviso','CHIEVO','lecce','REGGINA','lazio','EMPOLI','PARMA','juventus','INTER','livorno','cagliari','MILAN','palermo','ASCOLI','messina','ROMA','udinese','SAMPDORIA','fiorentna','TREVISO','chievo','LECCE','reggina','LAZIO','empoli','parma','JUVENTUS','inter','LIVORNO']
avversari[18] = ['inter','LIVORNO','lazio','SAMPDORIA','MILAN','chievo','parma','EMPOLI','reggina','SIENA','cagliari','PALERMO','juventus','MESSINA','fiorentina','LECCE','ascoli','ROMA','udinese','INTER','livorno','LAZIO','sampdoria','milan','CHIEVO','PARMA','empoli','REGGINA','siena','CAGLIARI','palermo','JUVENTUS','messina','FIORENTINA','lecce','ASCOLI','roma','UDINESE']
avversari[19] = ['EMPOLI','roma','fiorentina','JUVENTUS','reggina','LAZIO','siena','INTER','ascoli','PALERMO','milan','MESSINA','parma','LIVORNO','LECCE','chievo','SAMPDORIA','cagliari','TREVISO','empoli','ROMA','FIORENTINA','juventus','REGGINA','lazio','SIENA','inter','ASCOLI','palermo','MILAN','messina','PARMA','livorno','lecce','CHIEVO','sampdoria','CAGLIARI','treviso']

squadrediseriea = ['Ascoli','Cagliari','Chievo','Empoli','Fiorentina','Inter','Juventus','Lazio','Lecce','Livorno','Messina','Milan','Palermo','Parma','Reggina','Roma','Sampdoria','Siena','Treviso','Udinese']

// Variabile che indica se deve caricare i dati o no
var carica = true

fantasq = JSQueryString("Fsq")
if (fantasq == "" || fantasq == 0) {
	fantasq = 0
	carica = false
}

cGio = JSQueryString("Gio")
if (cGio == null || cGio == "")
	giornata = GetProssimaGiornataDaGiocare()
else
	giornata = cGio

if (carica) {
	for (i=1;i<arrFantasquadre.length ;i++ )
		if (arrFantasquadre[i].ID == fantasq)
			var nomeFantasq = arrFantasquadre[i].Nome

	do {
		squadraOK = false
		for (ii=1;ii<arrIncontri.length;ii++) {
			if (arrIncontri[ii].GiornataDiA == giornata) {
				if (arrIncontri[ii].Nomi.Casa == nomeFantasq || arrIncontri[ii].Nomi.Fuori == nomeFantasq) {
					if (arrIncontri[ii].IDTipo == INC_RIPOSO) {
						break
					}
				squadraOK = true
				giornatadia = arrIncontri[ii].Fantagiornata
				break
				}
			}
		}
		if (!squadraOK)
			fantasq++
	} while (!squadraOK);

	document.write("<scr" + "ipt src='js/fcmRegistriDati" + fantasq + ".js' type='text/javascript'></scr" + "ipt>")	
}

function GetUltimaGiornataGiocataDaFantasquadra(fantasq) {
// ritorna l'ultima giornata giocata. Se non e' stata giocata
// nessuna allora ritorna comunque 1
var i,gio=1
	i=(arrIncontri.length-1)
	do {
		if (arrIncontri[i].Giocato && arrIncontri[i].IDTipo!=INC_RIPOSO) {
			if (arrIncontri[i].IDSquadre.Casa == fantasq || arrIncontri[i].IDSquadre.Fuori == fantasq)
				return arrIncontri[i].GiornataDiA
		}
		if (!arrIncontri[i].Giocato && arrIncontri[i].IDTipo!=INC_RIPOSO)
				gio=arrIncontri[i].GiornataDiA
		i--
	} while (i>=1)
	return (gio)
}

document.write("<scr" + "ipt src='js/fcmRisultatiDati" + GetUltimaGiornataGiocataDaFantasquadra(fantasq) + ".js' type='text/javascript'></scr" + "ipt>")	
function scriviSceltaSquadra() {
	GeneraIntestazioneNuova(fantasq,giornata)
}

function ScriviStileFormazione() {
	document.write("<style type=text/css>")
	document.write("td.P {" + stile_gioc_P + "}")
	document.write("td.D {" + stile_gioc_D + "}")
	document.write("td.C {" + stile_gioc_C + "}")
	document.write("td.A {" + stile_gioc_A + "}")
	document.write("</style>")
}

function scriviIntestazione() {
	document.write("<table class='tab-8' align='center' cellspacing='2' cellpadding='0'><tr><td>Giornata di serie A da giocare: " + giornata + "<sup>a</sup>")
	numeroCompetizioni = 0
	cDefMostraRigoristi = 0
	idIncontro = new Array()
	tipoID = new Array()
	for (ii=1;ii<arrIncontri.length;ii++) {
		avversario = ""
		modo = ""
		if (arrIncontri[ii].GiornataDiA == giornata & (arrIncontri[ii].Nomi.Casa == nomeFantasq || arrIncontri[ii].Nomi.Fuori == nomeFantasq)) {
			switch (arrIncontri[ii].IDTipo)
			{
			case INC_GRANPREMIO :
					modo = " in modalità granpremio"
					break

			case INC_NORMALE_NEUTRO :
					modo = " in campo neutro contro "
					if (arrIncontri[ii].Nomi.Casa == nomeFantasq)
						avversario = arrIncontri[ii].Nomi.Fuori
					if (arrIncontri[ii].Nomi.Fuori == nomeFantasq)
						avversario = arrIncontri[ii].Nomi.Casa
					break

			case INC_ELIMDIRETTA_DIR :
					modo = " ad eliminazione diretta partita secca contro "
					if (arrIncontri[ii].Nomi.Casa == nomeFantasq)
						avversario = arrIncontri[ii].Nomi.Fuori
					if (arrIncontri[ii].Nomi.Fuori == nomeFantasq)
						avversario = arrIncontri[ii].Nomi.Casa
					cDefMostraRigoristi = 1
					break

			case INC_ELIMDIRETTA_AND :
					if (arrIncontri[ii].Nomi.Casa == nomeFantasq) {
						modo = " in casa ad eliminazione diretta, andata contro "
						avversario = arrIncontri[ii].Nomi.Fuori
					}
					if (arrIncontri[ii].Nomi.Fuori == nomeFantasq) {
						modo = " in trasferta ad eliminazione diretta, andata contro "
						avversario = arrIncontri[ii].Nomi.Casa
					}
					break

			case INC_ELIMDIRETTA_RIT :
					if (arrIncontri[ii].Nomi.Casa == nomeFantasq) {
						modo = " in casa ad eliminazione diretta, ritorno contro "
						avversario = arrIncontri[ii].Nomi.Fuori
					}
					if (arrIncontri[ii].Nomi.Fuori == nomeFantasq) {
						modo = " in trasferta ad eliminazione diretta, ritorno contro "
						avversario = arrIncontri[ii].Nomi.Casa
					}
					cDefMostraRigoristi = 1
					break

			case INC_ELIMDIRETTA_DIR_FC :
					modo = " ad eliminazione diretta partita secca con fattore campo contro "
					if (arrIncontri[ii].Nomi.Casa == nomeFantasq)
						avversario = arrIncontri[ii].Nomi.Fuori
					if (arrIncontri[ii].Nomi.Fuori == nomeFantasq)
						avversario = arrIncontri[ii].Nomi.Casa
					cDefMostraRigoristi = 1
					break

			default : 
					if (arrIncontri[ii].Nomi.Casa == nomeFantasq) {
						modo = " in casa contro "
						avversario = (arrIncontri[ii].Nomi.Fuori).toUpperCase(0)
					}
					else if (arrIncontri[ii].Nomi.Fuori == nomeFantasq) {
						modo = " in trasferta contro "
						avversario = (arrIncontri[ii].Nomi.Casa).toLowerCase(0)
					}
			}
			numeroCompetizioni++
			idIncontro[numeroCompetizioni] = arrIncontri[ii].ID
			tipoID[numeroCompetizioni] = cDefMostraRigoristi
			document.write("<BR>")
			if (cDefMostraCompetizione)
				document.write("<input type='checkbox' name='nomeCompetizioneV' value='" + arrIncontri[ii].Competizione + "' id='competizioneV" + numeroCompetizioni + "' checked onclick='controlloCompetizioni()'>")
			document.write("<input type='hidden' name='nomeCompetizioneH' value='" + arrIncontri[ii].Competizione + "' id='competizioneH" + numeroCompetizioni + "'>")
			document.write("Partita di <b>" + arrIncontri[ii].Competizione + "</b>" + modo + "<b>" + avversario + "</b>")
		}	
	}
	document.write("</td></tr></table>")
	document.write("<input id=IDTipo name=IDTipo value=1 type=hidden>")
	document.write("<input name=Fsquadra value='" + nomeFantasq + "' type=hidden>")
	document.write("<input name=NumGiornata value=" + giornata + " type=hidden>")
}

function controlloCompetizioni() {
	var competizioniOK = false
	for (cc = 1;cc <= numeroCompetizioni ;cc++ )
		if (document.getElementById("competizioneV" + cc).checked == true) {
			competizioniOK = true
		}
	if (!competizioniOK) {
		alert("Almeno una competizione DEVE essere selezionata!!!\nDi default seleziono la prima...")
		document.getElementById("competizioneV1").checked = true
	}
}

function scriviTabellaGiocatori() {
	document.write("<br><table class='tab-8' align='center' border='1' cellpadding='2'>")
	document.write("<tr class='riga-blu'><th>Nome Giocatore</th>")
	document.write("<th class='cx'>&nbsp;R&nbsp;</th>")
	document.write("<th>Squadra</th>")
	document.write("<th class='cx'>&nbsp;G&nbsp;</th>")
	document.write("<th class='cx'>MV</th>")
	document.write("<th class='cx'>FM</th>")
	document.write("<th class='cx'>MVu</th>")
	document.write("<th class='cx'>FMu</th>")
	document.write("<th class='cx'>Avversario</th>")
	document.write("</tr>")

	// cerca la colonna nella quale è presente la Media Voto Totale
	mvt = 0
	while (arrRegistri[1].ListaStat.split("%")[mvt] != "MVT")
		mvt++
	// cerca la colonna nella quale è presente la Fanta Media Totale
	fmt = 0
	while (arrRegistri[1].ListaStat.split("%")[fmt] != "FMT")
		fmt++
	// identifica quale degli arrTabellini appartiene a fantasq
	qualetab = 1
	while (arrTabellini[qualetab].IDSquadra != fantasq)
		qualetab++

	// ********************************
	// scrive i dati per ogni giocatore
	// ********************************
	ruolo_old = "P"
	num_gioc = 1
	posizione = 2
	while(arrRegistri[posizione].IDGiocatore>0) {
		num_gioc++
		posizione++
	}
	inizio_array = 2
	for (t=3; t<arrRegistri.length; t++)
		if (arrRegistri[2].IDGiocatore==arrRegistri[t].IDGiocatore)
			inizio_array = t
	for (gioc=inizio_array; gioc<=inizio_array+num_gioc-2; gioc++) {
		ruolo = (arrRegistri[gioc].Ruolo==1) ? "P" : "D"
		ruolo = (arrRegistri[gioc].Ruolo==3) ? "C" : ruolo
		ruolo = (arrRegistri[gioc].Ruolo==4) ? "A" : ruolo
		if (ruolo != ruolo_old) {
			document.write("<tr><td colspan=9>&nbsp;</td></tr>")
			ruolo_old = ruolo
		}

		// il NOME GIOCATORE si ottiene subito
		nomegioc = eval("xg" + [arrRegistri[gioc].IDGiocatore])
		document.write("<tr id=GiocSel" + (gioc-1) + " name=GiocSel" + (gioc-1) + " value=A onclick='Javascript:CliccaGiocatore(this);' onmouseover=Javascript:HighLightTR('" + col_cursore + "','" + col_cursore_text + "',this.value.substr(0,1));this.style.cursor='hand'; onmouseout=Javascript:try{ChangeTextColor(preEl,'" + eval("colore_gioc_"+ruolo) + "',orgBColor);}catch(e){;} style='background-color:" + col_sfondotabella + ";'>")
		document.write("<td id=GioRosa" + (gioc-1) + " name=GioRosa" + (gioc-1) + " value=0 style='" + eval(("stile_gioc_" + ruolo)) + "'>")
		document.write(nomegioc)
		document.write("<input id=xgRosa" + (gioc-1) + " name=xgRosa" + (gioc-1) + " value=" + arrRegistri[gioc].IDGiocatore + " type=hidden>")
		document.write("<input id=IdGioc" + (gioc-1) + " name=IdGioc" + (gioc-1) + " value=" + (gioc-1) + " type=hidden>")
		document.write("</td>")

		// scrive il RUOLO
		document.write("<td id=RuoRosa" + (gioc-1) + " name=RuoRosa" + (gioc-1) + " value=0 div style='" + eval(("stile_gioc_" + ruolo)) + "'>" + ruolo + "</td>")
		
		// ottiene il NOME DELLA SQUADRA di A del giocatore
		for (i=1; i<arrRose.length; i++) {
			if (arrRose[i].IDSquadra == fantasq)
				if (arrRose[i].Nome == nomegioc)
					nomesquad = arrRose[i].Squadra
		}
		document.write("<td id=SquRosa" + (gioc-1) + " name=SquRosa" + (gioc-1) + " style='" + eval(("stile_gioc_" + ruolo)) + "'>" + nomesquad + "</td>")

		// calcola il N° DI PRESENZE
		quante = 0
		for (i=0; i<giornata-1; i++) {
			if (arrRegistri[gioc].ListaGio.split("%")[i] != "sv/ng")
				quante++
		}
		quante = (quante==0) ? "-" : quante
		document.write("<td class='cx'>"+ quante + "</td>")

		// ottiene la MEDIA DEI VOTI
		calc = arrRegistri[gioc].ListaStat.split("%")[mvt]
        colore = "black"
		if (calc != "---") {
			calc = parseFloat(calc.replace(",",".")) + .005
			if (calc>=7)
				colore = "green"
			else if (calc<6)
				colore = "red"
			calc = (calc.toString()).slice(0,4)
		}
		else
			calc = "-"
		document.write("<td class='cx'><span style='color:"+colore+"';>" + calc + "</span></td>")

		// ottiene la MEDIA DEI FANTAVOTI
		calc = arrRegistri[gioc].ListaStat.split("%")[fmt]
		colore = "black"
		if (calc != "---") {
			calc = parseFloat(calc.replace(",",".")) + .005
			if (calc>=7)
				colore = "green"
			else if (calc<6)
				colore = "red"
			numchar = (calc>10 || calc<0) ? 5 : 4
			calc = (calc.toString()).slice(0,numchar)
		}
		else
			calc = "-"
		document.write("<td class='cx'><span style='color:"+colore+"';>" + calc + "</span></td>")

		// ottiene la VOTAZIONE DELL'ULTIMA GIORNATA (solo se in rosa alla squadra)
		posgioc = 0
		while (posgioc<num_gioc && arrTabellini[qualetab].Lista.split("%")[posgioc]!=arrRegistri[gioc].IDGiocatore)
			posgioc++
		calc = (posgioc==num_gioc) ? "?" : arrTabellini[qualetab].Voto.split("%")[posgioc]
        colore = "black"
		if (parseFloat(calc)>0) {
			calc = parseFloat(calc.replace(",",".")) + .05
			if (calc>=7)
				colore = "green"
			else if (calc<6)
				colore = "red"
			calc = (calc.toString()).slice(0,3)
		} else
			calc = "-"
		document.write("<td class='cx'><span style='color:"+colore+"';>" + calc + "</span></td>")

		// ottiene la VOTAZIONE FC DELL'ULTIMA GIORNATA (solo se in rosa alla squadra)
		calc = (posgioc==num_gioc) ? "-" : arrTabellini[qualetab].Tot.split("%")[posgioc]
		if (calc == "sv/ng")
			calc = "-"
		colore = "black"
		if (parseFloat(calc)>0) {
			calc = parseFloat(calc.replace(",",".")) + .05
			if (calc>=7)
				colore = "green"
			else if (calc<6)
				colore = "red"
			numchar = (calc>10 || calc<0) ? 4 : 3
			calc = (calc.toString()).slice(0,numchar)
		}
		document.write("<td class='cx'><span style='color:"+colore+"';>" + calc + "</span></td>")

		// prende il NOME DELLA SQUADRA AVVERSARIA di ogni giocatore
		qualesqa = 0
		while ((squadrediseriea[qualesqa] != nomesquad) && qualesqa<20)
			qualesqa++
		if (qualesqa<20)
			calc = avversari[qualesqa][giornata-1]
		else
			calc = "-"
		document.write("<td>" + calc + "</div></td>")
		document.write("</tr>")
	}
	document.write("</table><br>")
}

function scriviLegenda() {
	document.write("<table class='tab-8bord' border='1' cellspacing='2' align='center'>")
    document.write("<caption><b>LEGENDA</b></caption>")
	document.write("<tr><td><b>MV</b>: media voto</td><td><b>MVu</b>: media voto ultima giornata</td></tr>")
	document.write("<tr><td><b>FM</b>: fantamedia</td><td><b>FMu</b>: fantamedia ultima giornata</td></tr>")
	document.write("<tr><td><b>G</b>: partite giocate</td><td>In <b>MAIUSCOLO</b> le partite in casa</td></tr>")
	document.write("<tr><td><b>Avversario</b>: avversario reale</td><td>In <b>minuscolo</b> le partite fuori casa</td></tr>")
    document.write("</table>")
}

function controlloTutti() {
	if (cDefVediTuttiPresidenti == 1) {
		if (document.InvioFormazioni.tuttilegaMail.checked == true) {
			if (cDefVediInvioAvversario == 1)
				document.InvioFormazioni.avversarioMail.checked = false;
			if (cDefVediInvioPresidenteSquadra == 1)
				document.InvioFormazioni.sestessiMail.checked = false;
		}
	}
}

function unamail() {
	nessuno = false
	if (cDefVediTuttiPresidenti == 1)
		if (document.InvioFormazioni.tuttilegaMail.checked == true)
			nessuno = true
	if (cDefVediInvioAvversario == 1)
		if (document.InvioFormazioni.avversarioMail.checked == true)
			nessuno = true
	if (cDefVediInvioPresidenteSquadra == 1)
		if (document.InvioFormazioni.sestessiMail.checked == true)
			nessuno = true
	if (cDefVediInvioPresidenteLega == 1)
		if (document.InvioFormazioni.presidentelegaMail.checked == true)
			nessuno = true
	if (cDefVediInvioWebMaster == 1)
		if (document.InvioFormazioni.webmasterMail.checked == true)
			nessuno = true
	if (!nessuno) {
		if (cDefVediInvioPresidenteLega == 1)
			document.InvioFormazioni.presidentelegaMail.checked = true
		else if (cDefVediInvioAvversario == 1)
			document.InvioFormazioni.avversarioMail.checked = true
		else if (cDefVediTuttiPresidenti == 1)
			document.InvioFormazioni.tuttilegaMail.checked = true
		else if (cDefVediInvioPresidenteSquadra == 1)
			document.InvioFormazioni.sestessiMail.checked = true
		else if (cDefVediInvioWebMaster == 1)
			document.InvioFormazioni.webmasterMail.checked = true
	}
}

function scriviTabellaInvioMail() {
	document.write("<table class='tab-8bord' align='center' border='1'>")
    document.write("<caption><b>DESTINATARI DELLA FORMAZIONE</b></caption>")
	if (cDefVediInvioAvversario == 1) {
		document.write("<tr><td>Avversario</td>")
		document.write("<td><input type='checkbox' name='avversarioMail' id='avversarioMail'")
		if (cDefInvioAvversario)
			document.write(" checked")
		document.write(" onclick='if (cDefVediTuttiPresidenti == 1) document.InvioFormazioni.tuttilegaMail.checked = false;unamail()'></td></tr>")
	}
	if (cDefVediInvioWebMaster == 1) {
		document.write("<tr><td>Al WebMaster</td>")
		document.write("<td><input type='checkbox' name='webmasterMail' id='webmasterMail'")
		if (cDefInvioWebMaster)
			document.write(" checked")
		document.write(" onclick='unamail()'></td></tr>")
	}
	if (cDefVediInvioPresidenteSquadra == 1) {
		document.write("<tr><td>A se stessi</td>")
		document.write("<td><input type='checkbox' name='sestessiMail' id='sestessiMail'")
		if (cDefInvioPresidenteSquadra)
			document.write(" checked")
		document.write(" onclick='if (cDefVediTuttiPresidenti == 1) document.InvioFormazioni.tuttilegaMail.checked = false;unamail()'></td></tr>")
	}
	if (cDefVediInvioPresidenteLega == 1) {
		document.write("<tr><td>Al Presidente di Lega</td>")
		document.write("<td><input type='checkbox' name='presidentelegaMail' id='presidentelegaMail'")
		if (cDefInvioPresidenteLega)
			document.write(" checked")
		document.write(" onclick='unamail()'></td></tr>")
	}
	if (cDefVediTuttiPresidenti == 1) {
		document.write("<tr><td>A tutti i Presidenti delle squadre della Lega</td>")
		document.write("<td><input type='checkbox' name='tuttilegaMail' id='tuttilegaMail'")
		if (cDefTuttiPresidenti)
			document.write(" checked")
		document.write(" onclick='controlloTutti();unamail()'></td></tr>")
	}
	controlloTutti()
	unamail()
	document.write("</table>")
}

function scriviTabellaFormazione() {	// scrive la tabella con gli 11 giocatori scelti
	document.write("<table class='tab-8' align='center' border='1' cellpadding='2' cellspacing='0' cols='3' rules='all' width='100%'><tbody>")
	document.write("<tr class='riga-blu'><th class='cx' colspan='3'>")
	document.write("<input id=NumDife name=NumDife value=0 type=hidden>")
	document.write("<input id=NumCent name=NumCent value=0 type=hidden>")
	document.write("<input id=NumAtta name=NumAtta value=0 type=hidden>")
	document.write("<input id=NumTit name=NumTit value=0 type=hidden>")
	document.write("<input id=PrimoDisp name=PrimoDisp value=1 type=hidden>")
	document.write("TITOLARI</th></tr>")

	for (t=1; t<12; t++) {
		document.write("<tr>")
		document.write("<td>" + t)
		document.write("<input id=IdGioForm" + t + " name=IdGioForm" + t + " type=hidden>")
		document.write("<input id=GioForm" + t + " name=GioForm" + t + " type=hidden>")
		document.write("<input id=RuoForm" + t + " name=RuoForm" + t + " type=hidden>")
		document.write("<input id=SquForm" + t + " name=SquForm" + t + " type=hidden>")
		document.write("<input id=xgForm" + t + " name=xgForm" + t + " type=hidden>")
		document.write("</td>")
		document.write("<td id=GioFormVis" + t + " name=GioFormVis" + t + " width=84%>&nbsp;</td>")
		document.write("<td id=RuoFormVis" + t + " name=RuoFormVis" + t + " align=center width=10%>&nbsp;</td>")
		document.write("</tr>")
	}
	
	document.write("<tr class='riga-blu'><th class='cx' colspan=3>")
	document.write("<input id=NumPanD name=NumPanD value=0 type=hidden>")
	document.write("<input id=NumPanC name=NumPanC value=0 type=hidden>")
	document.write("<input id=NumPanA name=NumPanA value=0 type=hidden>")
	document.write("<input id=NumPan name=NumPan value=0 type=hidden>")
	document.write("PANCHINA</th></tr>")
	
	// scrive la panchina, con i cDefRiserveTotali giocatori scelti
	for (t=12; t<12+cDefRiserveTotali; t++) {
		document.write("<tr>")
		document.write("<td>" + t)
		document.write("<input id=IdGioForm" + t + " name=IdGioForm" + t + " type=hidden>")
		document.write("<input id=GioForm" + t + " name=GioForm" + t + " type=hidden>")
		document.write("<input id=RuoForm" + t + " name=RuoForm" + t + " type=hidden>")
		document.write("<input id=SquForm" + t + " name=SquForm" + t + " type=hidden>")
		document.write("<input id=xgForm" + t + " name=xgForm" + t + " type=hidden>")
		document.write("</td>")
		document.write("<td id=GioFormVis" + t + " name=GioFormVis" + t + " align=left width=84%>&nbsp;</td>")
		document.write("<td id=RuoFormVis" + t + " name=RuoFormVis" + t + " align=center width=10%>&nbsp;</td>")
		document.write("</tr>")
	}

	document.write("</tbody></table>")
}

function scriviTabellaRigoristi() {
	if (cDefMostraRigoristi) {
		document.write("<td id=Rigoristi name=Rigoristi style=visibility:show  align=center valign=top width=7%>")
		document.write("<table class='tab-8' align='center' border='1' cellpadding='2' cellspacing='0' cols='3' rules='all' width='100%'>")
	} else {
		document.write("<td id=Rigoristi name=Rigoristi style=visibility:hidden  align=center valign=top width=7%>")
		document.write("<table class='tab-8' align='center' border='1' cellpadding='2' cellspacing='0' cols='3' rules='all' width='100%'>")
	}
	document.write("<tbody><tr class='riga-blu'><th class='cx'>RIG.</th></tr>")

	rango = 12
	for (t=1; t<12; t++) {
		document.write("<tr><td>")
		document.write("<input value=" + (rango-t) + " id=IdGioFormRiB" + t + " name=IdGioFormRiB" + t + " type=hidden>")
		document.write(t + "°<select style='font-size:7pt;' id=IdGioFormRig" + t + " name=IdGioFormRig" + t + " onchange=Javascript:CambiaRig(this);>")
		for (i=1; i<12+cDefRiserveTotali; i++) {
			document.write("<option ")
			if (i == (rango-t))
				document.write("selected ")
			document.write("value=" + i + ">" + i + "</option>")
		}
		document.write("</select>")
		document.write("</td></tr>")
	}

	document.write("<tr style='color:darkred;font-size:10pt;font-weight:bold;' align=center>")
	document.write("<td>&nbsp;</td>")
	document.write("</tr>")
							
	for (t=12; t<12+cDefRiserveTotali; t++) {
		document.write("<tr><td>")
		document.write("<input value=" + t + " id=IdGioFormRiB" + t + " name=IdGioFormRiB" + t + " type=hidden>")
		document.write(t + "°<select style='font-size:7pt;' id=IdGioFormRig" + t + " name=IdGioFormRig" + t + " onchange=Javascript:CambiaRig(this);>")
		for (i=1; i<12+cDefRiserveTotali; i++) {
			document.write("<option ")
			if (i == t)
				document.write("selected ")
			document.write("value=" + i + ">" + i + "</option>")
		}
		document.write("</select>")
		document.write("</td></tr>")
	}
	
	document.write("</tbody></table>")
}

function GeneraIntestazioneNuova(cFsq,cGior) {
	var arrF = new Object()
	arrF = arrFantasquadre
	document.write("<form name='frmFsq' id='frmFsq'>")
	document.write("<table border='00' cellspacing='0' cellpadding='0'>")
	if (cDefMostraGiornata) {
		document.write("<tr><td><nobr>&nbsp;&nbsp;Fantasquadra:&nbsp;<select name='Fsq' class='testo-10' id='Fsq' onChange='changeGiornata(document.frmFsq.Fsq.options[document.frmFsq.Fsq.selectedIndex].value,document.frmFsq.Gio.options[document.frmFsq.Gio.selectedIndex].value)'>")
	}
	else
		document.write("<tr><td><nobr>&nbsp;&nbsp;Fantasquadra:&nbsp;<select name='Fsq' class='testo-10' id='Fsq' onChange='window.location=\"formazione.html?cFsq=\"+document.frmFsq.Fsq.options[document.frmFsq.Fsq.selectedIndex].value'>")
	document.write("<option value='0'")
	if (fantasq == 0) document.write(" selected")
	document.write(">--- select ---</option>")
	for (i=1;i<arrF.length;i++) {
		document.write("<option value='" + arrF[i].ID + "'")
		if (arrF[i].ID == fantasq) document.write(" selected")
		document.write(">" + arrF[i].Nome + "</option>")
	}
	document.write("</select></nobr></td>")
	if (cDefMostraGiornata) {
		document.write("<td><nobr>&nbsp;&nbsp;Giornata:&nbsp;<select name='Gio' class='testo-10' id='Gio' onChange='changeGiornata(document.frmFsq.Fsq.options[document.frmFsq.Fsq.selectedIndex].value,document.frmFsq.Gio.options[document.frmFsq.Gio.selectedIndex].value)'>")
		for (i=1;i<=MaxA;i++) {
			document.write("<option value='" + i + "'")
			if (i == cGior) document.write(" selected")
			document.write(">" + i + "</option>")
		}
		document.write("</select></nobr></td>")
	}
// Fare in modo di inserire la data della giornata
//	document.write("<td style='"+col_intestazione_squadra+"'><nobr>&nbsp;&nbsp;Data: " + dataGiornata[cGior] + "</td>")
	document.write("<td><nobr>&nbsp;&nbsp;<input type='button' value='" + cDefNomePulsante + "' onclick='location.href=(cDefLinkPulsante)'></td></tr></table></form>")
}

function changeGiornata(f,g) {
	if (f != 0) {
		giorGiocata = false
		squadraRiposo = false
		for (ii=1;ii<arrIncontri.length;ii++) {
			if (arrIncontri[ii].GiornataDiA == g) {
				if (arrIncontri[ii].IDSquadre.Casa == f || arrIncontri[ii].IDSquadre.Fuori == f) {
					if (arrIncontri[ii].IDTipo == INC_RIPOSO) {
						alert("La squadra RIPOSA")
						squadraRiposo = true
						break
					}
					else if (arrIncontri[ii].Giocato) {
						alert("Questa giornata è già stata giocata...")
						giorGiocata = true
						break
					}
					squadraRiposo = true
					giorGiocata = true
					window.location="formazione.html?cGio="+g+"&cFsq="+f
					break
				}
			}
		}
		if (!giorGiocata && !squadraRiposo)
			alert("Questa giornata non viene giocata dalla squadra...")
	}
	else
		window.location="formazione.html"
}

function InviaFormazione(){
errMsg=false

if (document.getElementById("NumTit").value<11) {
alert("La formazione non è ancora completa.")
errMsg=true
}
else{

msgPan=""

//Verifica riserve libere o riserve fisse
if(cDefRiserveLibere==0) {
//RISERVE FISSE
if (document.getElementById("NumPanD").value!=cDefRiserveDifensori) {
	msgPan=msgPan + "Il numero di Difensori in panchina non è corretto."
	errMsg=true
}
if (document.getElementById("NumPanC").value!=cDefRiserveCentrocampisti) {
	msgPan=msgPan + "\nIl numero di Centrocampisti in panchina non è corretto."
	errMsg=true
}
if (document.getElementById("NumPanA").value!=cDefRiserveAttaccanti) {
	msgPan=msgPan + "\nIl numero di Attaccanti in panchina non è corretto."
	errMsg=true
}
}else{
//RISERVE LIBERE

//MINIMO RISERVE PER RUOLO
if (cDefMinRiserveLibereRuolo>-1){ 
	if(document.getElementById("NumPanD").value<cDefMinRiserveLibereRuolo){
		msgPan=msgPan + "E' necessario inserire almeno " + cDefMinRiserveLibereRuolo + " difensori."
		errMsg=true
	}
	if (document.getElementById("NumPanC").value<cDefMinRiserveLibereRuolo){
		msgPan=msgPan + "E' necessario inserire almeno " + cDefMinRiserveLibereRuolo + " centrocampisti."
		errMsg=true
	}
	if (document.getElementById("NumPanA").value<cDefMinRiserveLibereRuolo){
		msgPan=msgPan + "E' necessario inserire almeno " + cDefMinRiserveLibereRuolo + " attaccanti."
		errMsg=true
	}
}
//MASSIMO RISERVE PER RUOLO
if (cDefMaxRiserveLibereRuolo>-1){ 
	if(document.getElementById("NumPanD").value>cDefMaxRiserveLibereRuolo){
		msgPan=msgPan + "E' possibile inserire massimo " + cDefMinRiserveLibereRuolo + " difensori."
		errMsg=true
	}
	if (document.getElementById("NumPanC").value>cDefMaxRiserveLibereRuolo){
		msgPan=msgPan + "E' possibile inserire massimo " + cDefMinRiserveLibereRuolo + " centrocampisti."
		errMsg=true
	}
	if (document.getElementById("NumPanA").value>cDefMaxRiserveLibereRuolo){
		msgPan=msgPan + "E' possibile inserire massimo " + cDefMinRiserveLibereRuolo + " attaccanti."
		errMsg=true
	}
}

//Calcolo totale riserve
var totriserve=eval(document.getElementById("NumPanD").value) + eval(document.getElementById("NumPanC").value) + eval(document.getElementById("NumPanA").value)

//MINIMO RISERVE TOTALI
if (cDefMinRiserveTotali>-1){ 
	if(totriserve < cDefMinRiserveTotali){
		msgPan=msgPan + "E' necessario inserire almeno " + cDefMinRiserveTotali + " riserve."
		errMsg=true
	}
}

//MASSIMO RISERVE TOTALI
if (cDefMaxRiserveTotali>-1){ 
	if(totriserve > cDefMaxRiserveTotali){
		msgPan=msgPan + "E' possibile inserire massimo " + cDefMaxRiserveTotali + " riserve."
		errMsg=true
	}
}

}

if (errMsg==false) {
//Invio mail

//Recupero descrizione modulo
var DescModulo=document.getElementById('NumDife').value + "-" + document.getElementById('NumCent').value + "-" + document.getElementById('NumAtta').value

//Recupero nome squadra e password
var emailSquadra = ""
var Presidente = ""
var PwdAutenticata = false
for (i=1;i<arrFantasquadre.length;i++) {
	if (arrFantasquadre[i].ID == fantasq) {
		Presidente = arrFantasquadre[i].Presidente
		emailSquadra = arrFantasquadre[i].Email
		if (cDefUsaPassword == 1) {
			var FsqPwd = document.getElementById("FsqPwd").value
			if  (arrFantasquadre[i].Telef2 == FsqPwd)
				PwdAutenticata = true
			break
		}
		else
			PwdAutenticata = true
	}
}
if (Presidente == "")
	Presidente = cDefNomeMittente
if (emailSquadra == "")
	emailSquadra = cDefMailMittente

if(!PwdAutenticata){
	alert('Password errata!')
	return false
}

strAvviso="A T T E N Z I O N E !!!!!!!!\n"
strAvviso=strAvviso + "L'invio della presente formazione sostituirà\n" 
strAvviso=strAvviso + "una precedente formazione già inviata!!!!!!\n"
strAvviso=strAvviso + "Sicuro di voler procedere?"
var Risposta=confirm(strAvviso)
if (Risposta) {

destinatari = new Array()
nomeCompetizione = new Array()
OK = true
for (q = 1; q <= numeroCompetizioni; q++) {
	// Nome della competizione
	if (cDefMostraCompetizione == 1) {
		if (document.getElementById("competizioneV" + q).checked == true) {
			nomeCompetizione[q] = document.getElementById("competizioneV" + q).value
		}
		else
			nomeCompetizione[q] = "notChecked"
	}
	else {
		nomeCompetizione[q] = document.getElementById("competizioneH" + q).value
	}
}


for (q = 1; q <= numeroCompetizioni; q++)
if (nomeCompetizione[q] != "notChecked") {
	destinatari[q] = ""

	//Recupero email avversario
	emailAvversario = ""
	separatore = (cDefTipoInvio == 2) ? "," : ";"
	if (cDefInvio > 0) {
		if (cDefVediTuttiPresidenti == 1)
			if (document.getElementById("tuttilegaMail").checked == true) {
				for (i=1;i<arrFantasquadre.length;i++)
					emailAvversario = emailAvversario + arrFantasquadre[i].Email + separatore
			}
		else if (cDefVediInvioAvversario == 1) {
			if (document.getElementById("avversarioMail").checked == true){
				for (ii = 1; ii < arrIncontri.length; ii++) {
					avversario = ""
					if (nomeCompetizione[q] == arrIncontri[ii].Competizione) {
						if (arrIncontri[ii].GiornataDiA == giornata) {
							if (arrIncontri[ii].Nomi.Casa == arrFantasquadre[fantasq].Nome && arrIncontri[ii].IDTipo != INC_GRANPREMIO)
								avversario = (arrIncontri[ii].Nomi.Fuori).toUpperCase(0)
							else if (arrIncontri[ii].Nomi.Fuori == arrFantasquadre[fantasq].Nome && arrIncontri[ii].IDTipo != INC_GRANPREMIO)
								avversario = (arrIncontri[ii].Nomi.Casa).toLowerCase(0)
							if (avversario.toLowerCase(0) == arrFantasquadre[fantasq].Nome.toLowerCase(0))
								avversario = "Modalità GranPremio"
							if (avversario != "" && avversario != "Modalità GranPremio") {
								for (i = 1; i < arrFantasquadre.length; i++) {
									if (arrFantasquadre[i].Nome.toUpperCase() == avversario.toUpperCase()){
										emailAvversario = emailAvversario + arrFantasquadre[i].Email + separatore
										break
									}
								}
							}
						}
					}
				}
			}
		}
	}
	else {
		if (cDefTuttiPresidenti == 1) {
			for (i=1;i<arrFantasquadre.length;i++)
					emailAvversario = emailAvversario + arrFantasquadre[i].Email + separatore
		}
		else if (cDefInvioAvversario == 1){
			for (ii = 1; ii < arrIncontri.length; ii++) {
				avversario = ""
				if (nomeCompetizione[q] == arrIncontri[ii].Competizione)
				if (arrIncontri[ii].GiornataDiA == giornata) {
					if (arrIncontri[ii].Nomi.Casa == arrFantasquadre[fantasq].Nome && arrIncontri[ii].IDTipo != INC_GRANPREMIO)
						avversario = (arrIncontri[ii].Nomi.Fuori).toUpperCase(0)
					else if (arrIncontri[ii].Nomi.Fuori == arrFantasquadre[fantasq].Nome && arrIncontri[ii].IDTipo != INC_GRANPREMIO)
						avversario = (arrIncontri[ii].Nomi.Casa).toLowerCase(0)
					if (avversario.toLowerCase(0) == arrFantasquadre[fantasq].Nome.toLowerCase(0))
						avversario = "Modalità GranPremio"
					if (avversario != "" && avversario != "Modalità GranPremio") {
						for (i = 1; i < arrFantasquadre.length; i++) {
							if (arrFantasquadre[i].Nome.toUpperCase() == avversario.toUpperCase()){
								emailAvversario = emailAvversario + arrFantasquadre[i].Email + separatore
								break
							}
						}
					}
				}	
			}
		}
	}

	//Selezione destinatari
	// in PHP il separatore degli email deve essere ','
	separatore = (cDefTipoInvio == 2) ? "," : ";"
	if (cDefInvio > 0) {
		if (cDefVediTuttiPresidenti == 1) {
			if(document.getElementById("tuttilegaMail").checked == true) {
				destinatari[q] = destinatari[q] + emailAvversario
			}
		}
		if (cDefVediInvioAvversario == 1) {
			if(document.getElementById("avversarioMail").checked == true) {
				if (cDefMostraCompetizione == 1) {
					if (document.getElementById("competizioneV" + q).checked == true) {
						destinatari[q] = destinatari[q] + emailAvversario
					}
				}
				else {
					destinatari[q] = destinatari[q] + emailAvversario
				}
			}
		}
		if (cDefVediInvioPresidenteSquadra == 1) {
			if(document.getElementById("sestessiMail").checked ==  true) {
				destinatari[q] = destinatari[q] +  emailSquadra + separatore
			}
		}
		if (cDefVediInvioPresidenteLega == 1) {
			if(document.getElementById("presidentelegaMail").checked == true) {
				destinatari[q] = destinatari[q] + emailPresidente + separatore
			}
		}
		if (cDefVediInvioWebMaster == 1) {
			if(document.getElementById("webmasterMail").checked == true) {
				destinatari[q] = destinatari[q] + WebmasterEmail + separatore
			}
		}
	}
	else {
		if(cDefTuttiPresidenti == 1)
			destinatari[q] = destinatari[q] + emailAvversario
		else {
			if(cDefInvioAvversario == 1)
				destinatari[q] = destinatari[q] + emailAvversario
			if(cDefInvioPresidenteSquadra == 1)
				destinatari[q] = destinatari[q] +  emailSquadra + separatore
		}
		if(cDefInvioWebMaster == 1)
			destinatari[q] = destinatari[q] + WebmasterEmail + separatore
		if(cDefInvioPresidenteLega == 1)
			destinatari[q] = destinatari[q] + emailPresidente + separatore
	}
  }

	// Dati giocatori
	datigiocatori = ""
	frmcode = ""
	rigoristi = ""
	for (t = 1; t < 12 + cDefRiserveTotali; t++) {
		if (datigiocatori != "") {
			if (datigiocatori.indexOf(document.getElementById("RuoForm"+t).value + " " + document.getElementById("GioForm"+t).value + "%0D%0A") != -1)
				OK = false
		}
		if (OK) {
			if (t != 1) {
				datigiocatori = datigiocatori + "°"
				frmcode = frmcode + "°"
				rigoristi = rigoristi + "°"
			}
			if (document.getElementById("GioForm"+t).value != "") {
				ruolo = document.getElementById("RuoForm"+t).value
				datigiocatori = datigiocatori + ruolo + " " + document.getElementById("GioForm"+t).value + " (" +  document.getElementById("SquForm"+t).value + ")"
				frmcode = frmcode + document.getElementById("xgForm"+t).value
			}

			// Rigoristi
			if (cDefMostraRigoristi == 1) {
				rigoristi = rigoristi + document.getElementById("IdGioFormRiB"+t).value
			}
		}
		else
			break
	}

  if (OK) {

	//Date e ora invio
	data = new Date()
	ore = data.getHours()
	minuti = data.getMinutes()
	secondi = data.getSeconds()

	if (minuti < 10) minuti = '0' + minuti
	if (secondi < 10) seconds = '0' + secondi

	strData = (data.getDate() +"/"+(data.getMonth()+1)+ "/"+data.getYear())
	strOra = (ore + ":" +minuti + ":" + secondi)


	//INVIO MAIL SECONDO LE IMPOSTAZIONI
	switch (cDefTipoInvio){
		case 2: { 
			//INVIO MAIL PHP

			//Creazione url da passare alla pagina sendmail.php
			var urlandparameters = "formazione/sendmail.php?nomeFantasq=" + nomeFantasq + "&nomelega=" + nomelega + "&giornata=" + giornata + "&giornatadia=" + giornatadia + "&stagione=" + stagione + "&anno=" + anno.substr(0,4) + "&fantasq=" + fantasq + "&datigiocatori=" + datigiocatori + "&frmcode=" + frmcode + "&rigoristi=" + rigoristi + "&strData=" + strData + "&strOra=" + strOra + "&numeroCompetizioni=" + numeroCompetizioni + "&Comunicazioni=" + document.getElementById("commentofp").value
			for (q = 1; q <= numeroCompetizioni; q++)
				if (nomeCompetizione[q] != "notChecked")
					urlandparameters = urlandparameters + "&nomeCompetizione" + q + "=" + nomeCompetizione[q] + "&idIncontro" + q + "=" + idIncontro[q] + "&email" + q + "=" + destinatari[q] + "&tipoID" + q + "=" + tipoID[q]
				else
					urlandparameters = urlandparameters + "&nomeCompetizione" + q + "=" + nomeCompetizione[q]
			if (cDefMittente == 0)
				urlandparameters = urlandparameters + "&NomeMittente=" + cDefNomeMittente + "&MailMittente=" + cDefMailMittente
			else
				urlandparameters = urlandparameters + "&NomeMittente=" + Presidente + "&MailMittente=" + emailSquadra

			//Indicare il server in cui è presente il file sendmail.php
			//o commentare la riga seguente se nella stessa dir del sito
			document.forms[0].method = "POST"
			document.forms[0].action = cDefServerURL + urlandparameters
			document.forms[0].submit()
		}
		break
		case 3: { 
			//INVIO MAIL JS (outlook)

			var dt = datigiocatori.split("°")
			var code = frmcode.split("°")
			var rig = rigoristi.split("°")
			
			for (q = 1; q <= numeroCompetizioni; q++) {
				invia = true
				if (cDefMostraCompetizione == 1)
					if (document.getElementById("competizioneV" + q).checked != true)
						invia = false
				if (invia) {
					if (numeroCompetizioni > 1)
						NS = nomeFantasq + " [" + nomeCompetizione[q] + "]"
					else
						NS = nomeFantasq
						
					
					datigiocatori = "--- Titolari ---%0D%0A"
					frmcode = ""
					for (t = 1; t < 12 + cDefRiserveTotali; t++) {
						if (t == 12)
							datigiocatori = datigiocatori + "--- Riserve ---%0D%0A"
						datigiocatori = datigiocatori + dt[t-1]
						if (t != 1)
							frmcode = frmcode + "-"
						frmcode = frmcode + code[t-1]
						if (tipoID[q] == 1) {
							if (dt[t-1] != "") {
								datigiocatori = datigiocatori + " [R: " + rig[t-1] + "]"
								frmcode = frmcode + "R" + rig[t-1]
							}
						}
						datigiocatori = datigiocatori + "%0D%0A"
					}
					frmcode = frmcode + "\\"
					
					urlandparameters = "mailto:" + destinatari[q] + "?subject=" + "Formazione " + NS + ", " + nomeCompetizione[q] + ", " + nomelega + " [MessaggioFrmFCM:" + giornata + "]" + "&body=" + "Lega: " + nomelega + "%0D%0A" + "Squadra: " + NS + "%0D%0A" + "Giornata: " + giornatadia + "%0D%0A" + "Data e ora compilazione:" + strData + " " + strOra + "%0D%0A%0D%0A" + datigiocatori + "%0D%0A" + "CODICI INDENTIFICATIVI FCM [*NON MODIFICARE*]%0D%0A[LEGA]=" + nomelega + "-" + stagione + "-" + anno.substr(0,4) + "\\%0D%0A" + "[IDSQUADRA]=" + fantasq + "\\%0D%0A" + "[GIORNATADIA]=" + giornata + "\\%0D%0A" + "[IDINCONTRO]=" + idIncontro[q] + "\\%0D%0A" + "[FRMCODE]=" + frmcode + "%0D%0A%0D%0AComunicazioni: " + document.getElementById("commentofp").value
					
					window.open(urlandparameters)
				}
			}
		}
		break
		default: { 
			//INVIO MAIL ASP
			var urlandparameters = "formazione/sendmail.asp?nomeFantasq=" + nomeFantasq + "&nomelega=" + nomelega + "&giornata=" + giornata + "&giornatadia=" + giornatadia + "&stagione=" + stagione + "&anno=" + anno.substr(0,4) + "&fantasq=" + fantasq + "&datigiocatori=" + datigiocatori + "&frmcode=" + frmcode + "&rigoristi=" + rigoristi + "&strData=" + strData + "&strOra=" + strOra + "&numeroCompetizioni=" + numeroCompetizioni + "&Comunicazioni=" + document.getElementById("commentofp").value + "&cDefTipoInvio=" + cDefTipoInvio
			for (q = 1; q <= numeroCompetizioni; q++)
				if (nomeCompetizione[q] != "notChecked")
					urlandparameters = urlandparameters + "&nomeCompetizione" + q + "=" + nomeCompetizione[q] + "&idIncontro" + q + "=" + idIncontro[q] + "&email" + q + "=" + destinatari[q] + "&tipoID" + q + "=" + tipoID[q]
				else
					urlandparameters = urlandparameters + "&nomeCompetizione" + q + "=" + nomeCompetizione[q]
			if (cDefMittente == 0)
				urlandparameters = urlandparameters + "&NomeMittente=" + cDefNomeMittente + "&MailMittente=" + cDefMailMittente
			else
				urlandparameters = urlandparameters + "&NomeMittente=" + Presidente + "&MailMittente=" + emailSquadra

			//Indicare il server in cui è presente il file sendmail.php
			//o commentare la riga seguente se nella stessa dir del sito
			document.forms[0].method = "POST"
			document.forms[0].action = cDefServerURL + urlandparameters
			document.forms[0].submit()
		}
		break
	}
  }
  else {
	alert("Errore nell'inserimento dei giocatori...\nUno o più giocatori compaiono più volte...\nRicarico la pagina...")
	location.href = ("formazione.html?Fsq="+fantasq+"&cGio="+giornata)
  }
}
}
else{
alert(msgPan)
}
}
}

 // Inizio modifica del 17-01-2005
 function Resetta() {
  risp = window.confirm("Se premi SI tutti i dati verranno resettati...\nSicuro?")
  if (risp) {
   for (t=inizio_array-1; t<=inizio_array+num_gioc-3; t++) {
    document.getElementById('GiocSel'+t).style.backgroundColor = col_sfondotabella
    document.getElementById('GiocSel'+t).value = "A#696969"
    document.getElementById('RuoRosa'+t).value = 0
    document.getElementById('SquRosa'+t).value = 0
    document.getElementById('GioRosa'+t).value = 0
   }
   for (t=1; t<12; t++) {
    document.getElementById('GioFormVis'+t).innerText = ""
    document.getElementById('RuoFormVis'+t).innerText = ""
    document.getElementById('GioForm'+t).value = ""
    document.getElementById('RuoForm'+t).value = ""
    document.getElementById('SquForm'+t).value = ""
    document.getElementById('IdGioForm'+t).value = ""
    if (cDefMostraRigoristi) {
    	document.getElementById('IdGioFormRiB'+t).value = 12-t
    	document.getElementById('IdGioFormRig'+t).value = 12-t
    }
   }
   for (t=12; t<19; t++) {
    document.getElementById('GioFormVis'+t).innerText = ""
    document.getElementById('RuoFormVis'+t).innerText = ""
    document.getElementById('GioForm'+t).value = ""
    document.getElementById('RuoForm'+t).value = ""
    document.getElementById('SquForm'+t).value = ""
    document.getElementById('IdGioForm'+t).value = ""
    if (cDefMostraRigoristi) {
    	document.getElementById('IdGioFormRiB'+t).value = t
    	document.getElementById('IdGioFormRig'+t).value = t
    }
   }
   document.getElementById('Schema').innerText = " "
   document.getElementById('NumTit').value = 0
   document.getElementById('NumDife').value = 0
   document.getElementById('NumCent').value = 0
   document.getElementById('NumAtta').value = 0
   document.getElementById('PrimoDisp').value = 1
   document.getElementById('NumPan').value = 0
   document.getElementById('NumPanD').value = 0
   document.getElementById('NumPanC').value = 0
   document.getElementById('NumPanA').value = 0
   document.getElementById('commentofp').innerText = ""
   if (cDefUsaPassword == 1)
    document.getElementById('FsqPwd').innerText = ""
  }
 }
 // Fine modifica del 17-01-2005

 function AnnullaClick(RigaGioc) {
  try{ChangeTextColor(preEl,orgTColor,orgBColor);}catch(e){;}
  RigaGioc.style.backgroundColor=RigaGioc.value.substr(1,RigaGioc.value.length)
  RigaGioc.value='A#696969';
  ind3=document.getElementById('GioRosa'+ind1).value;
  ind5=Math.round(document.getElementById('RuoRosa'+ind1).value);
  document.getElementById('GioForm'+ind5).value="";
  document.getElementById('RuoForm'+ind5).value="";
  document.getElementById('SquForm'+ind5).value="";
  document.getElementById('xgForm'+ind5).value="";
  document.getElementById('IdGioForm'+ind5).value="";
  if (ind5<=11) {		// tolgo titolare
   if (document.getElementById('RuoFormVis'+ind5).innerText.substr(0,1)=='D') {
    document.getElementById('NumDife').value=Math.round(document.getElementById('NumDife').value)-1;
   }
   else if (document.getElementById('RuoFormVis'+ind5).innerText.substr(0,1)=='C') {
    document.getElementById('NumCent').value=Math.round(document.getElementById('NumCent').value)-1;
   }
   else if (document.getElementById('RuoFormVis'+ind5).innerText.substr(0,1)=='A') {
    document.getElementById('NumAtta').value=Math.round(document.getElementById('NumAtta').value)-1;
   }
  }
  document.getElementById('GioRosa'+ind1).value=0;
  document.getElementById('PrimoDisp').value=Math.round(document.getElementById('RuoRosa'+ind1).value);
  document.getElementById('RuoRosa'+ind1).value=0;
  document.getElementById('SquRosa'+ind1).value=0;
  if (document.getElementById('PrimoDisp').value<=11) {
   document.getElementById('NumTit').value=Math.round(document.getElementById('NumTit').value)-1;
  }
  else {					// tolgo panchinaro
   if ((document.getElementById('NumPan').value<=cDefRiserveTotali) && (document.getElementById('NumPan').value!=0)) {
    document.getElementById('NumPan').value=Math.round(document.getElementById('NumPan').value)-1;
    if (document.getElementById('RuoFormVis'+ind5).innerText.substr(0,1)=='D') {
    	document.getElementById('NumPanD').value=Math.round(document.getElementById('NumPanD').value)-1;
    }
    if (document.getElementById('RuoFormVis'+ind5).innerText.substr(0,1)=='C') {
    	document.getElementById('NumPanC').value=Math.round(document.getElementById('NumPanC').value)-1;
    }
    if (document.getElementById('RuoFormVis'+ind5).innerText.substr(0,1)=='A') {
    	document.getElementById('NumPanA').value=Math.round(document.getElementById('NumPanA').value)-1;
    }
   }
  }
  document.getElementById('GioFormVis'+ind5).innerText=" ";
  document.getElementById('RuoFormVis'+ind5).innerText=" ";
 }

 function CliccaGiocatore(RigaGioc) {
  if (RigaGioc.value.length==1) {
   RigaGioc.value=RigaGioc.value+RigaGioc.style.backgroundColor;
  }
  ind1=RigaGioc.id.substr(7,(RigaGioc.id.length-7));	// indice nell'elenco
  if (RigaGioc.value.substr(0,1)=='A') {
   if (document.getElementById('PrimoDisp').value<=11) {
    if ((document.getElementById('PrimoDisp').value==1) && (document.getElementById('RuoRosa'+ind1).innerText.substr(0,1)!='P')) {
    	alert('Il giocatore inserito in posizione 1 deve essere un portiere.');
    }
    else {
    	if ((document.getElementById('PrimoDisp').value)!=1 && (document.getElementById('RuoRosa'+ind1).innerText.substr(0,1)=='P')) {
    		alert('Il portiere può essere inserito solo in posizione 1 oppure 12.');
    	}
    	else {
    		RigaGioc.value='D'+RigaGioc.value.substr(1,RigaGioc.value.length);
    		RigaGioc.style.backgroundColor = col_gioc_selezionato
    		document.getElementById('NumTit').value=Math.round(document.getElementById('NumTit').value)+1;
    		ind2=Math.round(document.getElementById('PrimoDisp').value);
    		document.getElementById('xgForm'+ind2).value=document.getElementById('xgRosa'+ind1).value;
    		document.getElementById('GioForm'+ind2).value=document.getElementById('GioRosa'+ind1).innerText;
    		document.getElementById('RuoForm'+ind2).value=document.getElementById('RuoRosa'+ind1).innerText;
    		document.getElementById('SquForm'+ind2).value=document.getElementById('SquRosa'+ind1).innerText;
    		document.getElementById('IdGioForm'+ind2).value=document.getElementById('IdGioc'+ind1).value;
    		document.getElementById('GioFormVis'+ind2).className=document.getElementById('RuoRosa'+ind1).innerText;
    		document.getElementById('RuoFormVis'+ind2).className=document.getElementById('RuoRosa'+ind1).innerText;
    		document.getElementById('GioFormVis'+ind2).innerText=document.getElementById('GioRosa'+ind1).innerText;
    		document.getElementById('RuoFormVis'+ind2).innerText=document.getElementById('RuoRosa'+ind1).innerText;
    		if (document.getElementById('RuoFormVis'+ind2).innerText.substr(0,1)=='D') {
    			document.getElementById('NumDife').value=Math.round(document.getElementById('NumDife').value)+1;
    		}
    		else if (document.getElementById('RuoFormVis'+ind2).innerText.substr(0,1)=='C') {
    			document.getElementById('NumCent').value=Math.round(document.getElementById('NumCent').value)+1;
    		}
    		else if (document.getElementById('RuoFormVis'+ind2).innerText.substr(0,1)=='A') {
    			document.getElementById('NumAtta').value=Math.round(document.getElementById('NumAtta').value)+1;
    		}
    		document.getElementById('GioRosa'+ind1).value=ind2;
    		document.getElementById('RuoRosa'+ind1).value=ind2;
    		document.getElementById('PrimoDisp').value=(Math.round(document.getElementById('NumTit').value)+Math.round(document.getElementById('NumPan').value));
    		document.getElementById('PrimoDisp').value=Math.round(document.getElementById('PrimoDisp').value)+1;
    	}
    }
   }
   else {
    if ((document.getElementById('PrimoDisp').value<=(11+cDefRiserveTotali)) && (document.getElementById('PrimoDisp').value>=11)) {
    	if (portiereobbligatorio==1) {
    	if ((document.getElementById('PrimoDisp').value==12) && (document.getElementById('RuoRosa'+ind1).innerText.substr(0,1)!='P')) {
    		alert('Il giocatore inserito in posizione 12 deve essere un portiere.');
    	}
    	else {
    		if ((document.getElementById('PrimoDisp').value)!=12 && (document.getElementById('RuoRosa'+ind1).innerText.substr(0,1)=='P')) {
    			alert('Il portiere può essere inserito solo in posizione 1 oppure 12.');
    		}
    		else {
    			RigaGioc.value='D'+RigaGioc.value.substr(1,RigaGioc.value.length);
    			RigaGioc.style.backgroundColor = col_gioc_selezionato
    			document.getElementById('NumPan').value=Math.round(document.getElementById('NumPan').value)+1;
    			ind2=Math.round(document.getElementById('PrimoDisp').value);
    			document.getElementById('xgForm'+ind2).value=document.getElementById('xgRosa'+ind1).value;
    			document.getElementById('GioForm'+ind2).value=document.getElementById('GioRosa'+ind1).innerText;
    			document.getElementById('RuoForm'+ind2).value=document.getElementById('RuoRosa'+ind1).innerText;
    			document.getElementById('SquForm'+ind2).value=document.getElementById('SquRosa'+ind1).innerText;
    			document.getElementById('IdGioForm'+ind2).value=document.getElementById('IdGioc'+ind1).value;
    			document.getElementById('GioFormVis'+ind2).className=document.getElementById('RuoRosa'+ind1).innerText;
    			document.getElementById('RuoFormVis'+ind2).className=document.getElementById('RuoRosa'+ind1).innerText;
    			document.getElementById('GioFormVis'+ind2).innerText=document.getElementById('GioRosa'+ind1).innerText;
    			document.getElementById('RuoFormVis'+ind2).innerText=document.getElementById('RuoRosa'+ind1).innerText;
    			document.getElementById('GioRosa'+ind1).value=ind2;
    			document.getElementById('RuoRosa'+ind1).value=ind2;
    			document.getElementById('PrimoDisp').value=(Math.round(document.getElementById('NumTit').value)+Math.round(document.getElementById('NumPan').value));
    			document.getElementById('PrimoDisp').value=Math.round(document.getElementById('PrimoDisp').value)+1;
    			if (document.getElementById('RuoFormVis'+ind2).innerText.substr(0,1)=='D') {
    				document.getElementById('NumPanD').value=Math.round(document.getElementById('NumPanD').value)+1;
    			}					
    			if (document.getElementById('RuoFormVis'+ind2).innerText.substr(0,1)=='C') {
    				document.getElementById('NumPanC').value=Math.round(document.getElementById('NumPanC').value)+1;
    			}
    			if (document.getElementById('RuoFormVis'+ind2).innerText.substr(0,1)=='A') {
    				document.getElementById('NumPanA').value=Math.round(document.getElementById('NumPanA').value)+1;
    			}
    		}}
    	}
    	if (portiereobbligatorio==0) {
    			RigaGioc.value='D'+RigaGioc.value.substr(1,RigaGioc.value.length);
    			RigaGioc.style.backgroundColor = col_gioc_selezionato
    			document.getElementById('NumPan').value=Math.round(document.getElementById('NumPan').value)+1;
    			ind2=Math.round(document.getElementById('PrimoDisp').value);
    			document.getElementById('xgForm'+ind2).value=document.getElementById('xgRosa'+ind1).value;
    			document.getElementById('GioForm'+ind2).value=document.getElementById('GioRosa'+ind1).innerText;
    			document.getElementById('RuoForm'+ind2).value=document.getElementById('RuoRosa'+ind1).innerText;
    			document.getElementById('SquForm'+ind2).value=document.getElementById('SquRosa'+ind1).innerText;
    			document.getElementById('IdGioForm'+ind2).value=document.getElementById('IdGioc'+ind1).value;
    			document.getElementById('GioFormVis'+ind2).className=document.getElementById('RuoRosa'+ind1).innerText;
    			document.getElementById('RuoFormVis'+ind2).className=document.getElementById('RuoRosa'+ind1).innerText;
    			document.getElementById('GioFormVis'+ind2).innerText=document.getElementById('GioRosa'+ind1).innerText;
    			document.getElementById('RuoFormVis'+ind2).innerText=document.getElementById('RuoRosa'+ind1).innerText;
    			document.getElementById('GioRosa'+ind1).value=ind2;
    			document.getElementById('RuoRosa'+ind1).value=ind2;
    			document.getElementById('PrimoDisp').value=(Math.round(document.getElementById('NumTit').value)+Math.round(document.getElementById('NumPan').value));
    			document.getElementById('PrimoDisp').value=Math.round(document.getElementById('PrimoDisp').value)+1;
    			if (document.getElementById('RuoFormVis'+ind2).innerText.substr(0,1)=='D') {
    				document.getElementById('NumPanD').value=Math.round(document.getElementById('NumPanD').value)+1;
    			}					
    			if (document.getElementById('RuoFormVis'+ind2).innerText.substr(0,1)=='C') {
    				document.getElementById('NumPanC').value=Math.round(document.getElementById('NumPanC').value)+1;
    			}
    			if (document.getElementById('RuoFormVis'+ind2).innerText.substr(0,1)=='A') {
    				document.getElementById('NumPanA').value=Math.round(document.getElementById('NumPanA').value)+1;
    			}
    		}
    }
    else {
    	alert('La formazione è terminata. Non è possibile inserire altri giocatori.');
    }
   }
  }
  else {
   AnnullaClick(RigaGioc);
  }
  if ((document.getElementById('RuoRosa'+ind1).innerText.substr(0,1)!='P') && (document.getElementById('NumTit').value<=11) && (document.getElementById('NumTit').value>=1)) {
   document.getElementById('Schema').innerText='Schema utilizzato: '+document.getElementById('NumDife').value+'-'+document.getElementById('NumCent').value+'-'+document.getElementById('NumAtta').value;

  if ((document.getElementById('NumTit').value==11) && (!VerificaModuli(document.getElementById('NumDife').value,document.getElementById('NumCent').value,document.getElementById('NumAtta').value)))
   {
    alert('Modulo non ammesso.');
    AnnullaClick(RigaGioc);
    document.getElementById('Schema').innerText='Schema utilizzato: '+document.getElementById('NumDife').value+'-'+document.getElementById('NumCent').value+'-'+document.getElementById('NumAtta').value;
   }
  }
  else if (document.getElementById('NumTit').value>11) {
   document.getElementById('Schema').innerText='';
  }
  if (document.getElementById('IDTipo').value>=6) {
   if (document.getElementById('PrimoDisp').value>(11+cDefRiserveTotali)) {
    document.getElementById('Rigoristi').style.visibility='visible';
   }
   else {
    document.getElementById('Rigoristi').style.visibility='hidden';
   }
  }
 }

 // Inizio modifica del 17-01-2005
 function CambiaRig(RigaRig) {
  rig1 = RigaRig.id.substr(12,(RigaRig.id.length-12));
  temp = 0
  for(j = 1; j < 11 + cDefRiserveTotali + 1; j++) {
   if ((document.getElementById('IdGioFormRig'+j).value == RigaRig.value) && (j != rig1)) {
    if ((document.getElementById('IdGioFormRig'+rig1).value < 11 && (rig1 == 1 || rig1 == 12)) || (document.getElementById('IdGioFormRiB'+rig1).value < 11 && (j == 1 || j == 12))) {
    	document.getElementById('IdGioFormRig'+rig1).value = document.getElementById('IdGioFormRiB'+rig1).value
    	alert("I portieri devono avere un numero di lista uguale o superiore a 11!!!")
    }
    else {
    	temp = document.getElementById('IdGioFormRig'+j).value
    	document.getElementById('IdGioFormRig'+j).value = document.getElementById('IdGioFormRiB'+rig1).value;
    	document.getElementById('IdGioFormRiB'+j).value = document.getElementById('IdGioFormRiB'+rig1).value;
    	document.getElementById('IdGioFormRig'+rig1).value = temp;
    	document.getElementById('IdGioFormRiB'+rig1).value = temp;
    }
   }
  }
 }
 // Fine modifica del 17-01-2005

 //+-+-+-+-+-+-+-+-+-+-+-+-+for highlight row+-+-+-+-+-+-+-+-+-+-+-+-+//
 //desc: Highligt current row by click any cell
 //by: Qing-Hua Jiang
 //argument: backColor - highlight bgColor of the row
 // textColor - lighlight text color
 //call: like <tr onmouseover="HighLightTR('#c9cc99','cc3333');" id="trO4">
 
 var preEl;
 var orgBColor;
 var orgTColor;
 
 function HighLightTR(backColor,textColor,rigaTest) {
  if (rigaTest=='D') {
   var colorChange;
   colorChange=backColor;
   backColor=textColor;
   textColor=colorChange;
  }
  if(typeof(preEl)!='undefined') {
   preEl.bgColor=orgBColor; 
   try{ChangeTextColor(preEl,orgTcolor,orgBColor);}catch(e){;}
  } 
  var el = event.srcElement;
  el = el.parentElement;
  orgBColor = el.bgColor;
  orgTColor = el.style.color;
  //*el.bgColor=backColor;*//
  try{ChangeTextColor(el,textColor,backColor);}catch(e){;}
  preEl = el; 
 }

 function ChangeTextColor(a_obj,a_color, bg_color){
  for (i=0;i<a_obj.cells.length;i++) {			//put condition before increase!!!!!
  a_obj.cells(i).style.color=a_color;
  a_obj.cells(i).style.backgroundColor=bg_color; 
  }
 }
 
 //+-+-+-+-+-+-+-+-+-+-+-+-+End of highlight row+-+-+-+-+-+-+-+-+-+-+-+-+//

// Oggetto Moduli
function M(ID,desc,difensori,centrocampisti,attaccanti) {
	this.ID = ID
	this.desc = desc
	this.difensori = difensori
	this.centrocampisti = centrocampisti
	this.attaccanti = attaccanti
}

//Verifica che il modulo utilizzato sia ammesso
function VerificaModuli(difensori,centrocampisti,attaccanti)
{
	for(i=1;i<arrModuliPossibili.length;i++)
	{
	if ((arrModuliPossibili[i].difensori==difensori)&&(arrModuliPossibili[i].centrocampisti==centrocampisti)&&(arrModuliPossibili[i].attaccanti==attaccanti)) return true 
	}
	return false
}

function GetProssimaGiornataDaFantaGiocare() {
// ritorna la prossima giornata del FantaCalcio da giocare. Se sono state
// giocate tutte ritorna comunque maxa
var i,trovata=false,gio=0
if (arrIncontri[1].Giocato == false) return arrIncontri[1].Fantagiornata + " " + arrIncontri[1].Competizione
i=arrIncontri.length-1
	do {
		if (arrIncontri[i].Giocato) {
			gio=arrIncontri[i].Fantagiornata + " " + arrIncontri[i].Competizione
		}
		i--
	} while (gio==0 && i>=1)
	return (gio==MaxA?MaxA:gio+1)
}
