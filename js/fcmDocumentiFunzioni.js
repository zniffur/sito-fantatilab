// Oggetti Javascript per Documenti

function Documento(ID,Categoria,Descrizione,Dimensione,Nomefile,Ordine,UltimoAggiornamento,Squadra_ID,Squadra_Nome,Squadra_Ordine) {
	this.ID = ID
	this.Categoria = Categoria
	this.Descrizione = Descrizione
	this.Dimensione = Dimensione // in kb
	this.Nomefile = Nomefile
	this.Ordine = Ordine
	this.UltimoAggiornamento = UltimoAggiornamento
	this.Squadra_ID = Squadra_ID
	this.Squadra_Nome = Squadra_Nome
	this.Squadra_Ordine = Squadra_Ordine
}	

function GeneraDocumenti() {
var i
var tabe = new Tabella(1,1)
var arrRV = arrDocumenti
var riga,pd,grigio
	tabe.nome="Documenti"
	tabe.larghezza = 100
	tabe.border=1
	tabe.cellspacing=0
	tabe.cellpadding = 2
	tabe.stile = "tab-8"
	riga=2
	tabe.intestazioni=true
	tabe.SetValore(1,1,"Categoria")
//	tabe.SetStile(1,1,"Cella")
	tabe.SetValore(1,2,"File")
//	tabe.SetStile(1,2,"Cella")
	tabe.SetValore(1,3,"Descrizione")
//	tabe.SetStile(1,3,"Cella")
	tabe.SetValore(1,4,"Kb")
//	tabe.SetStile(1,4,"Cella")
	tabe.SetValore(1,5,"Data")
//	tabe.SetStile(1,5,"Cella")
	tabe.SetStileRiga(1,"riga-blu")
	for (i=1;i<arrRV.length;i++) {
		if ((riga % 2) == 0) {
			pd="dispari2"
		} else {
			pd="pari"
		}
		tabe.SetStileRiga(riga,"testo-8")
		tabe.SetStile(riga,1,"riga-"+pd)
		tabe.SetValore(riga,1,"<nobr><span class='testo-8'>" + arrRV[i].Categoria + "</span></nobr>")
		tabe.SetStile(riga,2,"riga-"+pd)
		tabe.SetValore(riga,2,"<nobr><span class='testo-8'><a href='doc/" +arrRV[i].Nomefile +"'>" + arrRV[i].Nomefile + "</a></span></nobr>")
		tabe.SetStile(riga,3,"riga-"+pd)
		tabe.SetValore(riga,3,"<span class='testo-bold'>" + arrRV[i].Descrizione + "</span>")
		tabe.SetStile(riga,4,"riga-"+pd)
		tabe.SetValore(riga,4,"<nobr><span class='testo-dx'>" + arrRV[i].Dimensione + "</span></nobr>")
		tabe.SetStile(riga,5,"riga-"+pd)
		tabe.SetValore(riga,5,"<nobr><span class='testo-8'>" + arrRV[i].UltimoAggiornamento + "</span></nobr>")
		riga++
	} // for
	tabe.Stampa()
}
