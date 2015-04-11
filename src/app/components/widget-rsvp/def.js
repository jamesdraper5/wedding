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
    console.log('rsvpData', rsvpData);
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
          alert('Thanks for your RSVP!');
          return $("#rsvp").slideUp(400);
        };
      })(this),
      error: (function(_this) {
        return function(xhr) {
          return console.log('xhr', xhr);
        };
      })(this)
    });
  };
  return {
    viewModel: VM,
    template: templateMarkup
  };
});
