(function(window, require) {

  require.config({
    baseUrl: ".",
    paths: {
      "lib": "./vendor/lib",
      "script": "./script",
      "src": "script/com/infrared5/amd",
      "jquery": "./vendor/lib/jquery-1.9.0.min"
    },
    config: {
      "src/helper/incrementor": {
        value: 2
      },
      "src/helper/decrementor": {
        value: 1
      }
    }
  });

  require(['jquery', 'src/amd-context'], function($, context) {
    var $el = $('#stepper', $('body')),
        stepper = context.stepperFactory.create($el);
  });

}(window, requirejs));