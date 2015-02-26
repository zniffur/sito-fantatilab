
function RV(IDSquadra,IDGiocatore,Ruolo,IDQuot,ListaGio,ListaFormatoGio,ListaStat,ListaFormatoStat) {
	this.IDSquadra = IDSquadra
	this.IDGiocatore = IDGiocatore
	// vale:
	// 0: titoli di colonna
	// >0: riga di giocatore
	// -1: riga dei tot/parz
	// -2: riga dell mv
	// -3: riga delle fm
	// -4: riga dell'avversario
	// -5: riga del risultato
	this.Ruolo = Ruolo 
	this.IDQuot = IDQuot
	// nome del quotidiano
	this.ListaGio = ListaGio
	// contiene la lista, separata da % con i valori del giocatore
	this.ListaFormatoGio = ListaFormatoGio
	// e' composto da due cifre di cui la prima indica il colore e la seconda lo stile
	// prima cifra
	//  0 = bianco
	//  1 = rosso
	//  2 = ciano
	//  3 = verde
	//  4 = giallo
	//  x+5 = colore primo piano = grigio
	// seconda cifra (bit)
	//  0 = normale
	//  1 = neretto
	//  2 = corsivo
	//  4 = sottolineato
    // quindi le combinazioni sono: 0=-,1=B,2=I,3=BI,4=S,5=SB,6=SI,7=SBI
	this.ListaStat = ListaStat
	// valori separati da % con le statistiche (26 valori)
	this.ListaFormatoStat = ListaFormatoStat
}

function GeneraIntestazioneFantasquadreQuotidiani(cSq,cQuot) {
var arrF = new Object()
var arrQ = new Object()
var i
arrF = arrFantasquadre
arrQ = arrQuotidiani
document.write("<form name='frmRv' id='frmRv' action='rv.htm' method='get'>")
document.write("<table width='100%' border='00' cellspacing='0' cellpadding='0'>")
document.write("<tr><td width='5%' class='testo-10'><nobr>&nbsp;&nbsp;Fantasquadra:&nbsp;<select name='Sq' class='testo-10' id='Sq'>")
for (i=1;i<arrF.length;i++) {
	document.write("<option value='" + arrF[i].ID + "'")
	if (arrF[i].ID == cSq) document.write(" selected")
	document.write(">" + arrF[i].Nome + "</option>")
}
document.write("</select></nobr></td>")
document.write("<td width='5%' class='testo-10'><nobr>&nbsp;&nbsp;Quotidiano:&nbsp;<select name='Quot' class='testo-10' id='Quot'>")
for (i=1;i<arrQ.length;i++) {
	document.write("<option value='" + arrQ[i].ID + "'")
	if (arrQ[i].ID == cQuot) document.write(" selected")
	document.write(">" + arrQ[i].Nome + "</option>")
}
document.write("</select></nobr></td>")
document.write("<td width='90%' class='testo-10'>&nbsp;&nbsp;<input name='Invia' type='submit' class='testo-10' id='Invia' value='  Vai  '></td>")
document.write("</tr></table></form>")
}

function GeneraRegistroVoti(IDSq,IDQuot) {
var i,j,f,fmt
var arrDati = new Object()
var arrDatiF = new Object()
var arrStat = new Object()
var arrStatF = new Object()
var tabe = new Tabella(10,10)
var arrRV = arrRegistri
var riga,pd,grigio
var primacolStat
	tabe.nome="Registro voti"
	tabe.larghezza = 100
  tabe.altezza=0
	tabe.border=1
	tabe.cellspacing=0
	tabe.cellpadding = 1
	tabe.stile = "tab-8"
	riga=1
	tabe.intestazioni=true
	tabe.SetValore(1,1,"Giocatore")
//	tabe.SetStile(1,1,"Cella")
	for (i=1;i<arrRV.length;i++) {
		if (arrRV[i].IDQuot==IDQuot) {
			arrDati = arrRV[i].ListaGio.split("%")
			arrDatiF = arrRV[i].ListaFormatoGio.split("%")
			arrStat = arrRV[i].ListaStat.split("%")
			arrStatF = arrRV[i].ListaFormatoStat.split("%")
			primacolStat=arrDati.length
			if (arrRV[i].IDGiocatore==0) {
				//1a riga
				tabe.SetStileRiga(riga,"riga-blu")
				for (j=0;j<arrDati.length;j++) {
//					tabe.SetStile(riga,j+2,"Cella")
					tabe.SetValore(riga,j+2,"<nobr>"+arrDati[j]+"</nobr>")
				}
				for (j=0;j<arrStat.length;j++) {
//					tabe.SetStile(riga,j+2+primacolStat,"Cella")
					tabe.SetValore(riga,j+2+primacolStat,"<nobr>"+arrStat[j]+"</nobr>")
				}
			} else {
				if ((riga % 2) == 0) {
					pd="dispari"
				} else {
					pd="pari"
				}
				j=0 // 1o elemento, da trattare separatamente
//				tabe.SetStileRiga(riga,"testo-8")
				if (arrRV[i].IDGiocatore==-5) tabe.SetStileRiga(riga,"testo-bold")
				if (arrRV[i].IDGiocatore==0) {
					tabe.SetStile(riga,1,"riga-"+pd)
					tabe.SetValore(riga,1,"<nobr>Giocatore</nobr>")
				} else if (arrRV[i].IDGiocatore==-1) {
					tabe.SetStile(riga,1,"riga-blu")
					tabe.SetValore(riga,1,"<nobr>Totale Squadra (Parziale)</nobr>")
				} else if (arrRV[i].IDGiocatore==-2) {
					tabe.SetStile(riga,1,"riga-"+pd)
					tabe.SetValore(riga,1,"<nobr>Mediavoto</nobr>")
				} else if (arrRV[i].IDGiocatore==-3) {
					tabe.SetStile(riga,1,"riga-"+pd)
					tabe.SetValore(riga,1,"<nobr>Fantamedia</nobr>")
				} else if (arrRV[i].IDGiocatore==-4) {
					tabe.SetStile(riga,1,"riga-"+pd)
					tabe.SetValore(riga,1,"<nobr>Avversario</nobr>")
				} else if (arrRV[i].IDGiocatore==-5) {
					tabe.SetStile(riga,1,"riga-orange")
					tabe.SetValore(riga,1,"<nobr>Risultato</nobr>")
				} else {
					tabe.SetStile(riga,1,"riga-"+pd)
					if (arrRV[i].Ruolo==1) {
						tabe.SetValore(riga,1,"<nobr><div class='testo-oliva-bold'>"+eval("xg"+arrRV[i].IDGiocatore)+"</div></nobr>")
					} else if (arrRV[i].Ruolo==2) {
						tabe.SetValore(riga,1,"<nobr><div class='testo-verde-bold'>"+eval("xg"+arrRV[i].IDGiocatore)+"</div></nobr>")
					} else if (arrRV[i].Ruolo==3) {
						tabe.SetValore(riga,1,"<nobr><div class='testo-rosso-bold'>"+eval("xg"+arrRV[i].IDGiocatore)+"</div></nobr>")
					} else if (arrRV[i].Ruolo==4) {
						tabe.SetValore(riga,1,"<nobr><div class='testo-blu-bold'>"+eval("xg"+arrRV[i].IDGiocatore)+"</div></nobr>")
					}					
				}
				for (j=0;j<arrDati.length;j++) {
					f=parseInt(arrDatiF[j])
					if (f>=50) {
						grigio="-grigio"
						f=f-50
					} else {
						grigio=""
					}
					if (f<10) {
						// bianco
						tabe.SetStile(riga,j+2,"riga-"+pd+grigio)
					} else if (f>=10 && f<20) {
						// rosso
						tabe.SetStile(riga,j+2,"cella-rosso"+grigio)
					} else if (f>=20 && f<30) {
						// rosso
						tabe.SetStile(riga,j+2,"cella-ciano"+grigio)
					} else if (f>=30 && f<40) {
						// rosso
						tabe.SetStile(riga,j+2,"cella-verde"+grigio)
					} else if (f>=40 && f<50) {
						// rosso
						tabe.SetStile(riga,j+2,"cella-oliva"+grigio)
					}
					// prendi solo la seconda cifra
					if (f>=10) f=(f+"").charAt(1)
					f=parseInt(f)
					// costruisci modificatore formato
					fmt=""
					if (f>0) {
						if ((f & 1)) fmt=fmt+"B"
						if ((f & 2)) fmt=fmt+"I"
						if ((f & 4)) fmt=fmt+"U"
					}
					if (fmt!="") {
						tabe.SetValore(riga,j+2,"<nobr><div class='tmod"+fmt+"'>"+arrDati[j]+"</div></nobr>")
					} else {
						tabe.SetValore(riga,j+2,"<nobr>"+arrDati[j]+"</nobr>")
					}
				}
				for (j=0;j<arrStat.length;j++) {
					f=parseInt(arrStatF[j])
					if (f>=50) {
						grigio="-grigio"
						f=f-50
					} else {
						grigio=""
					}
					if (f<10) {
						// bianco
						tabe.SetStile(riga,j+2+primacolStat,"riga-"+pd+"-cx")
					} else if (f>=10 && f<20) {
						// rosso
						tabe.SetStile(riga,j+2+primacolStat,"cella-rosso-cx")
					} else if (f>=20 && f<30) {
						// rosso
						tabe.SetStile(riga,j+2+primacolStat,"cella-ciano-cx")
					} else if (f>=30 && f<40) {
						// rosso
						tabe.SetStile(riga,j+2+primacolStat,"cella-verde-cx")
					} else if (f>=40 && f<50) {
						// rosso
						tabe.SetStile(riga,j+2+primacolStat,"cella-oliva-cx")
					}
					// prendi solo la seconda cifra
					if (f>=10) f=(f+"").charAt(1)
					f=parseInt(f)
					// costruisci modificatore formato
					fmt=""
					if (f>0) {
						if ((f & 1)) fmt=fmt+"B"
						if ((f & 2)) fmt=fmt+"I"
						if ((f & 4)) fmt=fmt+"U"
					}
					if (fmt!="") {
						tabe.SetValore(riga,j+2+primacolStat,"<nobr><div class='tmod"+fmt+"'>"+arrStat[j]+"</div></nobr>")
					} else {
						tabe.SetValore(riga,j+2+primacolStat,"<nobr>"+arrStat[j]+"</nobr>")
					}
				} // for stat
			} // if idgiocatore...
			riga++
		} // if
	} // for
	tabe.Stampa()
}
