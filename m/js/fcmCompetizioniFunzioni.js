// Oggetti JavaScript per Competizioni e Divisioni

/**********************************
*********** COSTRUTTORI ***********
***********************************/
// Costruttore dell'oggetto Competizione
function Competizione(ID,Nome,GironeUnico,IDGironeSeUnico,Predefinita) {
	this.ID = ID
	this.Nome = Nome
	this.GironeUnico = GironeUnico
	this.IDGironeSeUnico = IDGironeSeUnico
	this.Predefinita = Predefinita
}

// Costruttore dell'oggetto Divisione
function Divisione(ID,Nome) {
	this.ID = ID
	this.Nome = Nome
}

// Costruttore dell'oggetto DivComp
function DivComp(IDComp, IDDiv) {
	this.IDComp = IDComp
	this.IDDiv = IDDiv
}

// Costruttore dell'oggetto Girone
function Girone(ID, IDComp, IDGruppo, Nome) {
	this.ID = ID
	this.IDComp = IDComp
	this.IDGruppo = IDGruppo
	this.Nome = Nome
}

// Costruttore dell'oggetto Gruppo 
function Gruppo(ID, Nome) {
	this.ID = ID
	this.Nome = Nome 
}

/***********************************
************** METODI **************
************************************/
function GeneraIntestazioneCompetizioni(cComp,cDiv) {
// Questo codice genera l'intestazione per la scelta delle competizioni
// e divisioni.
var arrC = new Object()
var arrD = new Object()
var i
//arrC = RiempiCompetizioni(arrC)
arrC = arrCompetizioni
//arrD = RiempiDivisioni(arrD)
arrD = arrDivisioni
document.write("<form name='frmCompet' id='frmCompet' action='cale.php' method='get'>")
document.write("<table width='100%' border='00' cellspacing='0' cellpadding='0'>")
document.write("<tr><td width='5%' class='testo-10'>Divisione:<select name='Div' class='testo-10' id='Div'>")
document.write("<option value='0'>- Tutte -</option>")
for (i=1;i<arrD.length;i++) {
	document.write("<option value='" + arrD[i].ID + "'")
	if (arrD[i].ID == cDiv) document.write(" selected")
	document.write(">" + arrD[i].Nome + "</option>")
}
document.write("</select></td></tr>")
document.write("<tr><td width='5%' class='testo-10'>Competizione:<select name='Comp' class='testo-10' id='Comp'>")
for (i=1;i<arrC.length;i++) {
	document.write("<option value='" + arrC[i].ID + "'")
	if (arrC[i].ID == cComp ) document.write(" selected")
			document.write(">" + arrC[i].Nome + "</option>")
}
document.write("<option value='0'>- Tutte -")
if (0 == cComp ){ 
document.write("<selected></option>")
}
document.write("</select></td></tr>")
document.write("<tr><td width='100%' align='center' class='testo-10-bold'><input name='Invia' type='image' src='img/vai.png' class='testo-10' id='Invia' value='  Vai  '></td>")
document.write("</tr></table></form><br>")
}

function GeneraIntestazioneCompetizioniPerClassifica(cComp,cGir) {
// Questo codice genera l'intestazione per la scelta delle competizioni
// e divisioni. Quando si seleziona uno dei valori e si sceglie Vai, vengono
// settati due cookie per passare i valori alla pagina.
var arrC = new Object()
var arrG = new Object()
var i, s2,j
var s1 = "", Almeno1C = false, Almeno1G = false
var IDComp
//arrC = RiempiCompetizioni(arrC)
arrC = arrCompetizioni
//arrG = RiempiGironi(arrG)
arrG = arrGironi
document.write("<table width='100%' border='00' cellspacing='0' cellpadding='0'><tr>")
document.write("<form name='frmCompet' id='frmCompet' action='class.php' method='get'>")
s1 = "<td width='5%' class='testo-10'><nobr>  Competizione: <select name='Comp' class='testo-10' id='Comp' onChange='SelezionaGirone()'>"
for (i=1;i<arrC.length;i++) {
	if (arrC[i].GironeUnico) {
		s1 += "<option value='" + arrC[i].ID + "'"
		if (arrC[i].ID == cComp) s1 += " selected"
		s1 += ">" + arrC[i].Nome + "</option>"
		Almeno1C = true
	}
}
s1 += "</select></nobr></td>"
if (Almeno1C) document.write(s1)
s1 = "<td width='5%' class='testo-10'><nobr>&nbsp;&nbsp;Girone:&nbsp;<select name='Gir' class='testo-10' id='Gir'>"
//s1 += "<option value='0'>Tutti Competizione</option>"
for (i=1;i<arrG.length;i++) {
	s1 += "<option value='" + arrG[i].ID + "'"
	if (arrG[i].ID == cGir) s1 += " selected"
	IDComp = parseInt(arrG[i].IDComp)
	j=1
	while (parseInt(arrC[j].ID) != IDComp) {
		j++
	}
	s2 = arrC[j].Nome
	if (arrG[i].Nome == "") {
		s2 += " "
	} else {
		s2 +=": "+arrG[i].Nome
	}
	s1 += ">" + s2 + "</option>"
	Almeno1G = true
}
s1 += "</select></nobr></td>"
if (Almeno1G) document.write(s1)
document.write("</tr><tr><td width='100%' align='center'class='testo-10'><input name='Invia' type='image' src='img/vai.png' class='testo-10' id='Invia' value='  Vai  '></td>")
document.write("</tr></table></form><br>")
}

function GeneraIntestazioneGiornateIncontri(cGio,cComp,fname) {
// Questo codice genera l'intestazione per la scelta delle giornate
// e degli competizioni
// Utilizza MaxA definito nel SerieADati
var arrC = new Object()
var i
arrC = arrCompetizioni
if (cGio=="" || parseInt(cGio)==0) cGio=1
if (cComp=="") cComp=0

document.write("<form name='frmIncontri' id='frmIncontri' action='"+fname+".php' method='get'>")
document.write("<table width='100%' border='00' cellspacing='0' cellpadding='0'>")
document.write("<tr><td class='testo-10'><nobr>Giornata:<select name='Gio' class='testo-10' id='Gio'>")
for (i=1;i<=MaxA;i++) {
	document.write("<option value='" + i + "'")
	if (i == cGio) document.write(" selected")
	document.write(">" + i + "</option>")
}
document.write("</select></nobr></td></tr>")
document.write("<tr><td class='testo-10'><nobr>Competizione:<select name='Comp' class='testo-10' id='Comp'>")
document.write("<option value='0'" + (cComp==0?" selected":"") +">- Tutte -</option>")
for (i=1;i<arrC.length;i++) {
	document.write("<option value='" + arrC[i].ID + "'")
	if (arrC[i].ID == cComp) document.write(" selected")
	document.write(">" + arrC[i].Nome + "</option>")
}
document.write("</select></nobr></td></tr>")
document.write("<tr><td width='100%' align='center' class='testo-10'><input name='Invia'type='image' src='img/vai.png' class='testo-10' id='Invia' value='  Vai  '></td>")
document.write("</tr></table></form>")
}

function SelezionaGirone() {
	// se la competizione selezionata è a Girone Unico allora
	// seleziona l'opportuno girone a destra
var id = parseInt(frmCompet.Comp.options[frmCompet.Comp.selectedIndex].value)
var idGirone
//var arrC = RiempiCompetizioni(arrC)
var arrC = arrCompetizioni
var i=1	
	while (parseInt(arrC[i].ID) != id) {
		i++
	}
	if (arrC[i].GironeUnico) {
		// seleziona a sinistra
		idGirone = arrC[i].IDGironeSeUnico
		i=0
		while (parseInt(frmCompet.Gir.options[i].value) != idGirone) {
			i++
			}
		frmCompet.Gir.options[i].selected = true
	}
}