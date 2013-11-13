var API_PHP ="http://devtucompass.tk/pici/BackEnd/Clases/chatAdmin.php";
var API_REST = "http://devtucompass.tk/pici/API/";
$.support.cors = true;
$.mobile.allowCrossDomainPages = true;
function enviarInfo(){
	$("#enviarInfo").click(function(){
		   $.ajax({
				type: "POST",
	            url: API_PHP,
	            data: $("#info").serialize(), // serializes the form's elements.
				error: function(jqXHR, textStatus, errorThrown){
		                       console.log("hi");
		                       console.log(jqXHR);
		                       console.log(textStatus);
		                       console.log(errorThrown);
		                        //do stuff
		                },
		        cache:false
		}).done( function (data){
				localStorage.cedula= $("#cedula").val();
				$("#cedulaH").attr('value',localStorage.cedula);
				localStorage.useradmin = -1;
				$.mobile.navigate( "#chat");
				sendMessage();
				 
		});
	});
}

function sendMessage(){
	$("#send").click(function(){
		  
		   $.ajax({
				type: "POST",
	            url: API_PHP,
	            data: $("#messagechat").serialize(), // serializes the form's elements.
				error: function(jqXHR, textStatus, errorThrown){
		                       alert("hi");
		                       alert(jqXHR);
		                       alert(textStatus);
		                       alert(errorThrown);
		                        //do stuff
		                },
		        cache:false
		}).done( function (data){
			console.log("la informacion es: "+data);
			
		});
	});
	$("#message").val("");
}

function getLogMessages() {
			var cedula= localStorage.cedula ;
			//alert("la Cedula es: "+cedula);
			var content = "";	
		   $.ajax({
				type: "GET",
	            url: API_REST+"lastLogChat?cedula="+cedula,
				error: function(jqXHR, textStatus, errorThrown){
		                       console.log("hi");
		                       console.log(jqXHR);
		                       console.log(textStatus);
		                       console.log(errorThrown);
		                        //do stuff
		                },
		        cache:false,
		        format:"jsonp",
				 crossDomain: true,
				 async: true
		}).done( function (data){			
			$.each( data, function ( i, item ){
				//alert(item.id);
				if(item.por ==='si'){
					content+='<li data-theme="c">'+
					'<a href="#">'+
				        '<h2>Consulta Sena PICI Dice: </h2>'+		      
				        '<p>'+item.mensaje+'</p>'+
				        '<p class="ui-li-aside"></p>'+
			    	'</a>'+
		    	'</li>';
				}else{
					content+='<li data-theme="e">'+
					'<a href="#">'+
				        '<h2>Tu Dices: </h2>'+		      
				        '<p>'+item.mensaje+'</p>'+
				        '<p class="ui-li-aside"></p>'+
			    	'</a>'+
		    	'</li>';
				}					

			});
			$("#logMensajes").html(content);
			$( "#logMensajes" ).listview( "refresh" );
			                
		});
}

