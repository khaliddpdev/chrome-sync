define(['namespace','backbone', 'state'], function(NS, Backbone, State){
    var PopupView = Backbone.View.extend({
        initialize: function(){
            //console.log('init reload window: ', this);
            this.$toggleState = this.$('.toggle-state');
            this.updateButton();
        },
        events: {
            'click .toggle-state': 'toggleState'
        },
        toggleState : function(){
            State.isWatching = !State.isWatching;
            this.updateButton();
        },
        updateButton : function(){
            this.$toggleState.html((State.isWatching)?'On':'Off');
        }
    });

    var mainWindow = chrome.extension.getViews()[0],
        el = mainWindow.document.getElementById('container-popup');
    console.log(mainWindow);
    NS.PopupView = (el)?new PopupView({el: el}):PopupView;
    return PopupView;
});