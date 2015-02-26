document.write(" <TABLE width=100% border=0 cellPadding=2 cellSpacing=0> ")


if (NumIncVisProTur > 0) {
document.write(" <TD colspan=3 class='rigaTiT'><strong>")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetProssimaGiornataDaGiocare(),0)[1].Competizione) </scr" + "ipt></strong> ")
document.write(" <br><span class='rigaDaT'><scr" + "ipt type='text/javascript'> ")
document.write(" document.write (dataGiornata[RiempiListaIncontri(GetProssimaGiornataDaGiocare(),0)[1].GiornataDiA])</scr" + "ipt><br><br></span></td> ")
}


for (conta1=1;conta1<=NumIncVisProTur;conta1+=2)
{

document.write(" <TR class='r' ><TD align='right'  width='45%' > ")
document.write(" <scr" + "ipt type='text/javascript'> ") 
document.write(" document.write (RiempiListaIncontri(GetProssimaGiornataDaGiocare(),0)[conta1].Nomi.Casa)</scr" + "ipt> ")
document.write("</td><td align='center'  width='20'><a href='form.php#"+RiempiListaIncontri(GetProssimaGiornataDaGiocare(),0)[conta1].Nomi.Casa+"'> - </a></td><td  align='left'  width='45%'>")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetProssimaGiornataDaGiocare(),0)[conta1].Nomi.Fuori)</scr" + "ipt> ")
document.write(" </TD></TR> ")
if (conta1<NumIncVisProTur)
    {
document.write(" <TR class='d'><TD align='right'  width='45%'> ")
document.write(" <scr" + "ipt type='text/javascript'> ") 
document.write(" document.write (RiempiListaIncontri(GetProssimaGiornataDaGiocare(),0)[conta1+1].Nomi.Casa)</scr" + "ipt> ")
document.write("</td><td align='center' width='20'><a href='form.php#"+RiempiListaIncontri(GetProssimaGiornataDaGiocare(),0)[conta1+1].Nomi.Casa+"'> - </a></td><td  align='left'  width='45%'>")
document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (RiempiListaIncontri(GetProssimaGiornataDaGiocare(),0)[conta1+1].Nomi.Fuori)</scr" + "ipt> ")
document.write(" </TD></TR> ")
    }
}
document.write(" </TABLE> ")