define(["knockout", "text!./template.html", "moment"], function(ko, templateMarkup, moment) {
  var VM;
  VM = function(params) {
    this.weddingDate = app.weddingDate;
    this.timeToWedding = app.timeToWedding;
    this.photos = ko.observableArray([]);
    this.photosLoaded = ko.observable(false);
    this.initializePhotos();
  };
  VM.prototype.initializePhotos = function() {
    var self;
    self = this;
    $.getJSON('api/public/photos', {
      weddingdate: this.weddingDate.format("YYYY-MM-DD")
    }, function(response) {
      console.log('response.data', response);
      self.photos(response.data);
      if (self.photos().length) {
        console.log('here');
        self.photosLoaded(true);
      }
    });
  };
  return {
    viewModel: VM,
    template: templateMarkup
  };
});
