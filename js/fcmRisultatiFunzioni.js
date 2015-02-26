// Oggetti JavaScript per Tabellini Risultati

/**********************************
*********** COSTRUTTORI ***********
***********************************/
// Costruttore dell'oggetto Tabellino (abbreviato T)
function T(IDIncontro,IDSquadra,IDLega,Lista,ListaSqA,Ruolo,Voto,Modif,Tot,Supplementari,ListaSupplementari,VotoSupplementari,TotaleSquadraSupplementari,FattoreCampoSupplementari,GolSupplementari,Rigori,ListaRigori,VotoRigori,GolRigori,ParzialeSquadra,FattoreCampo,ModPortiere,ModDifesa,ModCentrocampo,ModAttacco,ModModulo,ModM1Pers,ModM2Pers,ModM3Pers,TotaleSquadra,Gol) {
    this.IDIncontro = IDIncontro
    this.IDSquadra = IDSquadra
    this.IDLega = IDLega
    this.Lista = Lista
	//lista dei giocatori indicati in ordine
	// come appaiono nel tabellino. I primi 11,
	// quindi, sono i titolari. I valori sono separati
	// dal carattere %
	// i valori possono essere:
	// IDGiocatore: se c'e' un giocatore, c'e' il suo ID
	// -1: se e' una RU
	// 0: se e' assente
	// dal 12esimo in poi proseguono con panchina e tribuna:
	//  in questi ultimi non ci sono 0 o -1 quindi sono solo
	//  IDGiocatore: se positivo allora e' panchina oppure giocatore
	//  sostituito, se negativo e' tribuna
    this.ListaSqA = ListaSqA
	this.Ruolo = Ruolo
	// come Lista, valori separati da % per i ruoli dei giocatori
	// 1,2,3,4: PORT, DIFE, CENT, ATTA "normali", oppure RU
	// 5,6,7,8: Riserve (p,d,c,a) {se nei primi 11, entrata, altrimenti riserva non entrata}
	// 0: assente
	// -1,-2,-3,-4: (solo "sostituiti"): giocatori che sono stati "sostituiti"
	// -5,-6,-7,-8: tribuna (p,d,c,a)
    this.Voto = Voto
	// valori separati da % contenenti i voti dei giocatori
    this.Modif = Modif
	// valori separati da % contenenti i modificatori dei giocatori
    this.Tot = Tot
	// valori separati da % contenenti i totali dei giocatori
    this.Supplementari = Supplementari
    this.ListaSupplementari = ListaSupplementari // separati da %, se -1 e' una ru, se 0 assente
    this.VotoSupplementari = VotoSupplementari // separati da %,
    this.TotaleSquadraSupplementari = TotaleSquadraSupplementari
    this.FattoreCampoSupplementari = FattoreCampoSupplementari
    this.GolSupplementari = GolSupplementari

    this.Rigori = Rigori
    this.ListaRigori = ListaRigori // separati da %,
	//vale -1 se RU, 0 se assente, altrimenti l'id del giocatore
    this.VotoRigori = VotoRigori // separati da %,
    this.GolRigori = GolRigori

    this.ParzialeSquadra = ParzialeSquadra // Se "non esiste" allora vale "x"
    this.FattoreCampo = FattoreCampo // Se "non esiste" allora vale "x"
    this.ModPortiere = ModPortiere // Se "non esiste" allora vale "x"
    this.ModDifesa = ModDifesa // Se "non esiste" allora vale "x"
    this.ModCentrocampo = ModCentrocampo // Se "non esiste" allora vale "x"
    this.ModAttacco = ModAttacco // Se "non esiste" allora vale "x"
    this.ModModulo = ModModulo // Se "non esiste" allora vale "x"
    this.ModM1Pers = ModM1Pers // Se "non esiste" allora vale "x"
    this.ModM2Pers = ModM2Pers // Se "non esiste" allora vale "x"
    this.ModM3Pers = ModM3Pers // Se "non esiste" allora vale "x"
	this.TotaleSquadra = TotaleSquadra // Se "non esiste" allora vale "x"
    this.Gol = Gol // Se "non esiste" allora vale "x"
}

function GetTabellino(IDIncontro,IDSquadra,IDLega) {
// scorre la lista delle formazioni e ritorna tutte quelle che 
// hanno i tre valori corrispondenti. Quindi le ordina per pos
// mettendo pero' quelli con -1 alla fine e non all'inizio
var t = new T()
var i=1,cnt=1
var tipo,pPrimo,pUltimo,trovato=false
	while ((trovato==false) && (i<arrTabellini.length)) {
		if ((arrTabellini[i].IDIncontro==IDIncontro) && (arrTabellini[i].IDSquadra==IDSquadra) && (arrTabellini[i].IDLega==IDLega)) {
			trovato=true
			t=arrTabellini[i]
		}
		i++
	}
	return t
}

function GeneraRisultati(cGio,cComp) {
var arrI = new Array()
var t = new T()
var tabe = new Object()
var str="",i,j
var ruolo,pd,colore
var mostra
	if (SezioniChiuse=="no") {
		mostra=""
	} else {
		mostra="display: none; "
	}
	arrI = RiempiListaIncontri(cGio,cComp) 
	// per ogni incontro
	// 1- apri un layer
	// 2- crea la tabella
	for (i=1;i<arrI.length;i++) {
		// layer di intestazione
		document.write("<div id='lay"+arrI[i].ID+"H' class='intest-layer'><a href='#' onClick='invertiDisplayLayer(\"lay"+arrI[i].ID+"\")'>"+arrI[i].Nomi.Casa+((arrI[i].IDTipo==INC_GRANPREMIO)?"":" - "+arrI[i].Nomi.Fuori)+"</a></div>")
		// layer di contenuti
		document.write("<div id='lay"+arrI[i].ID+"' style='" + mostra + " height=100%'>")
		// tabella che contiene gli incontri
		document.write("<center><table width='95%' border=0 cellpadding=0 cellspacing=0><tr><td height='20' colspan="+((arrI[i].IDTipo==INC_GRANPREMIO)?"1":"2")+" align='center'>")
  		document.write("<span class='testo-rosso-bold-cx'>"+arrI[i].Competizione+": "+arrI[i].Fantagiornata+"</span></td></tr>")
		// riga inferiore
		document.write("<tr>")
		// tabella di sinistra (o unica se gran premio)
		document.write("<td width='"+((arrI[i].IDTipo==INC_GRANPREMIO)?"100":"50")+"%' align='center' valign='top'>")
		// tabella casa
		tabe=null
		tabe=new Tabella(1,6)
		t=GetTabellino(arrI[i].ID,arrI[i].IDSquadre.Casa,arrI[i].IDLegaSquadre.Casa)
		tabe=RiempiTabellaTabellino(tabe,t,arrI[i].Nomi.Casa)
		tabe.Stampa()
		document.write("</td>")
		if (arrI[i].IDTipo!=INC_GRANPREMIO) {
			document.write("<td width='50%' align='center' valign='top'>")
			// tabella fuori
			tabe=null
			tabe=new Tabella(1,6)
			t=GetTabellino(arrI[i].ID,arrI[i].IDSquadre.Fuori,arrI[i].IDLegaSquadre.Fuori)
			tabe=RiempiTabellaTabellino(tabe,t,arrI[i].Nomi.Fuori)
			tabe.Stampa()
			document.write("</td>")
		}
		document.write("</tr>")
		document.write("<tr><td height='20' colspan="+((arrI[i].IDTipo==INC_GRANPREMIO)?"1":"2")+" align='center'></td></tr>")
		//chiudi tabella degli incontri
		document.write("</table></center>")
		// chiudi il layer di contenuti
		document.write("</div>")
	}
}

function RiempiTabellaTabellino(tabe,t,nome) {
var i,j,pd,colore,ruolo,inseritariga=0,riga=1
var arrLista = t.Lista.split("%")
var arrListaSqA = t.ListaSqA.split("%")
var arrRuolo = t.Ruolo.split("%")
var arrVoto = t.Voto.split("%")
var arrModif = t.Modif.split("%")
var arrTot = t.Tot.split("%")
var arrListaSupplementari = t.ListaSupplementari.split("%")
var arrVotoSupplementari = t.VotoSupplementari.split("%")
var arrListaRigori = t.ListaRigori.split("%")
var arrVotoRigori = t.VotoRigori.split("%")
var sqa
var colvoto
var neretto
var s1
	tabe.nome="Tabellino " + nome
	tabe.larghezza = 90
	tabe.border=1
	tabe.cellspacing=0
	tabe.cellpadding = 2
	tabe.stile = "tab-8"
	// nome della squadra
	tabe.SetValore(1,1,nome)
	tabe.SetStile(1,1,"riga-blu")
	tabe.SetSpan(1,1,6)
	tabe.SetSpanned(1,2,true)
	tabe.SetSpanned(1,3,true)
	tabe.SetSpanned(1,4,true)
	tabe.SetSpanned(1,5,true)
	tabe.SetSpanned(1,6,true)
	tabe.SetLarghezzaColonna(1,5)
	tabe.SetLarghezzaColonna(2,5)
	tabe.SetLarghezzaColonna(3,62)
	tabe.SetLarghezzaColonna(4,10)
	tabe.SetLarghezzaColonna(5,8)
	tabe.SetLarghezzaColonna(6,10)
	//intestazione
	tabe.SetStileRiga(2,"riga-dispari")
	tabe.SetStile(2,1,"testo-cx")
	tabe.SetStile(2,2,"testo-cx")
//	tabe.SetStile(2,3,"testo-cx")
	tabe.SetStile(2,4,"testo-cx")
	tabe.SetStile(2,5,"testo-cx")
	tabe.SetStile(2,6,"testo-cx")
	tabe.SetValore(2,1,"<span class='testo-bold-cx'>Div</span>")
	tabe.SetValore(2,2,"<span class='testo-bold-cx'>R</span>")
	tabe.SetValore(2,3,"<span class='testo-bold'>Nome</span>")
	tabe.SetValore(2,4,"<span class='testo-bold-cx'>Voto</span>")
	tabe.SetValore(2,5,"<span class='testo-bold-cx'>Mod</span>")
	tabe.SetValore(2,6,"<span class='testo-bold-cx'>Tot</span>")
	//titolari
	riga=2
	if (arrLista!="") {
		for (j=0;j<=10;j++) {
			//riga=3+j
			riga++
			if ((riga % 2) == 0) {
				pd="dispari2"
			} else {
				pd="pari"
			}
		// come Lista, valori separati da % per i ruoli dei giocatori
		// 1,2,3,4: PORT, DIFE, CENT, ATTA "normali", oppure RU
		// 5,6,7,8: Riserve (p,d,c,a) {se nei primi 11, entrata, altrimenti riserva non entrata}
		// 0: assente
		// -1,-2,-3,-4: (solo "sostituiti"): giocatori che sono stati "sostituiti"
		// -5,-6,-7,-8: tribuna (p,d,c,a)
			switch(parseInt(arrRuolo[j])) {
			case 0:
				ruolo="-"
				colore=""
				neretto="-bold"
				break
			case 1:
				ruolo=(arrLista[j]>0?"P":"PU")
				colore="oliva"
				neretto="-bold"
				break
			case 2:
				ruolo=(arrLista[j]>0?"D":"DU")
				colore="verde"
				neretto="-bold"
				break
			case 3:
				ruolo=(arrLista[j]>0?"C":"CU")
				colore="rosso"
				neretto="-bold"
				break
			case 4:
				ruolo=(arrLista[j]>0?"A":"AU")
				colore="blu"
				neretto="-bold"
				break
			case 5:
				ruolo=(j<=10?"PR":"P")
				colore="oliva"
				neretto=(j<=10?"-bold":"")
				break
			case 6:
				ruolo=(j<=10?"DR":"D")
				colore="verde"
				neretto=(j<=10?"-bold":"")
				break
			case 7:
				ruolo=(j<=10?"CR":"C")
				colore="rosso"
				neretto=(j<=10?"-bold":"")
				break
			case 8:
				ruolo=(j<=10?"AR":"A")
				colore="blu"
				neretto=(j<=10?"-bold":"")
				break
			case -1:
				ruolo="Ps"
				colore="oliva"
				neretto=""
				break
			case -2:
				ruolo="Ds"
				colore="verde"
				neretto=""
				break
			case -3:
				ruolo="Cs"
				colore="rosso"
				neretto=""
				break
			case -4:
				ruolo="As"
				colore="blu"
				neretto=""
				break
			case -5:
				ruolo=""
				colore=""
				neretto=""
				break
			case -6:
				ruolo=""
				colore=""
				neretto=""
				break
			case -7:
				ruolo=""
				colore=""
				neretto=""
				break
			case -8:
				ruolo=""
				colore=""
				neretto=""
				break
			}
			// per inserire la riga bianca tra titolari e riserve
			//if (inseritariga==0 && f[j].Pos>0) {
			//	tabe.SetStileRiga(riga,"Bianco")
			//	tabe.SetValore(riga,1,"&nbsp;")
			//	tabe.SetStile(riga,1,"Bianco")
			//	tabe.SetSpan(riga,1,3)
			//	tabe.SetSpanned(riga,2,true)
			//	tabe.SetSpanned(riga,3,true)
			//	inseritariga=1
			//	riga=1+j+inseritariga
			//}
			tabe.SetStileRiga(riga,"riga-bianco")
			// la maglietta solo per titolari e riserve
			sqa=(((arrLista[j]==0)||(arrLista[j]==-1)) ?"---":eval("xa"+arrListaSqA[j]))
			if (!((arrRuolo[j]>=-8 && arrRuolo[j]<=-5) || ((arrLista[j]==0)||(arrLista[j]==-1)))) tabe.SetValore(riga,1,"<img src='img/sq/"+sqa+".gif'>")
		// come Lista, valori separati da % per i ruoli dei giocatori
		// 1,2,3,4: PORT, DIFE, CENT, ATTA "normali", oppure RU
		// 5,6,7,8: Riserve (p,d,c,a) {se nei primi 11, entrata, altrimenti riserva non entrata}
		// 0: assente
		// -1,-2,-3,-4: (solo "sostituiti"): giocatori che sono stati "sostituiti"
		// -5,-6,-7,-8: tribuna (p,d,c,a)
		// IDGiocatore: se c'e' un giocatore, c'e' il suo ID
		// -1: se e' una RU
		// 0: se e' assente
			if ((arrLista[j]==-1)||(arrLista[j]==0)) tabe.SetValore(riga,1,"<img src='img/spacer.gif' height='32'>")

			tabe.SetStile(riga,1,"riga-bianco")
			// dati
			tabe.SetValore(riga,2,"<div class='testo-"+colore+neretto+"-cx'>"+ruolo+"</div>")
			if (arrLista[j]==0) {
				tabe.SetValore(riga,3,"<div class='testo-"+colore+neretto+"'>"+"-----------------"+ "</div>")
			} else if (arrLista[j]==-1) {
				tabe.SetValore(riga,3,"<div class='testo-"+colore+neretto+"'>"+"Riserva d'ufficio"+ "</div>")
			} else {
				tabe.SetValore(riga,3,"<div class='testo-"+colore+neretto+"'>"+(eval("xg"+arrLista[j]))+" ("+sqa+")" + "</div>")
			}
			if (arrVoto[j]=="sv/ng") {
				tabe.SetValore(riga,4,"<div class='testo"+neretto+"-cx'>sv/ng</div>")
				tabe.SetValore(riga,5,"<div class='testo"+neretto+"-cx'>-</div>")
				tabe.SetValore(riga,6,"<div class='testo"+neretto+"-cx'>sv/ng</div>")   
			} else {
				tabe.SetValore(riga,5,"<div class='testo"+neretto+"-cx'>"+arrModif[j]+"</div>")
				if (ConvToFloat(arrVoto[j])>=6) {
					tabe.SetValore(riga,4,"<div class='testo-verde"+neretto+"-cx'>"+arrVoto[j]+"</div>")
				} else {
					tabe.SetValore(riga,4,"<div class='testo-rosso"+neretto+"-cx'>"+arrVoto[j]+"</div>")
				}
				if (ConvToFloat(arrTot[j])>=6) {
					tabe.SetValore(riga,6,"<div class='testo-verde"+neretto+"-cx'>"+arrTot[j]+"</div>")
				} else {
					tabe.SetValore(riga,6,"<div class='testo-rosso"+neretto+"-cx'>"+arrTot[j]+"</div>")
				}
			}
			tabe.SetStile(riga,2,"riga-"+pd)
			tabe.SetStile(riga,3,"riga-"+pd)
			tabe.SetStile(riga,4,"riga-"+pd)
			tabe.SetStile(riga,5,"riga-"+pd)
			tabe.SetStile(riga,6,"riga-"+pd)
			// voto,modif,tot
		}
		//parziali, totali ecc.
		if (t.ParzialeSquadra!="x") {
			riga++
			tabe.SetStileRiga(riga,"riga-blu")
			tabe.SetSpan(riga,1,4)
			tabe.SetSpanned(riga,2,true)
			tabe.SetSpanned(riga,3,true)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"testo-dx")
			tabe.SetValore(riga,1,"Parziale Squadra:&nbsp;")
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,t.ParzialeSquadra)
		}
		if (t.FattoreCampo!="x") {
			riga++
//			tabe.SetStileRiga(riga,"testo-8")
			tabe.SetSpan(riga,1,4)
			tabe.SetSpanned(riga,2,true)
			tabe.SetSpanned(riga,3,true)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"testo-dx")
			tabe.SetValore(riga,1,"Fattore Campo:&nbsp;")
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,t.FattoreCampo)
		}
		if (t.ModPortiere!="x") {
			riga++
			tabe.SetStileRiga(riga,"testo-oliva")
			tabe.SetSpan(riga,1,4)
			tabe.SetSpanned(riga,2,true)
			tabe.SetSpanned(riga,3,true)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"testo-dx")
			tabe.SetValore(riga,1,"Modificatore Portiere:&nbsp;")
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,t.ModPortiere)
		}
		if (t.ModDifesa!="x") {
			riga++
			tabe.SetStileRiga(riga,"testo-verde")
			tabe.SetSpan(riga,1,4)
			tabe.SetSpanned(riga,2,true)
			tabe.SetSpanned(riga,3,true)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"testo-dx")
			tabe.SetValore(riga,1,"Modificatore Difesa:&nbsp;")
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,t.ModDifesa)
		}
		if (t.ModCentrocampo!="x") {
			riga++
			tabe.SetStileRiga(riga,"testo-rosso")
			tabe.SetSpan(riga,1,4)
			tabe.SetSpanned(riga,2,true)
			tabe.SetSpanned(riga,3,true)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"testo-dx")
			tabe.SetValore(riga,1,"Modificatore Centrocampo:&nbsp;")
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,t.ModCentrocampo)
		}
		if (t.ModAttacco!="x") {
			riga++
			tabe.SetStileRiga(riga,"testo-blu")
			tabe.SetSpan(riga,1,4)
			tabe.SetSpanned(riga,2,true)
			tabe.SetSpanned(riga,3,true)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"testo-dx")
			tabe.SetValore(riga,1,"Modificatore Attacco:&nbsp;")
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,t.ModAttacco)
		}
		if (t.ModModulo!="x") {
			riga++
			tabe.SetStileRiga(riga,"riga-dispari")
			tabe.SetSpan(riga,1,4)
			tabe.SetSpanned(riga,2,true)
			tabe.SetSpanned(riga,3,true)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"testo-dx")
			tabe.SetValore(riga,1,"Modificatore Modulo:&nbsp;")
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,t.ModModulo)
		}
		if (t.ModM1Pers!="x") {
			riga++
			tabe.SetStileRiga(riga,"riga-pari")
			tabe.SetSpan(riga,1,4)
			tabe.SetSpanned(riga,2,true)
			tabe.SetSpanned(riga,3,true)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"testo-dx")
			tabe.SetValore(riga,1,"Mod Pers 1:&nbsp;")
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,t.ModM1Pers)
		}
		if (t.ModM2Pers!="x") {
			riga++
			tabe.SetStileRiga(riga,"riga-dispari")
			tabe.SetSpan(riga,1,4)
			tabe.SetSpanned(riga,2,true)
			tabe.SetSpanned(riga,3,true)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"testo-dx")
			tabe.SetValore(riga,1,"Mod Pers 2:&nbsp;")
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,t.ModM2Pers)
		}
		if (t.ModM3Pers!="x") {
			riga++
			tabe.SetStileRiga(riga,"riga-pari")
			tabe.SetSpan(riga,1,4)
			tabe.SetSpanned(riga,2,true)
			tabe.SetSpanned(riga,3,true)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"testo-dx")
			tabe.SetValore(riga,1,"Mod Pers 3:&nbsp;")
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,t.ModM3Pers)
		}
		if (t.TotaleSquadra!="x") {
			riga++
			tabe.SetStileRiga(riga,"riga-blu")
			tabe.SetSpan(riga,1,4)
			tabe.SetSpanned(riga,2,true)
			tabe.SetSpanned(riga,3,true)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"testo-dx")
			tabe.SetValore(riga,1,"Totale Squadra:&nbsp;")
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,t.TotaleSquadra)
		}
		if (t.Gol!="x") {
			riga++
			tabe.SetStileRiga(riga,"riga-orange")
			tabe.SetSpan(riga,1,4)
			tabe.SetSpanned(riga,2,true)
			tabe.SetSpanned(riga,3,true)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"testo-dx")
			tabe.SetValore(riga,1,"Gol:&nbsp;")
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,t.Gol)
		}
		// tempi supplementari
		if (t.Supplementari==1) {
			riga++
			tabe.SetStileRiga(riga,"riga-bianco")
			tabe.SetSpan(riga,1,6)
			for (j=2;j<=6;j++) tabe.SetSpanned(riga,j,true)
			
      riga++
			tabe.SetStileRiga(riga,"riga-blu")
			tabe.SetSpan(riga,1,6)
			for (j=2;j<=6;j++) tabe.SetSpanned(riga,j,true)
			tabe.SetValore(riga,1,"Tempi Supplementari")
			//d
			riga++
			tabe.SetStileRiga(riga,"riga-dispari")
			tabe.SetSpan(riga,3,2)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"riga-bianco")
			tabe.SetValore(riga,1,"&nbsp;")
			tabe.SetStile(riga,2,"testo-cx")
			tabe.SetValore(riga,2,"<span class='testo-verde'>"+(parseInt(arrListaSupplementari[0])==-1?"DU":"D")+"</span>")
//			tabe.SetStile(riga,3,"Cella")
			if (arrListaSupplementari[0]==0) {
				tabe.SetValore(riga,3,"<span class='testo-verde'>"+"-----------------"+ "</span>")
			} else if (arrListaSupplementari[0]==-1) {
				tabe.SetValore(riga,3,"<span class='testo-verde'>"+"Ris. Uff. T.S."+ "</span>")
			} else {
				tabe.SetValore(riga,3,"<span class='testo-verde'>"+ eval("xg"+arrListaSupplementari[0]) + "</span>")
			}
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,"<span class='"+(ConvToFloat(arrVotoSupplementari[0])>=6?"testo-verde":"testo-rosso")+"'>"+arrVotoSupplementari[0]+"</span>")
			//c
			riga++
			tabe.SetStileRiga(riga,"riga-pari")
			tabe.SetSpan(riga,3,2)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"riga-bianco")
			tabe.SetValore(riga,1,"&nbsp;")
			tabe.SetStile(riga,2,"testo-cx")
			tabe.SetValore(riga,2,"<span class='testo-rosso'>"+(parseInt(arrListaSupplementari[1])==-1?"CU":"C")+"</span>")
//			tabe.SetStile(riga,3,"Cella")
			if (arrListaSupplementari[1]==0) {
				tabe.SetValore(riga,3,"<span class='testo-rosso'>"+"-----------------"+ "</span>")
			} else if (arrListaSupplementari[1]==-1) {
				tabe.SetValore(riga,3,"<span class='testo-rosso'>"+"Ris. Uff. T.S."+ "</span>")
			} else {
				tabe.SetValore(riga,3,"<span class='testo-rosso'>"+ eval("xg"+arrListaSupplementari[1]) + "</span>")
			}
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,"<span class='"+(ConvToFloat(arrVotoSupplementari[1])>=6?"testo-verde":"testo-rosso")+"'>"+arrVotoSupplementari[1]+"</span>")
			//a
			riga++
			tabe.SetStileRiga(riga,"riga-dispari")
			tabe.SetSpan(riga,3,2)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"riga-bianco")
			tabe.SetValore(riga,1,"&nbsp;")
			tabe.SetStile(riga,2,"testo-cx")
			tabe.SetValore(riga,2,"<span class='testo-blu'>"+(parseInt(arrListaSupplementari[2])==-1?"AU":"A")+"</span>")
//			tabe.SetStile(riga,3,"Cella")
			if (arrListaSupplementari[2]==0) {
				tabe.SetValore(riga,3,"<span class='testo-blu'>"+"-----------------"+ "</span>")
			} else if (arrListaSupplementari[2]==-1) {
				tabe.SetValore(riga,3,"<span class='testo-blu'>"+"Ris. Uff. T.S."+ "</span>")
			} else {
				tabe.SetValore(riga,3,"<span class='testo-blu'>"+ eval("xg"+arrListaSupplementari[2]) + "</span>")
			}
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,"<span class='"+(ConvToFloat(arrVotoSupplementari[2])>=6?"testo-verde":"testo-rosso")+"'>"+arrVotoSupplementari[2]+"</span>")
			//fc
			riga++
//			tabe.SetStileRiga(riga,"t-xxs")
			tabe.SetSpan(riga,1,4)
			tabe.SetSpanned(riga,2,true)
			tabe.SetSpanned(riga,3,true)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"testo-dx")
			tabe.SetValore(riga,1,"Fattore Campo Supplementari:&nbsp;")
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,t.FattoreCampoSupplementari)
			//totale
			riga++
			tabe.SetStileRiga(riga,"riga-blu")
			tabe.SetSpan(riga,1,4)
			tabe.SetSpanned(riga,2,true)
			tabe.SetSpanned(riga,3,true)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"testo-dx")
			tabe.SetValore(riga,1,"Totale Squadra Supplementari:&nbsp;")
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,t.TotaleSquadraSupplementari)
			// gol
			riga++
			tabe.SetStileRiga(riga,"riga-orange")
			tabe.SetSpan(riga,1,4)
			tabe.SetSpanned(riga,2,true)
			tabe.SetSpanned(riga,3,true)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"testo-dx")
			tabe.SetValore(riga,1,"Gol Supplementari:&nbsp;")
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,t.GolSupplementari)
		}
		if (t.Rigori==1) {
			riga++
			tabe.SetStileRiga(riga,"riga-bianco")
			tabe.SetSpan(riga,1,6)
			for (j=2;j<=6;j++) tabe.SetSpanned(riga,j,true)
			
      riga++
			tabe.SetStileRiga(riga,"riga-blu")
			tabe.SetSpan(riga,1,6)
			for (j=2;j<=6;j++) tabe.SetSpanned(riga,j,true)
			tabe.SetValore(riga,1,"Calci di Rigore")
			for (j=0;j<arrListaRigori.length;j++) {
				riga++
				if ((riga % 2) == 0) {
					pd="dispari"
				} else {
					pd="pari"
				}
				tabe.SetStileRiga(riga,"riga-"+pd)
				tabe.SetSpan(riga,1,2)
				tabe.SetSpanned(riga,2,true)
				tabe.SetSpan(riga,3,2)
				tabe.SetSpanned(riga,4,true)
				tabe.SetSpan(riga,5,2)
				tabe.SetSpanned(riga,6,true)
				tabe.SetStile(riga,1,"riga-bianco")
//				tabe.SetStile(riga,3,"Cella")
				tabe.SetStile(riga,5,"testo-cx")
				tabe.SetValore(riga,1,"&nbsp;")
				if (parseInt(arrListaRigori[j])==0) {
					// assente
					tabe.SetValore(riga,3,"<span class='testo-8'>-------------</span>")
				} else if (parseInt(arrListaRigori[j])==-1) {
					// ru
					tabe.SetValore(riga,3,"<span class='testo-8'>Riserva d'Ufficio</span>")
				} else {
					tabe.SetValore(riga,3,"<span class='testo-8'>"+eval("xg"+arrListaRigori[j])+"</span>")
				}
				tabe.SetValore(riga,5,"<span class='testo-"+(ConvToFloat(arrVotoRigori[j])>=6?"verde":"rosso")+"'>"+arrVotoRigori[j]+"</span>")
			}
			// gol rig
			riga++
			tabe.SetStileRiga(riga,"riga-orange")
			tabe.SetSpan(riga,1,4)
			tabe.SetSpanned(riga,2,true)
			tabe.SetSpanned(riga,3,true)
			tabe.SetSpanned(riga,4,true)
			tabe.SetSpan(riga,5,2)
			tabe.SetSpanned(riga,6,true)
			tabe.SetStile(riga,1,"testo-dx")
			tabe.SetValore(riga,1,"Gol Rigori:&nbsp;")
			tabe.SetStile(riga,5,"testo-cx")
			tabe.SetValore(riga,5,t.GolRigori)
		}
		// Ora la panchina, i sostituiti e tribuna
		riga++
		tabe.SetStileRiga(riga,"riga-bianco")
		tabe.SetSpan(riga,1,6)
		for (j=2;j<=6;j++) tabe.SetSpanned(riga,j,true)

		riga++
		tabe.SetStileRiga(riga,"riga-blu")
		tabe.SetSpan(riga,1,6)
		for (j=2;j<=6;j++) tabe.SetSpanned(riga,j,true)
		tabe.SetValore(riga,1,"Sostituiti, panchina e tribuna")
		for (j=11;j<arrLista.length;j++) {
			riga++
			if ((riga % 2) == 0) {
				pd="dispari2"
			} else {
				pd="pari"
			}
		// come Lista, valori separati da % per i ruoli dei giocatori
		// 1,2,3,4: PORT, DIFE, CENT, ATTA "normali", oppure RU
		// 5,6,7,8: Riserve (p,d,c,a) {se nei primi 11, entrata, altrimenti riserva non entrata}
		// 0: assente
		// -1,-2,-3,-4: (solo "sostituiti"): giocatori che sono stati "sostituiti"
		// -5,-6,-7,-8: tribuna (p,d,c,a)
			switch(parseInt(arrRuolo[j])) {
			case 0:
				ruolo="-"
				colore=""
				neretto="-bold"
				break
			case 1:
				ruolo=(arrLista[j]>0?"P":"PU")
				colore="oliva"
				neretto="-bold"
				break
			case 2:
				ruolo=(arrLista[j]>0?"D":"DU")
				colore="verde"
				neretto="-bold"
				break
			case 3:
				ruolo=(arrLista[j]>0?"C":"CU")
				colore="rosso"
				neretto="-bold"
				break
			case 4:
				ruolo=(arrLista[j]>0?"A":"AU")
				colore="blu"
				neretto="-bold"
				break
			case 5:
				ruolo=(j<=10?"PR":"P")
				colore="oliva"
				neretto=(j<=10?"-bold":"")
				break
			case 6:
				ruolo=(j<=10?"DR":"D")
				colore="verde"
				neretto=(j<=10?"-bold":"")
				break
			case 7:
				ruolo=(j<=10?"CR":"C")
				colore="rosso"
				neretto=(j<=10?"-bold":"")
				break
			case 8:
				ruolo=(j<=10?"AR":"A")
				colore="blu"
				neretto=(j<=10?"-bold":"")
				break
			case -1:
				ruolo="Ps"
				colore="oliva"
				neretto=""
				break
			case -2:
				ruolo="Ds"
				colore="verde"
				neretto=""
				break
			case -3:
				ruolo="Cs"
				colore="rosso"
				neretto=""
				break
			case -4:
				ruolo="As"
				colore="blu"
				neretto=""
				break
			case -5:
				ruolo=""
				colore=""
				neretto=""
				break
			case -6:
				ruolo=""
				colore=""
				neretto=""
				break
			case -7:
				ruolo=""
				colore=""
				neretto=""
				break
			case -8:
				ruolo=""
				colore=""
				neretto=""
				break
			}
			// per inserire la riga bianca tra titolari e riserve
			//if (inseritariga==0 && f[j].Pos>0) {
			//	tabe.SetStileRiga(riga,"Bianco")
			//	tabe.SetValore(riga,1,"&nbsp;")
			//	tabe.SetStile(riga,1,"Bianco")
			//	tabe.SetSpan(riga,1,3)
			//	tabe.SetSpanned(riga,2,true)
			//	tabe.SetSpanned(riga,3,true)
			//	inseritariga=1
			//	riga=1+j+inseritariga
			//}
			tabe.SetStileRiga(riga,"riga-bianco")
			// la maglietta solo per titolari e riserve
			sqa=(((arrLista[j]==0)||(arrLista[j]==-1)) ?"---":eval("xa"+arrListaSqA[j]))
			if (!((arrRuolo[j]>=-8 && arrRuolo[j]<=-5) || ((arrLista[j]==0)||(arrLista[j]==-1)))) tabe.SetValore(riga,1,"<img src='img/sq/"+sqa+".gif'>")
//			tabe.SetStile(riga,1,"riga-bianco")
			// dati
			tabe.SetValore(riga,2,"<div class='testo-"+colore+neretto+"-cx'>"+ruolo+"</div>")
			if (arrLista[j]==0) {
				tabe.SetValore(riga,3,"<div class='testo-"+colore+neretto+"'>"+"-----------------"+ "</div>")
			} else if (arrLista[j]==-1) {
				tabe.SetValore(riga,3,"<div class='testo-"+colore+neretto+"'>"+"Riserva d'ufficio"+ "</div>")
			} else {
				tabe.SetValore(riga,3,"<div class='testo-"+colore+neretto+"'>"+(eval("xg"+arrLista[j]))+" ("+sqa+")" + "</div>")
			}
			if (arrVoto[j]=="sv/ng") {
				tabe.SetValore(riga,4,"<div class='testo-"+neretto+"cx'>sv/ng</div>")
				tabe.SetValore(riga,5,"<div class='testo-"+neretto+"cx'>-</div>")
				tabe.SetValore(riga,6,"<div class='testo-"+neretto+"cx'>sv/ng</div>")   
			} else {
				tabe.SetValore(riga,5,"<div class='testo-"+neretto+"cx'>"+arrModif[j]+"</div>")
				if (ConvToFloat(arrVoto[j])>=6) {
					tabe.SetValore(riga,4,"<div class='testo-verde"+neretto+"-cx'>"+arrVoto[j]+"</div>")
				} else {
					tabe.SetValore(riga,4,"<div class='testo-rosso"+neretto+"-cx'>"+arrVoto[j]+"</div>")
				}
				if (ConvToFloat(arrTot[j])>=6) {
					tabe.SetValore(riga,6,"<div class='testo-verde"+neretto+"-cx'>"+arrTot[j]+"</div>")
				} else {
					tabe.SetValore(riga,6,"<div class='testo-rosso"+neretto+"-cx'>"+arrTot[j]+"</div>")
				}
			}
			tabe.SetStile(riga,2,"riga-"+pd)
			tabe.SetStile(riga,3,"riga-"+pd)
			tabe.SetStile(riga,4,"riga-"+pd)
			tabe.SetStile(riga,5,"riga-"+pd)
			tabe.SetStile(riga,6,"riga-"+pd)
			// voto,modif,tot
		}
	}
	
	return tabe
}
