define(["knockout", "text!./template.html", "fabric", "knockout-sortable", "table", "seat", "guest"], function(ko, templateMarkup, fabric, koSortable, table, seat, guest) {
  var VM;
  VM = function(params) {
    var self;
    this.canvas = new fabric.Canvas('test');
    this.canvas.on({
      'object:moving': function(e) {
        return e.target.opacity = 0.5;
      },
      'object:modified': function(e) {
        return e.target.opacity = 1;
      }
    });
    this.availableGuests = ko.observableArray([]);
    this.tables = ko.observableArray([]);
    this.guests = ko.observableArray([]);
    self = this;
    this.getData();
    ko.bindingHandlers.sortable.afterMove = this.updateLastAction.bind(this);
    ko.bindingHandlers.flash = {
      init: function(element) {
        return $(element).hide();
      },
      update: function(element, valueAccessor) {
        var value;
        value = ko.utils.unwrapObservable(valueAccessor());
        if (value) {
          return $(element).stop().hide().text(value).fadeIn(function() {
            clearTimeout($(element).data("timeout"));
            return $(element).data("timeout", setTimeout(function() {
              $(element).fadeOut();
              return valueAccessor()(null);
            }, 3000));
          });
        }
      },
      timeout: null
    };
  };
  VM.prototype.getData = function() {
    var extraGuests, initialTables;
    extraGuests = [
      new guest({
        firstName: 'Bob',
        lastName: 'Draper',
        rsvpStatus: 'yes',
        gender: 'male'
      }), new guest({
        firstName: 'Ann',
        lastName: 'Draper',
        rsvpStatus: 'yes',
        gender: 'male'
      })
    ];
    initialTables = [
      new table({
        id: "Table One",
        guests: [
          new guest({
            firstName: 'Jim',
            lastName: 'Draper',
            rsvpStatus: 'yes',
            gender: 'male'
          }), new guest({
            firstName: 'John',
            lastName: 'Draper',
            rsvpStatus: 'yes',
            gender: 'male'
          })
        ]
      }), new table({
        id: "Table Two",
        guests: [
          new guest({
            firstName: 'Jim',
            lastName: 'Bell',
            rsvpStatus: 'yes',
            gender: 'male'
          }), new guest({
            firstName: 'Mary',
            lastName: 'Draper',
            rsvpStatus: 'yes',
            gender: 'female'
          })
        ]
      })
    ];
    this.availableGuests(extraGuests);
    this.tables(initialTables);
    this.initializeSeatingPlan();
  };
  VM.prototype.initializeSeatingPlan = function() {

    /*
    table1 = new table(
        name: 'Table 1'
    )
    console.log 'table1', table1
    
    @tables.push(table1)
     */

    /*
     */
    ko.utils.arrayForEach(this.tables(), (function(_this) {
      return function(table) {
        console.log('@ ->', _this);
        return _this.canvas.add(table.createCanvasItem());
      };
    })(this));
    console.log('@', this);
    this.availableGuests.id = "Available Guests";
    this.lastAction = ko.observable();
    this.lastError = ko.observable();
    this.maximumGuests = 4;
  };
  VM.prototype.isTableFull = function(parent) {
    return parent().length < this.maximumGuests;
  };
  VM.prototype.updateLastAction = function(arg) {
    this.lastAction("Moved " + arg.item.name() + " from " + arg.sourceParent.id + " (seat " + (arg.sourceIndex + 1) + ") to " + arg.targetParent.id + " (seat " + (arg.targetIndex + 1) + ")");
  };
  VM.prototype.verifyAssignments = function(arg) {
    var gender, parent;
    console.log('arg', arg);
    parent = arg.targetParent;
    if (parent.id !== "Available Guests" && parent().length === 3 && parent.indexOf(arg.item) < 0) {
      gender = arg.item.gender;
      if (!ko.utils.arrayFirst(parent(), function(guest) {
        return guest.gender !== gender;
      })) {
        self.lastError("Cannot move " + arg.item.name() + " to " + arg.targetParent.id + " because there would be too many " + gender + " guests");
        arg.cancelDrop = true;
        return;
      }
    }
  };
  VM.prototype.addGuest = function() {
    return this.guests.push(new guest({
      firstName: 'Jim',
      lastName: 'Draper',
      rsvpStatus: 'yes',
      gender: 'male'
    }));
  };
  return {
    viewModel: VM,
    template: templateMarkup
  };
});
