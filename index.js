var server = require('http').createServer(),
    io = require('socket.io')(server),
    portNumber = 3000,
    watchedFilesRegex = /.*\.php$/,
    config = JSON.parse(require('fs').readFileSync('./config.json')),
    projectDirectory = config.directory;


//fs.watch('/home/kah8br/www/dp-v6/wp-content/themes/dp-v6/',
//    {
//        persistent: true,
//        recursive: true
//    },
//    function (arg1, arg2) {
//        console.log('change: ', arguments);
//    });

io.on('connection', function(socket){

    console.log('testing...');
    socket.emit('test');

    require('./core/watcher').watcher(projectDirectory, watchedFilesRegex, function(){
        console.log('refreshing...');
        socket.emit('refresh');
    });

    socket.on('event', function(data){
        console.log('event: ', data);
    });

    socket.on('received', function(data){
        console.log('reply: ', data);
    });
    socket.on('disconnect', function(){
        console.warn('disconnected: ', arguments);
    });
});

server.listen(portNumber, function(){
    console.log('listen to '+portNumber+ "...");

});