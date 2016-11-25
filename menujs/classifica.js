document.write("<table border=1 bgcolor=#999999 width=100% cellspacing=0 cellpadding=2>")
for (conta=1;conta<=NumSquVisCla;conta+=1)
{
offset = 8
document.write("<tr>")

if( conta % 2 == 0 ) document.write("<td bgcolor='#FFFFFF' align='left'><font size=1>")
else document.write("<td bgcolor='#CCCCCC' align='left'><font size=1>")

document.write(" <div align='left'><scr" + "ipt type='text/javascript'> ")
document.write(" document.write (arrClassifica[conta+offset].Nome) ")
document.write(" </scr" + "ipt> ")
document.write(" </font></td> ")

if( conta % 2 == 0 ) document.write("<td bgcolor='#FFFFFF' align='middle'><font size=1>")
else document.write("<td bgcolor='#CCCCCC' align='middle'><font size=1>")

document.write(" <scr" + "ipt type='text/javascript'> ")
document.write(" document.write (arrClassifica[conta+offset].Punti)  ")
document.write(" </scr" + "ipt></div></font></td></tr> ")
}

document.write("</table>")