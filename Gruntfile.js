module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concurrent: {
			dev: {
				tasks: ['nodemon:dev', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			},
			staging: {
				tasks: ['nodemon:staging'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		compass: {
			dev: {
				options: {
					sassDir: 'bower_components/foundation/scss/',
					cssDir: 'public/stylesheets',
				}
			}
		},
		watch: {
			compass: {
				files: ['bower_components/foundation/scss/*.scss'],
				tasks: ['compass'],
			}, 
			livereload: {
				files: [
					'public/stylesheets/*.{css,less}',
					'public/javascripts/*.js',
					'views/**/*.jade'
				],
				options: { livereload: true }
			}
		},
		nodemon: {
			dev: {
				script: './bin/www',
				options: {
					env: {
						PORT: 3000,
						NODE_ENV: 'development'
					},
					watch: ['.'],
				}
			},
			staging: {
				script: './bin/www',
				options: {
					env: {
						PORT: 3000,
						NODE_ENV: 'staging'
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('staging', ['compass', 'concurrent:staging']);
	grunt.registerTask('default', ['compass', 'concurrent:dev']);
}