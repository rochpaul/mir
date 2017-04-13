module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-npmcopy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  var fs = require('fs');
  var path = require('path');
  var util = require('util');
  var getAbsoluteDir = function(dir) {
    return path.isAbsolute(dir) ? dir : path.resolve(process.cwd(), dir);
  };
  grunt.initConfig({
    globalConfig : {
        assetsDirectory : getAbsoluteDir(grunt.option('assetsDirectory')),
        assetsDirectoryRelative : path.basename(grunt.option('assetsDirectory')),
        moduleDirectory: grunt.option('moduleDirectory')
    },
    npmcopy : {
      deps : {
        options : {
          destPrefix : '<%=globalConfig.assetsDirectory%>/'
        },
        files : {
          'bootstrap/css' : 'bootstrap/dist/css',
          'bootstrap/fonts' : 'bootstrap/dist/fonts',
          'bootstrap/js' : 'bootstrap/dist/js',

          'font-awesome/css' : 'font-awesome/css',
          'font-awesome/fonts' : 'font-awesome/fonts',

          'jquery' : 'jquery/dist',

          'jquery/plugins/jquery-confirm' : 'myclabs.jquery.confirm/jquery.confirm.min.js',
          'jquery/plugins/jquery-placeholder' : 'jquery.placeholder/jquery.placeholder.min.js',
          'jquery/plugins/typeahead' : 'typeahead.js/dist/bloodhound.min.js',
          'jquery/plugins/bootstrap3-typeahead' : 'bootstrap-3-typeahead/bootstrap3-typeahead.min.js',
          'jquery/plugins/shariff' : 'shariff/build',
          'jquery/plugins/dotdotdot' : 'jquery.dotdotdot/src/js',

          'bootstrap-datepicker/js':'bootstrap-datepicker/dist/js/',
          'bootstrap-datepicker/css':'bootstrap-datepicker/dist/css/',
          'bootstrap-datepicker/locales':'bootstrap-datepicker/dist/locales/',

          'moment' : 'moment/',

          'handlebars': 'handlebars/dist/handlebars.min.js'
        },
      }
    },
    uglify: {
      mir: {
        mangle: false,
        options: {
          sourceMap: true,
          sourceMapIncludeSources : true
        },
        files: {
          '<%= globalConfig.moduleDirectory %>/target/classes/META-INF/resources/js/mir/base.min.js': '<%= globalConfig.moduleDirectory %>/src/main/resources/META-INF/resources/js/mir/base.js',
          '<%= globalConfig.moduleDirectory %>/target/classes/META-INF/resources/js/mir/derivate-fileList.min.js': '<%= globalConfig.moduleDirectory %>/src/main/resources/META-INF/resources/js/mir/derivate-fileList.js',
          '<%= globalConfig.moduleDirectory %>/target/classes/META-INF/resources/js/mir/relatedItem-modal.min.js': '<%= globalConfig.moduleDirectory %>/src/main/resources/META-INF/resources/js/mir/relatedItem-modal.js',
          '<%= globalConfig.moduleDirectory %>/target/classes/META-INF/resources/js/mir/relatedItem-autocomplete.min.js': '<%= globalConfig.moduleDirectory %>/src/main/resources/META-INF/resources/js/mir/relatedItem-autocomplete.js',
          '<%= globalConfig.moduleDirectory %>/target/classes/META-INF/resources/js/mir/xeditor-form.min.js': '<%= globalConfig.moduleDirectory %>/src/main/resources/META-INF/resources/js/mir/xeditor-form.js',
          '<%= globalConfig.moduleDirectory %>/target/classes/META-INF/resources/js/mir/openaire.min.js': '<%= globalConfig.moduleDirectory %>/src/main/resources/META-INF/resources/js/mir/openaire.js',
          '<%= globalConfig.moduleDirectory %>/target/classes/META-INF/resources/js/mir/classification-modal-select.min.js': '<%= globalConfig.moduleDirectory %>/src/main/resources/META-INF/resources/js/mir/classification-modal-select.js',
          '<%= globalConfig.moduleDirectory %>/target/classes/META-INF/resources/js/mir/geo-coords.min.js': '<%= globalConfig.moduleDirectory %>/src/main/resources/META-INF/resources/js/mir/geo-coords.js',
          '<%= globalConfig.moduleDirectory %>/target/classes/META-INF/resources/js/mir/select-doctype.min.js': '<%= globalConfig.moduleDirectory %>/src/main/resources/META-INF/resources/js/mir/select-doctype.js',

          '<%= globalConfig.moduleDirectory %>/target/classes/META-INF/resources/js/jquery.search-entity.min.js': '<%= globalConfig.moduleDirectory %>/src/main/resources/META-INF/resources/js/jquery.search-entity.js',
          '<%= globalConfig.moduleDirectory %>/target/classes/META-INF/resources/js/oa-statistic.min.js': '<%= globalConfig.moduleDirectory %>/src/main/resources/META-INF/resources/js/oa-statistic.js'
        }
      }
    },
  });
  grunt.registerTask('none', function() {
  });
  grunt.registerTask('default', 'build assets directory', function() {
    grunt.task.run('npmcopy');
    grunt.task.run('uglify');
  });
};