define([
        'require',
        'socket-io',
        'state',
        'config',
        'underscore'
    ],
    function (require) {
        console.log("require('updater')");

        var io = require('socket-io'),
            state = require('state'),
            config = require('config'),
            _ = require('underscore'),
            socket = io(config.chromeSync.server),
            tabRegex = config.chromeSync.tabRegex,
            ignoreRegex = config.chromeSync.ignoreTabRegex;


        socket.on('refresh', function (data) {
            if (state.get('active')) {
                chrome.tabs.query({
                    currentWindow: true
                }, function (tabs) {
                    var reloaded = false;

                    _.forEach(tabs, function (tab, index, arr) {
                        var url = String(tab.url);
                        if (tabRegex.test(url) && !ignoreRegex.test(url)) {
                            chrome.tabs.reload(tab.id);
                            reloaded = true;
                        }
                    });

                    socket.emit('received:refresh', {
                        type: 'refresh',
                        result: {
                            success : true,
                            actionTaken: reloaded
                        },
                        success : true
                    });
                });
            } else {
                socket.emit('received:refresh', {
                    type: 'refresh-invalid',
                    result: {
                        success : false,
                        actionTaken: false
                    },
                    reason : 'chrome-sync is not active'
                });
            }
        });

        socket.on('stop', function (data) {
            state.set('active', false);
            chrome.tabs.reload();
        });

        socket.on('start', function (data) {
            state.set('active', true);
            chrome.tabs.reload();
        });

        socket.on('test', function (data) {
            console.log('chrome-sync successfully connected.');
            socket.emit('received:test', {
                type: 'test',
                result: {
                    success : true,
                    actionTaken: false
                }
            });
        });
    });