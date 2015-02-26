var arrF = new Object()
arrF = arrFantasquadre

document.write(" <table border='0' width='100%' cellspacing='0' cellpadding='0'> ")


	for (conta=1;conta<arrF.length;conta++) { 



if( conta % 2 == 0 ) document.write("<tr class='r'><td align='left'>")
else document.write("<tr class='d'> <td align='left'>")


					document.write(" <div style='float:left;width:10%;'> ")
					document.write(""+conta+"</div>")
					document.write(" <div style='float:left;width:60%;'> ")
					document.write(""+arrClassifica[conta].Nome+"</div>")
					document.write(" <div style='float:right;width:15%;'>")
					document.write(""+arrClassifica[conta].TTot+"</div>")
					document.write(" <div style='float:right;width:15%;'><strong>")
					document.write(""+arrClassifica[conta].Punti+"")
					document.write(" </strong></div> ")
					document.write("</td></tr> ")



}




document.write("</table>")