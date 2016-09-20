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
dataGiornata[1] = "August 21 2016"
dataGiornata[2] = "August 28 2016"
dataGiornata[3] = "September 11 2016"
dataGiornata[4] = "September 18 2016"
dataGiornata[5] = "September 21 2016"
dataGiornata[6] = "September 25 2016"
dataGiornata[7] = "October 2 2016"
dataGiornata[8] = "October 16 2016"
dataGiornata[9] = "October 23 2016"
dataGiornata[10] = "October 26 2016"
dataGiornata[11] = "October 30 2016"
dataGiornata[12] = "November 6 2016"
dataGiornata[13] = "November 20 2016"
dataGiornata[14] = "November 27 2016"
dataGiornata[15] = "December 4 2016"
dataGiornata[16] = "December 11 2016"
dataGiornata[17] = "December 18 2016"
dataGiornata[18] = "December 22 2015"
dataGiornata[19] = "January 8 2017"
dataGiornata[20] = "January 15 2017"
dataGiornata[21] = "January 22 2017"
dataGiornata[22] = "January 29 2017"
dataGiornata[23] = "February 5 2017"
dataGiornata[24] = "February 12 2017"
dataGiornata[25] = "February 19 2017"
dataGiornata[26] = "February 26 2017"
dataGiornata[27] = "March 5 2017"
dataGiornata[28] = "March 12 2017"
dataGiornata[29] = "March 19 2017"
dataGiornata[30] = "April 2 2017"
dataGiornata[31] = "April 9 2017"
dataGiornata[32] = "April 15 2017"
dataGiornata[33] = "April 23 2017"
dataGiornata[34] = "April 30 2017"
dataGiornata[35] = "May 7 2017"
dataGiornata[36] = "May 14 2017"
dataGiornata[37] = "May 21 2017"
dataGiornata[38] = "May 28 2017"

function initArray() {  
   this.length = initArray.arguments.length
    for (var i = 0; i < this.length; i++)
    this[i+1] = initArray.arguments[i]
}
var DOWArray = new initArray("Dom","Lun","Mar","Mer","Gio","Ven","Sab")
var MOYArray = new initArray("Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic")
var Year
//for (t = 1; t < dataGiornata.length-1 ;t++ ) {
for (t = 1; t < dataGiornata.length ;t++ ) {
   data = new Date(dataGiornata[t])
   Year = data.getYear()
   if (Year < 2000)
      Year = Year + 1900
   dataGiornata[t] = DOWArray[(data.getDay()+1)] + " " + data.getDate() + " " + MOYArray[(data.getMonth()+1)] + " " + Year
}