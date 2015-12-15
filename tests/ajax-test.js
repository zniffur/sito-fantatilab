// $('#add').on('submit', function() {
// 	var contents = $(this).serialize();
// function Z(IDIncontro,IDSquadra,IDLega,Nome,SquadraDiA,Ruolo,Pos,Rig) {
// 	this.IDIncontro = IDIncontro
// 	this.IDSquadra = IDSquadra
// 	this.IDLega = IDLega
// 	this.Nome = Nome
// 	this.SquadraDiA = SquadraDiA
// 	this.Ruolo = Ruolo
// 	this.Pos = Pos
// 	this.Rig = Rig
// }
// xg72 = "BERISHA Etrit"
// xg302 = "GUERRIERI Guido"
// xa11 = "Lazio"

// var arrFormazioni = new Array();
// arrFormazioni[1] = new Z(10033,11,0,xg72,xa11,1,1,0)
// arrFormazioni[2]=new Z(10033,11,0,xg302,xa11,1,2,0)


// function F(ID,Nome,Presidente,Telef1,Telef2,Telef3,Email,IDDivisione,CreditiResidui) {
// 	this.ID = ID
// 	this.Nome = Nome
// 	this.Presidente = Presidente
// 	this.Telef1 = Telef1
// 	this.Telef2 = Telef2
// 	this.Telef3 = Telef3
// 	this.Email = Email
// 	this.IDDivisione = IDDivisione
// 	this.CreditiResidui = CreditiResidui
// }

// var arrFantasquadre=new Array();
// arrFantasquadre[1]=new F(1,"Roca Junior","Il pres unu tituli","","","","danilo.dimitri@telecomitalia.it",0,151)
// arrFantasquadre[2]=new F(2,"Guffinz SPA","Guf-Cosmo Prof-Zniff","","","","gianluca.foddis@gmail.com; ivan.pazzini@telecomitalia.it; simoneruffino@gmail.com; simone.ruffino@telecomitalia.it",0,139)
// arrFantasquadre[3]=new F(3,"Santos (do Bareira)","Papà boy","","","","antonio.ascolese@telecomitalia.it",0,152)
// arrFantasquadre[4]=new F(4,"Il Ciuccio FC","Peppitez","","","","giuseppe.fioccola@telecomitalia.it",0,152)
// arrFantasquadre[5]=new F(5,"Arte Della Topa","Dell'Arte-Topaz","","","","simone.topazzi@telecomitalia.it; giuseppe.dellarte@guest.telecomitalia.it",0,187)
// arrFantasquadre[6]=new F(6,"Augusta Romulea FC","Marco Graz Delucozzi","","","","marcodeluca74@gmail.com; graziano.bini@telecomitalia.it; marco.materozzi@gmail.com",0,156)
// arrFantasquadre[7]=new F(7,"Atletico Caipirinha","Giova","","","","giovanni.minissale@telecomitalia.it",0,136)
// arrFantasquadre[8]=new F(8,"Zunin San Peterione","Ione","","","","matteo.zunino@telecomitalia.it",0,126)
// arrFantasquadre[9]=new F(9,"SmallAzz","79 cents-Smalleg","","","","daniele.accetta@telecomitalia.it; daniele.gambino@telecomitalia.it",0,145)
// arrFantasquadre[10]=new F(10,"Xeltic Panic","Panico","","","","massimiliano.panico@telecomitalia.it",0,133)
// arrFantasquadre[11]=new F(11,"Cioppese","Ciop","","","","carmine.russo@telecomitalia.it",0,123)
// arrFantasquadre[12]=new F(12,"Heroes de la Baja Jamon","El Burakkkkken","","","","enrico.buracchini@telecomitalia.it",0,150)
// arrFantasquadre[13]=new F(13,"River Cyccy","Cyccy","","","","claudio.claretto@telecomitalia.it",0,153)
// arrFantasquadre[14]=new F(14,"Plineiras","Frattirinella","","","","roberto1.frattini@telecomitalia.it",0,154)

// riempie la combo con i nomi delle sq.
$(document).ready(function() {
	var option = '';
	for (var i = 1; i < arrFantasquadre.length; i++) {
		option += '<option value="'+ arrFantasquadre[i].ID + '">' + arrFantasquadre[i].Nome + '</option>';
	};
	$('#cmbSelSq').empty().append(option);
});

// recupera i voti+b/m per la sq selezionata
$('#btnSubmit').on('click', function() {

	//console.log($('#cmbSelSq :selected').val());
	// var contents = $('#add').serialize();	

	var contents = JSON.stringify(arrFormazioni);
	//console.log(contents);

	//var contents = JSON.stringify({'Nome':xg72});

	$.ajax({
		url: 'ajax-test.php',
		dataType: 'json',
		type: 'post',
		data: {fSquadra:$('#cmbSelSq :selected').val(),frmz:contents},
		success: function(data) {
			console.log(data);

			if (data.success) {
				//$('#result').html(data.result.count + ' ');
				//$('#result').append(arrFantasquadre[data.result.fSquadra].Nome);
				//$('#result').append(JSON.stringify(data.result));
				$('#result').empty();
				//$('#result').html('<table class="table table-striped" id="table_div">')
				
				var table = $('<table></table>').addClass('table table-striped');
				
				// stampa header Nome V AE Gf Gr Gs Rp Rs Au As BM TOT
				table.append($('<thead>'));
				var row = $('<tr>');	
				row.append($('<th>').html('Nome'));
				row.append($('<th>').html('Voto'));
				row.append($('<th>').html('A/E'));
				row.append($('<th>').html('Gf'));
				row.append($('<th>').html('Gr'));
				row.append($('<th>').html('Gs'));
				row.append($('<th>').html('Rp'));
				row.append($('<th>').html('Rs'));
				row.append($('<th>').html('Au'));
				row.append($('<th>').html('As'));
				row.append($('<th>').html('BM'));
				row.append($('<th>').html('TOT'));


				table.append(row);
				// stampa titolari
				for(key in data.result)
				{
					// console.log(key + ':' + data.result[key]);
					//$('#result').append('<p>' + key + ':' + data.result[key] + '</p>')
					var row = $('<tr>');
					
					row.append($('<td>').html(key));

					var stats_calciatore = data.result[key];

					if (!(jQuery.isEmptyObject(stats_calciatore)))
						$.each(stats_calciatore, function(index, value){
							row.append($('<td>').html(value));	
						});
					
					// row.append($('<td>').html('stats_calciatore'));
				    table.append(row);

				}
				
				// stampa riserve
				var row = $('<tr>');
				table.append(row.append($('<td>').html('')))
				
				for(key in data.riserve)
				{
					// console.log(key + ':' + data.result[key]);	
					//$('#result').append('<p>' + key + ':' + data.riserve[key] + '</p>');
					var row = $('<tr>');
					
					row.append($('<td>').html(key));

					var stats_calciatore = data.riserve[key];

					if (!(jQuery.isEmptyObject(stats_calciatore)))
						$.each(stats_calciatore, function(index, value){
							row.append($('<td>').html(value));	
						});
					
					// row.append($('<td>').html('stats_calciatore'));
				    table.append(row);
				}
				$('#result').append('<p>');
				$('#result').append(table);	
			}

		},
		error: function(e) {
			console.log(e.message);
		}
	});

	return false;
});

// pulisce il div dove vengono visualizzate le stats
$('#btnClear').on('click', function() {
	$('#result').empty();
});


// var contents = new Object();
// contents.last_name = 'Mirante';
// contents.ruolo = 'P';
// contents.sq = 'Roca Junior'
// console.log(contents);



// 	var contents = 
// 	{
//     "glossary": {
//         "title": "example glossary",
// 		"GlossDiv": {
//             "title": "S",
// 			"GlossList": {
//                 "GlossEntry": {
//                     "ID": "SGML",
// 					"SortAs": "SGML",
// 					"GlossTerm": "Standard Generalized Markup Language",
// 					"Acronym": "SGML",
// 					"Abbrev": "ISO 8879:1986",
// 					"GlossDef": {
//                         "para": "A meta-markup language, used to create markup languages such as DocBook.",
// 						"GlossSeeAlso": ["GML", "XML"]
//                     },
// 					"GlossSee": "markup"
//                 }
//             }
//         }
//     }
// };