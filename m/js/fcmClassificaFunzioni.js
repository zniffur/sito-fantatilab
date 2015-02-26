// Oggetti Javascript per Classifica
// riferisce fcmGenerale.js

// La Classifica viene passata in ordine come e' nella competizione principale
// Oggetto Classifica (abbreviato C)
function C(ID,IDGirone,IDCompetizione,Pos,Nome,Presidente,Punti,PCV,PCN,PCP,PFV,PFN,PFP,RCF,RCS,RFF,RFS,MI,PMed,PMin,PMax,PDevSt,PAvv,PTot,TMed,TMin,TMax,TDevSt,TAvv,TTot,bm) {
	this.ID = ID
	this.IDGirone = IDGirone
	this.IDCompetizione = IDCompetizione
	this.Pos = Pos
	this.Nome = Nome
	this.Presidente = Presidente
	this.Punti = Punti
	this.PartiteVinte = new Coppia(PCV,PFV)
	this.PartiteNulle = new Coppia(PCN,PFN)
	this.PartitePerse = new Coppia(PCP,PFP)
	this.RetiFatte = new Coppia(RCF,RFF)
	this.RetiSubite = new Coppia(RCS,RFS)
	this.MI = MI
	this.PMed = PMed
	this.PMin = PMin
	this.PMax = PMax
	this.PDevSt = PDevSt
	this.PAvv = PAvv
	this.PTot = PTot
	this.TMed = TMed 
	this.TMin = TMin
	this.TMax = TMax
	this.TDevSt = TDevSt
	this.TAvv = TAvv
	this.TTot = TTot
	this.bm = bm
}
// Oggetto ColonneClassifica
function CC(IDGirone,Colonne) {
	//stringa di bit: dove c'e' 1 la colonna è visibile
	    /*  0: Squadra
		1: Presidente
		2: Punti
		3: Bonus/Malus
		4: PcV
		5: PcN
		6: PcP
		7: PfV
		8: PfN
		9: PfP
		10: PtV
		11: PtN
		12: PtP
		13: MI
		14: RcF
		15: RcS
		16: RfF
		17: RfS
		18: RtF
		19: RtS
		20: PMed
		21: PMin
		22: PMax
		23: PDst
		24: PAvv
		25: PSomma
		26: TMed
		27: TMin
		28: TMax
		29: TDSt
		30: TAvv
		31: TSomma
	*/
	this.IDGirone = IDGirone
	this.Colonne = Colonne
}	

function GeneraClassifica(IDGirone) {
var arr = new Object()
var arrCol = new Object()
var classifi = new Object()
var i,IndexColonne = -1
var cntColonne = 0,cntColonneGen = 0,cntColonneReti = 0,cntColonnePartite = 0, cntColonneParz = 0, cntColonneTot = 0, cntColonneMI = 0
var col,row,d10
var startGen = 0, startPartite = 0, startMI = 0, startReti = 0, startParz = 0, startTot = 0
	//arrCol = RiempiColonneClassifica(arrCol)
	arrCol = arrColonneClassifica
	i = 1
	// Trova la posizione delle colonne
	while (IndexColonne == -1) {
		if (arrCol[i].IDGirone == IDGirone) IndexColonne = i
		i++
	}
	// Conta le colonne visibili
	for (i=0;i<arrCol[IndexColonne].Colonne.length;i++) {
		if (arrCol[IndexColonne].Colonne.charAt(i) == "1") cntColonne++ 
		if ((i>=0) && (i<=3)) {
			if (arrCol[IndexColonne].Colonne.charAt(i) == "1") cntColonneGen++
		} else if ((i>=4) && (i<=12)) {
			if (arrCol[IndexColonne].Colonne.charAt(i) == "1") cntColonnePartite++
		} else if (i==13) {
			if (arrCol[IndexColonne].Colonne.charAt(i) == "1") cntColonneMI++
		} else if ((i>=14) && (i<=19)) {
			if (arrCol[IndexColonne].Colonne.charAt(i) == "1") cntColonneReti++
		} else if ((i>=20) && (i<=25)) {
			if (arrCol[IndexColonne].Colonne.charAt(i) == "1") cntColonneParz++
		} else if ((i>=26) && (i<=31)) {
			if (arrCol[IndexColonne].Colonne.charAt(i) == "1") cntColonneTot++
		}
	}
	classifi = new Tabella(2,cntColonne+1) // +1 per la posizione
	classifi.intestazioni=true
	//arr = RiempiClassifica(arr)
	arr = arrClassifica
	Stato("Generazione Classifica...")
	// prima riga di intestazione
	// Imposta gli span corretti
	for (i=1;i<=classifi.numcolonne;i++) {
		classifi.SetSpanned(1,i,true)
	}
	startGen=1
	startPartite=cntColonneGen+2
	startMI = startPartite + cntColonnePartite
	startReti = startMI + cntColonneMI
	startParz = startReti + cntColonneReti
	startTot = startParz + cntColonneParz
	classifi.SetStileRiga(1,"riga-blu-cx")

//debugger
	classifi.SetSpan(1,1,parseInt(cntColonneGen)+1)
	if (cntColonnePartite>0) {
		classifi.SetSpan(1,startPartite,cntColonnePartite)
		classifi.SetSpanned(1,startPartite,false)
	}
	if (cntColonneMI>0) {
		classifi.SetSpan(1,startMI,cntColonneMI)
		classifi.SetSpanned(1,startMI,false)
	}
	if (cntColonneReti>0) {
		classifi.SetSpan(1,startReti,cntColonneReti)
		classifi.SetSpanned(1,startReti,false)
	}
	if (cntColonneParz>0) {
		classifi.SetSpan(1,startParz,cntColonneParz)
		classifi.SetSpanned(1,startParz,false)
	}
	if (cntColonneTot>0) {
		classifi.SetSpan(1,startTot,cntColonneTot)
		classifi.SetSpanned(1,startTot,false)
	}
	classifi.SetSpanned(1,1,false)
	//debugger
	if (cntColonnePartite > 0) {
		classifi.SetValore(1,startPartite,"PARTITE")
	}
	if (cntColonneMI > 0) {
		classifi.SetValore(1,startMI,"")
	}
	if (cntColonneReti > 0) {
		classifi.SetValore(1,startReti,"RETI")
	}	
	if (cntColonneParz > 0) {
		classifi.SetValore(1,startParz,"PARZIALE")
	}	
	if (cntColonneTot > 0) {
		classifi.SetValore(1,startTot,"TOTALE")
	}	
	// Seconda riga di intestazione
	col = 1
	classifi.SetValore(2,col,"")
	classifi.SetStileRiga(2,"riga-orange-cx")
	col++
	for(i=0;i<arrCol[IndexColonne].Colonne.length;i++) {
		if (arrCol[IndexColonne].Colonne.charAt(i) == 1) {
			switch (i) {
			case 0: classifi.SetValore(2,col,"Squadra"); break
			case 1: classifi.SetValore(2,col,"Presidente"); break
			case 2: classifi.SetValore(2,col,"PT"); break
			case 3: classifi.SetValore(2,col,"<nobr>B/M</nobr>"); break
			case 4: classifi.SetValore(2,col,"CV"); break
			case 5: classifi.SetValore(2,col,"CN"); break
			case 6: classifi.SetValore(2,col,"CP"); break
			case 7: classifi.SetValore(2,col,"FV"); break
			case 8: classifi.SetValore(2,col,"FN"); break
			case 9: classifi.SetValore(2,col,"FP"); break
			case 10: classifi.SetValore(2,col,"V"); break
			case 11: classifi.SetValore(2,col,"N"); break
			case 12: classifi.SetValore(2,col,"P"); break
			case 13: classifi.SetValore(2,col,"MI"); break
			case 14: classifi.SetValore(2,col,"CF"); break
			case 15: classifi.SetValore(2,col,"CS"); break
			case 16: classifi.SetValore(2,col,"FF"); break
			case 17: classifi.SetValore(2,col,"FS"); break
			case 18: classifi.SetValore(2,col,"F"); break
			case 19: classifi.SetValore(2,col,"S"); break
			case 20: classifi.SetValore(2,col,"Med"); break
			case 21: classifi.SetValore(2,col,"1ªAND"); break
			case 22: classifi.SetValore(2,col,"1ªRIT"); break
			case 23: classifi.SetValore(2,col,"2ªAND"); break
			case 24: classifi.SetValore(2,col,"2ªRIT"); break
			case 25: classifi.SetValore(2,col,"Somma"); break
			case 26: classifi.SetValore(2,col,"Med"); break
			case 27: classifi.SetValore(2,col,"Min"); break
			case 28: classifi.SetValore(2,col,"Max"); break
			case 29: classifi.SetValore(2,col,"DSt"); break
			case 30: classifi.SetValore(2,col,"Ultime 5 gare"); break
			case 31: classifi.SetValore(2,col,"Somma"); break
			}			
			col++
		}
	}
	// classifica
	row = 3
	for (i=1;i<arr.length;i++) {
		if (IDGirone == arr[i].IDGirone) {

if (competizioneGP == "no") {

var primogiro=0;
var secondogiro=0;
var terzogiro=0;
var quartogiro=0;
for (w=2;w<=GetUltimaGiornataGiocata();w++) {
if (w>=2 && w<=10) {
for (conta2=1;conta2<=NumIncVisUltRis;conta2++) {
	if ((arr[i].Nome) == (RiempiListaIncontri(w,0)[conta2].Nomi.Casa)) { 
		if ((RiempiListaIncontri(w,0)[conta2].Gol.Casa)>(RiempiListaIncontri(w,0)[conta2].Gol.Fuori)) {
primogiro=primogiro+3

}
		if ((RiempiListaIncontri(w,0)[conta2].Gol.Casa)==(RiempiListaIncontri(w,0)[conta2].Gol.Fuori)) {
primogiro++
}
}
	if ((arr[i].Nome) == (RiempiListaIncontri(w,0)[conta2].Nomi.Fuori)) { 
		if ((RiempiListaIncontri(w,0)[conta2].Gol.Fuori)>(RiempiListaIncontri(w,0)[conta2].Gol.Casa)) {
primogiro=primogiro+3

}
		if ((RiempiListaIncontri(w,0)[conta2].Gol.Fuori)==(RiempiListaIncontri(w,0)[conta2].Gol.Casa)) {
primogiro++
}
}
}
}
if (w>=11 && w<=19) {
for (conta2=1;conta2<=NumIncVisUltRis;conta2++) {
if ((arr[i].Nome) == (RiempiListaIncontri(w,0)[conta2].Nomi.Casa)) { 
if ((RiempiListaIncontri(w,0)[conta2].Gol.Casa)>(RiempiListaIncontri(w,0)[conta2].Gol.Fuori)) {
secondogiro=secondogiro+3
}
if ((RiempiListaIncontri(w,0)[conta2].Gol.Casa)==(RiempiListaIncontri(w,0)[conta2].Gol.Fuori)) {
secondogiro++
}
}
if ((arr[i].Nome) == (RiempiListaIncontri(w,0)[conta2].Nomi.Fuori)) { 
if ((RiempiListaIncontri(w,0)[conta2].Gol.Fuori)>(RiempiListaIncontri(w,0)[conta2].Gol.Casa)) {
secondogiro=secondogiro+3
}
if ((RiempiListaIncontri(w,0)[conta2].Gol.Fuori)==(RiempiListaIncontri(w,0)[conta2].Gol.Casa)) {
secondogiro++
}
}
}
}
if (w>=20 && w<=28) {
for (conta2=1;conta2<=NumIncVisUltRis;conta2++) {
if ((arr[i].Nome) == (RiempiListaIncontri(w,0)[conta2].Nomi.Casa)) { 
if ((RiempiListaIncontri(w,0)[conta2].Gol.Casa)>(RiempiListaIncontri(w,0)[conta2].Gol.Fuori)) {
terzogiro=terzogiro+3
}
if ((RiempiListaIncontri(w,0)[conta2].Gol.Casa)==(RiempiListaIncontri(w,0)[conta2].Gol.Fuori)) {
terzogiro++
}
}
if ((arr[i].Nome) == (RiempiListaIncontri(w,0)[conta2].Nomi.Fuori)) { 
if ((RiempiListaIncontri(w,0)[conta2].Gol.Fuori)>(RiempiListaIncontri(w,0)[conta2].Gol.Casa)) {
terzogiro=terzogiro+3
}
if ((RiempiListaIncontri(w,0)[conta2].Gol.Fuori)==(RiempiListaIncontri(w,0)[conta2].Gol.Casa)) {
terzogiro++
}
}
}
}
if (w>=29 && w<=37) {
quartogiro=(arr[i].Punti-primogiro-secondogiro-terzogiro)
}
}


var ultimiris="";
var k=0;
for (w=4;w>=0;w--) {
for (conta2=1;conta2<=NumIncVisUltRis;conta2++) {
if ((arr[i].Nome) == (RiempiListaIncontri((GetUltimaGiornataGiocata()-w),0)[conta2].Nomi.Casa)) { 
if ((RiempiListaIncontri((GetUltimaGiornataGiocata()-w),0)[conta2].Gol.Casa)>(RiempiListaIncontri((GetUltimaGiornataGiocata()-w),0)[conta2].Gol.Fuori)) {
ultimiris=ultimiris+" V"
}
if ((RiempiListaIncontri((GetUltimaGiornataGiocata()-w),0)[conta2].Gol.Casa)==(RiempiListaIncontri((GetUltimaGiornataGiocata()-w),0)[conta2].Gol.Fuori)) {
ultimiris=ultimiris+" N"
}
if ((RiempiListaIncontri((GetUltimaGiornataGiocata()-w),0)[conta2].Gol.Casa)<(RiempiListaIncontri((GetUltimaGiornataGiocata()-w),0)[conta2].Gol.Fuori)) {
ultimiris=ultimiris+" P"
}
}
if ((arr[i].Nome) == (RiempiListaIncontri((GetUltimaGiornataGiocata()-w),0)[conta2].Nomi.Fuori)) { 
if ((RiempiListaIncontri((GetUltimaGiornataGiocata()-w),0)[conta2].Gol.Fuori)>(RiempiListaIncontri((GetUltimaGiornataGiocata()-w),0)[conta2].Gol.Casa)) {
ultimiris=ultimiris+" V"
}
if ((RiempiListaIncontri((GetUltimaGiornataGiocata()-w),0)[conta2].Gol.Fuori)==(RiempiListaIncontri((GetUltimaGiornataGiocata()-w),0)[conta2].Gol.Casa)) {
ultimiris=ultimiris+" N"
}
if ((RiempiListaIncontri((GetUltimaGiornataGiocata()-w),0)[conta2].Gol.Fuori)<(RiempiListaIncontri((GetUltimaGiornataGiocata()-w),0)[conta2].Gol.Casa)) {
ultimiris=ultimiris+" P"
}
}
}
k++
}
var ultimi = ultimiris
}



			col=1
			classifi.SetValore(row,col,"<img height='20' src='../js/img/fsq/" + arr[i].Nome + ".png'>")
			classifi.SetStile(row,col,"testo-bold-cx")
			if ((i % 2) == 0) {
				classifi.SetStileRiga(row,"riga-pari")
			} else {
				classifi.SetStileRiga(row,"riga-dispari")
			}
			col++

			for(j=0;j<arrCol[IndexColonne].Colonne.length;j++) {
				if (arrCol[IndexColonne].Colonne.charAt(j) == 1) {
					switch (j) {
					case 0:
{
if (i==1 || i==11 || i==12 || i==13 || i==15 || i==16 || i==17){
					classifi.SetValore(row,col,"<nobr>" + arr[i].Nome +"</nobr>")
					classifi.SetStile(row,col,"CellaPrimo")
} else {
if (i==10 || i==14 || i==18){
					classifi.SetValore(row,col,"<nobr>" + arr[i].Nome +"</nobr>")
					classifi.SetStile(row,col,"CellaUltimo")
} else{
if (i==2 || i==3){
					classifi.SetValore(row,col,"<nobr>" + arr[i].Nome +"</nobr>")
					classifi.SetStile(row,col,"CellaSecondo")
} else{

					classifi.SetValore(row,col,"<nobr>" + arr[i].Nome +"</nobr>")
					classifi.SetStile(row,col,"CellaLogo")
}
}
}
						}


						break
					case 1:
						classifi.SetValore(row,col,"<nobr>" + arr[i].Presidente +"</nobr>")
						break
					case 2: 
						classifi.SetValore(row,col,"<nobr><img align='left' src='../js/img/sfuRed.gif' height='20' width="+ ((arr[i].Punti)*(2)) +"><p class='t-xxsA'>" + arr[i].Punti +"</p></nobr>")
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 3: 
						classifi.SetValore(row,col,"<nobr>" + arr[i].bm +"</nobr>")
						classifi.SetStile(row,col,"testo-blu-cx")
						break
					case 4:
						classifi.SetValore(row,col,arr[i].PartiteVinte.Casa)
						classifi.SetStile(row,col,"testo-cx")
						break
					case 5: 
						classifi.SetValore(row,col,arr[i].PartiteNulle.Casa)
						classifi.SetStile(row,col,"testo-cx")
						break
					case 6: 
						classifi.SetValore(row,col,arr[i].PartitePerse.Casa)
						classifi.SetStile(row,col,"testo-cx")
						break
					case 7: 
						classifi.SetValore(row,col,arr[i].PartiteVinte.Fuori)
						classifi.SetStile(row,col,"testo-cx")
						break
					case 8: 
						classifi.SetValore(row,col,arr[i].PartiteNulle.Fuori)
						classifi.SetStile(row,col,"testo-cx")
						break
					case 9: 
						classifi.SetValore(row,col,arr[i].PartitePerse.Fuori)
						classifi.SetStile(row,col,"testo-cx")
						break
					case 10: 
						classifi.SetValore(row,col,(arr[i].PartiteVinte.Casa+arr[i].PartiteVinte.Fuori))
						classifi.SetStile(row,col,"testo-verde-bold-cx")
						break
					case 11: 
						classifi.SetValore(row,col,(arr[i].PartiteNulle.Casa+arr[i].PartiteNulle.Fuori))
						classifi.SetStile(row,col,"testo-oliva-bold-cx")
						break
					case 12: 
						classifi.SetValore(row,col,(arr[i].PartitePerse.Casa+arr[i].PartitePerse.Fuori))
						classifi.SetStile(row,col,"testo-rosso-bold-cx")
						break
					case 13:  
						classifi.SetValore(row,col,"<nobr>" + arr[i].MI + "</nobr>")
						classifi.SetStile(row,col,"testo-blu-cx")
						break
					case 14:  
						classifi.SetValore(row,col,arr[i].RetiFatte.Casa)
						classifi.SetStile(row,col,"testo-cx")
						break
					case 15:  
						classifi.SetValore(row,col,arr[i].RetiSubite.Casa)
						classifi.SetStile(row,col,"testo-cx")
						break
					case 16:
						classifi.SetValore(row,col,arr[i].RetiFatte.Fuori)
						classifi.SetStile(row,col,"testo-cx")
						break
					case 17:  
						classifi.SetValore(row,col,arr[i].RetiSubite.Fuori)
						classifi.SetStile(row,col,"testo-cx")
						break
					case 18:  
						classifi.SetValore(row,col,(arr[i].RetiFatte.Casa+arr[i].RetiFatte.Fuori))
						classifi.SetStile(row,col,"testo-verde-bold-cx")
						break
					case 19:  
						classifi.SetValore(row,col,(arr[i].RetiSubite.Casa+arr[i].RetiSubite.Fuori))
						classifi.SetStile(row,col,"testo-rosso-bold-cx")
						break
					case 20: 
						classifi.SetValore(row,col,Fix3(arr[i].PMed))
						classifi.SetStile(row,col,"testo-cx")
						break
					case 21: 
						classifi.SetValore(row,col,primogiro)
						classifi.SetStile(row,col,"testo-cx")
						break
					case 22: 
						classifi.SetValore(row,col,secondogiro)
						classifi.SetStile(row,col,"testo-cx")
						break
					case 23:
						classifi.SetValore(row,col,terzogiro)
						classifi.SetStile(row,col,"testo-cx")
						break
					case 24: 
						classifi.SetValore(row,col,quartogiro)
						classifi.SetStile(row,col,"testo-cx")
						break
					case 25: 
						classifi.SetValore(row,col,Fix3(arr[i].PTot))
						classifi.SetStile(row,col,"testo-bold-cx")
						break
					case 26: 
						classifi.SetValore(row,col,Fix3(arr[i].TMed))
						classifi.SetStile(row,col,"testo-cx")
						break
					case 27: 
						classifi.SetValore(row,col,Fix3(arr[i].TMin))
						classifi.SetStile(row,col,"testo-cx")
						break
					case 28: 
						classifi.SetValore(row,col,Fix3(arr[i].TMax))
						classifi.SetStile(row,col,"testo-cx")
						break
					case 29:
						classifi.SetValore(row,col,Fix3(arr[i].TDevSt))
						classifi.SetStile(row,col,"testo-cx")
						break
					case 30: 
						classifi.SetValore(row,col,ultimi)
						classifi.SetStile(row,col,"testo-cx")
						break
					case 31: 
classifi.SetValore(row,col,"<img align='left' src='../js/img/sfuGreen.gif' height='20' width="+ (((Fix3(arr[i].TTot)-Fix3(arr[10].TTot))/(Fix3(arr[1].TTot)-Fix3(arr[10].TTot)))*(100/2)) +"><p class='t-xxsB'>" + Fix3(arr[i].TTot) + "</p>")
						classifi.SetStile(row,col,"CellaCentro")
						break
					}			
					col++
				}
			}
			row++
		}
	}
	Stato("Visualizzazione Classifica...")
	d10 = Math.ceil(classifi.numrighe / 10)
	classifi.nome="Classifica"
	classifi.larghezza=99
	classifi.altezza=0
	classifi.border=1
	classifi.cellpadding=3
	classifi.cellspacing=0
	classifi.stile="tab-8"
	classifi.Stampa()
}
