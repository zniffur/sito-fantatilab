// 	JavaScript Document
// 	ControlloFormazioni 1.3 by GennyFrungillo
//	Lo script è totalmente libero e modificabile da 
//	chiunque ma, per cortesia, lasciate sempre un 
//	riferimento all'autore dello stesso
//  +Aggiunto supporto per grafica MAEL
//  +Aggiunto supporto per multicompetizioni
//  +Aggiunto Supporto Divisioni
//////////////////////////////////////////////////////////

function ControllaFormazioniDate () {
  ///VARIABILI DA MODIFICARE///
  form = "form.php"         //<--Metti qui la TUA pagina di VIUSUALIZZAZIONE delle formazioni
  invform = "invform.php"   //<--Meti qui la TUA pagina di INVIO FORMAZIONI
  maelskin = 0              // <-- METTI 1 SE HAI LA SKIN MAELSTROM MIX //--->
  ////////////////////////////
  if (maelskin == 1) {
    trg = "target='framevisualizzazionepagine'" 
  } else {
    trg = " "
  }
  dv = arrDivisioni
  numdv = dv.length
  comp = arrCompetizioni 
  nex = GetProssimaGiornataDaGiocare()
  inc = arrIncontri
  an = arrFormazioni
  sq = arrFantasquadre
  mform = Array ()
  ccomp = new Array ()
  ctemp = new Array ()
  Competi = new Array ()
  cntar = 1
  for (i=1;i<inc.length;i++){
   if (inc[i].GiornataDiA == nex){
         ccomp[cntar] = inc[i].IDCompetizione
         cntar++
   } 
  }
  ctemp = array_unique(ccomp,true)
  numcomp = ctemp.length
  ccnt = 1
  //recupera il nome della Competizione
  for (i=1;i<ctemp.length;i++){
    for (ii=1;ii<comp.length;ii++){
      if (comp[ii].ID == ctemp[i]){
          Competi[ccnt] = comp[ii].Nome
          ccnt++
      }
    }
  }
  //
  if (numdv > 1) {
    numcomp = numcomp - (numdv - 1)
  }
  // SR: visualizza solo il campionato
  numcomp = 1
  
  document.write ("<table width='100%'>")
  // document.write ("<tr><td class='TestaTab' colspan='"+(numcomp)+"' align='center'>Situazione Invio Formazioni</td></tr>")
  document.write ("<tr><td class='TestaTab'>Squadra</td>")
  for (i=1;i<=numcomp;i++){
	document.write ("<td class='TestaTab'>F_"+i+"</td>")
  }
  document.write ("</tr>")
	
  if (an.length < 1) {
    document.write ("<tr><td class='r1' align='center' colspan='"+(numcomp)+"'>Nessuna formazione inviata al momento</td></tr>")
    document.write ("</table>")
  } else {
     tit = 0
    conti = 0
    for (i=1;i<sq.length;i++){
      document.write ("<tr><td class='r2'>" + sq[i].Nome + "</td>")
      for (cnt=1;cnt<an.length;cnt++){
        if (an[cnt].IDSquadra == sq[i].ID) {
         if (an[cnt].Pos == 0) {
          tit++
         }
        }
      }
      for (it=1;it<=numcomp;it++){
        if (tit>0){
          tit = tit - 11
          document.write ("<td class='r5' align='center'><a class='rl5' href='/"+form+"?Gio="+GetProssimaGiornataDaGiocare()+"&Comp=0&Invia=++Vai++' "+trg+">OK</a></td>")
        } else {
          document.write ("<td class='r4' align='center'><a class='rl4' href='/"+invform+"?Fsq="+sq[i].ID+"&Invia=++Vai++' "+trg+">NO</a></td>")
        }
      }
      document.write ("</tr>")
      tit = 0
    }
    document.write ("<tr><td class='r3' align ='center' colspan='"+(numcomp+1)+"'> by GennyFrungillo</td></tr>")
    document.write ("</table>")
  }
}

function array_unique (array) {
    // Rimuove valori duplicati da un vettore 
     
    var key = '', tmp_arr1 = {};
    tmp_arr2 = new Array ();
    var val = '';
    var test = 1;
    tmp_arr1 = array;
    var __array_search = function (needle, haystack) {
        var fkey = '';
        for (fkey in haystack) {
            if ((haystack[fkey] + '') === (needle + '')) {
                return fkey;
            }
        }
        return false;
    };

    for (key in tmp_arr1) {
        val = tmp_arr1[key];
        if (false === __array_search(val, tmp_arr2)) {
            tmp_arr2[test] = val;
            test++;
        }
        
        delete tmp_arr1[key];
    }
    
    return tmp_arr2;
}

