if (competizioneGP == "no") {

document.write(" <TABLE width=100% bgcolor=#999999 border=1 cellPadding=0 cellSpacing=0> ")

if (NumIncVisProTur > 0) {
document.write(" <TD colSpan=2 align=middle bgcolor=#999999 height=15><strong><font color=#FFFFFF size='-2' align='left'  font> ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetProssimaGiornataDaGiocare(),0)[1].Competizione) </scr" + "ipt></strong> ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (dataGiornata[RiempiListaIncontri(GetProssimaGiornataDaGiocare(),0)[1].GiornataDiA])</scr" + "ipt></font></td> ")
}

for (conta1=1;conta1<=NumIncVisProTur;conta1+=2)
{

document.write(" <TR><TD align=middle bgcolor=#CCCCCC class=testo3_corpo9_nero height=15><font size=1 > ")
document.write(" <scr" + "ipt type='text/javascript'> ") 
document.write(" document.write (RiempiListaIncontri(GetProssimaGiornataDaGiocare(),0)[conta1].Nomi.Casa)</scr" + "ipt> ")
document.write(" - ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetProssimaGiornataDaGiocare(),0)[conta1].Nomi.Fuori)</scr" + "ipt> ")
document.write(" </font></TD></TR> ")
if (conta1<NumIncVisProTur)
	{
document.write(" <TR><TD align=middle bgcolor=#FFFFFF class=testo3_corpo9_nero height=15><font size=1 > ")
document.write(" <scr" + "ipt type='text/javascript'> ") 
document.write(" document.write (RiempiListaIncontri(GetProssimaGiornataDaGiocare(),0)[conta1+1].Nomi.Casa)</scr" + "ipt> ")
document.write(" - ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetProssimaGiornataDaGiocare(),0)[conta1+1].Nomi.Fuori)</scr" + "ipt> ")
document.write(" </font></TD></TR> ")
	}
}
document.write(" </TABLE> ")
}



if (competizioneGP == "si") {
document.write("  ")
}
