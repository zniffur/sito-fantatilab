function Header() {
	document.write("<nobr><h1>.: "+nomelega+" :. <span>"+stagione+"a edizione - Stagione "+anno+" </span></h1></nobr>")
}

function Footer() {
	document.write("Generazione dei dati: " + aggiornamento +" - Webmaster: <a href='mailto:" + WebmasterEmail + "'>" + WebmasterNome + "</a>.<br />")
	document.write("© 2007 Guido Zerbinati - Skin GuZuRa v. 1.7, basata su un layout di HTML.it modificata da Guido Zerbinati.")
}

function Contatore() {
	if (WebmasterNome == "Guido Zerbinati")
	    document.write("<script type='text/javascript' src='http://codice.shinystat.it/cgi-bin/getcod.cgi?USER=GUZURA'></script><noscript><a href='http://www.shinystat.com' target='_top'><img src='http://www.shinystat.it/cgi-bin/shinystat.cgi?USER=GUZURA' alt='On Line Counter' border='0'></a></noscript>")
    else
		document.write("qui puoi inserire il codice del tuo contatore")
}


function NewsFCM() {
    //FUNZIONE NEWS NEL MENU DI SINISTRA
    	for (var n=1; n<=10; n++) {
    	if (eval("News"+n+"Data")!="") {
        	if ((n % 2) == 0) {
            	document.write("<div class='riq-pari'>")
            } else {
            	document.write("<div class='riq-dispari'>")
            }             
			document.write("<p class='bold'>"+eval("News"+n+"Data")+"</p><p>"+eval("News"+n+"Desc")+"</p></div>") 
        }
    }
}

function NewsFCM_CENTER() {
   //FUNZIONE CHE INSERISCE LE NEWS NEL CENTRO PAGINA
    document.write("<table style='text-align: left; width: 100%; height: 27px;' border='1' cellpadding='2' cellspacing='2'><tbody><tr><td style='text-align: center; font-weight: bold; width: 119px; background-color: rgb(102, 255, 255);'>DATA</td><td style='text-align: center; font-weight: bold; width: 737px; background-color: rgb(102, 255, 255);' valign=undefined>TESTO</td>")
		for (var n=1; n<=10; n++) {
    	  if (eval("News"+n+"Data")!="") {
          document.write("<tr><td style='text-align: center;'>"+eval("News"+n+"Data")+"</td><td>"+eval("News"+n+"Desc")+"</td></tr>")
        }
     }
    document.write("</tbody></table>")
}

function LinkUtili() {
	// necessita di fcmVariabili definito
	for (var i=1; i<=10; i++) {
		if (eval("Link"+i+"url")!="") {
			document.write ("<p><a href='"+eval("Link"+i+"url")+"' target='"+LinkTarget+"'>"+eval("Link"+i)+"</a></p>")
		}
	}
}

function LastTurn() {
// Tipo Allineamento
// Orizzontale = 0
// Verticale = 1
      var allineamento = 0
      var risultatiVedere = 1 		// Se vuoi vedere i Risultati metti a 1, altrimenti a 0
      var classificaVedere = 1 		// Se vuoi vedere la Classifica metti a 1, altrimenti a 0
      var prossimaVedere = 1 			// Se vuoi vedere il Prossimo Turno metti a 1, altrimenti a 0
      
      document.write ("<table align='center' cellpadding='0' cellspacing='20' border='0' summary=''>")
      document.write ("<tr><td align='center'")
      if (allineamento == 0)
      	document.write (" colspan='3'>")
      else
      	document.write (">")
      document.write ("<strong>")
      
      var cComp, cGir, nomeComp
      var i=1	
      	cGir = JSQueryString("Gir")
      	if (cGir == null) cGir = ""
      	cComp = JSQueryString("Comp")
      	if (cGir == "") cGir = arrGironi[1].ID
      	while (parseInt(arrIncontri[i].IDGirone) != cGir) {
      		i++
      	}
      	cComp = arrIncontri[i].IDCompetizione
      	nomeComp = arrIncontri[i].Competizione
      	if (arrIncontri[i].Girone != "")
      		if (arrIncontri[i].Girone != arrIncontri[i].Competizione)
      			nomeComp += ": " + arrIncontri[i].Girone
      
      	Competizioni(cGir)
      
      document.write ("</strong>")
      document.write ("</td></tr>")
      
      document.write ("<tr><td valign='top'>")
      
        // Inizio Tabella Risultati
        if (risultatiVedere == 1)
      	{ document.write ("<table cellpadding='3' align='center' border='1' width='100%' class='tab-8'>")
        	document.write ("<tr class='riga-blufusion-cx'><td>Risultati ")
          document.write (dataGiornata[RiempiListaIncontri(GetUltimaGiornataGiocata(cComp,cGir),cComp)[1].GiornataDiA])
          document.write ("</td></tr>")
          document.write ("<tr class='riga-orange-cx'><td>" + nomeComp + "</td></tr>")
          document.write("<tr><td>")
          document.write("<table border='1' cellpadding='3' width='100%' summary='' class='tab-8'>")
          stampaUltimaGiornata(cComp,cGir)
          document.write("</table>")
          document.write("</td></tr>")
          document.write("</table>")		
        }
        // Fine Tabella Risultati
      
      document.write ("</td>")
      
      if (allineamento == 1) { document.write ("</tr><tr>") }
      
      document.write ("<td valign='top'>")
      
        // Inizio Tabella Classifica
        if (classificaVedere == 1)
      	{	document.write ("<table cellpadding='3' align='center' border='1' width='100%' class='tab-8'>")
          document.write ("<tr class='riga-blufusion-cx'><td>Classifica</td></tr>")
          document.write ("<tr class='riga-orange-cx'><td>" + nomeComp + "</td></tr>")
          document.write("<tr><td>")
          GeneraClassificaLight(cGir)
          document.close()
          document.write("</td></tr>")
          document.write("</table>")		
        }
        // Fine Tabella Classifica
      	  
      document.write ("</td>")
      
      if (allineamento == 1) { document.write ("</tr><tr>") }
      
      document.write ("<td valign='top'>")
      	  
        // Inizio Tabella Prossima Giornata
        if (prossimaVedere == 1)
      	{	document.write ("<table cellpadding='3' align='center' border='1' width='100%' class='tab-8'>")
          document.write ("<tr class='riga-blufusion-cx'><td>Prossima ")
          document.write (dataGiornata[RiempiListaIncontri(GetProssimaGiornataDaGiocare(cComp,cGir),cComp)[1].GiornataDiA])
          document.write ("</td></tr>")
          document.write ("<tr class='riga-orange-cx'><td>" + nomeComp + "</td></tr>")
          document.write("<tr><td>")
          document.write("<table border='1' cellpadding='3' width='100%' class='tab-8'>")
          stampaProssimaGiornata(cComp,cGir)
          document.write("</table>")
          document.write("</td></tr>")
          document.write("</table>")		
        }
        // Fine Tabella Prossima Giornata
      
      document.write ("</td></tr>")
      document.write ("</table>")
}

function TabellaFantasquadre() {
// scrive una tabella con i dati delle fantasquadre iscritte alla lega
	document.write("<table class='tab-8' border='1' cellpadding='3' cellspacing='0' summary='Fantasquadre'")

	var i=1
	var numfsq=arrFantasquadre.length // numero di fantasquadre iscritte 
	
	document.write("<tr><th class='riga-blufusion-cx'>AP</th>")
	document.write("<th class='riga-blufusion-cx' width='130'>Fantasquadra</th>")
	document.write("<th class='riga-blufusion-cx' width='150'>Fantallenatore</th>")
	document.write("<th class='riga-blufusion-cx' width='130'>e-mail</th></tr>")
	document.write("<tbody>")
  for (i=1;i<numfsq;i++)
  {	if ((i % 2) == 0)
		{	document.write("<tr class='riga-pari'>") }
		else
		{ document.write("<tr class='riga-dispari'>") }
	  document.write("<th class='riga-blufusion-cx'>" + arrFantasquadre[i].ID + "</th>")
	  document.write("<td>" + arrFantasquadre[i].Nome + "</td>")
	  document.write("<td>" + arrFantasquadre[i].Presidente + "</td>")
	  document.write("<td>" + arrFantasquadre[i].Email + "</td>")
	  document.write("</tr>")
	}
	document.write("</tbody></table>")
}	

function TabellaLink() {
// Crea la tabella con i link specificati nella generazione del sito
	var j=0
	document.write("<table summary='Lista link' border='0' cellpadding='0' cellspacing='0' width='185' class='cella-menu'><tbody>")
	for (j=1;j<=10;j++)
	{	if (eval("Link"+j+"url") != "") // se è presente il collegamento Link'j'url diverso da ""
		{	document.write("<tr><td>") // apre riga e cella
			// collegamento
			document.write("<a href='" + eval("Link"+j+"url") + "' target='" + LinkTarget + "'>" + eval("Link"+j) + "</a>")
			document.write("</td></tr>") // chiude cella e riga
		}
	}
	document.write("</tbody></table>") // chiude corpo e tabella
}
