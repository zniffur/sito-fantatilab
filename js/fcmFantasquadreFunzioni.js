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
document.write("<form name='frmFsq' id='frmFsq' action='rose.htm' method='get'>")
document.write("<table width='100%' border='00' cellspacing='0' cellpadding='0'>")
document.write("<tr><td width='5%' class='testo-10'><nobr>&nbsp;&nbsp;Fantasquadra:&nbsp;<select name='Fsq' class='testo-10' id='Fsq'>")
for (i=1;i<arrF.length;i++) {
	document.write("<option value='" + arrF[i].ID + "'")
	if (arrF[i].ID == cFsq) document.write(" selected")
	document.write(">" + arrF[i].Nome + "</option>")
}
document.write("</select></nobr></td>")
document.write("<td width='95%' class='testo-10'>&nbsp;&nbsp;<input name='Invia' type='submit' class='testo-10' id='Invia' value='  Vai  '></td>")
document.write("</tr></table></form>")
}

function GeneraSquadra(IDSquadra) {
var tabS = new Tabella(2,2)
var i,iD,isDivisione=0,cnt,j,k
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
	tabS.SetStileRiga(1,"riga-blu")
	tabS.SetStile(1,1,"testo-dx")
	tabS.SetValore(1,1,"Squadra:&nbsp;")
//	tabS.SetStile(1,2,"riga-blu")
	tabS.SetValore(1,2,"&nbsp;"+arrFantasquadre[i].Nome)
	if (isDivisione == 1) {
		tabS.SetStileRiga(2,"riga-blu")
		tabS.SetStile(2,1,"testo-dx")
		tabS.SetValore(2,1,"Divisione:&nbsp;")
//		tabS.SetStile(2,2,"Cella")
		tabS.SetValore(2,2,"&nbsp;"+arrDivisioni[iD].Nome)
	}
	tabS.SetStileRiga(isDivisione+2,"riga-dispari")
	tabS.SetStile(isDivisione+2,1,"testo-bold-dx")
	tabS.SetValore(isDivisione+2,1,"Presidente:&nbsp;")
//	tabS.SetStile(isDivisione+2,2,"Cella")
	tabS.SetValore(isDivisione+2,2,"&nbsp;"+arrFantasquadre[i].Presidente)
	tabS.SetStileRiga(isDivisione+3,"riga-pari")
	tabS.SetStile(isDivisione+3,1,"testo-bold-dx")
	tabS.SetValore(isDivisione+3,1,"Tel. casa:&nbsp;")
//	tabS.SetStile(isDivisione+3,2,"Cella")
	tabS.SetValore(isDivisione+3,2,"&nbsp;"+arrFantasquadre[i].Telef1)
	tabS.SetStileRiga(isDivisione+4,"riga-dispari")
	tabS.SetStile(isDivisione+4,1,"testo-bold-dx")
	tabS.SetValore(isDivisione+4,1,"Tel. lavoro:&nbsp;")
//	tabS.SetStile(isDivisione+4,2,"Cella")
	tabS.SetValore(isDivisione+4,2,"&nbsp;"+arrFantasquadre[i].Telef2)
	tabS.SetStileRiga(isDivisione+5,"riga-pari")
	tabS.SetStile(isDivisione+5,1,"testo-bold-dx")
	tabS.SetValore(isDivisione+5,1,"Cellulare:&nbsp;")
//	tabS.SetStile(isDivisione+5,2,"Cella")
	tabS.SetValore(isDivisione+5,2,"&nbsp;"+arrFantasquadre[i].Telef3)
	tabS.SetStileRiga(isDivisione+6,"riga-dispari")
	tabS.SetStile(isDivisione+6,1,"testo-bold-dx")
	tabS.SetValore(isDivisione+6,1,"eMail:&nbsp;")
//	tabS.SetStile(isDivisione+6,2,"Cella")
	tabS.SetValore(isDivisione+6,2,"&nbsp;<a href='mailto:" + arrFantasquadre[i].Email+"'>"+arrFantasquadre[i].Email+"</a>")
	tabS.SetStileRiga(isDivisione+7,"riga-pari")
	tabS.SetStile(isDivisione+7,1,"testo-bold-dx")
	tabS.SetValore(isDivisione+7,1,"Crediti Residui:&nbsp;")
//	tabS.SetStile(isDivisione+7,2,"Cella")
	tabS.SetValore(isDivisione+7,2,"&nbsp;" + arrFantasquadre[i].CreditiResidui)
	cnt=0
	for (j=1;j<arrCampiPersonali.length;j++) {
		if (arrCampiPersonali[j].IDSquadra == arrFantasquadre[i].ID) {
			cnt++
			tabS.SetStileRiga(isDivisione+7+cnt,"riga-orange")
			tabS.SetStile(isDivisione+7+cnt,1,"testo-dx")
			tabS.SetValore(isDivisione+7+cnt,1,arrCampiPersonali[j].Nome + ":&nbsp;")
//			tabS.SetStile(isDivisione+7+cnt,2,"Cella")
			if (arrCampiPersonali[j].Tipo==0) {
				tabS.SetValore(isDivisione+7+cnt,2,"&nbsp;" + arrCampiPersonali[j].Valore)
			} else {
				k=1
				while ((k<arrDocumenti.length) && (arrDocumenti[k].ID != arrCampiPersonali[j].IDDocumento)) {
					k++
				}
				if (arrDocumenti[k].ID == arrCampiPersonali[j].IDDocumento) {
					tabS.SetValore(isDivisione+7+cnt,2,"&nbsp;<a href='doc/" + arrDocumenti[k].Nomefile + "'>" + arrDocumenti[k].Descrizione + "</a>")
				} else {
					tabS.SetValore(isDivisione+7+cnt,2,"&nbsp; Documento non trovato")
				}
			}
		}
	}
	tabS.nome = "Squadra"
	tabS.larghezza=50
	tabS.border=1
	tabS.cellpadding=3
	tabS.cellspacing=0
	tabS.stile="tab-8"
	tabS.SetLarghezzaColonna(1,30)
	tabS.SetLarghezzaColonna(2,70)
	tabS.Stampa()
}

function GeneraRosa(IDSquadra) {
var tabR = new Tabella(2,5)
var i,cnt,sT,sR,fatto
	fatto=false
	tabR.nome="Rosa"
	tabR.larghezza=95
	tabR.border=1
	tabR.cellpadding=3
	tabR.cellspacing=0
	tabR.stile="tab-8"
	tabR.SetLarghezzaColonna(1,10)
	tabR.SetLarghezzaColonna(2,60)
	tabR.SetLarghezzaColonna(3,20)
	tabR.SetLarghezzaColonna(4,4)
	tabR.SetLarghezzaColonna(5,6)
	tabR.SetStileRiga(1,"riga-blu")
/*
	tabR.SetStile(1,1,"Cella")
	tabR.SetStile(1,2,"Cella")
	tabR.SetStile(1,3,"Cella")
*/
	tabR.SetStile(1,4,"testo-cx")
	tabR.SetStile(1,5,"testo-cx")
	tabR.SetValore(1,1,"Ruolo")
	tabR.SetValore(1,2,"Nome")
	tabR.SetValore(1,3,"Squadra")
	tabR.SetValore(1,4,"Con")
	tabR.SetValore(1,5,"$Acq")
	cnt=2
	for(i=1;i<arrRose.length;i++) {
		if ((arrRose[i].IDSquadra==IDSquadra)&&(arrRose[i].Stato==0)) {
			fatto=true			
			if ((cnt % 2) == 0) {
				tabR.SetStileRiga(cnt,"riga-dispari")
			} else {
				tabR.SetStileRiga(cnt,"riga-pari")
			}
/*
			tabR.SetStile(cnt,1,"Cella")
			tabR.SetStile(cnt,2,"Cella")
			tabR.SetStile(cnt,3,"Cella")
*/
			tabR.SetStile(cnt,4,"testo-cx")
			tabR.SetStile(cnt,5,"testo-cx")
			sT="<span class='testo-"
			if (arrRose[i].Ruolo==1) {
				sR="oliva"
				sT+="oliva'>Portiere</span>"
			} else if (arrRose[i].Ruolo==2) {
				sR="verde"
				sT+="verde'>Difensore</span>"
			} else if (arrRose[i].Ruolo==3) {
				sR="rosso"
				sT+="rosso'>Centrocampista</span>"
			} else if (arrRose[i].Ruolo==4) {
				sR="blu"
				sT+="blu'>Attaccante</span>"
			} 
			tabR.SetValore(cnt,1,sT)
			tabR.SetValore(cnt,2,"<span class='testo-"+sR+"-bold'>"+arrRose[i].Nome+"</span>")
			tabR.SetValore(cnt,3,"<span class='testo-"+sR+"'>"+arrRose[i].Squadra+"</span>")
			tabR.SetValore(cnt,4,"<span class='testo-"+sR+"'>"+(arrRose[i].Contratto==-2?"Pres":arrRose[i].Contratto)+"</span>")
			tabR.SetValore(cnt,5,"<span class='testo-"+sR+"-bold'>"+arrRose[i].Acq+"</span>")
			cnt++
		} else {
			if ((fatto) && (arrRose[i].IDSquadra!=IDSquadra)) i=arrRose.length
			//esce dal ciclo senza proseguire per tutte le altre
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
	tabV.border=1
	tabV.cellpadding=3
	tabV.cellspacing=0
	tabV.stile="tab-8"
	tabV.SetLarghezzaColonna(1,10)
	tabV.SetLarghezzaColonna(2,60)
	tabV.SetLarghezzaColonna(3,20)
	tabV.SetLarghezzaColonna(4,4)
	tabV.SetLarghezzaColonna(5,6)
	tabV.SetStileRiga(1,"riga-blu")
	tabV.SetSpan(1,1,5)
	tabV.SetSpanned(1,2,true)
	tabV.SetSpanned(1,3,true)
	tabV.SetSpanned(1,4,true)
	tabV.SetSpanned(1,5,true)
	tabV.SetValore(1,1,"Svincolati")
	tabV.SetStileRiga(2,"riga-blu")
/*
	tabV.SetStile(2,1,"Cella")
	tabV.SetStile(2,2,"Cella")
	tabV.SetStile(2,3,"Cella")
*/
	tabV.SetStile(2,4,"testo-cx")
	tabV.SetStile(2,5,"testo-cx")
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
				tabV.SetStileRiga(cnt,"riga-dispari")
			} else {
				tabV.SetStileRiga(cnt,"riga-pari")
			}
/*
			tabV.SetStile(cnt,1,"Cella")
			tabV.SetStile(cnt,2,"Cella")
			tabV.SetStile(cnt,3,"Cella")
*/
			tabV.SetStile(cnt,4,"testo-cx")
			tabV.SetStile(cnt,5,"testo-cx")
			sT="<span class='testo-"
			if (arrRose[i].Ruolo==1) {
				sR="oliva"
				sT+="oliva'>Portiere</span>"
			} else if (arrRose[i].Ruolo==2) {
				sR="verde"
				sT+="verde'>Difensore</span>"
			} else if (arrRose[i].Ruolo==3) {
				sR="rosso"
				sT+="rosso'>Centrocampista</span>"
			} else if (arrRose[i].Ruolo==4) {
				sR="blu"
				sT+="blu'>Attaccante</span>"
			} 
			tabV.SetValore(cnt,1,sT)
			tabV.SetValore(cnt,2,"<span class='testo-"+sR+"-bold'>"+arrRose[i].Nome+"</span>")
			tabV.SetValore(cnt,3,"<span class='testo-"+sR+"'>"+arrRose[i].Squadra+"</span>")
			tabV.SetValore(cnt,4,"<span class='testo-"+sR+"'>"+(arrRose[i].Contratto==-1?"Inf":(arrRose[i].Contratto==-2?"Pres":arrRose[i].Contratto))+"</span>")
			tabV.SetValore(cnt,5,"<span class='testo-"+sR+"-bold'>"+arrRose[i].Acq+"</span>")
			cnt++
		} else {
			if ((fatto) && (arrRose[i].IDSquadra!=IDSquadra)) i=arrRose.length
			//esce dal ciclo senza proseguire per tutte le altre
		}
	}
  	tabV.Stampa()
	document.write("<br>")
	tabI.Nome="Infortunati"
	tabI.larghezza=95
	tabI.border=1
	tabI.cellpadding=3
	tabI.cellspacing=0
	tabI.stile="tab-8"
	tabI.SetLarghezzaColonna(1,10)
	tabI.SetLarghezzaColonna(2,52)
	tabI.SetLarghezzaColonna(3,20)
	tabI.SetLarghezzaColonna(4,4)
	tabI.SetLarghezzaColonna(5,6)
	tabI.SetLarghezzaColonna(6,8)
	tabI.SetStileRiga(1,"riga-blu")
	tabI.SetSpan(1,1,6)
	tabI.SetSpanned(1,2,true)
	tabI.SetSpanned(1,3,true)
	tabI.SetSpanned(1,4,true)
	tabI.SetSpanned(1,5,true)
	tabI.SetSpanned(1,6,true)
	tabI.SetValore(1,1,"Infortunati")
	tabI.SetStileRiga(2,"riga-blu")
/*
	tabI.SetStile(2,1,"Cella")
	tabI.SetStile(2,2,"Cella")
	tabI.SetStile(2,3,"Cella")
*/
	tabI.SetStile(2,4,"testo-cx")
	tabI.SetStile(2,5,"testo-cx")
	tabI.SetStile(2,6,"testo-cx")
	tabI.SetValore(2,1,"Ruolo")
	tabI.SetValore(2,2,"Nome")
	tabI.SetValore(2,3,"Squadra")
	tabI.SetValore(2,4,"Con")
	tabI.SetValore(2,5,"$Acq")
	tabI.SetValore(2,6,"Gio")
	cnt=3
	fatto=false
	for(i=1;i<arrRose.length;i++) {
		if ((arrRose[i].IDSquadra==IDSquadra)&&(arrRose[i].Stato==2)) {
			fatto=true
			if ((cnt % 2) == 0) {
				tabI.SetStileRiga(cnt,"riga-dispari")
			} else {
				tabI.SetStileRiga(cnt,"riga-pari")
			}
/*
			tabI.SetStile(cnt,1,"Cella")
			tabI.SetStile(cnt,2,"Cella")
			tabI.SetStile(cnt,3,"Cella")
*/
			tabI.SetStile(cnt,4,"testo-cx")
			tabI.SetStile(cnt,5,"testo-cx")
			tabI.SetStile(cnt,6,"testo-cx")
			sT="<span class='testo-"
			if (arrRose[i].Ruolo==1) {
				sR="oliva"
				sT+="oliva'>Portiere</span>"
			} else if (arrRose[i].Ruolo==2) {
				sR="verde"
				sT+="verde'>Difensore</span>"
			} else if (arrRose[i].Ruolo==3) {
				sR="rosso"
				sT+="rosso'>Centrocampista</span>"
			} else if (arrRose[i].Ruolo==4) {
				sR="blu"
				sT+="blu'>Attaccante</span>"
			} 
			tabI.SetValore(cnt,1,sT)
			tabI.SetValore(cnt,2,"<span class='testo-"+sR+"-bold'>"+arrRose[i].Nome+"</span>")
			tabI.SetValore(cnt,3,"<span class='testo-"+sR+"'>"+arrRose[i].Squadra+"</span>")
			tabI.SetValore(cnt,4,"<span class='testo-"+sR+"'>"+(arrRose[i].Contratto==-1?"Inf":(arrRose[i].Contratto==-2?"Pres":arrRose[i].Contratto))+"</span>")
			tabI.SetValore(cnt,5,"<span class='testo-"+sR+"-bold'>"+arrRose[i].Acq+"</span>")
			tabI.SetValore(cnt,6,"<span class='testo-"+sR+"'>"+arrRose[i].GioInf+"</span>")
			cnt++
		} else {
			if ((fatto) && (arrRose[i].IDSquadra!=IDSquadra)) i=arrRose.length
			//esce dal ciclo senza proseguire per tutte le altre
		}
	}
	tabI.Stampa()

}

function GeneraBilancio(IDSquadra) {
var tabB = new Tabella(2,4)
var i,cnt,sT,sR,fatto
	fatto=false
	tabB.nome="Bilancio"
	tabB.larghezza=95
	tabB.border=1
	tabB.cellpadding=3
	tabB.cellspacing=0
	tabB.stile="tab-8"
	tabB.SetLarghezzaColonna(1,60)
	tabB.SetLarghezzaColonna(2,10)
	tabB.SetLarghezzaColonna(3,10)
	tabB.SetLarghezzaColonna(4,20)
	tabB.SetStileRiga(1,"riga-blu")
//	tabB.SetStile(1,1,"Cella")
	tabB.SetStile(1,2,"testo-cx")
	tabB.SetStile(1,3,"testo-cx")
	tabB.SetStile(1,4,"testo-cx")
	tabB.SetValore(1,1,"Descrizione")
	tabB.SetValore(1,2,"Entrata")
	tabB.SetValore(1,3,"Uscita")
	tabB.SetValore(1,4,"Data")
	cnt=2
	for(i=1;i<arrBilanci.length;i++) {
		if (arrBilanci[i].IDSquadra==IDSquadra) {
			fatto=true
			if ((cnt % 2) == 0) {
				tabB.SetStileRiga(cnt,"riga-dispari")
			} else {
				tabB.SetStileRiga(cnt,"riga-pari")
			}
//			tabB.SetStile(cnt,1,"Cella")
			tabB.SetStile(cnt,2,"testo-cx")
			tabB.SetStile(cnt,3,"testo-cx")
			tabB.SetStile(cnt,4,"testo-cx")
			tabB.SetValore(cnt,1,arrBilanci[i].Descrizione)
			tabB.SetValore(cnt,2,arrBilanci[i].Valore>=0?"<span class='testo-verde-bold'>"+arrBilanci[i].Valore+"</span>":"")
			tabB.SetValore(cnt,3,arrBilanci[i].Valore<0?"<span class='testo-rosso-bold'>"+(-arrBilanci[i].Valore)+"</span>":"")
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
	tabB.SetStileRiga(cnt,"riga-blu-dx")
	tabB.SetValore(cnt,1,"Crediti Residui: " + arrFantasquadre[i].CreditiResidui)
    tabB.Stampa()
}
