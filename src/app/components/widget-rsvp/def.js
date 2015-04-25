define(["knockout", "text!./template.html", "moment"], function(ko, templateMarkup, moment) {
  var VM;
  VM = function(params) {
    this.weddingDate = moment("2015-08-27");
    this.timeToWedding = this.weddingDate.from(moment(), true);
    this.name = ko.observable("James Draper");
    this.emailAddress = ko.observable("james@test.com");
    this.phoneNumber = ko.observable("123123");
    this.attendees = ko.observable("Jim");
    this.extraInfo = ko.observable("");
    this.isSubmitting = ko.observable(false);
  };
  VM.prototype.submitForm = function() {
    var rsvpData;
    rsvpData = {
      name: this.name(),
      emailAddress: this.emailAddress(),
      phoneNumber: this.phoneNumber(),
      attendees: this.attendees(),
      extraInfo: this.extraInfo()
    };
    this.isSubmitting(true);
    $.ajax({
      url: app.apiUrl + "/rsvp",
      method: "POST",
      data: JSON.stringify(rsvpData),
      contentType: "application/json",
      dataType: "json",
      success: (function(_this) {
        return function(data) {
          console.log('data', data);
          _this.name("");
          _this.emailAddress("");
          _this.phoneNumber("");
          _this.attendees("");
          _this.extraInfo("");
          _this.isSubmitting(false);
          app.showAlert({
            alertMessage: "<strong>Thanks!</strong> We're looking forward to seeing you!",
            alertType: 'success'
          });
          return $("#rsvp").slideUp(400);
        };
      })(this),
      error: (function(_this) {
        return function(xhr) {
          console.log('xhr', xhr);
          _this.isSubmitting(false);
          return app.showAlert({
            alertMessage: "<strong>Oh no, There's been a problem sending your RSVP :( </strong> <br> Would you mind <a class='alert-link' href='mailto:rsvp@lucyandjameswedding.com'>emailing us</a> instead while we get this fixed. Thanks.",
            alertType: 'danger'
          });
        };
      })(this)
    });
  };
  return {
    viewModel: VM,
    template: templateMarkup
  };
});
