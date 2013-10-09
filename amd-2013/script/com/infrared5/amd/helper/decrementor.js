define(['module', 'src/util/math'], function(module, math) {
  
  return function(value) {
    return math.subtract(module.config().value, value);
  };

});