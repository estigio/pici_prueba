var API_SOURCE ="http://devtucompass.tk/pici/API/";
var SourceImagen = "http://devtucompass.tk/pici/img/publicaciones/genericas/";
$.support.cors = true;
$.mobile.allowCrossDomainPages = true;
function getGenericList (type) {
	$.mobile.loading("show");
	var content = "";	
	$.ajax({
		url: API_SOURCE+"getGenericList?type="+type,
		type:'GET',
		async: true,
		format:"jsonp",
		crossDomain: true,
		error: function(jqXHR, textStatus, errorThrown){
                       console.log("hi");
                       console.log(jqXHR);
                       console.log(textStatus);
                       console.log(errorThrown);
                },
        cache:false
	}).done( function (data){		
		$.each( data, function ( i, item ){
			content  += "<div class=\"ui-grid-b\" id=\"Item\">"+
                       "<a href=\"post.html?id="+item['id']+"\" data-ajax=\"false\">"+
                            "<div class=\"ui-block-a\" id=\"imagenLeftItem\">"+
                                "<img src=\"../../img/resources/line.png\">"+                               
                            "</div>"+
                            "<div class=\"ui-block-b\" id=\"shortDescriptionitem\">"+
                                "<h2 id=\"titleItem\">"+item['Titulo']+"</h2>"+
                                "<p id=\"contenido\">"+item['Descripcion'].substr(0,90)+"...</p>"+
                            "</div>"+
                            "<div class=\"ui-block-c\" id=\"imagenRight\">"+
                            "<img src=\""+SourceImagen+item['pic']+"\" height=\"70\" width=\"106\" id=\"photoNews\" >"+
                            "<img src=\"../../img/resources/line.png\">"+
                            	
                           "</div>"+
                        "</a>"+
                    "</div>";
		});
		$("#contenidoNoticias").append(content);

		$.mobile.loading( "hide");
	});
}

function getGenericPublication (id) {
	$.ajax({
		url: API_SOURCE+"getGenericPublication?id="+id,
		async: true,
		format:"jsonp"
	}).done(function (data){
		$.each( data, function ( i, item ){
				$("#titulo").html(item['Titulo']);
				$("#imagen").attr("src",SourceImagen+item['pic']);
				$("#descripcion").html(item.Descripcion);
		});

	});
}