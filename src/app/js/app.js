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

	    this.weddingDate = moment("2015-08-27");
	    this.weddingDateString = this.weddingDate.format("MMMM Do YYYY");
	    this.timeToWedding = this.weddingDate.from(moment(), true); // This returns a relevant string depending on the length of time, e.g. "2 days" or "4 months"

        this.apiUrl = "http://api.wedding.local";

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

    return App;

});