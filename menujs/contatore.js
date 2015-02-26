if ( contatore == "altervista" )
{
document.write(" <script type='text/javascript' src=\"http://www.altervista.org/js_tags/contatore.js\"></scr" + "ipt> ")
}


if ( contatore == "mystat" )
{
document.write(" <script type='text/javascript' src=\"http://www.mystat.ws/logo.asp?utente="+NumeroUtente+"\"></scr" + "ipt> ")
}


if ( contatore == "shinystat" )
{
///document.write(" <script type='text/javascript' src=\"http://codice.shinystat.it/cgi-bin/getcod.cgi?USER="+shinystat+"&FRAME=yes\"></scr" + "ipt> ")
document.write(" <A HREF=\"http://www.shinystat.it\" target=\"_top\"><IMG SRC=\"http://www.shinystat.it/cgi-bin/shinystat.cgi?USER="+shinystat+"&FRAME=yes\" ALT='Contatore visite gratuito' BORDER='0'></A> ")
}

if ( contatore == "mrwebmaster" )
{
document.write(" <script language='JavaScript' src=\"http://tools.mrwebmaster.it/work/onlineusers.php?id="+onlineusers+"\"></scr" + "ipt> ")
}