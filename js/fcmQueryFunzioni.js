
function Query(ID, Nome) {
	this.ID = ID
	this.Nome = Nome
}

function RisQuery(ListaValori) {
	this.ListaValori = ListaValori
	/* Lista dei risultati della query separati da % */
}
	
function GeneraIntestazioneQuery(cQ) {
var arrQ = new Object()
var i
	arrQ = arrQuery
	document.write("<form name='frmQ' id='frmQ' action='stats.htm' method='get'>")
	document.write("<table width='100%' border='00' cellspacing='0' cellpadding='0'>")
	document.write("<tr><td width='10%' class='testo-10'><nobr>&nbsp;&nbsp;Interrogazione:&nbsp;<select name='Q' class='testo-10' id='Q'>")
	for (i=1;i<arrQ.length;i++) {
		document.write("<option value='" + arrQ[i].ID + "'")
		if (arrQ[i].ID == cQ) document.write(" selected")
		document.write(">" + arrQ[i].Nome + "</option>")
	}
	document.write("</select></nobr></td>")
	document.write("<td width='90%' class='testo-10'>&nbsp;&nbsp;<input name='Invia' type='submit' class='testo-10' id='Invia' value='  Vai  '></td>")
	document.write("</tr></table></form>")
}

function GeneraQuery(Nome) {
var i,j,f,fmt
var arrDati = new Object()
var arrDatiF = new Object()
var arrStat = new Object()
var arrStatF = new Object()
var tabe = new Tabella(2,2)
var arrRV = arrRisQuery
var riga,pd,grigio
var primacolStat
	tabe.nome=Nome
	tabe.larghezza = 100
	tabe.border=1
	tabe.cellspacing=0
	tabe.cellpadding = 2
	tabe.stile = "tab-8"
	riga=1
	tabe.intestazioni=true
	tabe.SetValore(1,2,"Giocatore")
//	tabe.SetStile(1,2,"Cella")
	for (i=1;i<arrRV.length;i++) {
		arrDati = arrRV[i].ListaValori.split("%")
		primacolStat=arrDati.length
		if (riga==1) {
			//1a riga, intestazione
			tabe.SetStileRiga(riga,"riga-blu")
			for (j=0;j<arrDati.length;j++) {
//				tabe.SetStile(riga,j+2,"Cella")
				tabe.SetValore(riga,j+2,"<nobr>"+arrDati[j]+"</nobr>")
			}
			tabe.SetStile(riga,1,"testo-cx")
			tabe.SetValore(riga,1,"Pos")

		} else {
			if ((riga % 2) == 0) {
				pd="dispari"
			} else {
				pd="pari"
			}
			j=0 // 1o elemento, da trattare separatamente
//			tabe.SetStileRiga(riga,"t-xxs")
			tabe.SetStile(riga,2,"riga-"+pd)
			tabe.SetValore(riga,2,"<nobr><span class='testo-bold'>" + arrDati[0] + "</span></nobr>")
			for (j=1;j<arrDati.length;j++) {
				tabe.SetStile(riga,j+2,"riga-"+pd)
				tabe.SetValore(riga,j+2,"<nobr>"+arrDati[j]+"</nobr>")
			}
			tabe.SetStile(riga,1,"riga-orange-cx")
			tabe.SetValore(riga,1,riga-1)
		} // if idgiocatore...
		
		riga++
	} // for
	tabe.Stampa()
}
