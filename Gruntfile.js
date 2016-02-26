/*global module:false */
module.exports = function(grunt) {


  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    compass: {
      all: {
        options: {
          sassDir: 'sass',
          cssDir: 'dist/css'
        }
      }
    },
    connect: {
      local: {
        options: {
          port: 8005,
          base: '.'
        }
      }
    },
    concat: {
      dist: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/embedly-jquery/jquery.embedly.min.js'
        ],
        dest: 'dist/js/vendor.js'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        globals : {'require': true, 'module':true}
      },
      all: ['Gruntfile.js', 'js/**/*.js', 'tests/**/*_test.js']
    },
    watch: {
      local: {
        files: ['sass/**/*.scss'],
        tasks: ['compass']
      }
    }
  });

  grunt.registerTask("default", ["concat", "compass", "connect", "watch"]);

};
