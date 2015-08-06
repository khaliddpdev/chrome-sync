var require = requirejs.config({
    appDir : 'src',
    baseUrl: 'src/modules',
    waitSeconds: 0,
    paths: {
        "domReady" : "domReady",
        "config": "config",
        "utils": "utils",
        "console": "console",
        "namespace": "namespace",
        "updater" : "controllers/updater",
        "CircleElement" : "views/circular-text",
        "AnimatedElement" : "views/animated-element",
        "ClippedElement" : "views/cutoff-content-box",
        "HeroImage" : "views/hero-image-v2",
        "HeroImageV1" : "views/hero-image",
        "VisibilityAwareElement" : "views/visibility-aware-element",
        "popupView" : "../views/view-popup",
        "live" : "vendors/live",
		"modernizr" : "vendors/modernizr.min",
		"socket-io" : "vendors/socket.io",
        "lightbox" : "vendors/lightbox.min",
        "jquery" : "vendors/jquery",
        "flexslider" : "vendors/flexslider/jquery.flexslider-min",
        "underscore" : "vendors/lodash.min",
        "backbone" : "vendors/backbone"
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        "live" : [],
        "flexslider" : {
            "deps": ["jquery"]
        },
        "lightbox" : {
            "deps": ["jquery"]
        }
    }
});


require([
    'require',
    'updater',
    'popupView',
    'modernizr',
    'domReady!'], function(require) {

});
