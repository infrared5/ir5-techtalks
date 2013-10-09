define(['jquery', 'src/helper/incrementor', 'src/helper/decrementor'],
        function($, incrementor, decrementor) {

  var stepper = {
        init: function() {
          var $upButton = $('.stepper-incrementor', this.$element),
              $downButton = $('.stepper-decrementor', this.$element);

          (function(stepper) {
            $upButton.on('click', function(event) {
              stepper.up();
            });
            $downButton.on('click', function(event) {
              stepper.down();
            });
          }(this));
        },
        up: function() {
          this.value = incrementor(this.value);
        },
        down: function() {
          this.value = decrementor(this.value);
        }
      };

  return {
    create: function($element) {
      var s = Object.create(stepper);
      (function() {
        var _value = 0;
        Object.defineProperties(s, {
          "$element": {
            value: $element,
            writable: false,
            enumerable: true
          },
          "value": {
            enumerable: true,
            set: function(val) {
              _value = val;
              $('.stepper-field', this.$element).text(_value);
            },
            get: function() {
              return _value;
            }
          }
        });
      }());
      return s.init();
    }
  };

});