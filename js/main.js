$('button[data-ajax]').on("click", function(e){
		window.location.href = "modulo/ristorante/comanda?id=" + $(this).attr("data-ajax");
	})
	
	
$(function()
{
	var dataList = $("#json-datalist");
	var out = $("[list='json-datalist']");
	var progress=$("[ajax-prog]");

	if ( out == undefined) alert("?");
	else
	$.ajax({
		type:"POST",
		url:"/modulo/ristorante/ajax/categoria/index",
		dataType:"json",
		data: {"data": "a" },
		success : function ( data){
			for (i = 0 ; i < Object.keys(data).length ; i++){
				fdata = data[i];
				var option = document.createElement('option')
				option.value = fdata.nome;
				dataList.append(option)
			}
			progress.hide();
			out.attr('placeholder' , "seleziona...")
		},
		error : function(xhr, message){
			alert (xhr.status + " " + message)
			$out.placeholder = "Errore caricamento";
		}		
	
	})
	
})
$(function()
{
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();

        var controlForm = $('.controls div:first'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').css("opacity" , "0.77")
            .html('<span class="fa fa-lg fa-minus-square" style="color:red;cursor:pointer"></span>');
    }).on('click', '.btn-remove', function(e)
    {
		$(this).parents('.entry:first').remove();

		e.preventDefault();
		return false;
	});
});

$( document.body ).on( 'click', '.dropdown-menu li', function( event ) {
 
   var $target = $( event.currentTarget );
 
   var mania = $target.closest( '.btn-group' )// attenzione a data bind label
      .find( '[data-bind="label"]' ).text( $target.text() )
      .end()
	mania.find( 'span[data-bind-prezzo]').text($target.attr("prezzo") )
		.end()
      .children( '.dropdown-toggle' ).dropdown( 'toggle' );
 
   return false;
 
});
(function (){
$("form").on('submit', function (ev){
	ev.preventDefault();
	ev.stopImmediatePropagation();
	
	
	
	
	
	
})
})
var ok = 0;
function checkForm(){
	var validator = $("form:first").validate();
	ok = validator.form();
}

$( document ).ready(function (){
	$(".btn-save").click( function(e){
	e.preventDefault();
	
	e.stopImmediatePropagation();
	if ( false ) ;
	
	else {
		extraDescr = $("#formato input[data-nome]")
		extraPrice = $("#formato input[data-costi]")
		var notify = $("div[ajax-result]");
		i = extraDescr.length;
		var formato = {};
		
		while (i--){
			if ($(extraDescr[i]).val() != "" && $(extraPrice[i]).val() == "")
				return alert("inserire prezzo formato");
			if ($(extraDescr[i]).val() == "" && $(extraPrice[i]).val() != "")
				return alert("inserire descrizione formato");
			formato["id"+i] = { "descr" : $(extraDescr[i]).val() , "prezzo" : $(extraPrice[i]).val() } 

		}
		var portata = {}
		portata["nome"] = $("input[name='nome_portata']").val();
		if (portata["nome"] == "" ) 
			return alert( "inserire nome")
		portata["prezzo_def"] = $("input[name='prezzo_portata']").val();
		if (portata["prezzo_def"] == "" )
			return alert( "inserire prezzo")
		portata["categoria"] = $("input[name='categoria']").val();
		portata["agg_nome"] = $("input[name='extra_nome']").val();
		portata["agg_prezzo"] = $("input[name='extra_prezzo']").val();
		portata["formati"] = formato;
		$.ajax({
			type:"POST",
			url : "/modulo/ristorante/ajax/portata_insert/index",
			dataType:"html",
			data: JSON.stringify(portata),
			success: function (data){
				alert(data)
				if (data.error != "" ){
					notify.text("inserito con successo");
					notify.css("border-color" , "green");
				}
				else{
					notify.text("errore caricamento");
					notify.css("border-color" , "red");
				}
				window.setTimeout(function(){
					notify.hide();
				},2000);
				notify.show();
				
			},
			error : function(xhr , data){
				alert(xhr.status + " " + data)
			}
		
		})

	}
	
})
})
var comande = {};
var id = 0;
function ComandaAddPortata (seriale){
		
		var comandaRowData = $("tr#"+ seriale);
		var comandaData ={};

		nomePortata = comandaRowData.find("td:nth-of-type(1)").text();
		defPrezzo  = comandaRowData.find("td:nth-of-type(5)").text();
		idTavolo = comandaRowData.find("span[data-id-tavolo]").text();
		formato  = comandaRowData.find("td:nth-of-type(3) span[data-bind]").text(); // 
		formPrezzo = comandaRowData.find("td:nth-of-type(3) span[data-bind-prezzo]").text();
		aggiunte = comandaRowData.find("td:nth-of-type(4)").text();
		//alert(formPrezzo)
		comandaData["seriale"] = seriale;
		comandaData["descr"] = nomePortata;
		comandaData["def_prezzo"] = defPrezzo;
		comandaData["id_tavolo"] = idTavolo;
		comandaData["formato"] = formato;
		comandaData["form_prezzo"] = formPrezzo;
		comandaData["extra"] = aggiunte;
		comandaData["stato"] = 'OPEN';
		comande["id" + id] = comandaData;
		id++;
		//alert(JSON.stringify(comande))
		refreshTable(comande);
}

function refreshTable(arrayComande){
	var table = $("#comanda tbody");
	table.empty();
	chiavi = Object.keys(arrayComande);
	
	tbody = "";
		for (i in chiavi){
			key = chiavi[i]
			tbody += "<tr>";
			tbody += "<td comanda='" + key + "'><button class='btn btn-warning cursor-pointer' onclick=\"cancella('" + key + "')\">-</button></td>"
			tbody += "<td>" + arrayComande[key].descr + "</td>"
			tbody += "<td>" + arrayComande[key].formato + "</td>"
			tbody += "<td>" + arrayComande[key].def_prezzo + "</td>"
			tbody += "<td>" + arrayComande[key].extra + "</td>"
			tbody += "<td>" + arrayComande[key].form_prezzo + "</td>"
			
			tbody += "</tr>";
		}
	
	$("#comanda tbody").html(tbody);
}

function cancella(quale){
	
	delete comande[quale];
	refreshTable(comande);
}



