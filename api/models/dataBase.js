var mongoose = require('mongoose');
var readLine = require('readline');
var softShutdown;
var dataBaseURI = 'mongodb://localhost/ort';
console.log(dataBaseURI);
if (process.env.NODE_ENV === 'production') {
    dataBaseURI = process.env.MONGOLAB_URI;    
}

mongoose.connect(dataBaseURI);

if (process.platform === "win32") {
    var tmp = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
    });

    tmp.on ("SIGINT", function () {
        process.emit("SIGINT");
    });
};

//мониторинг событий
mongoose.connection.on('connected', function () {
    console.log('connection to ' + dataBaseURI + ' is OK');
});

mongoose.connection.on('error', function (err) {
    console.log('connection to ' + dataBaseURI + ' ERROR' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('disconnected ');
});

//закрытие соединения
softShutdown = function (message, callback) {
    mongoose.connection.close(function() {
        console.log('mongoose disconnected ' + message);
        callback();
    });
};

//прослушивание сигналов

//перезапуск nodemon
process.once('SIGUSR2', function() {
    softShutdown('restart nodemon', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

//закрытие
process.on('SIGINT', function() {
    softShutdown('shutdown', function() {
        process.exit(0);
    });
});

//закрытие heroku
process.on('SIGTERM', function() {
    softShutdown('heroku shutdown', function() {
        process.exit(0);
    });
});

require('./locations');