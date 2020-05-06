var request = require('request');
var settings = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    settings.server = "https://orlov-where-to-work.herokuapp.com/"
}

module.exports.locationsList = function(req, res) {
    var path = '/api/locations';
    var requestSettings = {
        url : settings.server + path,
        method: "GET",
        json: {},
        qs: {
            lng : 104.32255,
            lat : 52.277205,
            maxDistance : 20000
        }
    };

    request(requestSettings, function(err, response, body) {
        var tmp = body;
        if (tmp.length && response.statusCode === 200) {
            for (let i = 0; i < tmp.length; i++) {
                tmp[i].range = doPrettyRange(tmp[i].range);
            }
            
        }
        renderLocationsList(req, res, tmp);
    });

};
module.exports.locationInfo = function(req, res) {
    var path = '/api/locations/' + req.params.locationId;
    var requestSettings = {
        url : settings.server + path,
        method : "GET",
        json : {}
    };
    request(requestSettings, function(err, response, body) {
        var tmp = body;
        tmp.coordinates = {
            lng : tmp.coordinates[0],
            lat : tmp.coordinates[1]
        };
        renderLocationInfo(req, res, tmp);
    })
    
};
module.exports.addReview = function(req, res,) {
    res.render('locationReview', { 
        title: 'Добавить отзыв',
        header: {title: 'Отзыв название'}
    });
};

//render функции
//render списка локаций
var renderLocationsList = function(req, res, body) {
    var errorMessage;
    if (!(body instanceof Array)) {
        errorMessage = "Ошибка";
        body = [];
    } else {
        if (!body.length) {
            errorMessage = "Мест рядом не найдено";
        }
    }
    res.render('locationsList', { 
        title: 'Ort - домашная страница',
        header: {
            title: 'Ort',
            string: 'Поиск мест рядом'
        },
        sideText: 'Приложение, созданное для поиска ближайших мест по критериям',
        locations: body,
        errorMessage: errorMessage
    });
};

//render информации о выбранной локации
var renderLocationInfo = function (req, res, body) {
    res.render('locationInfo', { 
        title: body.name,
        header: {title: 'Информация о ' + body.name},

        sideText: {firstBlock: 'какой-то текст', secondBlock: 'еще текст'},
        location: body
     });
}

//вспомогательные функции
//форматирование расстояния

var doPrettyRange = function(range) {
    var unit = 'м';
    var formattedRange;
    if (range > 1000) {
        formattedRange = parseFloat(range / 1000).toFixed(2);
        unit = 'км';
    } else {
        formattedRange = parseInt(range, 10);
        unit = 'м';
    }
    return formattedRange + unit;
};