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
            socket = io(config.chromeSync.server);


        socket.on('refresh', function (data) {
            console.log('received: %o', data);
            if (state.get('isActive')) {
                chrome.tabs.query({
                    currentWindow: true
                }, function (currentTabsMeta) {
                    var hasBrowserReloaded = false,
                        tabRegex = new RegExp(data.tabRegex, 'i'),
                        ignoreRegex = new RegExp(data.ignoreTabRegex, 'i');

                    _.forEach(currentTabsMeta, function (tabMeta) {
                        var url = tabMeta.url.toString();
                        if (url.match(tabRegex) && !url.match(ignoreRegex)) {
                            console.log('found %s', url);
                            chrome.tabs.reload(tabMeta.id);
                            hasBrowserReloaded = true;
                        }
                    });

                    socket.emit('received:refresh', {
                        type: 'refresh',
                        result: {
                            success: true,
                            actionTaken: hasBrowserReloaded
                        },
                        success: true
                    });
                });
            } else {
                socket.emit('received:refresh', {
                    type: 'refresh-invalid',
                    result: {
                        success: false,
                        actionTaken: false
                    },
                    reason: 'chrome-sync is not active'
                });
            }
        });

        socket.on('stop', function (data) {
            state.set('isActive', false);
            chrome.tabs.reload();
        });

        socket.on('start', function (data) {
            state.set('isActive', true);
            chrome.tabs.reload();
        });

        socket.on('test', function (data) {
            console.log('chrome-sync successfully connected.');
            socket.emit('received:test', {
                type: 'test',
                result: {
                    success: true,
                    actionTaken: false
                }
            });
        });
    });
