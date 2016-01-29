define([
    'require',
    'backbone'
], function(require){
    var Backbone = require('backbone'),
        ChromeSyncState = Backbone.Model.extend({
           defaults : {
               active : true
           }
        });

    return new ChromeSyncState();
});