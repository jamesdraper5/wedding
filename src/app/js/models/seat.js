
/*
    Seat model
 */
define(['knockout', 'fabric'], function(ko, fabric) {
  var Seat;
  return Seat = (function() {
    function Seat(options) {
      var ref;
      this.chairSize = options.chairSize;
      this.topPos = options.topPos;
      this.leftPos = options.leftPos;
      this.chairColor = (ref = options.chairColor) != null ? ref : 'red';
    }

    Seat.prototype.createCanvasItem = function() {
      console.log('seat - createCanvasItem');
      this.canvasNode = new fabric.Rect({
        originX: 'center',
        originY: 'center',
        left: this.leftPos,
        top: this.topPos,
        width: this.chairSize,
        height: this.chairSize,
        rx: 4,
        ry: 4,
        fill: '#fff',
        strokeWidth: 1,
        stroke: '#ccc'
      });
      return this.canvasNode;
    };

    return Seat;

  })();
});
