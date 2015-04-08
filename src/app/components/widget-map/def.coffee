define [
    "knockout"
    "text!./template.html"
], (ko, templateMarkup) ->

    VM = (params) ->

        @mapsScriptLoaded = ko.observable false
        @mapsScriptLoaded.subscribe (newVal) =>
            if newVal is true
                @initializeMap()

        # Subscribe to global "mapLoaded" notification
        app.notifier.subscribe(
            (newVal) ->
                @mapsScriptLoaded newVal
                return newVal
            this,
            "mapLoaded"
        )

        @loadMapsScript()
        return

    VM::initializeMap = () ->

        styles = [
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
        ]

        mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(51.874393,-9.644476),
            disableDefaultUI: true,
            zoomControl: true,
            styles: styles
        }

        pinImage = './src/app/images/heart.png'

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions)

        request = {
            placeId: 'ChIJKzWG0XpsRUgRKZOlTPkYXm0'
        }


        infowindow = new google.maps.InfoWindow()
        service = new google.maps.places.PlacesService map

        service.getDetails request, (place, status) ->

            if status is google.maps.places.PlacesServiceStatus.OK

                marker = new google.maps.Marker
                    map: map,
                    position: place.geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: pinImage

                google.maps.event.addListener marker, 'click', () ->
                    pic = place.photos[7].getUrl({
                        maxHeight:80,
                        maxWidth:120
                    })

                    img = '<img src="' + pic + '"/>'

                    infowindow.setContent img
                    infowindow.open map, @
                    return

            return



    VM::loadMapsScript = () ->

        script = document.createElement 'script'
        script.type = 'text/javascript'
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC3fIS-jYA5Vpe0NxeWWKbAnV4213ffh5g&libraries=places&callback=app.notifyMapLoaded'
        document.body.appendChild script
        return






    return {
        viewModel: VM
        template: templateMarkup
    }