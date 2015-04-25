define(['knockout', 'ladda'], function(ko, Ladda) {
  return ko.bindingHandlers.ladda = {
    init: function(element, valueAccessor) {
      var l;
      l = Ladda.create(element);
      return ko.computed({
        read: function() {
          var state;
          state = ko.unwrap(valueAccessor());
          if (state) {
            return l.start();
          } else {
            return l.stop();
          }
        },
        disposeWhenNodeIsRemoved: element
      });
    }
  };
});
