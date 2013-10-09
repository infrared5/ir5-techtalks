define(['module', 'src/util/math'], function(module, math) {
  
  return function(value) {
    return math.add(value, module.config().value);
  };

});