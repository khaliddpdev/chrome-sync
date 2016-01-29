define([], function () {
   return {
       chromeSync : {
           tabRegex : /localhost|192\.168\.1\.[0-9]+/,
           ignoreTabRegex : /wp-admin/,
           server : 'http://localhost:3000'
       },
       DOMProperties : {
           defaultFontSize: 16
       }
   }
});