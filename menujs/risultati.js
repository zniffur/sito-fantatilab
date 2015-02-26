document.write("<TABLE width=100% bgcolor=#999999 border=1 cellPadding=0 cellSpacing=0> ")

if (competizioneGP == "no") {

if (NumIncVisUltRis > 0) {
document.write(" <TD colSpan=2 bgcolor=#999999 align=middle height=15><font color=#FFFFFF size='-2' align='left'  font>")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[1].Competizione) </scr" + "ipt> ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (dataGiornata[RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[1].GiornataDiA])</scr" + "ipt></font></td> ")
}

for (conta2=1;conta2<=NumIncVisUltRis;conta2+=2)
{

document.write(" <TR><TD align=middle bgcolor=#CCCCCC height=15><font size=1> ")
document.write(" <scr" + "ipt type='text/javascript'> ") 
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2].Nomi.Casa)</scr" + "ipt> ")
document.write(" - ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2].Nomi.Fuori)</scr" + "ipt> ")
document.write(" </font></div></TD><TD align=middle bgcolor=#CCCCCC width='30'><div align='center'><font size='-3'> ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2].Gol.Casa)</scr" + "ipt> ")
document.write(" - ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2].Gol.Fuori)</scr" + "ipt> ")
document.write(" </div></TD></TR> ")
if (conta2<NumIncVisUltRis)
	{
document.write(" <TR><TD align=middle bgcolor=#FFFFFF height=15><font size=1> ")
document.write(" <scr" + "ipt type='text/javascript'> ") 
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2+1].Nomi.Casa)</scr" + "ipt> ")
document.write(" - ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2+1].Nomi.Fuori)</scr" + "ipt> ")
document.write(" </font></div></TD><TD align=middle bgcolor=#FFFFFF width='30'><div align='center'><font size='-3'> ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2+1].Gol.Casa)</scr" + "ipt> ")
document.write(" - ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2+1].Gol.Fuori)</scr" + "ipt> ")
document.write(" </div>")
	}
}
}



if (competizioneGP == "si") {
if (NumIncVisUltRis > 0) {
document.write(" <TD colSpan=2 bgcolor=#FFFFFF ><font size='-2' align='left' face='Arial' font> ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[1].Competizione) </scr" + "ipt> ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (dataGiornata[RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[1].GiornataDiA])</scr" + "ipt></font></td> ")
}

for (conta2=1;conta2<=NumIncVisUltRis;conta2+=2)
{

document.write(" <TR><TD bgcolor=#CCCCCC><font size=-4 face=Arial> ")
document.write(" <scr" + "ipt type='text/javascript'> ") 
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2].Nomi.Casa)</scr" + "ipt> ")
document.write(" </font></div></TD><TD bgcolor=#CCCCCC width='30'><div align='center'><font face='Verdana, Arial, Helvetica, sans-serif'><strong><font size='-3'> ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2].Tot.Casa)</scr" + "ipt> ")
document.write(" </font></strong></font></div></TD></TR> ")
if (conta2<NumIncVisUltRis)
	{
document.write(" <TR><TD bgcolor=#FFFFFF class=testo3_corpo9_nero><font size=-4 face=Arial> ")
document.write(" <scr" + "ipt type='text/javascript'> ") 
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2+1].Nomi.Casa)</scr" + "ipt> ")
document.write(" </font></div></TD><TD bgcolor=#FFFFFF width='30' class=testo3_corpo9_bold_nero><div align='center'><font face='Verdana, Arial, Helvetica, sans-serif'><strong><font size='-3'> ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2+1].Tot.Casa)</scr" + "ipt> ")
document.write(" </font></strong></font></div></TD></TR> ")
	}
}
}
document.write(" </TABLE> ")