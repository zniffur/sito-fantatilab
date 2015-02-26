//-----------------------------------------------------------------------------
// fcmBackupFunzioni.js
//
// Copyright (C) 2005 Marcello 'John Doe' Puri
//
// Versione 0.9.0 (15/09/2005)
// Versione 0.9.5 (28/09/2005)
// Versione 0.9.6 (07/10/2005)
// Versione 1.0.0 (02/12/2005)
// Versione 1.1.0 (08/09/2006)
//-----------------------------------------------------------------------------

// Oggetti Javascript per Backup
function FileBackup(Nomefile,Dimensione,UltimoAggiornamento) {
	this.Nomefile = Nomefile;
	this.Dimensione = Dimensione; // in kb
	this.UltimoAggiornamento = UltimoAggiornamento;
}

function GeneraFileBackup()
{
	var i;
	var tabe = new Tabella(1,1);
	var riga, pd, grigio;

	tabe.nome = "File di backup";
	tabe.larghezza = 100;
	tabe.border = 0;
	tabe.cellspacing = 0;
	tabe.cellpadding = 2;
	tabe.stile = "ClassEl";
	riga = 2;
	tabe.intestazioni = true;
	tabe.SetValore(1, 1, "File");
	tabe.SetStile(1, 1, "Cella");
	tabe.SetValore(1, 2, "Kb");
	tabe.SetStile(1, 2, "Cella");
	tabe.SetValore(1, 3, "Data");
	tabe.SetStile(1, 3, "Cella");
	tabe.SetStileRiga(1, "IntRossoBlu");

	for (i=1; i < arrFileBackup.length; i++) {
		if ((riga % 2) == 0) {
			pd = "D";
		} else {
			pd = "P";
		}
		tabe.SetStileRiga(riga, "t-xxs");
		tabe.SetStile(riga, 1, "Doc" + pd);
		tabe.SetValore(riga, 1, "<nobr><span class='t-xxsB'><a href='backup/" + arrFileBackup[i].Nomefile +"'>" + arrFileBackup[i].Nomefile + "</a></span></nobr>");
		tabe.SetStile(riga, 2, "Doc" + pd);
		tabe.SetValore(riga, 2, "<nobr><span class='t-xxs'>" + arrFileBackup[i].Dimensione + "</span></nobr>");
		tabe.SetStile(riga, 3, "Doc" + pd);
		tabe.SetValore(riga, 3, "<nobr><span class='t-xxs'>" + arrFileBackup[i].UltimoAggiornamento + "</span></nobr>");
		riga++;
	} // for
	tabe.Stampa();
}