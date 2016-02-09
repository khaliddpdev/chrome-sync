var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    glob = require('glob'),
    gulp = require('gulp'),
    customJade = require('jade'),
    jade = require('gulp-jade'),
    _ = require('lodash'),
    argv = require('yargs').argv,
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    request = require('request'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    libsass = require('node-sass'),
    through2 = require('through2'),
    beautifyJS = require('js-beautify'),
    projectDirectory = path.resolve(__dirname, './');

gulp.task('sass', function () {
    var sassPath = path.resolve(projectDirectory, 'sass/'),
        writePath = path.resolve(projectDirectory, 'stylesheets/'),
        watchPath = path.join(sassPath , '/[!_]*[!(compass)].scss'),
        includes = [
            path.resolve(projectDirectory, 'sass/external/compass-mixins')
        ];


    gulp.src(watchPath)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: includes,
            style: 'expanded', //nested, expanded, compact, compressed,
            indentedSyntax : false
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(writePath));
});

gulp.task('sass-debug', function(){
    var sassPath = path.resolve(projectDirectory, 'sass/'),
        writePath = path.resolve(projectDirectory, 'stylesheets/'),
        watchPath = path.join(sassPath , 'style.scss');

    var includes = [ path.resolve(projectDirectory, 'sass/external/compass-mixins') ];
    console.log('includes:', includes);

    libsass.render({
        includePaths: includes,
        file: watchPath,
        functions: SassFunctions
    }, function(err, result) {
        console.log(arguments);
    });
});

gulp.task('jade', function () {
    var jadeDirectory = path.resolve(projectDirectory, 'jade/'),
        jadeGlob = path.join(jadeDirectory, '/**/[^_]*.jade');

    //console.log('Analyzing files within: %s', jadeGlob);
    gulp.src(jadeGlob)
        .pipe(jade({
            pretty: true
        }))
        .on('error', onError)
        .pipe(gulp.dest(function(file){
            var basename = path.parse(file.path).base;
            return ((basename == 'index.html')? './' : './views/');
        }));
    //console.log('Saved php files from '+jadeFilesPattern + ' to '+saveDirectory);
});

gulp.task('jade-debug', function () {
    var jadeDirectory = path.resolve(projectDirectory, 'jade/'),
        jadeFilesPattern = path.join(jadeDirectory, '/**/[^_]*.jade');
    console.log('Jade: %j', customJade);
    gulp.src(jadeFilesPattern)
        .pipe(through2.obj({ allowHalfOpen: false },
            function (file, encoding, done) {

                //console.log('chunk.path: %j', chunk.path);
                var html = customJade.render(file.contents.toString(), {
                    filename: file.path,
                    pretty: (argv['pretty']) ? true : false
                });
                //console.log('html: %s', html);
                file.contents = new Buffer(html, encoding);
                done(null, file); // note we can use the second argument on the callback
                // to provide data as an alternative to this.push('wut?')
            }
        ))
        .on('error', onError)
        .pipe(gulp.dest(projectDirectory));
    //console.log('Saved php files from '+jadeFilesPattern + ' to '+saveDirectory);
});

gulp.task('jade-auto', function () {
    var jadeDirectory = path.resolve(projectDirectory, 'jade/');
    gulp.watch(path.join(jadeDirectory, '/**/*.jade'), ['jade']);
});

gulp.task('auto', function () {
    var jadeDirectory = path.resolve(projectDirectory, 'jade/'),
        cssConfigPath = path.resolve(projectDirectory, 'stylesheets/config.css'),
        sassDirectory = path.resolve(projectDirectory, 'sass/');

    gulp.watch(path.join(jadeDirectory, '/**/*.jade'), ['jade']);
    gulp.watch(path.join(sassDirectory, '/**/*.scss'), ['sass']);
});

gulp.task('beautify-js', function () {
    var writePath = './',
        projectJSPath = path.join(projectDirectory, 'js/'),
        watchPath = path.join(projectJSPath, '/!(vendors)/**/*.js');

    console.log('Search %s for javascript files', watchPath);
    gulp.src(watchPath)
        .pipe(through2.obj({
                allowHalfOpen: false
            },
            function (file, encoding, done) {
                console.log('reading: %s', file.path);
                if (file && file.contents) {

                    var jsContent = beautifyJS(file.contents.toString());
                    writePath = file.path;
                    //console.log('js: %s', jsContent);
                    file.contents = new Buffer(jsContent, encoding);
                }
                done(null, file); // note we can use the second argument on the callback
                // to provide data as an alternative to this.push('wut?')
            }
        ))
        .on('error', console.error)
        .pipe(gulp.dest(writePath));
});

gulp.task('beautify-js-auto', function () {
    var writePath = './',
        projectJSPath = path.join(projectDirectory, 'js/'),
        watchPath = path.join(projectJSPath, '/!(vendors)/**/*.js');

    console.log('Search %s for javascript files', watchPath);
    gulp.watch(watchPath, function (event) {

        if(event.type == 'changed'){

            fs.readFile(event.path, 'utf8', function (err, data) {
                if (err) {
                    throw err;
                }
                console.log('updating %s', event.path);
                fs.writeFileSync(event.path, beautifyJS(data));
            });
        }
    })
});

gulp.task('test-js', function(){
    exec('jasmine', function (err, stdout, stderr) {
        console.log('results:\n %s\nerror:\n%s', stdout, stderr);
    });
});

gulp.task('build-js', function () {

    var rjsCmd = (require('os').platform() == 'linux')?'r.js':'r.js.cmd';
    exec(rjsCmd+' -o js/build.js', function (err, stdout, stderr) {
        console.log('err:\n%s\n\nresults:\n%s\n\nstderr:\n%s', err, stdout, stderr);
    })
});

function onError(err) {
    console.log(err);
    this.emit('end');
}
