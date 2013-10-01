module.exports = function (grunt)
{
    "use strict";

    // Project configuration.
    grunt.initConfig(
        {
            // metadata
            pkg: grunt.file.readJSON('package.json'),
            banner: '/*!\n' +
                    '* Golden Bootstrap v<%= pkg.version %>\n' +
                    '*/\n',
            jqueryCheck: 'if (typeof jQuery === "undefined") { throw new Error("Bootstrap requires jQuery") }\n\n',

            // task config
            clean: {
                dist: ['./dist']// clean ./dist/ folder
            },

            concat: {
                options: {
//                    banner: '<%= jqueryCheck %>',
                    stripBanners: false
                },
                bootstrap: {
                    src: [
                        './bower_components/bootstrap/js/bootstrap-transition.js',
                        './bower_components/bootstrap/js/bootstrap-alert.js',
                        './bower_components/bootstrap/js/bootstrap-button.js',
                        './bower_components/bootstrap/js/bootstrap-carousel.js',
                        './bower_components/bootstrap/js/bootstrap-collapse.js',
                        './bower_components/bootstrap/js/bootstrap-dropdown.js',
                        './bower_components/bootstrap/js/bootstrap-modal.js',
                        './bower_components/bootstrap/js/bootstrap-tooltip.js',
                        './bower_components/bootstrap/js/bootstrap-popover.js',
                        './bower_components/bootstrap/js/bootstrap-scrollspy.js',
                        './bower_components/bootstrap/js/bootstrap-tab.js',
                        './bower_components/bootstrap/js/bootstrap-typeahead.js',
                        './bower_components/bootstrap/js/bootstrap-affix.js'
                    ],
                    dest: './dist/js/bootstrap.js'
                }
            },

            uglify: {
                options: {
                    banner: '/*!\n' +
                            '* Bootstrap.js by @fat & @mdo\n' +
                            '* Copyright 2012 Twitter, Inc.\n' +
                            '* http://www.apache.org/licenses/LICENSE-2.0.txt\n' +
                            '*/\n',
                    report: 'min'
                },
                bootstrap: {
                    src: ['<%= concat.bootstrap.dest %>'],
                    dest: './dist/js/bootstrap.min.js'
                }
            },

            recess: {
                options: {
                    compile: true,
                    banner: '<%= banner %>'
                },
                bootstrap: {
                    src: ['./less/golden-bootstrap.less'],
                    dest: './dist/css/<%= pkg.name %>.css'
                },
                min: {
                    options: { compress: true },
                    src: ['./less/golden-bootstrap.less'],
                    dest: './dist/css/<%= pkg.name %>.min.css'
                }
            },

            copy: {
                fonts: {
                    expand: true,
                    cwd: './bower_components/bootstrap/img/',
                    src: ['*.png'],
                    dest: 'dist/img/'
                },
                js: {
                    expand: true,
                    cwd: './bower_components/jquery/',
                    src: ['jquery.js', 'jquery.min.js'],
                    dest: './dist/js/'
                }
            },

            watch: {
                recess: {
                    files: './less/*.less',
                    tasks: ['recess']
                }
            }
        }
    );


    // plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-recess');

    // JS distribution  task
    grunt.registerTask('dist-js', ['copy:js', 'concat', 'uglify']);

    // CSS distribution task
    grunt.registerTask('dist-css', ['recess']);

    // Fonts distribution task
    grunt.registerTask('dist-fonts', ['copy:fonts']);

    // Full distribution task
    grunt.registerTask('dist', ['clean', 'dist-css', 'dist-fonts', 'dist-js']);

    // Default task
    grunt.registerTask('default', ['dist']);
};
