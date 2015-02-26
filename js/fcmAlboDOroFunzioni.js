// La maggior parte di questo codice opera di Marcello "John Doe" Puri

// Oggetti JavaScript per AlboDOro
// Oggetto Competizione Albo dOro
function AdOC(IDc, idAttuale, nome, iniziataNel) {
	this.IDc = IDc
	this.idAttuale = idAttuale
	this.nome = nome
	this.iniziataNel = iniziataNel
}

// Oggetto Fantasquadra Albo d'Oro
function AdOF(IDf, idAttuale, nome, iniziataNel) {
	this.IDf = IDf
	this.idAttuale = idAttuale
	this.nome = nome
	this.iniziataNel = iniziataNel
}

// Oggetto Posizione Albo dOro
function AdOP(idCompetizione, idSquadra, anno, stagione, posizione, presidente, punti, note) {
	this.idCompetizione = idCompetizione
	this.idSquadra = idSquadra
	this.anno = anno
	this.stagione = stagione
	this.posizione = posizione
	this.presidente = presidente
	this.punti = punti
	this.note = note
}

function adoV(idSquadra,nome,idAttuale)
{
	var c
	this.idSquadra = idSquadra
	this.nome=nome
	this.idAttuale=idAttuale
	this.vittorie = new Array(arrAdOCompetizioni.length)
	for (c = 1; c < arrAdOCompetizioni.length; this.vittorie[arrAdOCompetizioni[c++].IDc] = 0);
}

function GeneraVittorie()
{
	var competizioni = arrAdOCompetizioni.length - 1
	var vittorie = new Array()

	var tabV = new Tabella(2, competizioni + 1)

	var c, s, p, v, cnt, idx, i

	var arrRiferimentiColonne = new Array()
	for (i=1;i<arrAdOCompetizioni.length;i++)
		arrRiferimentiColonne[arrAdOCompetizioni[i].IDc]=i

	// Imposta proprietà della tabella
	tabV.nome = "Vittorie albo d'oro"
	tabV.larghezza = 100
	tabV.border = 1
	tabV.cellpadding = 2
	tabV.cellspacing = 0
	tabV.stile = "tab-8"
	tabV.SetLarghezzaColonna(1, 30)
	for (c = 2; c <= competizioni + 1; tabV.SetLarghezzaColonna(c++, 70 / competizioni));

	// Imposta stile header
	tabV.SetStileRiga(1, "riga-blu")

	// Imposta stile celle dell'header
	for (c = 1; c <= competizioni + 1; tabV.SetStile(1, c++, "testo-cx"));

	// Imposta valori celle dell'header
	tabV.SetValore(1, 1, "Squadra")

	for (c = 2; c <= competizioni + 1 ; tabV.SetValore(1, c, arrAdOCompetizioni[c++ - 1].nome));

	// Calcola vittorie di ogni squadra
	for (s = 1; s < arrAdOFantasquadre.length; s++) {
		vittorie[arrAdOFantasquadre[s].IDf] = new adoV(arrAdOFantasquadre[s].IDf, arrAdOFantasquadre[s].nome,arrAdOFantasquadre[s].idAttuale)
 	}
	for (p = 1; p < arrAdOPosizioni.length; p++)
		if (arrAdOPosizioni[p].posizione == 1)
			vittorie[arrAdOPosizioni[p].idSquadra].vittorie[arrAdOPosizioni[p].idCompetizione]++;

	// E le ordina
	vittorie.sort(ordinaVittorie)

	// Riempie la tabella
	cnt = 2
	for (v = 0; v < vittorie.length; v++) {
		if (vittorie[v]!=null) {
			// Imposta stile della riga
			if ((cnt % 2) == 0) tabV.SetStileRiga(cnt, "riga-dispari")
			else tabV.SetStileRiga(cnt, "riga-pari");

			// Imposta stile e valore della cella 'squadra'
			tabV.SetStile(cnt,1,vittorie[v].idAttuale==0?"testo-8":"testo-bold")
			tabV.SetValore(cnt,1,vittorie[v].nome)

			// Imposta stile e valore delle celle 'vittorie'
			for (c=1; c<vittorie[v].vittorie.length; c++) {
				if (vittorie[v].vittorie[c]!=null) {
					idx = arrRiferimentiColonne[c]+1
					tabV.SetStile(cnt,idx,"testo-cx")
					vittorie[v].vittorie[c]==0?tabV.SetValore(cnt,idx,"&nbsp"):tabV.SetValore(cnt,idx,vittorie[v].vittorie[c])
				}
			}
			cnt++;
		}
	}

	tabV.Stampa()
}

function ordinaVittorie(a, b)
{
	var c
	if ((a!=null) && (b!=null)) {
		for (c = 1; c < arrAdOCompetizioni.length; c++) {
			if (a.vittorie[c] < b.vittorie[c]) return 1
			if (a.vittorie[c] > b.vittorie[c]) return -1
		}
		return a.nome>b.nome?1:-1
	}
	else {
		return -(a == null) + (b == null)
	}
}

function adoP(idSquadra,nome,idAttuale)
{
	var c, p

	this.idSquadra = idSquadra
	this.nome = nome
	this.idAttuale = idAttuale
	this.piazzamenti = new Array(arrAdOCompetizioni.length)

	for (c = 1; c < arrAdOCompetizioni.length; c++) {
		this.piazzamenti[arrAdOCompetizioni[c].IDc]=new Array()
//		for (p = 1; p < arrAdOFantasquadre.length;p++) {
//		 	this.piazzamenti[arrAdOCompetizioni[c].IDc][arrAdOFantasquadre[p].IDf] = 0
//	 	}
//		for (p=1;p<100;p++) this.piazzamenti[arrAdOCompetizioni[c].IDc][p] = 0
	}
}

function GeneraPiazzamenti()
{
	var competizioni = arrAdOCompetizioni.length - 1
	var piazzamenti = new Array()

	var tabP = new Tabella(2, competizioni + 1)

	var c, s, p, i, pp, cnt, idx

	var arrRiferimentiColonne = new Array()
	for (i=1;i<arrAdOCompetizioni.length;i++)
		arrRiferimentiColonne[arrAdOCompetizioni[i].IDc]=i
  
	// Imposta proprietà della tabella
	tabP.nome = "Piazzamenti albo d'oro"
	tabP.larghezza = 100
	tabP.border = 1
	tabP.cellpadding = 2
	tabP.cellspacing = 0
	tabP.stile = "tab-8"
	tabP.SetLarghezzaColonna(1, 30)
	for (c = 2; c <= competizioni + 1; tabP.SetLarghezzaColonna(c++, 70 / competizioni));

	// Imposta stile header
	tabP.SetStileRiga(1, "riga-blu");

	// Imposta stile celle dell'header
	for (c = 1; c <= competizioni + 1; tabP.SetStile(1, c++, "testo-cx"));

	// Imposta valori celle dell'header
	tabP.SetValore(1, 1, "Squadra")
	for (c = 2; c <= competizioni + 1; tabP.SetValore(1, c, arrAdOCompetizioni[c++ - 1].nome));

	// Calcola piazzamenti di ogni squadra
	for (s = 1; s < arrAdOFantasquadre.length;s++) {
		piazzamenti[arrAdOFantasquadre[s].IDf] = new adoP(arrAdOFantasquadre[s].IDf, arrAdOFantasquadre[s].nome,arrAdOFantasquadre[s].idAttuale)
	}
	for (p = 1; p < arrAdOPosizioni.length; p++) {
		if (piazzamenti[arrAdOPosizioni[p].idSquadra].piazzamenti[arrAdOPosizioni[p].idCompetizione][arrAdOPosizioni[p].posizione]==null) piazzamenti[arrAdOPosizioni[p].idSquadra].piazzamenti[arrAdOPosizioni[p].idCompetizione][arrAdOPosizioni[p].posizione] = 0
		piazzamenti[arrAdOPosizioni[p].idSquadra].piazzamenti[arrAdOPosizioni[p].idCompetizione][arrAdOPosizioni[p].posizione]++
//		alert("IDSquadra=" + arrAdOPosizioni[p].idSquadra + ", IDCOmp = " + arrAdOPosizioni[p].idCompetizione + ", Posizione = " + arrAdOPosizioni[p].posizione)
//		alert(piazzamenti[arrAdOPosizioni[p].idSquadra].piazzamenti[arrAdOPosizioni[p].idCompetizione][arrAdOPosizioni[p].posizione])
	}

	// E le ordina
	piazzamenti.sort(ordinaPiazzamenti)

	// Riempie la tabella
	cnt = 2
	for (p = 0; p < piazzamenti.length; p++) {
		if (piazzamenti[p]!=null) {
			// Imposta stile della riga
			if ((cnt % 2) == 0) tabP.SetStileRiga(cnt, "riga-dispari")
			else tabP.SetStileRiga(cnt, "riga-pari");

			// Imposta stile e valore della cella 'squadra'
			tabP.SetStile(cnt,1,piazzamenti[p].idAttuale==0?"testo-8":"testo-bold")
			tabP.SetValore(cnt,1,"<span class='" + (piazzamenti[p].idAttuale==0?"testo-verde":"testo-verde-bold") +"'>" + piazzamenti[p].nome +"</span>")
			// Imposta stile e valore delle celle 'piazzamenti'
			for (c=1; c<piazzamenti[p].piazzamenti.length; c++) {
				if (piazzamenti[p].piazzamenti[c]!=null) {
					idx = arrRiferimentiColonne[c] + 1
					tabP.SetStile(cnt, idx, "testo-cx")
					valoreCella = ""
					for (i = 1; i < piazzamenti[p].piazzamenti[c].length; i++) {
						pp = piazzamenti[p].piazzamenti[c][i]
						if ((pp != 0) && (pp!=null)) {
							valoreCella += String(i) + "&deg;"
							if (pp > 1) valoreCella += " [" + piazzamenti[p].piazzamenti[c][i] + "]"
							valoreCella += ", "
						}
					}
					if (valoreCella!="") tabP.SetValore(cnt, idx, valoreCella.substring(0, valoreCella.length - 2))
				}
			}
			cnt++
		}
	}

	tabP.Stampa()
}

function ordinaPiazzamenti(a, b)
{
	if ((a!=null) && (b!=null)) {
		return a.nome>b.nome?1:-1
	} else {
		return -(a == null) + (b == null)
	}
}

function determinaAnniCompetizione(idCompetizione)
{
	var p, i, anni = new Array(), aux = new Array()

	i = 1;
	for (p = 1; p < arrAdOPosizioni.length; p++)
		if (idCompetizione == -1 || idCompetizione == arrAdOPosizioni[p].idCompetizione)
			aux[i++] = arrAdOPosizioni[p].anno;

	aux.sort()
	anni[1] = aux[0];
	for (a = 0; a < aux.length - 1; a++) if (aux[a] != aux[a + 1] && aux[a] != null && aux[a + 1] != null) anni.push(aux[a + 1]);

	return anni
}

function adoS(idSquadra, anni,nome,idAttuale)
{
	var a

	this.idSquadra = idSquadra
	this.idAttuale=idAttuale
	this.nome = nome
	this.storico = new Array(anni)
	for (a = 1; a <= anni; this.storico[a++] = 0);
}

function GeneraStorico()
{
	var competizioni = arrAdOCompetizioni.length - 1
	var storico
	var arrAnni = new Array()
	var anni

	var c, a, s, p, cnt,idx

	// Determina anni in cui si sono svolte le competizioni
	arrAnni = determinaAnniCompetizione(-1)
	anni = arrAnni.length - 1

	var tabS = new Tabella(2, anni +1)

	// Genera una tabella per ogni competizione
	for (c = 1; c <= competizioni; c++) {

		// Imposta proprietà della tabella
		tabS.nome = "Storico albo d'oro"
		tabS.larghezza = 100
		tabS.border = 1
		tabS.cellpadding = 2
		tabS.cellspacing = 0
		tabS.stile = "tab-8"
		tabS.SetLarghezzaColonna(1, 30)
		for (a = 2; a <= anni + 1; tabS.SetLarghezzaColonna(a++, 70 / anni));

		// Imposta proprietà e contenuto del titolo (nome della competizione)
		tabS.SetStileRiga(1, "riga-blu")
		tabS.SetSpan(1, 1, anni+1)
		for (a = 2; a <= anni + 1; tabS.SetSpanned(1,a++,true));

		tabS.SetValore(1, 1, arrAdOCompetizioni[c].nome)

		// Imposta stile e contenuto dell'header
		tabS.SetStileRiga(2, "riga-blu")
		for (a = 1; a <= anni + 1; tabS.SetStile(2, a++, "testo-cx"));
		tabS.SetValore(2, 1, "Squadra")
		for (a = 2; a <= anni + 1; tabS.SetValore(2, a, arrAnni[a++ - 1]));
		storico=null
		storico=new Array()
		// Calcola storico della competizione
		for (s = 1; s < arrAdOFantasquadre.length; s++) {
			storico[arrAdOFantasquadre[s].IDf] = new adoS(arrAdOFantasquadre[s].IDf, anni,arrAdOFantasquadre[s].nome,arrAdOFantasquadre[s].idAttuale)
		}
		for (p = 1; p < arrAdOPosizioni.length; p++)
			if (arrAdOPosizioni[p].idCompetizione == arrAdOCompetizioni[c].IDc)
				storico[arrAdOPosizioni[p].idSquadra].storico[arrAdOPosizioni[p].anno - arrAnni[1] + 1] = arrAdOPosizioni[p].posizione;

		// E le ordina
		storico.sort(ordinaStorico)

		// Riempie la tabella
		cnt = 3
		for (s = 0; s < storico.length; s++) {
			if (storico[s]!=null) {
				// Imposta stile della riga
				if ((cnt % 2) == 0) tabS.SetStileRiga(cnt, "riga-dispari")
				else tabS.SetStileRiga(cnt, "riga-pari");

				// Imposta stile e valore della cella 'squadra'
				tabS.SetStile(cnt,1,storico[s].idAttuale==0?"testo-8":"testo-bold")
				tabS.SetValore(cnt,1,"<span class='" + (storico[s].idAttuale==0?"testo-rosso":"testo-rosso-bold") + "'>" + storico[s].nome + "</span>")
				// Imposta stile e valore delle celle 'storico'
				for (a = 2; a <= anni + 1; a++) {
					tabS.SetStile(cnt, a, "testo-cx")
					tabS.SetValore(cnt, a, storico[s].storico[a - 1] != 0 ? storico[s].storico[a - 1] : "")
				}
				cnt++
			}
		}

		tabS.Stampa()
		if (c != competizioni) document.write("<br>")
	}
}

function ordinaStorico(a, b)
{
	if ((a!=null) && (b!=null)) {
		return a.nome>b.nome?1:-1
	} else {
		return -(a == null) + (b == null)
	}
}


function GeneraDettagliato()
{
	var competizioni = arrAdOCompetizioni.length - 1
	var dettagliato = new Array()
	var arrAnni = new Array()
	var arrRifSq = new Array()

	var anni

	var c, a, d, t,i


	// Determina anni in cui si sono svolte le competizioni
	arrAnni = determinaAnniCompetizione(-1)
	anni = arrAnni.length - 1

	for (i=1;i<arrAdOFantasquadre.length;i++) {
		arrRifSq[arrAdOFantasquadre[i].IDf]=i
	}
	// Genera una tabella per ogni coppia competizione/anno
	for (a=anni; a>=1; a--) {
		for (c = 1; c <= competizioni; c++) {

			var tabD = new Tabella(2, 5)

			// Imposta proprietà della tabella
			tabD.nome = "Dettagliato albo d'oro"
			tabD.larghezza = 100
			tabD.border = 1
			tabD.cellpadding = 2
			tabD.cellspacing = 0
			tabD.stile = "tab-8"
			tabD.SetLarghezzaColonna(1, 30)
			tabD.SetLarghezzaColonna(2, 10)
			tabD.SetLarghezzaColonna(3, 10)
			tabD.SetLarghezzaColonna(4, 20)
			tabD.SetLarghezzaColonna(5, 30)

			// Imposta proprietà del titolo (nome della competizione)
			tabD.SetStileRiga(1, "riga-blu")
			tabD.SetSpan(1, 1, 5)
			tabD.SetSpanned(1, 2, true)
			tabD.SetSpanned(1, 3, true)
			tabD.SetSpanned(1, 4, true)
			tabD.SetSpanned(1, 5, true)
			tabD.SetValore(1, 1, arrAdOCompetizioni[c].nome + " (" + arrAnni[a] + " )")

			// Imposta stile e contenuto dell'header
			tabD.SetStileRiga(2, "riga-blu")
			for (t = 1; t <= 5; tabD.SetStile(2, t++, "testo-cx"));
			tabD.SetValore(2, 1, "Squadra")
			tabD.SetValore(2, 2, "Posizione")
			tabD.SetValore(2, 3, "Punti")
			tabD.SetValore(2, 4, "Presidente")
			tabD.SetValore(2, 5, "Note")

			// Calcola dettagliato della competizione
			dettagliato = new Array()
			i = 1;
			for (p = 1; p < arrAdOPosizioni.length; p++)
				if ((arrAdOPosizioni[p].idCompetizione == arrAdOCompetizioni[c].IDc) && ((arrAdOPosizioni[p].anno - arrAnni[1] + 1) == a))
					dettagliato[i++] = p;

			if (dettagliato.length != 0) {

				// E le ordina
				dettagliato.sort(ordinaDettagliato)

				// Riempie la tabella
				cnt = 3
				for (d = 0; d < dettagliato.length; d++) {

					if (dettagliato[d] != null) {
						// Imposta stile della riga
						if ((cnt % 2) == 0) tabD.SetStileRiga(cnt, "riga-dispari")
						else tabD.SetStileRiga(cnt, "riga-pari");

						// Imposta stile e valore delle celle
						tabD.SetStile(cnt, 1, arrAdOFantasquadre[arrRifSq[arrAdOPosizioni[dettagliato[d]].idSquadra]].idAttuale == 0 ? "testo-8" : "testo-bold")
						tabD.SetValore(cnt, 1,"<span class='" + (arrAdOFantasquadre[arrRifSq[arrAdOPosizioni[dettagliato[d]].idSquadra]].idAttuale == 0 ? "testo-blu" : "testo-blu-bold" )+ "'>" + arrAdOFantasquadre[arrRifSq[arrAdOPosizioni[dettagliato[d]].idSquadra]].nome + "</span>")

						tabD.SetStile(cnt, 2, "testo-cx")
						tabD.SetValore(cnt, 2, arrAdOPosizioni[dettagliato[d]].posizione)

						tabD.SetStile(cnt, 3, "testo-cx")
						tabD.SetValore(cnt, 3, arrAdOPosizioni[dettagliato[d]].punti)

						tabD.SetStile(cnt, 4, "testo-8")
						tabD.SetValore(cnt, 4, arrAdOPosizioni[dettagliato[d]].presidente)

						tabD.SetStile(cnt, 5, "testo-8")
						tabD.SetValore(cnt, 5, arrAdOPosizioni[dettagliato[d]].note)

						cnt++
					}
				}

				tabD.Stampa()
				if ((a != 1) || (c != competizioni)) document.write("<br>")
			}
		}
	}
}

function ordinaDettagliato(a, b)
{
	if ((a!=null) && (b!=null)) {
		return arrAdOPosizioni[a].posizione>arrAdOPosizioni[b].posizione?1:-1
	} else {
		return -(a == null) + (b == null)
	}
}
