define(["knockout", "text!./template.html", "moment"], function(ko, templateMarkup, moment) {
  var VM;
  VM = function(params) {
    this.weddingDate = moment("2015-08-27");
    this.timeToWedding = this.weddingDate.from(moment(), true);
  };
  VM.prototype.submitForm = function() {
    console.log('submit');
  };
  return {
    viewModel: VM,
    template: templateMarkup
  };
});
