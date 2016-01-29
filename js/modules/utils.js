define([
        'require',
        'config',
        'namespace',
        'jquery',
        'module'
    ],
    function (require) {

        var config = require('config'),
            NS = require('namespace'),
            module = require('module'),
            $ = require('jquery'),
            DOMParser = DOMParser || function () {
                    return {
                        parseFromString: function (DOMString) {
                            return $(DOMString);
                        }
                    }
                },
            pre = 'webkit',
            domParser = new DOMParser();

        if (!location.origin) location.origin = location.protocol + '//' + location.host;
        if (window.getComputedStyle) {
            // TODO simplify code
            var styles = window.getComputedStyle(document.documentElement, '');
            try {
                pre = (Array.prototype.slice
                        .call(styles)
                        .join('')
                        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
                )[1];
            } catch (e) {
                console.error("Couldn't determine browser prefix: ", e);
            }
        }
        NS.utils = {
            browserPrefix: pre,
            setPrefixedStyle: function (el, cssProperty, cssValue) {
                if (pre == "") {
                    el.style[cssProperty] = cssValue;
                } else {
                    el.style[pre + cssProperty] = cssValue;
                }
            },
            isMobile: function () {
                return (window.innerWidth < config.breakpoints.mobile);
            },
            reverseArray: function reverse(a) {
                var temp = [],
                    len = a.length;
                while (len--) {
                    temp.push(a[len]);
                }
                return temp;
            },
            createCookie: function (name, value, days) {
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    var expires = "; expires=" + date.toGMTString();
                }
                else var expires = "";
                document.cookie = name + "=" + value + expires + "; path=/";
            },
            readCookie: function (name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            },
            eraseCookie: function (name) {
                var value = '',
                    days = -1;
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    var expires = "; expires=" + date.toGMTString();
                }
                else var expires = "";
                document.cookie = name + "=" + value + expires + "; path=/";
            },
            /**
             *
             * @param func
             * @param options
             * @returns {function}
             */
            debounce: function (func, options) {
                var timeout,
                    defaults = {
                        delay: 600,
                        context: null,
                        args: null
                    };
                options = $.extend(defaults, options);

                function done() {
                    func.apply(options.context, options.args);
                }

                function debounced() {
                    if (timeout) clearTimeout(timeout);
                    timeout = setTimeout(done, (options.delay));
                }

                return debounced;
            },
            /**
             *
             * @param {function} callback
             * @param {object} options
             * @param {object} options.context
             * @param {Array} options.args
             * @param {Boolean} options.isNumber
             * @returns {string}
             */
            testPerformance: function (callback, options) {
                if ((!performance) || (!performance.now)) return 'n/a';
                var defaults = {
                        context: window,
                        args: null
                    },
                    t0 = 0,
                    t1 = 0;
                options = $.extend(defaults, options);

                t0 = performance.now();
                callback.apply(options.context, options.args);
                t1 = performance.now();
                return (options.isNumber) ? (t1 - t0) : ('time: ' + (t1 - t0));
            },
            /**
             *
             * @param html
             * @param options
             * @returns {*|jQuery|HTMLElement}
             */
            parseDOMString: function (html, options) {
                var defaults = {
                    safemode: true
                };
                options = $.extend(defaults, options);
                if (options.safemode) {
                    try {
                        var DOM = domParser.parseFromString(html, 'text/html');
                        return $(DOM);
                    } catch (e) {
                        console.error(e);
                        return $(html);
                    }
                } else {
                    return $(domParser.parseFromString(html, 'text/html'));
                }
            },
            /**
             * Sanitizes a path/url aka adds trailing slash if need be to any path
             * @param {string} url
             * @returns {string}
             */
            sanitizeUrl: function (url) {
                return (url[url.length - 1] == '/') ? url : url + '/';
            },
            /**
             *
             * @param {string} url
             * @returns {*|jQuery|HTMLElement}
             */
            loadCss: function (url) {
                var $link = $(document.createElement('link'));
                $link.attr({
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: url
                });
                $link.appendTo('head');
                return $link;
            },
            /**
             *
             * @param {Number} min
             * @param {Number} max
             * @returns {Number}
             */
            getRand: function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        };

        return NS.utils;
    });