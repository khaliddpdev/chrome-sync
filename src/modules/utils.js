define(['config', 'namespace'], function (config, NS) {
    "use strict";

    var pre = 'webkit';
    if( window.getComputedStyle) {
        var styles = window.getComputedStyle(document.documentElement, '');
        pre = (Array.prototype.slice
                .call(styles)
                .join('')
                .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
        )[1];
    }
    NS.utils = {
        browserPrefix : pre,
        setPrefixedStyle : function(el, style, value){
            var cacheStyle = el.style;
            if (pre == ""){
                cacheStyle[style] = value;
            } else{
                cacheStyle[pre+style] = value;
            }
        },
        isMobile : function(){
            return (window.innerWidth < config.breakpoints.mobile);
        },
        reverseArray: function reverse(a) {
            var temp = [],
                len = a.length;
            while(len--) {
                temp.push(a[len]);
            }
            return temp;
        },
        convertPixelToEm: function(pixels){
            var emVal = pixels / config.DOMProperties.defaultFontSize;
            return emVal+'em';
        },
        convertPixelToEmSans: function(pixels){
            return (pixels / config.DOMProperties.defaultFontSize);
        },
        convertEmtoPixel: function(ems){
            var pxVal = ems * config.DOMProperties.defaultFontSize;
            return pxVal+'px';
        },
        convertEmtoPixelSans: function(ems){
            return ems * (config.DOMProperties.defaultFontSize);
        },
        createCookie : function(name,value,days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        },
        readCookie : function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        },
        eraseCookie : function(name){
            var value = '',
                days = -1;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        },
        debounce: function(delay, func, thisArg, funcArgs){
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
         * @param callback
         * @param passedThis
         * @param funcArgs
         * @returns {string}
         */
        testPerformance : function(callback, passedThis, funcArgs){
            if((!performance) || (!performance.now)) return 'n/a';
            var t0,
                t1,
                thisArg  = passedThis || window,
                args = funcArgs || [];
            t0 = performance.now();
            callback.apply(thisArg, args);
            t1 = performance.now();
            return ('time: '+ (t1-t0));
        },
        /**
         *
         * @param $el
         * @param duration
         */
        scrollTo : function($el, duration){
            var scrollDuration = duration || 600;
            jQuery('html, body').animate({
                scrollTop: ($el.offset().top - $('header').height() +2) // +2 for good measure
            }, scrollDuration);
        }
    };

    return NS.utils;
});