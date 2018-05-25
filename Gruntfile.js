module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({

    clean: ['dist'],

    copy: {
      src_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['**/*', '!**/*.js', '!**/*.scss', '!img/**/*'],
        dest: 'dist'
      },
      pluginDef: {
        expand: true,
        src: ['plugin.json', 'README.md'],
        dest: 'dist',
      },
      img_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['img/**/*'],
        dest: 'dist/src/'
      },
    },

    watch: {
      rebuild_all: {
        files: ['src/**/*', 'plugin.json'],
        tasks: ['default'],
        options: {spawn: false}
      },
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015'],
        plugins: ['transform-es2015-modules-systemjs', 'transform-es2015-for-of'],
      },
      dist: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['**/*.js'],
          dest: 'dist',
          ext: '.js'
        }]
      },
    },

    browserify: {
      js: {
        src: 'src/graphvis_ctrl.js',
        dest: 'dist/graphvis_ctrl.js',
        options: {
          transform: [["babelify", { "sourceMap": true, "presets": ["es2015"],"plugins": ["transform-es2015-modules-systemjs", "transform-es2015-for-of"] }]]
        }
      }
    }

  });

  grunt.registerTask('default', ['clean', 'copy:src_to_dist', 'copy:pluginDef', 'copy:img_to_dist', 'babel', 'browserify']);
};
