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
		
		
	//MODIFICA PUFFIN BLOCCO COLONNE DA VISUALIZZARE
	var arrColonneClassificaPuffin=arrColonneClassifica.slice(0);	
	a=arrColonneClassificaPuffin
	for (i=1;i<arrColonneClassificaPuffin.length;i++) {
				//a[i] =new CC(arrColonneClassificaPuffin[i].IDGirone,"10100000001111000011000000111011");
				a[i] =new CC(arrColonneClassificaPuffin[i].IDGirone,"10100000000000000000000000000001");
	}
	arrCol = arrColonneClassificaPuffin
	//FINE MODIFICA PUFFIN BLOCCO COLONNE DA VISUALIZZARE
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
	//for (i=1;i<=classifi.numcolonne;i++) {
	//	classifi.SetSpanned(1,i,true)
	//}
	startGen=1
	startPartite=cntColonneGen+2
	startMI = startPartite + cntColonnePartite //+ (cntColonnePartite>0?1:0)
	startReti = startMI + cntColonneMI //+ (cntColonneMI>0?1:0)
	startParz = startReti + cntColonneReti// + (cntColonneReti>0?1:0)
	startTot = startParz + cntColonneParz //+ (cntColonneParz>0?1:0)

//debugger
	//classifi.SetSpan(1,1,parseInt(cntColonneGen)+1)
	if (cntColonnePartite>0) {
	//	classifi.SetSpan(1,1+cntColonneGen+1,cntColonnePartite)
	//	classifi.SetSpanned(1,1+cntColonneGen+1,false)
		classifi.SetSpan(1,startPartite,cntColonnePartite)
		classifi.SetSpanned(1,startPartite,false)
	}
	if (cntColonneMI>0) {
		//classifi.SetSpan(1,1+cntColonneGen+cntColonnePartite+1,cntColonneMI)
		//classifi.SetSpanned(1,1+cntColonneGen+cntColonnePartite+1,false)
		classifi.SetSpan(1,startMI,cntColonneMI)
		classifi.SetSpanned(1,startMI,false)
	}
	if (cntColonneReti>0) {
	//	classifi.SetSpan(1,1+cntColonneGen+cntColonnePartite+cntColonneMI+1,cntColonneReti)
	//	classifi.SetSpanned(1,1+cntColonneGen+cntColonnePartite+cntColonneMI+1,false)
		classifi.SetSpan(1,startReti,cntColonneReti)
		classifi.SetSpanned(1,startReti,false)
	}
	if (cntColonneParz>0) {
	//	classifi.SetSpan(1,1+cntColonneGen+cntColonnePartite+cntColonneMI+1+cntColonneReti+1,cntColonneParz)
	//	classifi.SetSpanned(1,1+cntColonneGen+cntColonnePartite+cntColonneMI+1+cntColonneReti+1,false)
		classifi.SetSpan(1,startParz,cntColonneParz)
		classifi.SetSpanned(1,startParz,false)
	}
	if (cntColonneTot>0) {
	//	classifi.SetSpan(1,1+cntColonneGen+cntColonnePartite+cntColonneMI+1+cntColonneReti+cntColonneParz+(cntColonneParz>0?1:0),cntColonneTot)
	//	classifi.SetSpanned(1,1+cntColonneGen+cntColonnePartite+cntColonneMI+1+cntColonneReti+cntColonneParz+(cntColonneParz>0?1:0),false)
		classifi.SetSpan(1,startTot,cntColonneTot)
		classifi.SetSpanned(1,startTot,false)
	}
	classifi.SetSpanned(1,1,false)
	//classifi.SetSpanned(1,cntColonneGen+1+1,false)
	//if (cntColonneGen+1+cntColonnePartite+1<=classifi.numcolonne) classifi.SetSpanned(1,cntColonneGen+1+cntColonnePartite+1,false)
	//if (cntColonneGen+1+cntColonnePartite+cntColonneMI+1<=classifi.numcolonne)  classifi.SetSpanned(1,cntColonneGen+1+cntColonnePartite+cntColonneMI+1,false)
	//if (cntColonneGen+1+cntColonnePartite+cntColonneMI+1+cntColonneReti+1<=classifi.numcolonne)  classifi.SetSpanned(1,cntColonneGen+1+cntColonnePartite+cntColonneMI+1+cntColonneReti+1,false)
	//if (cntColonneGen+1+cntColonnePartite+cntColonneMI+1+cntColonneReti+1<=classifi.numcolonne)  classifi.SetSpanned(1,cntColonneGen+1+cntColonnePartite+cntColonneMI+1+cntColonneReti+cntColonneParz+1,false)
	
	//***************************Intestazione Classifica
	//classifi.SetStile(1,1,"IntestazioneClassifica")
	//classifi.SetValore(1,1,"&nbsp;")
	
	//classifi.SetStile(1,cntColonneGen+1,"IntRossoBlu")
	//classifi.SetStile(1,cntColonneGen+cntColonnePartite+1+1,"IntRossoBlu")
	//debugger
	if (cntColonnePartite > 0) {
	//	classifi.SetValore(1,cntColonneGen+1+1,"PARTITE")
	//	classifi.SetStile(1,cntColonneGen+1+1,"IntRossoBlu")
		classifi.SetValore(1,startPartite,"PARTITE")
		classifi.SetStile(1,startPartite,"IntRossoBlu")
	}
	if (cntColonneMI > 0) {
	//	classifi.SetValore(1,cntColonneGen+1+cntColonnePartite+1+1,"")
	//	classifi.SetStile(1,cntColonneGen+1+cntColonnePartite+1+1,"IntRossoBlu")
		classifi.SetValore(1,startMI,"")
		classifi.SetStile(1,startMI,"IntRossoBlu")
	}
	if (cntColonneReti > 0) {
	//	classifi.SetValore(1,cntColonneGen+1+cntColonnePartite+cntColonneMI+1,"RETI")
	//	classifi.SetStile(1,cntColonneGen+1+cntColonnePartite+cntColonneMI+1,"IntRossoBlu")
		classifi.SetValore(1,startReti,"RETI")
		classifi.SetStile(1,startReti,"IntRossoBlu")
	}
	if (cntColonneParz > 0) {
	//	classifi.SetValore(1,cntColonneGen+1+cntColonnePartite+cntColonneMI+1+cntColonneReti+1,"PARZIALE")
	//	classifi.SetStile(1,cntColonneGen+1+cntColonnePartite+cntColonneMI+1+cntColonneReti+1,"IntRossoBlu")
		classifi.SetValore(1,startParz,"PARZIALE")
		classifi.SetStile(1,startParz,"IntRossoBlu")
	}
	if (cntColonneTot > 0) {
	//	classifi.SetValore(1,cntColonneGen+1+cntColonnePartite+cntColonneMI+1+cntColonneReti+cntColonneParz+1,"TOTALE")
	//	classifi.SetStile(1,cntColonneGen+1+cntColonnePartite+cntColonneMI+1+cntColonneReti+cntColonneParz+1,"IntRossoBlu")
		classifi.SetValore(1,startTot,"TOTALE")
		classifi.SetStile(1,startTot,"IntRossoBlu")
	}
	// Seconda riga di intestazione
	col = 1
	classifi.SetValore(1,col,"Pos")
	classifi.SetStile(1,col,"IntBlu")
	//col++
	classifi.SetValore(1,col+1,"Squadra");
	classifi.SetStile(1,col+1,"IntBlu")
	
	classifi.SetValore(1,col+2,"Pt");
	classifi.SetStile(1,col+2,"IntBlu")
	
	
	classifi.SetValore(1,col+3,"Somma");
	classifi.SetStile(1,col+3,"IntBlu")
	//for(i=0;i<arrCol[IndexColonne].Colonne.length;i++) {
	//	if (arrCol[IndexColonne].Colonne.charAt(i) == 1) {
	//		classifi.SetStile(1,col,"IntestClass")
	//		switch (i) {
	//		case 0: classifi.SetValore(1,col,"Squadra"); break
	//		case 1: classifi.SetValore(1,col,"Presidente"); break
	//		case 2: classifi.SetValore(1,col,"PT"); break
	//		case 3: classifi.SetValore(1,col,"<nobr>B/M</nobr>"); break
	//		case 4: classifi.SetValore(1,col,"CV"); break
	//		case 5: classifi.SetValore(1,col,"CN"); break
	//		case 6: classifi.SetValore(1,col,"CP"); break
	//		case 7: classifi.SetValore(1,col,"FV"); break
	//		case 8: classifi.SetValore(1,col,"FN"); break
	//		case 9: classifi.SetValore(1,col,"FP"); break
	//		case 10: classifi.SetValore(1,col,"V"); break
	//		case 11: classifi.SetValore(1,col,"N"); break
	//		case 12: classifi.SetValore(1,col,"P"); break
	//		case 13: classifi.SetValore(1,col,"MI"); break
	//		case 14: classifi.SetValore(1,col,"CF"); break
	//		case 15: classifi.SetValore(1,col,"CS"); break
	//		case 16: classifi.SetValore(1,col,"FF"); break
	//		case 17: classifi.SetValore(1,col,"FS"); break
	//		case 18: classifi.SetValore(1,col,"F"); break
	//		case 19: classifi.SetValore(1,col,"S"); break
	//		case 20: classifi.SetValore(1,col,"Med"); break
	//		case 21: classifi.SetValore(1,col,"Min"); break
	//		case 22: classifi.SetValore(1,col,"Max"); break
	//		case 23: classifi.SetValore(1,col,"DSt"); break
	//		case 24: classifi.SetValore(1,col,"Avv"); break
	//		case 25: classifi.SetValore(1,col,"Somma"); break
	//		case 26: classifi.SetValore(1,col,"Med"); break
	//		case 27: classifi.SetValore(1,col,"Min"); break
	//		case 28: classifi.SetValore(1,col,"Max"); break
	//		case 29: classifi.SetValore(1,col,"DSt"); break
	//		case 30: classifi.SetValore(1,col,"Avv"); break
	//		case 31: classifi.SetValore(1,col,"Somma"); break
	//		}
	//		col++
	//	}
	//}
	// classifica
	row = 2
	for (i=1;i<arr.length;i++) {
		if (IDGirone == arr[i].IDGirone) {
			col=1
			if (row < 6) {
			StilePos = 'primiPos'
			} else if (row >= 6) {
			StilePos = 'ultimiPos'
			}
			classifi.SetValore(row,col,"<span class='"+StilePos+"'>" + (row-1) +"</span>")
			classifi.SetStile(row,col,"Pos")
			if ((i % 2) == 0) {
				classifi.SetStileRiga(row,"P")
			} else {
				classifi.SetStileRiga(row,"r")
			}
			col++
			for(j=0;j<arrCol[IndexColonne].Colonne.length;j++) {
				if (arrCol[IndexColonne].Colonne.charAt(j) == 1) {
					switch (j) {
					case 0:
					    (row < 6)?(Stile = 'primi'):(Stile = 'ultimi');
						classifi.SetValore(row,col,"<nobr><span class='"+Stile+"'>" + arr[i].Nome +"</span></nobr>")
						classifi.SetStile(row,col,"Nome")
						break
					case 1:
						classifi.SetValore(row,col,"<nobr><span class='t-xxs'>" + arr[i].Presidente +"</span></nobr>")
						classifi.SetStile(row,col,"Cella")
						break
					case 2:
					    (row < 6)?(StileP = 'primiPunti'):(StileP = 'ultimiPunti');
						classifi.SetValore(row,col,"<nobr><span class='"+StileP+"'>" + arr[i].Punti +"</span></nobr>")
						classifi.SetStile(row,col,"Punti")
						break
					case 3:
						classifi.SetValore(row,col,"<nobr><span class='t-xxsBlu'>" + arr[i].bm +"</span></nobr>")
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 4:
						classifi.SetValore(row,col,arr[i].PartiteVinte.Casa)
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 5:
						classifi.SetValore(row,col,arr[i].PartiteNulle.Casa)
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 6:
						classifi.SetValore(row,col,arr[i].PartitePerse.Casa)
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 7:
						classifi.SetValore(row,col,arr[i].PartiteVinte.Fuori)
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 8:
						classifi.SetValore(row,col,arr[i].PartiteNulle.Fuori)
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 9:
						classifi.SetValore(row,col,arr[i].PartitePerse.Fuori)
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 10:
						classifi.SetValore(row,col,"<span class='t-xxsVB'>" + (arr[i].PartiteVinte.Casa+arr[i].PartiteVinte.Fuori) + "</span>")
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 11:
						classifi.SetValore(row,col,"<span class='t-xxsGB'>" + (arr[i].PartiteNulle.Casa+arr[i].PartiteNulle.Fuori) + "</span>")
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 12:
						classifi.SetValore(row,col,"<span class='t-xxsRB'>" + (arr[i].PartitePerse.Casa+arr[i].PartitePerse.Fuori) + "</span>")
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 13:
						classifi.SetValore(row,col,"<nobr>" + arr[i].MI + "</nobr>")
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 14:
						classifi.SetValore(row,col,arr[i].RetiFatte.Casa)
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 15:
						classifi.SetValore(row,col,arr[i].RetiSubite.Casa)
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 16:
						classifi.SetValore(row,col,arr[i].RetiFatte.Fuori)
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 17:
						classifi.SetValore(row,col,arr[i].RetiSubite.Fuori)
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 18:
						classifi.SetValore(row,col,"<span class='t-xxsVB'>" + (arr[i].RetiFatte.Casa+arr[i].RetiFatte.Fuori) + "</span>")
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 19:
						classifi.SetValore(row,col,"<span class='t-xxsRB'>" + (arr[i].RetiSubite.Casa+arr[i].RetiSubite.Fuori) + "</span>")
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 20:
						classifi.SetValore(row,col,Fix3(arr[i].PMed))
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 21:
						classifi.SetValore(row,col,Fix3(arr[i].PMin))
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 22:
						classifi.SetValore(row,col,Fix3(arr[i].PMax))
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 23:
						classifi.SetValore(row,col,Fix3(arr[i].PDevSt))
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 24:
						classifi.SetValore(row,col,Fix3(arr[i].PAvv))
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 25:
						classifi.SetValore(row,col,"<span class='t-xxsB'>" + Fix3(arr[i].PTot) + "</span>")
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 26:
						classifi.SetValore(row,col,Fix3(arr[i].TMed))
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 27:
						classifi.SetValore(row,col,Fix3(arr[i].TMin))
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 28:
						classifi.SetValore(row,col,Fix3(arr[i].TMax))
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 29:
						classifi.SetValore(row,col,Fix3(arr[i].TDevSt))
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 30:
						classifi.SetValore(row,col,Fix3(arr[i].TAvv))
						classifi.SetStile(row,col,"CellaCentro")
						break
					case 31:
						classifi.SetValore(row,col,"<span class='t-xxsB'>" + Fix3(arr[i].TTot) + "</span>")
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
	//classifi.larghezza=100
	classifi.altezza=0
	classifi.border=0
	classifi.cellpadding=0
	classifi.cellspacing=0
	classifi.stile="Classifica"
	classifi.Stampa()

}
