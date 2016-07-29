var Plan;

Plan = (function() {
  function Plan(options) {
    console.log('options', options);
  }

  Plan.prototype.createCanvasItem = function() {
    return console.log('bla');
  };

  return Plan;

})();
