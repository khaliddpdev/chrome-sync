define([
    'require',
    'namespace',
    'backbone',
    'state'
], function (require) {
    var Namespace = require('namespace'),
        Backbone = require('backbone'),
        state = require('state'),
        PopupView = Backbone.View.extend({
            initialize: function () {
                console.log('PopupView.initialize()');
                this.$toggleState = this.$('.toggle-state');
                this.listenTo(state, 'change:isActive', this.render);
                this.render();
            },
            events: {
                'click .toggle-state': 'toggleState'
            },
            toggleState: function (evt) {
                if(evt && evt.preventDefault) evt.preventDefault();
                state.set('isActive', !state.get('isActive'));
            },
            render: function () {
                if(state.get('isActive')){
                    this.$toggleState.removeClass('inactive');
                } else {
                    this.$toggleState.addClass('inactive');
                }
            }
        });

    var chromeWindows = chrome.extension.getViews(),
        backgroundWindow = chromeWindows[0],
        el = backgroundWindow.document.getElementById('container-popup');
    Namespace.PopupView = (el) ? new PopupView({el: el}) : PopupView;
    return PopupView;
});
