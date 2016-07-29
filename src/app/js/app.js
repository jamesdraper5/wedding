define(['knockout', 'moment', 'bindings-ladda'], function (ko, moment) {

    var components = [
        'widget-map',
        'widget-photos',
        'widget-photos-admin',
        'widget-rsvp',
        'widget-seating-plan'
    ];


    var component, i, len;
    for (i = 0, len = components.length; i < len; i++) {
        component = components[i];
        ko.components.register(component, {
            require: "src/app/components/" + component + "/def"
        });
        //return;
    }



    var App = function() {

        // Global App Pub/Sub notifier
        this.notifier = new ko.subscribable();

        // Constants
        this.weddingDate = moment("2015-08-27");
        this.weddingDateString = this.weddingDate.format("MMMM Do YYYY");
        this.timeToWedding = this.weddingDate.from(moment(), true); // This returns a relevant string depending on the length of time, e.g. "2 days" or "4 months"
        this.apiUrl = "http://api.wedding.local";
        this.facebookAppId = '373556092853314';
        this.isFacebookTokenOkay = false; // If this is false we need to get site owners permission to access FB pics. This is hardcoded for now but in real app it would come from API

        // Display
        this.alertMessage = ko.observable('');
        this.isAlertVisible = ko.observable(false);
        this.alertType = ko.observable('success');


        this.Init();
    }

    App.prototype.Init = function(opts) {

        window.app = this;
        window.fbAsyncInit = this.fbAsyncInit;
        ko.applyBindings();

        // TO DO: Make API call to get all dynamic site info from DB
        // isFacebookTokenOkay = true;

        if ( !this.isFacebookTokenOkay ) {
            //this.initializeFacebook();
        }

    }

    App.prototype.getDaysToWedding = function() {
        return parseInt(this.weddingDate.diff(moment(), 'days'), 10);
    }

    App.prototype.notifyMapLoaded = function() {

        this.notifier.notifySubscribers(true, "mapLoaded");

    };


    // Facebook stuff
    App.prototype.initializeFacebook = function() {
    	//console.log('initializeFacebook');
		// Load the SDK asynchronously
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
    }

    App.prototype.notifyFacebookEvent = function(response) {
        //console.log('notifyFacebookEvent');
        this.notifier.notifySubscribers(response, "facebookEvent");
    };


	App.prototype.fbAsyncInit = function() {
		var self = this.app;

		console.log('fbAsyncInit');
		console.log('self', self);

		FB.init({
			appId      : '376809592527964',
			cookie     : true,  // enable cookies to allow the server to access the session
			xfbml      : true,  // parse social plugins on this page
			version    : 'v2.2' // use version 2.2
		});


		FB.getLoginStatus(function(response) {
			console.log('FB.getLoginStatus');
            self.notifyFacebookEvent(response);
		});

    };

    App.prototype.checkLoginState = function() {
        var self = this;

        console.log('checkLoginState');
        FB.getLoginStatus(function(response) {
            self.notifyFacebookEvent(response);
        });
    }
    // END Facebook stuff




    App.prototype.showAlert = function(options) {

        this.alertMessage(options.alertMessage)
        this.alertType(options.alertType);
        this.isAlertVisible(true);

    };

    App.prototype.getAlertClasses = function() {

        var classes = "";
        var alertType = "alert-" + this.alertType();

        if ( this.isAlertVisible() ) {
            classes += "shown ";
        }

        classes += alertType;

        return classes;

    };

    App.prototype.hideAlert = function(data, event) {

        console.log( 'this: ', this );

        this.alertMessage('')
        this.alertType('');
        this.isAlertVisible(false);

    };

    return App;

});