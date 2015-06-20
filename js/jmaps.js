javascript

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

				//
				
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


