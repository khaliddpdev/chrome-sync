define([], function () {
   return {
       animation :{
           classes : {
               animationBaseClass : "anim",
               animationEnter : "fadeIn",
               animationExit : "fadeOut"
           },
           props :{
               duration : "600ms",
               timing : 'ease'
           }
       },
       targets : {
           classNames : {
               heroV2ClassName : 'parallax-hero',
               heroContainer : 'container-hero',
               heroClassName : 'hero-img-placeholder',
               circleElements : 'circle'
           }
       },
       DOMProperties : {
           defaultFontSize: 16
       }
   }
});