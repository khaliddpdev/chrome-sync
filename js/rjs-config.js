var require = requirejs.config({
    baseUrl: './js/',
    waitSeconds: 0,
    paths: {
        "build-production": "./app",
        "require-lib": "vendors/require",
        "domReady": "vendors/domReady",
        "text": "vendors/text",
        "underscore": "vendors/lodash.min",
        "backbone": "vendors/backbone",
        "live": "vendors/live",
        "socket-io": "vendors/socket.io",
        "modernizr": "vendors/modernizr-custom",
        "lightbox": "vendors/lightbox.min",
        "videojs": "vendors/video.min",
        "jquery": "vendors/jquery",
        "jquery-ui": "vendors/jquery-ui.min",
        "lazyload": "vendors/jquery.lazyload",
        "masonry": "vendors/masonry.pkgd.min",
        "masonry-imagesloaded": "vendors/imagesloaded",
        "jquery-masonry": "vendors/masonry-custom",
        "jquery-copycss": "vendors/jquery.copycss",
        "angular": "vendors/development/angular",
        "angular-animate": "vendors/development/angular-animate",
        "angular-aria": "vendors/development/angular-aria",
        "angular-route": "vendors/development/angular-route",
        "angular-sanitize": "vendors/development/angular-sanitize",
        "config": "modules/config",
        "utils": "modules/utils",
        "console": "modules/console",
        "state": "modules/models/state",
        "namespace": "modules/namespace",
        "jquery-clipped": "modules/views/widgets/jquery.clipped",
        "jquery-noconflict": "vendors/jquery-noconflict",
        "jquery-parallax": "modules/views/widgets/jquery.parallax",
        "jquery-lazy-parallax": "modules/views/widgets/jquery.lazy-parallax",
        "jquery-visiware": "modules/views/widgets/jquery.visiware",
        "jquery-morph": "modules/views/widgets/jquery.morph",
        "dp-animate": "modules/views/widgets/jquery.dp-animate"
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
        "live": [],
        "videojs": [],
        "jquery-noconflict": {
            "deps": ["jquery"]
        },
        "jquery-ui": {
            "deps": ["jquery"]
        },
        "jquery-copycss": {
            "deps": ["jquery"]
        },
        "lazyload": {
            deps: ["jquery"]
        },
        "masonry": {
            deps: ["jquery"]
        },
        "lightbox": {
            "deps": ["jquery"]
        },
        'modernizr': {
            exports: 'Modernizr'
        }
    }
});