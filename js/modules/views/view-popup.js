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
                this.listenTo(state, 'change:active', this.render);
                this.render();
            },
            events: {
                'click .toggle-state': 'toggle'
            },
            toggle: function () {
                var isActive = state.get('active');
                state.set('active', !isActive);
            },
            render: function () {
                if(state.get('active')){
                    this.$toggleState.removeClass('inactive');
                } else {
                    this.$toggleState.addClass('inactive');
                }
            }
        });

    var chromeWindows = chrome.extension.getViews(),
        _window = chromeWindows[1],
        el = _window.document.getElementById('container-popup');
    Namespace.PopupView = (el) ? new PopupView({el: el}) : PopupView;
    return PopupView;
});