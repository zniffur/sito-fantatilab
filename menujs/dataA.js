var dataGiornata = new Array()
// Immettere le date nel formato inglese: Mese Giorno Anno
// Gennaio = January
// Febbraio = February
// Marzo = March
// Maprile = April
// Maggio = May
// Giugno = June
// Luglio = July
// Agosto = August
// Settembre = September
// Ottobre = October
// Novembre = November
// Dicembre = December

dataGiornata[1] = "august 30 2014 18:00";
dataGiornata[2] = "september 13 2014 18:00";
dataGiornata[3] = "september 20 2014 18:00";
dataGiornata[4] = "september 23 2014 20:45"; // 1° anticipo martedì
dataGiornata[5] = "september 27 2014 18:00";
dataGiornata[6] = "october 04 2014 18:00";
dataGiornata[7] = "october 18 2014 18:00";
dataGiornata[8] = "october 25 2014 15:00"; // 1° anticipo ore 15:00
dataGiornata[9] = "october 28 2014 20:45"; // 1° anticipo martedì
dataGiornata[10] = "november 01 2014 15:00"; // 1° anticipo ore 15:00
dataGiornata[11] = "november 08 2014 18:00";
dataGiornata[12] = "november 22 2014 18:00";
dataGiornata[13] = "november 29 2014 18:00";
dataGiornata[14] = "december 05 2014 20:45"; // 1° anticipo venerdì
dataGiornata[15] = "december 13 2014 18:00";
dataGiornata[16] = "december 18 2014 19:00"; // 1° anticipo giovedì ore 19
dataGiornata[17] = "january 06 2015 15:00";
dataGiornata[18] = "january 10 2015 18:00";
dataGiornata[19] = "january 17 2015 18:00";
dataGiornata[20] = "january 24 2015 18:00";
dataGiornata[21] = "january 31 2015 18:00";
dataGiornata[22] = "february 07 2015 18:00";
dataGiornata[23] = "february 14 2015 18:00";
dataGiornata[24] = "february 21 2015 18:00";
dataGiornata[25] = "february 28 2015 18:00";
dataGiornata[26] = "march 07 2015 18:00";
dataGiornata[27] = "march 14 2015 18:00";
dataGiornata[28] = "march 23 2015 18:00";
dataGiornata[29] = "april 03 2015 15:00";
dataGiornata[30] = "april 11 2015 18:00";
dataGiornata[31] = "april 18 2015 18:00";
dataGiornata[32] = "april 25 2015 18:00";
dataGiornata[33] = "april 29 2015 20:45";
dataGiornata[34] = "may 02 2015 18:00";
dataGiornata[35] = "may 09 2015 18:00";
dataGiornata[36] = "may 16 2015 18:00";
dataGiornata[37] = "may 23 2015 18:00";
dataGiornata[38] = "may 30 2015 18:00";


function initArray() { 
   this.length = initArray.arguments.length
    for (var i = 0; i < this.length; i++)
    this[i+1] = initArray.arguments[i]
}
var DOWArray = new initArray("Dom","Lun","Mar","Mer","Gio","Ven","Sab")
var MOYArray = new initArray("Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic")
var Year,Ore,Minuti

for (t = 1; t < dataGiornata.length ;t++ ) {
   data = new Date(dataGiornata[t])
   Year = data.getFullYear()
   if(data.getHours()<=9?Ore="0"+data.getHours():Ore=data.getHours())
   if(data.getMinutes()<=9?Minuti="0"+data.getMinutes():Minuti=data.getMinutes())
   dataGiornata[t] = DOWArray[(data.getDay()+1)] + " " + data.getDate() + " " + MOYArray[(data.getMonth()+1)] + " " + Year + " ore " + Ore +":" + Minuti
}