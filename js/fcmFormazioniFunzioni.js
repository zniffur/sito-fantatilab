
// Oggetto Formazione (abbreviato Z)
function Z(IDIncontro,IDSquadra,IDLega,Nome,SquadraDiA,Ruolo,Pos,Rig) {
	this.IDIncontro = IDIncontro
	this.IDSquadra = IDSquadra
	this.IDLega = IDLega
	this.Nome = Nome
	this.SquadraDiA = SquadraDiA
	this.Ruolo = Ruolo
	this.Pos = Pos
	this.Rig = Rig
}

function GetFormazione(IDIncontro,IDSquadra,IDLega) {
// scorre la lista delle formazioni e ritorna tutte quelle che 
// hanno i tre valori corrispondenti. Quindi le ordina per pos
// mettendo pero' quelli con -1 alla fine e non all'inizio
var arr = new Array()
var i,cnt=1
var tipo,pPrimo,pUltimo
	for (i=1;i<arrFormazioni.length;i++) {
		if ((arrFormazioni[i].IDIncontro==IDIncontro) && (arrFormazioni[i].IDSquadra==IDSquadra) && (arrFormazioni[i].IDLega==IDLega)) {
			arr[cnt]=new Z
			arr[cnt]=arrFormazioni[i]
			cnt++
		} else {
			if (cnt>1) i=arrFormazioni.length
		}
	}
	//ordina
	for (i=1;i<arr.length;i++) {
		if (arr[i].Pos==-1) arr[i].Pos=999
	}
	if (arr.length>1) {
		QuickSortFormazioniPos(arr,1,arr.length-1)
		for (i=1;i<arr.length;i++) {
			if (arr[i].Pos==999) arr[i].Pos=-1
		}
		//ora ordina per ruolo all'interno delle tipologie
		// titolari
		pPrimo=arr.length-1
		pUltimo=1
		for (i=1;i<arr.length;i++) {
			if (arr[i].Pos==0) {
				if (i<pPrimo) pPrimo=i
				pUltimo=i
			}
		}
		if (pPrimo<pUltimo)	QuickSortFormazioniRuolo(arr,pPrimo,pUltimo)
		//riserve
		pPrimo=arr.length-1
		pUltimo=1
		for (i=1;i>arr.length;i++) {
			if (arr[i].Pos>0) {
				if (i<pPrimo) pPrimo=i
				pUltimo=i
			}
		}
		if (pPrimo<pUltimo)	QuickSortFormazioniRuolo(arr,pPrimo,pUltimo)
		//tribuna
		pPrimo=arr.length-1
		pUltimo=1
		for (i=1;i<arr.length;i++) {
			if (arr[i].Pos==-1) {
				if (i<pPrimo) pPrimo=i
				pUltimo=i
			}
		}
		if (pPrimo<pUltimo)	QuickSortFormazioniRuolo(arr,pPrimo,pUltimo)
	}
	return arr
}

function QuickSortFormazioniPos(arr,s,d) {
var i,j,X,m
var z1
	i = s
    j = d
    X = arr[Math.floor((s+d)/2)].Pos
    do {
		while (arr[i].Pos < X) {
			i++
		}
        while (X < arr[j].Pos) {
			j--
		}
		if (i<=j) {
			z1=arr[i]
			arr[i]=arr[j]
			arr[j]=z1
            i++
			j--
		}
	} while (i<=j)
	if (s<j) QuickSortFormazioniPos(arr,s,j)
	if (i<d) QuickSortFormazioniPos(arr,i,d)
}

function QuickSortFormazioniRuolo(arr,s,d) {
var i,j,X,m
var z1
	i = s
    j = d
    X = arr[Math.floor((s+d)/2)].Ruolo
    do {
		while (arr[i].Ruolo < X) {
			i++
		}
        while (X < arr[j].Ruolo) {
			j--
		}
		if (i<=j) {
			z1=arr[i]
			arr[i]=arr[j]
			arr[j]=z1
            i++
			j--
		}
	} while (i<=j)
	if (s<j) QuickSortFormazioniRuolo(arr,s,j)
	if (i<d) QuickSortFormazioniRuolo(arr,i,d)
}

function GeneraFormazioni(cGio,cComp) {
var arrI = new Array()
var f = new Array()
var tabe = new Object()
var str="",i,j
var ruolo,pd,colore
var mostra
	if (SezioniChiuse=="no") {
		mostra=""
	} else {
		mostra="display: none; "
	}
	// includi nel documento il file js corrispondente alla giornata
	//document.write("<script src='js/fcmFormazioniDati"+cGio+".js' type='text/javascript'></scr" + "ipt>")
	// carica la lista degli incontri di questa giornata e competizione
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
		tabe=new Tabella(1,3)
		f=GetFormazione(arrI[i].ID,arrI[i].IDSquadre.Casa,arrI[i].IDLegaSquadre.Casa)
		tabe=RiempiTabellaFormazione(tabe,f,arrI[i].Nomi.Casa)
		tabe.Stampa()
		document.write("</td>")
		if (arrI[i].IDTipo!=INC_GRANPREMIO) {
			document.write("<td width='50%' align='center' valign='top'>")
			// tabella fuori
			tabe=null
			tabe=new Tabella(1,3)
			f=GetFormazione(arrI[i].ID,arrI[i].IDSquadre.Fuori,arrI[i].IDLegaSquadre.Fuori)
			tabe=RiempiTabellaFormazione(tabe,f,arrI[i].Nomi.Fuori)
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

function RiempiTabellaFormazione(tabe,f,nome) {
var i,j,pd,colore,ruolo,inseritariga=0,riga=1
	tabe.nome="Formazione " + nome
	tabe.larghezza = 90
	tabe.border=1
	tabe.cellpadding = 2
	tabe.cellspacing=0
	tabe.stile = "tab-8"
	// nome della squadra
	tabe.SetValore(1,1,nome)
	tabe.SetStile(1,1,"riga-blu")
	tabe.SetSpan(1,1,3)
	tabe.SetSpanned(1,2,true)
	tabe.SetSpanned(1,3,true)
	tabe.SetLarghezzaColonna(1,5)
	tabe.SetLarghezzaColonna(2,5)
	tabe.SetLarghezzaColonna(3,90)
	for (j=1;j<f.length;j++) {
		riga=1+j+inseritariga
		if ((riga % 2) == 0) {
			pd="dispari2"
		} else {
			pd="pari"
		}
		if (f[j].Ruolo==1) {
			ruolo="P"
			colore="oliva"
		} else if (f[j].Ruolo==2) {
			ruolo="D"
			colore="verde"
		} else if (f[j].Ruolo==3) {
			ruolo="C"
			colore="rosso"
		} else if (f[j].Ruolo==4) {
			ruolo="A"
			colore="blu"
		}
		// per inserire la riga bianca tra titolari e riserve
		if (inseritariga==0 && f[j].Pos>0) {
			tabe.SetStileRiga(riga,"riga-bianco")
			tabe.SetValore(riga,1,"&nbsp;")
//			tabe.SetStile(riga,1,"Bianco")
			tabe.SetSpan(riga,1,3)
			tabe.SetSpanned(riga,2,true)
			tabe.SetSpanned(riga,3,true)
			inseritariga=1
			riga=1+j+inseritariga
		}
		tabe.SetStileRiga(riga,"riga-bianco")
		// la maglietta solo per titolari e riserve
		if (f[j].Pos>=0) tabe.SetValore(riga,1,"<img src='img/sq/"+f[j].SquadraDiA+".gif'>")
//		tabe.SetStile(riga,1,"Bianco")
		// ruolo e nome
		if (f[j].Pos==0) {
			// titolari
			tabe.SetValore(riga,2,"<div class='testo-"+colore+"-bold-cx'>"+ruolo+"</div>")
			tabe.SetValore(riga,3,"<div class='testo-"+colore+"-bold'>"+f[j].Nome+" ("+f[j].SquadraDiA+")" + (f[j].Rig>0?" [R:"+f[j].Rig+"]":"")+ "</div>")
		} else if (f[j].Pos>0) {
			tabe.SetValore(riga,2,"<div class='testo-"+colore+"-cx'>"+ruolo+"</div>")
			tabe.SetValore(riga,3,"<div class='testo-"+colore+"'>"+f[j].Nome+" ("+f[j].SquadraDiA+")"+ (f[j].Rig>0?" [R:"+f[j].Rig+"]":"")+ "</div>")
		} else {
			tabe.SetValore(riga,2,"&nbsp;")
			tabe.SetValore(riga,3,"<div class='testo-'>"+f[j].Nome+" ("+f[j].SquadraDiA+")"+ (f[j].Rig>0?" [R:"+f[j].Rig+"]":"")+ "</div>")
		}
		tabe.SetStile(riga,2,"riga-"+pd)
		tabe.SetStile(riga,3,"riga-"+pd)
	}
	return tabe
}
