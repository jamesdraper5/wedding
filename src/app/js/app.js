define(['knockout', 'moment'], function (ko, moment) {

    var components = [
    	'widget-map',
    	'widget-photos',
    	'widget-rsvp'
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

        // Constatnts
	    this.weddingDate = moment("2015-08-27");
	    this.weddingDateString = this.weddingDate.format("MMMM Do YYYY");
	    this.timeToWedding = this.weddingDate.from(moment(), true); // This returns a relevant string depending on the length of time, e.g. "2 days" or "4 months"
        this.apiUrl = "http://api.wedding.local";

        // Display
        this.alertMessage = ko.observable('');
        this.isAlertVisible = ko.observable(false);
        this.alertType = ko.observable('success');
        

	    this.Init();
    }
    
    App.prototype.Init = function(opts) {

    	window.app = this;
	    ko.applyBindings();

    }

    App.prototype.getDaysToWedding = function() {
    	return parseInt(this.weddingDate.diff(moment(), 'days'), 10);
    }

    App.prototype.notifyMapLoaded = function() {
    	
    	this.notifier.notifySubscribers(true, "mapLoaded");

    };

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