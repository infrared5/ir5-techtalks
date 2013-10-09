define(function() {
  
  return {
    add: function() {
      var values = Array.prototype.slice.call(arguments, 0),
          result = 0;

      while(values.length > 0) {
          result += Number(values.shift());
      }
      return result;
    },
    subtract: function(value, fromValue) {
      return fromValue - value;
    }
  };

});