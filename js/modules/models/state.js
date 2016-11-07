define([
    'require',
    'backbone'
], function(require){
    var Backbone = require('backbone'),
        ChromeSyncState = Backbone.Model.extend({
           defaults : {
               isActive : true
           }
        });

    return new ChromeSyncState();
});