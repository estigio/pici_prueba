var API_SOURCE ="http://devtucompass.tk/pici/API/";
$.support.cors = true;
$.mobile.allowCrossDomainPages = true;

function getZonas () {
	var content = "";	
	$.ajax({
		url: API_SOURCE+"getzonas",
		type:'GET',
		async: true,
		format:"jsonp",
		crossDomain: true,
		error: function(jqXHR, textStatus, errorThrown){
                       console.log("hi");
                       console.log(jqXHR);
                       console.log(textStatus);
                       console.log(errorThrown);
                       $("#message").html("Error Al cargar los Datos"+jqXHR);
                },
        cache:false
	}).done( function (data){		
		$.each( data, function ( i, item ){
			
			content  +='<div data-role="collapsible" data-iconpos="bottom">'+
                        '<h3 id="titlebuton">'+item['nombre']+'</h3>';
                        
                       for(departamento in item.dep){
	                        //content += '<li> <a href="'+item.dep[departamento].nombre+'">'+item.dep[departamento].nombre+'</a></li>';							        
					   		content += '<div class="ui-grid-solo" id="contentItem">' +
					                         '<a href="educationPC.html?type=Ciudades&idDep='+item.dep[departamento].id+'" rel="external" data-ajax="false">'+       
					                             '<div id="listItem" class="ui-grid-b">'+
					                                '<div class="ui-block-a"></div> '+ 
					                                 '<div id="textButtonL" class="ui-block-c">'+
					                                  '<div>'+item.dep[departamento].nombre+'</div>'+
					                                '</div>'+
					                               ' <div class="ui-block-d" id="iconoBotonright"><img src="../../img/icons/icons_sena/FlechaBoton.png"></div>'+             
					                            '</div>'+
					                        '</a>'+
					                    '</div>';               

					    }
            content+='</div>';

		});
		$("#contenidoOpciones").append(content);
		
		$('#contenidoOpciones').trigger('create');
		$("#contenidoOpciones").collapsibleset('refresh');
	});

}



function getPlaces(idDep) {
	var content = "";	
	$.ajax({
		url: API_SOURCE+"getPlaces?idDep="+idDep,
		type:'GET',
		async: true,
		format:"jsonp",
		crossDomain: true,
		error: function(jqXHR, textStatus, errorThrown){
                       console.log("hi");
                       console.log(jqXHR);
                       console.log(textStatus);
                       console.log(errorThrown);
                       $("#message").html("Error Al cargar los Datos"+jqXHR);
                },
        cache:false
	}).done( function (data){		
		content  +='<ul data-role="listview" data-inset="true" data-divider-theme="c" id="listaplaces" data-theme="c">';
		$.each( data, function ( i, item ){
			
			
                       content  += '<li data-role="list-divider">'+item['nombre']+'</li>';
                        
                       for(lugar in item.lug){
	                       content += '<li id="itemlista">'+
	                       		'<div class="ui-grid-solo" id="contentItem">' +
					                         '<a id="place" href="#" value="'+item.lug[lugar].id+'" >'+       
					                             '<div id="listItem" class="ui-grid-b">'+
					                                '<div class="ui-block-a"></div> '+ 
					                                 '<div id="textButtonL" class="ui-block-c">'+
					                                  '<div>'+item.lug[lugar].nombre+'</div>'+
					                                '</div>'+
					                               ' <div class="ui-block-d" id="iconoBotonright"><img src="../../img/icons/icons_sena/FlechaBoton.png"></div>'+             
					                            '</div>'+
					                        '</a>'+
					                    '</div>'+
	                       '</li>';      
					    }
           

		});

		 content+='</ul>';
		$("#contenidoOpciones").html(content);		
		$('#contenidoOpciones').trigger('create');
		$('#contenidoOpciones').trigger('refresh');

		 $("#listaplaces li a").click(function () {
	                   var id = $(this).attr("value"); 
	                  	var content = "";	
						$.ajax({
							url: API_SOURCE+"getPlace?id="+id,
							type:'GET',
							async: true,
							format:"jsonp",
							crossDomain: true,
							error: function(jqXHR, textStatus, errorThrown){
					                       console.log("hi");
					                       console.log(jqXHR);
					                       console.log(textStatus);
					                       console.log(errorThrown);
					                       $("#message").html("Error Al cargar los Datos"+jqXHR);
					                },
					        cache:false
						}).done( function (data){		
							$.each( data, function ( i, item ){
								$("#tituloLugar").html(item.nombre);
								$("#descripcionLugar").html(item.descripcion);

								
								GMaps.geolocate({
								  success: function(position) {
								    var map = new GMaps({
								  div: '#mapa',
								  width: 300,
								  height: 500,
								  lat: item.lat,
								  lng: item.long
								});

								map.addMarker({
								    lat: item.lat,
									lng: item.long,
							        title: item.nombre,
							        infoWindow: {
							          content: '<p>'+item.descripcion+'</p>'
							        }
							      });

								map.drawRoute({
								  origin: [position.coords.latitude, position.coords.longitude],
								  destination: [item.lat, item.long],
								  travelMode: 'driving',
								  strokeColor: 'green',
								  strokeOpacity: 0.6,
								  strokeWeight: 6
								});

								  },
								  error: function(error) {
								    console.log('La geolocalizaión ha fallado log: '+error.message);
								    $("#mensajesMapa").html('Para Usar la Geolocalizacion debes activar tu GPs y'+
								     'dar permisos a la aplicación para que  lo utilice ');
									var map = new GMaps({
									  div: '#mapa',
									  width: 300,
									  height: 500,
									  lat: item.lat,
									  lng: item.long
									});

									map.addMarker({
								    lat: item.lat,
									lng: item.long,
							        title: item.nombre,
							        infoWindow: {
							          content: '<p>'+item.descripcion+'</p>'
							        }
							      });
								  },
								  not_supported: function() {
								    alert("Tu Dispositivo no soporta Geolocalización");
								  },
								  always: function() {
								    console.log("Done! Ubicado");
								     $("#mensajesMapa").html('En este mapa encontraras, ubicación en el mapa del centro seleccionado,');

								  }
								});
								
							});	
							$('#place').trigger('refresh');
							$.mobile.navigate( "#place",{ transition: "slide"});
						});
					        			
		 });

	 });
		
}

function lugar(id) {
	var content = "";	
	$.ajax({
		url: API_SOURCE+"getPlace?id="+id,
		type:'GET',
		async: true,
		format:"jsonp",
		crossDomain: true,
		error: function(jqXHR, textStatus, errorThrown){
                       console.log("hi");
                       console.log(jqXHR);
                       console.log(textStatus);
                       console.log(errorThrown);
                       $("#message").html("Error Al cargar los Datos"+jqXHR);
                },
        cache:false
	}).done( function (data){		
		$.each( data, function ( i, item ){
			alert(item.nombre);
			$("#tituloLugar").html(item.nombre);
			$("#descripcionLugar").html(item.descripcion);
			$("#lat").html(item.lat);
			$("#long").html(item.long);

		});	
		$('#infoLugar').trigger('refresh');
		

		
		$.mobile.navigate("#infoLugar");

	});
}

 