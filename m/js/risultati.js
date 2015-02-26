var arrC = new Object()
arrC = arrCompetizioni
for (i=1;i<arrC.length;i++) {
if (arrC[i].Nome=="FantaBarMario") {
IDCampionato=arrC[i].ID;
}
if (arrC[i].Nome=="FantaCoppaBarMario") {
IDCoppa=arrC[i].ID;
}
}

document.write ("<div style='font:small Sans-serif,Arial,Helvetica; color:#faa; font-size:180%'><b>Risultati</b></div>")
document.write("<TABLE width='288px' border=0 cellPadding=0 cellSpacing=0> ")

if (RiempiListaIncontri(GetUltimaGiornataGiocata(),IDCampionato)!= 0) {
document.write(" <tr class='q' align=middle><TD ><strong>")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),IDCampionato)[1].Competizione) </scr" + "ipt>")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (dataGiornata[RiempiListaIncontri(GetUltimaGiornataGiocata(),IDCampionato)[1].GiornataDiA])</scr" + "ipt></strong></td></tr> ")


for (conta2=1;conta2<RiempiListaIncontri(GetUltimaGiornataGiocata(),3).length;conta2++)
{
if ((conta2 % 2) == 0) {
document.write(" <TR class='r'><TD align=middle>")
document.write(" <div style='float:left;width:44%; text-align:right;'> ")
document.write(" <scr" + "ipt type='text/javascript'> ") 
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),IDCampionato)[conta2].Nomi.Casa)</scr" + "ipt> ")
document.write (" </div><div style='float:left;width:11%;text-align:center;padding:0;'> ")
document.write(RiempiListaIncontri(GetUltimaGiornataGiocata(),IDCampionato)[conta2].Gol.Casa+" - "+RiempiListaIncontri(GetUltimaGiornataGiocata(),IDCampionato)[conta2].Gol.Fuori)
document.write (" </div><div style='float:right;width:44%;text-align:left;'> ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),IDCampionato)[conta2].Nomi.Fuori)</scr" + "ipt> ")
document.write(" </div> ")
document.write(" </TD></TR> ")
} else {
document.write(" <TR class='d'><TD align=middle>")
document.write(" <div style='float:left;width:44%;text-align:right;'> ")
document.write(" <scr" + "ipt type='text/javascript'> ") 
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),IDCampionato)[conta2].Nomi.Casa)</scr" + "ipt> ")
document.write (" </div><div style='float:left;width:11%;text-align: center;padding:0;'> ")
document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),IDCampionato)[conta2].Gol.Casa+" - "+RiempiListaIncontri(GetUltimaGiornataGiocata(),IDCampionato)[conta2].Gol.Fuori)
document.write (" </div><div style='float:right;width:44%;text-align:left;'> ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),IDCampionato)[conta2].Nomi.Fuori)</scr" + "ipt> ")
document.write(" </div> ")
document.write(" </TD></TR> ")
	}
}

document.write(" </table> ")
} else {
document.write(" </table> ")
document.write ("<div><b>Prossima Giornata FantaBarMario<br>")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (dataGiornata[RiempiListaIncontri(GetProssimaGiornataDaGiocare(),IDCampionato)[1].GiornataDiA])</scr" + "ipt>")
document.write("</b></div>")
}


document.write("<TABLE width='288px' border=0 cellPadding=0 cellSpacing=0> ")

if (RiempiListaIncontri(GetUltimaGiornataGiocataCoppa(),IDCoppa) != 0){
document.write(" <tr class='q' align=middle><TD ><strong>")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocataCoppa(),IDCoppa)[1].Competizione) </scr" + "ipt>")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (dataGiornata[RiempiListaIncontri(GetUltimaGiornataGiocataCoppa(),IDCoppa)[1].GiornataDiA])</scr" + "ipt></strong></td></tr> ")




var cnt=RiempiListaIncontri(GetUltimaGiornataGiocataCoppa(),IDCoppa).length
for (conta2bis=1;conta2bis<cnt;conta2bis++)
{

if ((conta2bis % 2) == 0) {

document.write(" <TR class='r'><TD>")
document.write(" <div style='float:left;width:44%; text-align:right;'> ")
document.write(" <scr" + "ipt type='text/javascript'> ") 
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocataCoppa(),IDCoppa)[conta2bis].Nomi.Casa)</scr" + "ipt> ")
document.write (" </div><div style='float:left;width:11%;text-align:center;padding:0;'> ")
document.write (RiempiListaIncontri(GetUltimaGiornataGiocataCoppa(),IDCoppa)[conta2bis].Gol.Casa+" - "+RiempiListaIncontri(GetUltimaGiornataGiocataCoppa(),IDCoppa)[conta2bis].Gol.Fuori)
document.write (" </div><div style='float:right;width:44%;text-align:left;'> ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocataCoppa(),IDCoppa)[conta2bis].Nomi.Fuori)</scr" + "ipt> ")
document.write(" </div> ")
document.write(" </TD></TR> ")
} else {
document.write(" <TR class='d'><TD>")
document.write(" <div style='float:left;width:44%;text-align:right;'> ")
document.write(" <scr" + "ipt type='text/javascript'> ") 
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocataCoppa(),IDCoppa)[conta2bis].Nomi.Casa)</scr" + "ipt> ")
document.write (" </div><div style='float:left;width:11%;text-align: center;'> ")
document.write (RiempiListaIncontri(GetUltimaGiornataGiocataCoppa(),IDCoppa)[conta2bis].Gol.Casa+" - "+RiempiListaIncontri(GetUltimaGiornataGiocataCoppa(),IDCoppa)[conta2bis].Gol.Fuori)
document.write (" </div><div style='float:right;width:44%;text-align:left;'> ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocataCoppa(),IDCoppa)[conta2bis].Nomi.Fuori)</scr" + "ipt> ")
document.write(" </div> ")
document.write(" </TD></TR> ")
	}

}

document.write(" </table> ")
} else {
document.write(" </table> ")
document.write ("<div><b>Prossima Giornata CoppaFantaBarMario<br>")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (dataGiornata[RiempiListaIncontri(GetProssimaGiornataDaGiocareCoppa(),IDCoppa)[1].GiornataDiA])</scr" + "ipt>")
document.write("</b></div>")
}

