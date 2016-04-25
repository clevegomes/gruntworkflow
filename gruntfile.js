module.exports = function (grunt) {
    grunt.initConfig({

        concat: {
            options: {
                seperator: '\n\n//------------------------------\n',
                banner: '\n\n//------------------------------\n',
            },
            dist: {
                src:['components/scripts/*.js'],
                dest: 'builds/development/js/scripts.js'
            },
            // prod: {
            //     src:['components/scripts/*.js'],
            //     dest: 'builds/production/js/scripts.js'
            // }
        }, //concat

        bower_concat: {
            all: {
                dest: 'builds/development/js/_bower.js',
                cssDest: 'builds/development/css/_bower.css'
            }
        },
        sass: {
            dist: {
                options: {
                     // get docs from https://github.com/sass/node-sass#options
                    // http://sass-lang.com/documentation/file.SASS_REFERENCE.html#options
                    // style: 'compressed',
                    style: 'expanded'
                },
                files: [{
                    src: 'components/sass/style.scss',
                    dest: 'builds/development/css/style.css'
                }]
            }
        },  //sass

        wiredep: {
            task: {
                src: "builds/development/**/*.html"
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 3000,
                    base: 'builds/development/',
                    livereload: true

                }
            }
        },


        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            scripts: {
                files: ['builds/development/**/*.html',
                       'components/scripts/**/*.js',
                       'components/sass/**/*.scss'],
                 tasks: ['concat','sass']
            }
        }



    });  //initConfig

    // plugin to concat
    grunt.loadNpmTasks('grunt-contrib-concat');

    // plugin to compile sass
    // we are using https://github.com/sindresorhus/grunt-sass but the better  one is grunt-contrib-sass
    // check sass compatibilities here  http://sass-compatibility.github.io/
    grunt.loadNpmTasks('grunt-sass');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-bower-concat');

    grunt.registerTask('default',['wiredep','bower_concat','concat','sass','connect','watch']);

}