var API_SOURCE ="http://devtucompass.tk/pici/API/";
var SourceImagen = "http://devtucompass.tk/pici/img/publicaciones/noticia/"

$.support.cors = true;
$.mobile.allowCrossDomainPages = true;
function cargarNoticias () {
	$.mobile.loading( "show");
	var content = "";	
	$.ajax({
		url: API_SOURCE+"newsList/",
		type:'GET',
		async: true,
		format:"jsonp",
		crossDomain: true,
		error: function(jqXHR, textStatus, errorThrown){
                       console.log("hi");
                       console.log(jqXHR);
                       console.log(textStatus);
                       console.log(errorThrown);
                        //do stuff
                },
        cache:false

	}).done( function (data){
		
		$.each( data, function ( i, item ){
			content  += "<div class=\"ui-grid-b\" id=\"noticia\">"+
                       "<a href=\"DesarrolloNoticia.html?idnoticia="+item['id']+"\" data-ajax=\"false\">"+
                            "<div class=\"ui-block-a\" id=\"imagenLeftnews\">"+
                                "<img src=\"../../img/resources/line.png\">"+
                                "<img src=\""+SourceImagen+item['pic']+"\" height=\"70\" width=\"106\" id=\"photoNews\" >"+
                            "</div>"+
                            "<div class=\"ui-block-b\" id=\"shortDescription\">"+
                                "<h2 id=\"titleNews\">"+item['titulo']+"</h2>"+
                                "<p id=\"contenido\">"+item['Descripcion'].substr(0,90)+"...</p>"+
                            "</div>"+
                            "<div class=\"ui-block-c\" id=\"imagenRight\"><img src=\"../../img/resources/line.png\"></div>"+
                        "</a>"+
                    "</div>";
		});
		$("#contenidoNoticias").append(content);

		$.mobile.loading( "hide");
	});
}

function cargarNoticia (id) {
	$.ajax({
		url: API_SOURCE+"news?id="+id,
		async: true,
		format:"jsonp"
	}).done(function (data){
		$.each( data, function ( i, item ){
				$("#titulo").html(item['titulo']);
				$("#imagen").attr("src",SourceImagen+item['pic']);
				$("#descripcion").html(item.Descripcion);
		});

	});
}