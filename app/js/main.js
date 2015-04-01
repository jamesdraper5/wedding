function initializeMap() {
	var styles = [
		{
			"featureType": "road",
			"elementType": "geometry",
			"stylers": [
				{ "visibility": "simplified" },
				{ "hue": "#ffc300" },
				{ "saturation": -22 },
				{ "lightness": 22 }
			]
		},
		{
			"featureType": "water",
			"stylers": [
				{ "gamma": 1.2 },
				{ "hue": "#004cff" },
				{ "saturation": -45 },
				{ "lightness": -3 }
			]
		},
		{
			"featureType": "landscape.natural",
			"stylers": [
				{ "color": "#D1BBC7" },
				{ "lightness": 62 },
				{ "saturation": 0 },
				{ "gamma": 1.92 }
			]
		}
	];

	var mapOptions = {
		zoom: 15,
		center: new google.maps.LatLng(51.874393,-9.644476),
		disableDefaultUI: true,
		zoomControl: true,
		styles: styles
	};

	

	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	var request = {
	    placeId: 'ChIJKzWG0XpsRUgRKZOlTPkYXm0'
	};

	var infowindow = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);

	service.getDetails(request, function(place, status) {
		
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			console.log('place', place);
			var img = '../images/heart2.png';

			var marker = new google.maps.Marker({
				map: map,
				position: place.geometry.location,
				animation: google.maps.Animation.DROP,
				icon: img
			});
			google.maps.event.addListener(marker, 'click', function() {
				var pic = place.photos[7].getUrl({maxHeight:80, maxWidth:120});
				console.log('pic', pic);
				var img = '<img src="' + pic + '"/>';
				console.log('img', img);
				infowindow.setContent(img);
				infowindow.open(map, this);
			});
		}
	});


}

function loadMapsScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC3fIS-jYA5Vpe0NxeWWKbAnV4213ffh5g&libraries=places&callback=initializeMap';
  document.body.appendChild(script);
}

window.onload = loadMapsScript;



