/**
 *
 * @param dir
 * @param fileNameRegex
 * @param onChange
 * @param thisArg
 */
module.exports.watcher = function(dir, fileNameRegex, onChange, thisArg){
    var utils = require('./utils'),
        gulp = require('gulp'),
        phpFiles = [];

    utils.walk(dir,
        function(){
            gulp.watch(phpFiles, function(arg1, arg2, arg3){
                console.log('file change: ', arguments);
                onChange.apply(thisArg);
            });

        }, function(err, path){
            if(err) throw err;
            if(fileNameRegex.test(path)){
                phpFiles.push(path)
            } else{
                //console.log('ignoring...'+path)
            }
        });
}