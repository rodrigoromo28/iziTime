
function cerrar(){
	navigator.app.exitApp();// window.parent.close();
}

function farenheit(){
var celsius, farenheit, resultado;
resultado=(celsius*9/5)+32;
	
}
function celsius(){
	var celsius, farenheit, resultado;
resultado=(farenheit-32*5)/9;
	
}


function visitar_pagina(){
	location.href='https://www.facebook.com/iziTime';
}


var watchId = null;
function geoloc() {
	if (navigator.geolocation) {
		var optn = {
			enableHighAccuracy : true,
			timeout : Infinity,
			maximumAge : 0
		};
		watchId = navigator.geolocation.watchPosition(showPosition, showError, optn);
	} else {
		alert('La geolocalización no es soportada por tu navegador');
	}
}


function showPosition(position) {
	var googlePos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var mapOptions = {
		zoom : 12,
		center : googlePos,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	var mapObj = document.getElementById('mapdiv');
	var googleMap = new google.maps.Map(mapObj, mapOptions);
	var markerOpt = {
		map : googleMap,
		position : googlePos,
		animation : google.maps.Animation.DROP
	};
	var googleMarker = new google.maps.Marker(markerOpt);
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		'latLng' : googlePos
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[1]) {
				var popOpts = {
					content : results[1].formatted_address,
					position : googlePos
				};
				var direccion = results[1].formatted_address;

				output = document.getElementById('direccion').innerHTML = direccion;
				//console.log(results[1].formatted_address);
				var popup = new google.maps.InfoWindow(popOpts);
				google.maps.event.addListener(googleMarker, 'click', function() {
					popup.open(googleMap);
				});
			} else {
				alert('Los resultados no fueron encontrados');
			}
		} else {
			alert('El código geo falló debido a: ' + status);
		}
	});
}

//Error es el parametro que se nos enviara en caso de error (Lo envia la localizacion de GMaps)
function showError(error) {
	var err = document.getElementById('mapdiv');
	switch(error.code) {
		case error.PERMISSION_DENIED:
		err.innerHTML = "El usuario denegó la petición para la geolocalización."
		break;
		case error.POSITION_UNAVAILABLE:
		err.innerHTML = "La información de localización no está disponible."
		break;
		case error.TIMEOUT:
		err.innerHTML = "La petición de localización del usuario excedió el tiempo de espera."
		break;
		case error.UNKNOWN_ERROR:
		err.innerHTML = "Error desconocido."
		break;
	}
}
//YAHOO WEATHER API
<script>
  var callbackFunction = function(data) {
    var wind = data.query.results.channel.wind;
    alert(wind.chill);
  };
</script>
 

<script src="https://query.yahooapis.com/v1/public/yql?q=select wind from weather.forecast where woeid in (select woeid from geo.places(1) where text='chicago, il')&format=json&callback=callbackFunction"></script>

//var Client ID = "dj0yJmk9VElwbEVRczl4Q3lFJmQ9WVdrOVUwdFJlRkpKTkdzbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0xNw--";
//var Client Secret = "bf2bdd1c6f39de1c02a919c2e0f384636369e073";