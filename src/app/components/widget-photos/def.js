define(["knockout", "text!./template.html", "moment"], function(ko, templateMarkup, moment) {
  var VM;
  VM = function(params) {
    this.weddingDate = app.weddingDate;
    this.timeToWedding = app.timeToWedding;
  };
  VM.prototype.initializePhotos = function() {};
  return {
    viewModel: VM,
    template: templateMarkup
  };
});
