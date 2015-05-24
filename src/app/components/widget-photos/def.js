define(["knockout", "text!./template.html", "moment"], function(ko, templateMarkup, moment) {
  var VM;
  VM = function(params) {
    this.weddingDate = app.weddingDate;
    this.timeToWedding = app.timeToWedding;
    this.photos = ko.observableArray([]);
    this.initializePhotos();
  };
  VM.prototype.initializePhotos = function() {
    var self;
    self = this;
    $.getJSON('api/public/photos', function(response) {
      console.log('photos', response.data);
      console.log('this', this);
      self.photos(response.data);
    });
  };
  return {
    viewModel: VM,
    template: templateMarkup
  };
});
