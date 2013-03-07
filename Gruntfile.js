/*global module:false */
/**
 * For grunt ~0.4.0 only.
 * https://github.com/gruntjs/grunt/wiki/Upgrading-from-0.3-to-0.4
 */
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    connect: {
      amd: {
        options: {
          port: 3000
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: '.',
          paths: {
            "lib": "./vendor/lib",
            "script": "./script",
            "src": "script/com/infrared5/amd",
            "jquery": "./vendor/lib/jquery-1.9.0.min"
          },
          exclude: ['jquery'],
          mainConfigFile: 'script/com/infrared5/amd/amd-context.js',
          name: 'src/amd-context',
          out: './dist/script/com/infrared5/amd/amd-context.js',
          generateSourceMaps: true,
          preserveLicenseComments:false,
          optimize: 'uglify2'
        }
      }
    },
    copy: {
      amd: {
        files: [
          {src: ['vendor/lib/*'], dest: 'dist/', filter:'isFile'},
          {src: ['01_requirejs_example.html'], dest: 'dist/', filter:'isFile'}
        ]
      }
    },
    uglify: {
      amd: {
        files: {
          'dist/script/com/infrared5/amd/app.js': ['script/com/infrared5/amd/app.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // build and deploy the client
  grunt.registerTask('server', ['connect:amd:keepalive']);
  grunt.registerTask('deploy-client', ['requirejs', 'copy:amd', 'uglify:amd']);
};
