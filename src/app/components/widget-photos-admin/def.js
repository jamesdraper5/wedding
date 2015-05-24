define(["knockout", "text!./template.html", "moment"], function(ko, templateMarkup, moment) {
  var VM;
  VM = function(params) {
    this.weddingDate = app.weddingDate;
    this.timeToWedding = app.timeToWedding;
    this.initializePhotosAdmin();
  };
  VM.prototype.initializePhotosAdmin = function() {
    app.notifier.subscribe(function(response) {
      this.statusChangeCallback(response);
      return response;
    }, this, "facebookEvent");
  };
  VM.prototype.statusChangeCallback = function(response) {
    console.log('statusChangeCallback');
    console.log('response', response);
    if (response.status === 'connected') {
      console.log('connected');
      this.storeFacebookToken();
    } else if (response.status === 'not_authorized') {
      console.log('Please log into this app.');
    } else {
      console.log('Please log into Facebook.');
    }
  };
  VM.prototype.storeFacebookToken = function() {
    console.log('storeFacebookToken');
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      return console.log('Successful login for: ' + response.name);
    });
    console.log('TO DO: Save Facebook Auth token to server...');
  };
  VM.prototype.checkLoginState = function() {
    console.log('checkLoginState');
  };
  return {
    viewModel: VM,
    template: templateMarkup
  };
});
