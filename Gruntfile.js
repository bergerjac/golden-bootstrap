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
                    banner: '<%= banner %><%= jqueryCheck %>',
                    stripBanners: false
                },
                bootstrap: {
                    expand: true,
                    cwd: './bower_components/bootstrap/js/',
                    src: [
                        'bootstrap-transition.js',
                        'bootstrap-alert.js',
                        'bootstrap-button.js',
                        'bootstrap-carousel.js',
                        'bootstrap-collapse.js',
                        'bootstrap-dropdown.js',
                        'bootstrap-modal.js',
                        'bootstrap-tooltip.js',
                        'bootstrap-popover.js',
                        'bootstrap-scrollspy.js',
                        'bootstrap-tab.js',
                        'bootstrap-affix.js'
                    ],
//                    dest: 'dist/js/<%= pkg.name %>.js'
                    dest: './dist/js/golden-bootstrap.js'
                }
            },

            uglify: {
                options: {
                    banner: '<%= banner %>',
                    report: 'min'
                },
                bootstrap: {
                    src: ['<%= concat.bootstrap.dest %>'],
                    dest: './dist/js/<%= pkg.name %>.min.js'
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
                    files: 'less/*.less',
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
    grunt.registerTask('default', ['dist', 'build-customizer']);

    // task for building customizer
    grunt.registerTask('build-customizer', 'Add scripts/less files to customizer.', function ()
    {
        var fs = require('fs')

        function getFiles (type)
        {
            var files = {}
            fs.readdirSync(type)
                .filter(function (path)
                        {
                            return type == 'fonts' ? true : new RegExp('\\.' + type + '$').test(path)
                        })
                .forEach(function (path)
                         {
                             return files[path] = fs.readFileSync(type + '/' + path, 'utf8')
                         })
            return 'var __' + type + ' = ' + JSON.stringify(files) + '\n'
        }

        var files = getFiles('js') + getFiles('less') + getFiles('fonts')
        fs.writeFileSync('docs-assets/js/raw-files.js', files)
    });
};
