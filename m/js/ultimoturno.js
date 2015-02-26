//modificata by Andrea Bertolazzi

//********************


document.write("<TABLE width=100% border=0 cellPadding=2 cellSpacing=0> ")

if (NumIncVisUltRis > 0) {
document.write(" <TD class='rigaTiT' colSpan='2'><strong> ")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[1].Competizione) </scr" + "ipt></strong> ")
document.write(" <br><span class='rigaDat'><scr" + "ipt type='text/javascript'> ")
document.write(" document.write (dataGiornata[RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[1].GiornataDiA])</scr" + "ipt></span></td> ")
}

for (conta2=1;conta2<=NumIncVisUltRis;conta2+=2)
{
document.write("<TR height=32 class='r'>")

document.write("<TD width=50%  class='rigaP3' align='right'>")
document.write(" <scr" + "ipt type='text/javascript'>document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2].Nomi.Casa)</scr" + "ipt> ")
document.write(" </TD>")
document.write(" <TD align=center width='60'> <a href='#"+RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2].Nomi.Casa+"'>")
document.write("  <scr" + "ipt type='text/javascript'>document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2].Gol.Casa)</scr" + "ipt> ")

document.write("-")
document.write(" <scr" + "ipt type='text/javascript'>document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2].Gol.Fuori)</scr" + "ipt> ")
document.write(" </a></TD>")
document.write("<TD class='rigaP3' align='left'>")
document.write(" <scr" + "ipt type='text/javascript'>document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2].Nomi.Fuori)</scr" + "ipt> ")
document.write(" </TD>")

document.write(" </TR>")
if (conta2<NumIncVisUltRis)
    {
document.write(" <TR height=32 >")

document.write("<TD width=50%  class='rigaP3' align='right'>")
document.write(" <scr" + "ipt type='text/javascript'>document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2+1].Nomi.Casa)</scr" + "ipt> ")
document.write(" </TD>")
document.write(" <TD align=center width='60'> <a href='#"+RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2+1].Nomi.Casa+"'>")
document.write(" <scr" + "ipt type='text/javascript'>document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2+1].Gol.Casa)</scr" + "ipt> ")

document.write("-")
document.write(" <scr" + "ipt type='text/javascript'>document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2+1].Gol.Fuori)</scr" + "ipt> ")
document.write(" </a></TD>")
document.write("<TD class='rigaP3' align='left'>")
document.write(" <scr" + "ipt type='text/javascript'>document.write (RiempiListaIncontri(GetUltimaGiornataGiocata(),0)[conta2+1].Nomi.Fuori)</scr" + "ipt> ")
document.write(" </TD>")
document.write(" </TR>")
    }
}

document.write(" </TABLE> ")

document.write(" <br>")
//modificata by Puffin
//********************
