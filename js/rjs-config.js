var require = requirejs.config({
    baseUrl: './js/',
    waitSeconds: 0,
    paths: {
        "build-production": "./app",
        "require-lib": "vendors/require",
        "text": "vendors/text",
        "underscore": "vendors/lodash.min",
        "backbone": "vendors/backbone",
        "socket-io": "vendors/socket.io",
        "jquery": "vendors/jquery",
        "jquery-noconflict": "vendors/jquery-noconflict",
        "config": "modules/config",
        "utils": "modules/utils",
        "console": "modules/console",
        "state": "modules/models/state",
        "namespace": "modules/namespace"
    },
    map: {
        // '*' means all modules will get 'jquery-private'
        // for their 'jquery' dependency.
        '*': {'jquery': 'jquery-noconflict'},
        // 'jquery-private' wants the real jQuery module
        // though. If this line was not here, there would
        // be an unresolvable cyclic dependency.
        'jquery-noconflict': {'jquery': 'jquery'}
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        "jquery-noconflict": {
            "deps": ["jquery"]
        }
    }
});