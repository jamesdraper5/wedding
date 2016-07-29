define(['knockout', 'fabric', 'seat'], function(ko, fabric, seat) {
  var Table;
  return Table = (function() {
    function Table(options) {
      var ref;
      console.log('options', options);
      this.name = (ref = options.id) != null ? ref : 'Test table';
      this.horizontalSeatCount = 2;
      this.horizontalSpacesCount = this.horizontalSeatCount + 1;
      this.verticalSeatCount = 2;
      this.verticalSpacesCount = this.verticalSeatCount + 1;
      this.chairSize = 25;
      this.seatSpaceMultiplier = 0.5;
      this.tableWidth = this.horizontalSeatCount * this.chairSize + ((this.seatSpaceMultiplier * this.chairSize * 2) * this.horizontalSeatCount);
      this.tableHeight = this.verticalSeatCount * this.chairSize + ((this.seatSpaceMultiplier * this.chairSize * 2) * this.verticalSeatCount);
      this.spacesWidth = this.chairSize / 2;
      this.chairOffsetLeft = (this.tableWidth - this.chairSize) - this.chairSize / 2;
      this.chairOffsetTop = (this.tableHeight - this.chairSize) - this.chairSize / 2;
      this.placeWidth = this.chairSize + (this.spacesWidth * 2);
      this.sides = [
        {
          name: 'top',
          leftMultiplier: -1,
          topMultiplier: -1,
          seatCount: this.horizontalSeatCount
        }, {
          name: 'right',
          leftMultiplier: 1,
          topMultiplier: -1,
          seatCount: this.verticalSeatCount
        }, {
          name: 'bottom',
          leftMultiplier: 1,
          topMultiplier: 1,
          seatCount: this.horizontalSeatCount
        }, {
          name: 'left',
          leftMultiplier: -1,
          topMultiplier: 1,
          seatCount: this.verticalSeatCount
        }
      ];
      this.seats = ko.observableArray([]);
      this.guests = ko.observableArray(options.guests);
      this.guests.id = this.name;
      return;
    }

    Table.prototype.createCanvasItem = function() {
      var chairColor, chairOffsetLeft, chairOffsetTop, count, i, j, leftPos, len, ref, ref1, seat1, side, table, text, topPos;
      console.log('bla');
      table = new fabric.Rect({
        originX: 'center',
        originY: 'center',
        width: this.tableWidth,
        height: this.tableHeight,
        fill: '#fff',
        strokeWidth: 1,
        stroke: '#ccc'
      });
      text = new fabric.Text(this.name, {
        fontSize: 14,
        originX: 'center',
        originY: 'center'
      });
      this.canvasNode = new fabric.Group([table, text], {
        left: 60,
        top: 60,
        lockScalingX: true,
        lockScalingY: true
      });
      ref = this.sides;
      for (i = 0, len = ref.length; i < len; i++) {
        side = ref[i];
        if (['top', 'bottom'].indexOf(side.name) > -1) {
          chairOffsetTop = this.tableHeight / 2 + this.spacesWidth;
          topPos = (chairOffsetTop * side.topMultiplier) + (2 * side.topMultiplier);
          chairColor = 'red';
        } else {
          chairOffsetLeft = this.tableWidth / 2 + this.spacesWidth;
          leftPos = (chairOffsetLeft * side.leftMultiplier) - (2 * side.topMultiplier);
          chairColor = 'blue';
        }
        for (count = j = 0, ref1 = side.seatCount; j < ref1; count = j += 1) {
          if (['top', 'bottom'].indexOf(side.name) > -1) {
            leftPos = this.tableWidth / 2 - ((this.chairSize / 2 + this.spacesWidth) + this.placeWidth * count);
          } else {
            topPos = this.tableHeight / 2 - ((this.chairSize / 2 + this.spacesWidth) + this.placeWidth * count);
          }
          seat1 = new seat({
            chairSize: 25,
            topPos: topPos,
            leftPos: leftPos,
            chairColor: chairColor
          });
          this.seats.push(seat1);
          this.canvasNode.add(seat1.createCanvasItem());
        }
      }
      return this.canvasNode;
    };

    return Table;

  })();
});
