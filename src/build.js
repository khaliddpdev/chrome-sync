({
    name: '../app',
    baseUrl: "modules",
    optimize: 'uglify2',
    waitSeconds : 0,
    paths: {
        "domReady" : "domReady",
        "config": "config",
        "utils": "utils",
        "console": "console",
        "namespace": "namespace",
        "CircleElement" : "views/circular-text",
        "AnimatedElement" : "views/animated-element",
        "ClippedElement" : "views/cutoff-content-box",
        "HeroImage" : "views/hero-image-v2",
        "HeroImageV1" : "views/hero-image",
        "VisibilityAwareElement" : "views/visibility-aware-element",
        "live" : "vendors/live",
        "modernizr" : "vendors/modernizr.min",
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
    },
    out: "../build/boilerplate-src.js"
});