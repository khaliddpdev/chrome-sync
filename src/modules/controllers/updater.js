define(['socket-io', 'state', 'underscore'],
    function(io, State, _){
        console.log('init socket');
        var socket = io('http://localhost:3000'),
            isWatching = true,
            devRegex = /localhost/,
            adminFilterRegex = /wp-admin/;
        socket.on('refresh', function (data) {
            if(State.isWatching){
                chrome.tabs.query({
                    currentWindow: true
                }, function(tabs) {
                    var reloaded = false;

                    _.forEach(tabs, function(tab, index, arr){
                        var url = String(tab.url);
                        if(devRegex.test(url) && !adminFilterRegex.test(url)){
                            chrome.tabs.reload(tab.id);
                            reloaded = true;
                        }
                    });

                    socket.emit('received', {
                        received: true,
                        type: 'refresh',
                        reloaded : reloaded
                    });
                });
            } else{
                socket.emit('received', {
                    received: true,
                    type: 'refresh-invalid',
                    reloaded : false
                });
            }
        });
        socket.on('stop', function (data) {
            chrome.tabs.reload();
            State.isWatching = false;
        });
        socket.on('start', function (data) {
            chrome.tabs.reload();
            State.isWatching = true;
        });
        socket.on('test', function (data) {
            console.log('received test');
            socket.emit('received', {
                received: true,
                type: 'test',
                reloaded : false
            });
        });
    });