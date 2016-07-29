
/*
    Guest model
 */
define(['knockout', 'fabric'], function(ko, fabric) {
  var Guest;
  return Guest = (function() {
    function Guest(options) {
      var ref;
      this.firstName = options.firstName;
      this.lastName = options.lastName;
      this.rsvpStatus = options.rsvpStatus;
      this.gender = options.gender;
      this.ageGroup = (ref = options.ageGroup) != null ? ref : '30s';
    }

    Guest.prototype.fullName = function() {
      return this.firstName + ' ' + this.lastName;
    };

    Guest.prototype.createCanvasItem = function() {
      console.log('bla');
      this.canvasNode = new fabric.Rect({
        originX: 'center',
        originY: 'center',
        left: this.leftPos,
        top: this.topPos,
        fill: this.chairColor,
        width: this.chairSize,
        height: this.chairSize
      });
      return this.canvasNode;
    };

    return Guest;

  })();
});
