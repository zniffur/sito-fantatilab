// Oggetti JavaScript per Fantasquadre
// Oggetto Fantasquadra
function F(ID,Nome,Presidente,Telef1,Telef2,Telef3,Email,IDDivisione,CreditiResidui) {
	this.ID = ID
	this.Nome = Nome
	this.Presidente = Presidente
	this.Telef1 = Telef1
	this.Telef2 = Telef2
	this.Telef3 = Telef3
	this.Email = Email
	this.IDDivisione = IDDivisione
	this.CreditiResidui = CreditiResidui
}

// Fantasquadra Extra lega
function FE(ID,IDLega,Nome) {
	this.ID = ID
	this.IDLega = IDLega
	this.Nome = Nome
}
// Rosa
function R(IDSquadra,Ruolo,Nome,Squadra,Extracom,Stato,Contratto,Acq,Svinc,GioInf) {
	this.Foto = Nome.split(" ");
	this.IDSquadra = IDSquadra
	this.Ruolo = Ruolo
	this.Nome = Nome
	this.Squadra = Squadra
	this.Extracom = Extracom
	this.Stato = Stato // vale 0 per rosa, 1 per svincolati, 2 per infortunati
	this.Contratto = Contratto // vale -1 per i infortunati, -2 per prestito
	this.Acq = Acq
	this.Svinc = Svinc
	this.GioInf = GioInf
}

// Bilancio
function B(IDSquadra,Descrizione,Valore,Data) {
	this.IDSquadra = IDSquadra
	this.Descrizione = Descrizione
	this.Valore = Valore
	this.Data = Data
}

// Campi Personali
function CP(IDSquadra,Tipo,Nome,Valore,IDDocumento) {
	this.IDSquadra = IDSquadra
	this.Tipo = Tipo
	this.Nome = Nome
	this.Valore = Valore
	this.IDDocumento = IDDocumento
}

function GeneraIntestazioneFantasquadre(cFsq) {
var arrF = new Object()
arrF = arrFantasquadre
document.write("<form name='frmFsq' id='frmFsq' action='rose.php' method='get'>")
document.write("<table width='100%' border='00' cellspacing='0' cellpadding='0'>")
document.write("<tr><td width='5%' class='t-xxsB'><nobr>Fantasquadra: <select name='Fsq' class='t-xxs' id='Fsq'>")
for (i=1;i<arrF.length;i++) {
	document.write("<option value='" + arrF[i].ID + "'")
	if (arrF[i].ID == cFsq) document.write(" selected>" + arrF[i].Nome + "</option>")
}
document.write("</select></nobr></td></tr>")
document.write("<tr><td width='100%' align='center' class='t-xxsB'>  <input name='Invia' type='image' src='img/vai.png' class='t-xxs' id='Invia' value='  Vai  '></td>")
document.write("</tr></table></form>")
}


function GeneraSquadra(IDSquadra) {
var tabS = new Tabella(2,1)
var i,iD,isDivisione=0
	i=1
	while (arrFantasquadre[i].ID != IDSquadra) {
		i++
	}
	if (arrFantasquadre[i].IDDivisione != 0) {
		isDivisione=1
		iD=1
		while (arrDivisioni[iD].ID != arrFantasquadre[i].IDDivisione) {
			iD++
		}
	}


document.write("<div style='margin:6px; float:right; width: 60%; text-align:right;'>")

	tabS.SetStileRiga(1,"t-xxs")
	tabS.SetStile(1,1,"q")
	tabS.SetValore(1,1,"<div style='text-align:left'> Squadra:</div>")
       	tabS.SetStile(2,1,"t-xxsB")
	tabS.SetValore(2,1,"<div style='text-align:center'> "+arrFantasquadre[i].Nome+"</div>")
	if (isDivisione == 1) {
		tabS.SetStileRiga(3,"t-xxs")
		tabS.SetStile(3,1,"q")
		tabS.SetValore(3,1,"Divisione: ")
		tabS.SetStile(4,1,"Cella")
		tabS.SetValore(4,1,"<div style='text-align:center'> "+arrDivisioni[iD].Nome+"</div>")
	}
	///tabS.SetStileRiga(isDivisione+2,"t-xxs")
	///tabS.SetStile(isDivisione+2,1,"IntRossoBluDx")
	///tabS.SetValore(isDivisione+2,1,"Presidente: ")
	///tabS.SetStile(isDivisione+2,2,"Cella")
	///tabS.SetValore(isDivisione+2,2," "+arrFantasquadre[i].Presidente)
	///tabS.SetStileRiga(isDivisione+3,"t-xxs")
	///tabS.SetStile(isDivisione+3,1,"IntRossoBluDx")
	///tabS.SetValore(isDivisione+3,1,"Tel. casa: ")
	///tabS.SetStile(isDivisione+3,2,"Cella")
	///tabS.SetValore(isDivisione+3,2," "+arrFantasquadre[i].Telef1)
	///tabS.SetStileRiga(isDivisione+4,"t-xxs")
	///tabS.SetStile(isDivisione+4,1,"IntRossoBluDx")
	///tabS.SetValore(isDivisione+4,1,"Tel. lavoro: ")
	///tabS.SetStile(isDivisione+4,2,"Cella")
	///tabS.SetValore(isDivisione+4,2," *********")
	///tabS.SetStileRiga(isDivisione+5,"t-xxs")
	///tabS.SetStile(isDivisione+5,1,"IntRossoBluDx")
	///tabS.SetValore(isDivisione+5,1,"Cellulare: ")
	///tabS.SetStile(isDivisione+5,2,"Cella")
	///tabS.SetValore(isDivisione+5,2," "+arrFantasquadre[i].Telef3)
	///tabS.SetStileRiga(isDivisione+6,"t-xxs")
	///tabS.SetStile(isDivisione+6,1,"IntRossoBluDx")
	///tabS.SetValore(isDivisione+6,1,"eMail: ")
	///tabS.SetStile(isDivisione+6,2,"Cella")
	///tabS.SetValore(isDivisione+6,2," <a href='mailto:" + arrFantasquadre[i].Email+"'></a>")
	/// linea originale
	/// tabS.SetValore(isDivisione+6,2," <a href='mailto:" + arrFantasquadre[i].Email+"'>"+arrFantasquadre[i].Email+"</a>")
	///tabS.SetStileRiga(isDivisione+7,"t-xxs")
	///tabS.SetStile(isDivisione+7,1,"IntRossoBluDx")
	///tabS.SetValore(isDivisione+7,1,"Crediti Residui: ")
	///tabS.SetStile(isDivisione+7,2,"Cella")
	///tabS.SetValore(isDivisione+7,2," " + arrFantasquadre[i].CreditiResidui)

	tabS.SetStileRiga(isDivisione+3,"t-xxs")
	tabS.SetStile(isDivisione+3,1,"q")
	tabS.SetValore(isDivisione+3,1,"<div style='text-align:left'> Crediti Residui:</div>")
	tabS.SetStile(isDivisione+4,1,"Cella")
	tabS.SetValore(isDivisione+4,1,"<div style='text-align:center'> " + arrFantasquadre[i].CreditiResidui+"</div>")

	tabS.SetStileRiga(isDivisione+5,"t-xxs")
	tabS.SetStile(isDivisione+5,1,"q")
	tabS.SetValore(isDivisione+5,1,"<div style='text-align:left'> Multe:</div>")
	tabS.SetStile(isDivisione+6,1,"Cella")
	tabS.SetValore(isDivisione+6,1,"<div style='text-align:center'> " + arrCampiPersonali[i].Valore+"</div>")

	
	//tabS.SetStile(isDivisione+7,1,"Cella")
	//tabS.SetValore(isDivisione+7,1," ")

	tabS.SetStileRiga(isDivisione+7,"t-xxs")
	tabS.SetStile(isDivisione+7,1,"q")
	tabS.SetValore(isDivisione+7,1,"<div style='text-align:left'> Maglia Ufficiale:</div>")
	tabS.SetStile(isDivisione+8,1,"Cella")
	tabS.SetValore(isDivisione+8,1," <div style='text-align:center'><img src='../js/img/fsq/" + arrFantasquadre[i].Nome + ".gif'></div>")

	tabS.nome = "Squadra"
	tabS.larghezza=90
	tabS.border=0
	tabS.cellpadding=1
	tabS.cellspacing=0
	tabS.stile="ClassEl"
	tabS.SetLarghezzaColonna(1,20)
	tabS.SetLarghezzaColonna(2,30)
	tabS.Stampa()
document.write("</div>")


}


function GeneraPortieri(IDSquadra) {

//document.write(arrFotoA[1,1].FCod)
//document.write(arrFotoA[1].NomeGioc)

//document.write(arrFotoA[20].FCod)

var tabR = new Tabella(2,2)
var i,cnt,sT,sR,fatto,p,photo
	fatto=false
	tabR.nome="Rosa"
	tabR.larghezza=100
	tabR.border=0
	tabR.cellpadding=0
	tabR.cellspacing=0
	tabR.stile=""
	tabR.SetLarghezzaColonna(1,65)
	tabR.SetLarghezzaColonna(2,35)


tabR.SetStileRiga(1,"q")
	tabR.SetSpan(1,1,2)
	tabR.SetSpanned(1,2,true)
	tabR.SetValore(1,1,"Portieri")

tabR.SetStileRiga(2,"r")
	tabR.SetSpan(2,1,2)
	tabR.SetSpanned(2,2,true)
	tabR.SetValore(2,1,"<div style='float:left; width:65%;'>Nome</div><div style='float:left; width:34.9%;'>Squadra</div>")

	cnt=3
	for(i=1;i<arrRose.length;i++) {
		if ((arrRose[i].IDSquadra==IDSquadra)&&(arrRose[i].Stato==0)) {
			fatto=true			
			if ((cnt % 2) == 0) {
				tabR.SetStileRiga(cnt,"")
				tabR.SetSpan(cnt,1,2)
				tabR.SetSpanned(cnt,2,true)

			} else {
				tabR.SetStileRiga(cnt,"")
				tabR.SetSpan(cnt,1,2)
				tabR.SetSpanned(cnt,2,true)
			}
			
		//	tabR.SetStile(cnt,1,"CellaCentro")
		//	tabR.SetStile(cnt,2,"CellaCentro")
			
			sT="<span class='t-xxs"
			if (arrRose[i].Ruolo==1) {
				
				sR="G"


tabR.SetValore(cnt,1,"<div style='float:left; width:65%;> "+ toProperCase(filterSpecial(filter(arrRose[i].Nome)))+"<div style='float:left; width:34.9%;' class='t-xxs"+sR+"B'> "+ arrRose[i].Squadra+"</div>")
		//	tabR.SetValore(cnt,2,"<span class='t-xxs"+sR+"B'> "+ arrRose[i].Squadra+"</span>")
		//	tabR.SetValore(cnt,3,"<span class='t-xxs"+sR+"'>"+(arrRose[i].Contratto==-2?"Pres":arrRose[i].Contratto)+"</span>")
		//	tabR.SetValore(cnt,4,"<span class='t-xxs"+sR+"B'>"+arrRose[i].Acq+"</span>")
			cnt++
		} else {
			if ((fatto) && (arrRose[i].IDSquadra!=IDSquadra)) i=arrRose.length
			//esce dal ciclo senza proseguire per tutte le altre
		}
	}

}
tabR.Stampa()
}
function GeneraDifensori(IDSquadra) {

//document.write(arrFotoA[1,1].FCod)
//document.write(arrFotoA[1].NomeGioc)

//document.write(arrFotoA[20].FCod)

var tabR = new Tabella(2,2)
var i,cnt,sT,sR,fatto,p,photo
	fatto=false
	tabR.nome="Rosa"
	tabR.larghezza=100
	tabR.border=0
	tabR.cellpadding=0
	tabR.cellspacing=0
	tabR.stile=""
	tabR.SetLarghezzaColonna(1,65)
	tabR.SetLarghezzaColonna(2,35)


tabR.SetStileRiga(1,"q")
	tabR.SetSpan(1,1,2)
	tabR.SetSpanned(1,2,true)
	tabR.SetValore(1,1,"Difensori")

tabR.SetStileRiga(2,"r")
	tabR.SetSpan(2,1,2)
	tabR.SetSpanned(2,2,true)
	tabR.SetValore(2,1,"<div style='float:left; width:65%;'>Nome</div><div style='float:left; width:34.9%;'>Squadra</div>")

	cnt=3
	for(i=1;i<arrRose.length;i++) {
		if ((arrRose[i].IDSquadra==IDSquadra)&&(arrRose[i].Stato==0)) {
			fatto=true			
			if ((cnt % 2) == 0) {
				tabR.SetStileRiga(cnt,"")
				tabR.SetSpan(cnt,1,2)
				tabR.SetSpanned(cnt,2,true)

			} else {
				tabR.SetStileRiga(cnt,"")
				tabR.SetSpan(cnt,1,2)
				tabR.SetSpanned(cnt,2,true)
			}
			
		//	tabR.SetStile(cnt,1,"CellaCentro")
		//	tabR.SetStile(cnt,2,"CellaCentro")
			
			sT="<span class='t-xxs"
			if (arrRose[i].Ruolo==2) {
				
				sR="V"


tabR.SetValore(cnt,1,"<div style='float:left; width:65%;> "+ toProperCase(filterSpecial(filter(arrRose[i].Nome)))+"<div style='float:left; width:34.9%;' class='t-xxs"+sR+"B'> "+ arrRose[i].Squadra+"</div>")
		//	tabR.SetValore(cnt,2,"<span class='t-xxs"+sR+"B'> "+ arrRose[i].Squadra+"</span>")
		//	tabR.SetValore(cnt,3,"<span class='t-xxs"+sR+"'>"+(arrRose[i].Contratto==-2?"Pres":arrRose[i].Contratto)+"</span>")
		//	tabR.SetValore(cnt,4,"<span class='t-xxs"+sR+"B'>"+arrRose[i].Acq+"</span>")
			cnt++
		} else {
			if ((fatto) && (arrRose[i].IDSquadra!=IDSquadra)) i=arrRose.length
			//esce dal ciclo senza proseguire per tutte le altre
		}
	}

}
tabR.Stampa()
}

function GeneraCentrocampisti(IDSquadra) {

//document.write(arrFotoA[1,1].FCod)
//document.write(arrFotoA[1].NomeGioc)

//document.write(arrFotoA[20].FCod)

var tabR = new Tabella(2,2)
var i,cnt,sT,sR,fatto,p,photo
	fatto=false
	tabR.nome="Rosa"
	tabR.larghezza=100
	tabR.border=0
	tabR.cellpadding=0
	tabR.cellspacing=0
	tabR.stile=""
	tabR.SetLarghezzaColonna(1,65)
	tabR.SetLarghezzaColonna(2,35)


tabR.SetStileRiga(1,"q")
	tabR.SetSpan(1,1,2)
	tabR.SetSpanned(1,2,true)
	tabR.SetValore(1,1,"Centrocampisti")

tabR.SetStileRiga(2,"r")
	tabR.SetSpan(2,1,2)
	tabR.SetSpanned(2,2,true)
	tabR.SetValore(2,1,"<div style='float:left; width:65%;'>Nome</div><div style='float:left; width:34.9%;'>Squadra</div>")

	cnt=3
	for(i=1;i<arrRose.length;i++) {
		if ((arrRose[i].IDSquadra==IDSquadra)&&(arrRose[i].Stato==0)) {
			fatto=true			
			if ((cnt % 2) == 0) {
				tabR.SetStileRiga(cnt,"")
				tabR.SetSpan(cnt,1,2)
				tabR.SetSpanned(cnt,2,true)

			} else {
				tabR.SetStileRiga(cnt,"")
				tabR.SetSpan(cnt,1,2)
				tabR.SetSpanned(cnt,2,true)
			}
			
		//	tabR.SetStile(cnt,1,"CellaCentro")
		//	tabR.SetStile(cnt,2,"CellaCentro")
			
			sT="<span class='t-xxs"
			if (arrRose[i].Ruolo==3) {
				
				sR="R"


tabR.SetValore(cnt,1,"<div style='float:left; width:65%;> "+ toProperCase(filterSpecial(filter(arrRose[i].Nome)))+"<div style='float:left; width:34.9%;' class='t-xxs"+sR+"B'> "+ arrRose[i].Squadra+"</div>")
		//	tabR.SetValore(cnt,2,"<span class='t-xxs"+sR+"B'> "+ arrRose[i].Squadra+"</span>")
		//	tabR.SetValore(cnt,3,"<span class='t-xxs"+sR+"'>"+(arrRose[i].Contratto==-2?"Pres":arrRose[i].Contratto)+"</span>")
		//	tabR.SetValore(cnt,4,"<span class='t-xxs"+sR+"B'>"+arrRose[i].Acq+"</span>")
			cnt++
		} else {
			if ((fatto) && (arrRose[i].IDSquadra!=IDSquadra)) i=arrRose.length
			//esce dal ciclo senza proseguire per tutte le altre
		}
	}

}
tabR.Stampa()
}

function GeneraAttaccanti(IDSquadra) {

//document.write(arrFotoA[1,1].FCod)
//document.write(arrFotoA[1].NomeGioc)

//document.write(arrFotoA[20].FCod)

var tabR = new Tabella(2,2)
var i,cnt,sT,sR,fatto,p,photo
	fatto=false
	tabR.nome="Rosa"
	tabR.larghezza=100
	tabR.border=0
	tabR.cellpadding=0
	tabR.cellspacing=0
	tabR.stile=""
	tabR.SetLarghezzaColonna(1,65)
	tabR.SetLarghezzaColonna(2,35)


tabR.SetStileRiga(1,"q")
	tabR.SetSpan(1,1,2)
	tabR.SetSpanned(1,2,true)
	tabR.SetValore(1,1,"Attaccanti")

tabR.SetStileRiga(2,"r")
	tabR.SetSpan(2,1,2)
	tabR.SetSpanned(2,2,true)
	tabR.SetValore(2,1,"<div style='float:left; width:65%;'>Nome</div><div style='float:left; width:34.9%;'>Squadra</div>")

	cnt=3
	for(i=1;i<arrRose.length;i++) {
		if ((arrRose[i].IDSquadra==IDSquadra)&&(arrRose[i].Stato==0)) {
			fatto=true			
			if ((cnt % 2) == 0) {
				tabR.SetStileRiga(cnt,"")
				tabR.SetSpan(cnt,1,2)
				tabR.SetSpanned(cnt,2,true)

			} else {
				tabR.SetStileRiga(cnt,"")
				tabR.SetSpan(cnt,1,2)
				tabR.SetSpanned(cnt,2,true)
			}
			
		//	tabR.SetStile(cnt,1,"CellaCentro")
		//	tabR.SetStile(cnt,2,"CellaCentro")
			
			sT="<span class='t-xxs"
			if (arrRose[i].Ruolo==4) {
				
				sR="Blu"


tabR.SetValore(cnt,1,"<div style='float:left; width:65%;> "+ toProperCase(filterSpecial(filter(arrRose[i].Nome)))+"<div style='float:left; width:34.9%;' class='t-xxs"+sR+"B'> "+ arrRose[i].Squadra+"</div>")
		//	tabR.SetValore(cnt,2,"<span class='t-xxs"+sR+"B'> "+ arrRose[i].Squadra+"</span>")
		//	tabR.SetValore(cnt,3,"<span class='t-xxs"+sR+"'>"+(arrRose[i].Contratto==-2?"Pres":arrRose[i].Contratto)+"</span>")
		//	tabR.SetValore(cnt,4,"<span class='t-xxs"+sR+"B'>"+arrRose[i].Acq+"</span>")
			cnt++
		} else {
			if ((fatto) && (arrRose[i].IDSquadra!=IDSquadra)) i=arrRose.length
			//esce dal ciclo senza proseguire per tutte le altre
		}
	}

}
tabR.Stampa()
}

function GeneraVendutiInfortunati(IDSquadra) {
var tabV = new Tabella(2,5)
var tabI = new Tabella(2,6)
var i,cnt,sT,sR,fatto
	fatto=false
	tabV.Nome="Svincolati"
	tabV.larghezza=95
	tabV.border=0
	tabV.cellpadding=0
	tabV.cellspacing=0
	tabV.stile="ClassEl"
	tabV.SetLarghezzaColonna(1,10)
	tabV.SetLarghezzaColonna(2,60)
	tabV.SetLarghezzaColonna(3,20)
	tabV.SetLarghezzaColonna(4,4)
	tabV.SetLarghezzaColonna(5,6)
	tabV.SetStileRiga(1,"q")
	tabV.SetSpan(1,1,5)
	tabV.SetSpanned(1,2,true)
	tabV.SetSpanned(1,3,true)
	tabV.SetSpanned(1,4,true)
	tabV.SetSpanned(1,5,true)
	tabV.SetValore(1,1,"Svincolati")
	tabV.SetStileRiga(2,"riga-azzurro")
	tabV.SetStile(2,1,"Cella")
	tabV.SetStile(2,2,"Cella")
	tabV.SetStile(2,3,"Cella")
	tabV.SetStile(2,4,"Cella")
	tabV.SetStile(2,5,"Cella")
	tabV.SetValore(2,1,"Ruolo")
	tabV.SetValore(2,2,"Nome")
	tabV.SetValore(2,3,"Squadra")
	tabV.SetValore(2,4,"Con")
	tabV.SetValore(2,5,"$Acq")
	cnt=3
	for(i=1;i<arrRose.length;i++) {
		if ((arrRose[i].IDSquadra==IDSquadra)&&(arrRose[i].Stato==1)) {
			fatto=true
			if ((cnt % 2) == 0) {
				tabV.SetStileRiga(cnt,"riga-dispari2")
			} else {
				tabV.SetStileRiga(cnt,"riga-pari")
			}
			tabV.SetStile(cnt,1,"Cella")
			tabV.SetStile(cnt,2,"Cella")
			tabV.SetStile(cnt,3,"Cella")
			tabV.SetStile(cnt,4,"CellaCentro")
			tabV.SetStile(cnt,5,"CellaCentro")
			sT="<span class='t-xxs"
			if (arrRose[i].Ruolo==1) {
				sR="G"
				sT+="G'>Portiere </span>"
			} else if (arrRose[i].Ruolo==2) {
				sR="V"
				sT+="V'>Difensore </span>"
			} else if (arrRose[i].Ruolo==3) {
				sR="R"
				sT+="R'>Centrocampista </span>"
			} else if (arrRose[i].Ruolo==4) {
				sR="Blu"
				sT+="Blu'>Attaccante </span>"
			} 
			tabV.SetValore(cnt,1,sT)
			tabV.SetValore(cnt,2,"<span class='t-xxs"+sR+"B'> "+arrRose[i].Nome+"</span>")
			tabV.SetValore(cnt,3,"<span class='t-xxs"+sR+"'> "+arrRose[i].Squadra+"</span>")
			tabV.SetValore(cnt,4,"<span class='t-xxs"+sR+"'>"+(arrRose[i].Contratto==-1?"Inf":(arrRose[i].Contratto==-2?"Pres":arrRose[i].Contratto))+"</span>")
			tabV.SetValore(cnt,5,"<span class='t-xxs"+sR+"B'>"+arrRose[i].Acq+"</span>")
			cnt++
		} else {
			if ((fatto) && (arrRose[i].IDSquadra!=IDSquadra)) i=arrRose.length
			//esce dal ciclo senza proseguire per tutte le altre
		}
	}
  	tabV.Stampa()
	
}

function GeneraBilancio(IDSquadra) {
var tabB = new Tabella(2,4)
var i,cnt,sT,sR,fatto
	fatto=false
	tabB.nome="Bilancio"
	tabB.larghezza=95
	tabB.border=0
	tabB.cellpadding=0
	tabB.cellspacing=0
	tabB.stile="ClassEl"
	tabB.SetLarghezzaColonna(1,60)
	tabB.SetLarghezzaColonna(2,10)
	tabB.SetLarghezzaColonna(3,10)
	tabB.SetLarghezzaColonna(4,20)
	tabB.SetStileRiga(1,"q")
	tabB.SetStile(1,1,"Cella")
	tabB.SetStile(1,2,"CellaCentro")
	tabB.SetStile(1,3,"CellaCentro")
	tabB.SetStile(1,4,"Cella")
	tabB.SetValore(1,1,"Descrizione")
	tabB.SetValore(1,2,"Entrata")
	tabB.SetValore(1,3,"Uscita")
	tabB.SetValore(1,4,"Data")
	cnt=2
	for(i=1;i<arrBilanci.length;i++) {
		if (arrBilanci[i].IDSquadra==IDSquadra) {
			fatto=true
			if ((cnt % 2) == 0) {
				tabB.SetStileRiga(cnt,"riga-dispari2")
			} else {
				tabB.SetStileRiga(cnt,"riga-pari")
			}
			
			tabB.SetValore(cnt,1,"<span class='t-xxsV'>"+arrBilanci[i].Descrizione+"</span>")
			tabB.SetValore(cnt,2,arrBilanci[i].Valore>=0?"<span class='t-xxsA'>"+arrBilanci[i].Valore+"</span>":"")
			tabB.SetValore(cnt,3,arrBilanci[i].Valore<0?"<span class='t-xxsRB'>"+(-arrBilanci[i].Valore)+"</span>":"")
			tabB.SetValore(cnt,4,arrBilanci[i].Data)
			cnt++
		} else {
			if ((fatto) && (arrBilanci[i].IDSquadra!=IDSquadra)) i=arrBilanci.length
			//esce dal ciclo senza proseguire per tutte le altre
		}
	}
	i=1
	while (arrFantasquadre[i].ID != IDSquadra) {
		i++
	}
	tabB.SetStileRiga(cnt,"q")
	tabB.SetStile(cnt,1,"Cella")
tabB.SetStile(cnt,2,"Cella")
tabB.SetStile(cnt,3,"Cella")
tabB.SetStile(cnt,4,"Cella")
	tabB.SetValore(cnt,1,"Crediti Residui: " + arrFantasquadre[i].CreditiResidui)
    tabB.Stampa()
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