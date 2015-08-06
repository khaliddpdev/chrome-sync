var fsFinder = require('path'),
    fs = require('fs');


module.exports = {

    /**
     *
     * @param delay
     * @param func
     * @param thisArg
     * @param funcArgs
     * @returns {debounce}
     */
    debounce : function(delay, func, thisArg, funcArgs){
        var timeout;


        function done(){
            func.call(thisArg, funcArgs);
        }

        function debounceFunc(){
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(done, delay);
        }

        return debounceFunc;
    },

    /**
     *
     * @param dir
     * @param done
     * @param each
     */
    walk : function (dir, done, each) {
        var results = [],
            pending = 0;
        function recurse(path, done) {
            fs.stat(path, function (err, stat) {
                if (err){
                    if (done) done.call(null, err);
                    if (each) each.call(null, err);
                    return;
                }
                if (stat.isDirectory()) {
                    fs.readdir(path, function (err, list) {
                        if (err && done) return done(err);
                        pending += list.length;
                        list.forEach(function (fileName) {
                            var childPath = fsFinder.resolve(path, fileName);
                            recurse(childPath, done)
                        });
                        pending--;
                    });
                } else if(stat.isFile()) {
                    results.push(path);
                    if(each) each.call(null, null, path);
                    pending--;
                    if (pending < 0 && done) done.call(null, null, results);
                }
            });
        }
        recurse(dir,done);
    }
};