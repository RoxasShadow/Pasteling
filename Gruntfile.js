module.exports = function(grunt) {
  grunt.initConfig({
    cssmin: {
      css: {
        files: { 'public/stylesheets/pasteling.min.css': [
          'public/javascripts/style.css',

          'public/javascripts/lib/codemirror/lib/codemirror.css',
          'public/javascripts/lib/codemirror/theme/monokai.css',
          'public/javascripts/lib/codemirror/addon/dialog/dialog.css',
          'public/javascripts/lib/codemirror/addon/display/fullscreen.css'
        ] }
      }
    },

    uglify: {
      js: {
        files: { 'public/javascripts/pasteling.min.js': [
          'public/javascripts/namespace.js',
          'public/javascripts/pasteling/config.js',

          'public/javascripts/lib/jquery/jquery.min.js',
          'public/javascripts/lib/underscore/underscore.js',
          'public/javascripts/lib/backbone/backbone.js',

          'public/javascripts/lib/codemirror/lib/codemirror.js',
          'public/javascripts/lib/codemirror/addon/search/search.js',
          'public/javascripts/lib/codemirror/addon/search/searchcursor.js',
          'public/javascripts/lib/codemirror/addon/dialog/dialog.js',
          'public/javascripts/lib/codemirror/addon/display/fullscreen.js',
          'public/javascripts/lib/codemirror/mode/meta.js',

          'public/javascripts/algorithms/ciphering.js',
          'public/javascripts/algorithms/hashing.js',

          'public/javascripts/algorithms/ciphering/*.js',
          'public/javascripts/algorithms/hashing/*.js',

          'public/javascripts/pasteling/codemirror.js',
          'public/javascripts/pasteling/post.js',
          'public/javascripts/pasteling/router.js',
          'public/javascripts/pasteling/view.js',
          'public/javascripts/pasteling/main.js'
        ] }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['uglify:js', 'cssmin:css']);
};