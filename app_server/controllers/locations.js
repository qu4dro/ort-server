module.exports.locationsList = function(req, res) {
    res.render('locationsList', { 
        title: 'Ort - домашная страница',
        header: {
            title: 'Ort',
            string: 'Поиск мест рядом'
        },
        sideText: 'Приложение, созданное для поиска ближайших мест по критериям',
        locations: [{
            name: 'Кофейня',
            address: 'Юбилейный 65',
            services: ['Еда, напитки, WIFI'],
            range: '250m',
            stars: 3
        }, {
            name: 'Ресторан',
            address: 'Юбилейный 23б',
            services: ['Еда, напитки, WIFI'],
            range: '300m',
            stars: 4
        }, {
            name: 'Слата',
            address: 'Юбилейный 23б',
            services: ['Продукты, напитки'],
            range: '700m',
            stars: 5
        }
    ]
    });
};
module.exports.locationInfo = function(req, res) {
    res.render('locationInfo', { title: 'Информания о месте'});
};
module.exports.addReview = function(req, res) {
    res.render('locationReview', { title: 'Добавить отзыв'});
};