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
    res.render('locationInfo', { 
        title: 'Информания о месте',
        header: {title: 'Информация о месте'},

        sideText: {firstBlock: 'какой-то текст', secondBlock: 'еще текст'},
        location: {
            name: 'Кофейня',
            address: 'Юбилейный 65',
            stars: 3, 
            services: ['Еда, напитки, WIFI'],
            coordinates: {lat: 52.222977 , lng: 104.299971},
            workingTime: [{
                days: 'Ежедневно',
                openTime: '9:00',
                closeTime: '20:00',
                isClosed: false
            }, {
                days: 'Ежедневно'
            }],
            reviews: [{
                author: 'Петр Петров',
                date: '20 Июня 2020',
                text: 'Отличное место!',
                stars: 5
            }, {
                author: 'Иван Иванов',
                date: '18 Августа 2020',
                text: 'Плохое место!',
                stars: 3

            }]
        }

        
     });
};
module.exports.addReview = function(req, res) {
    res.render('locationReview', { 
        title: 'Добавить отзыв',
        header: {title: 'Отзыв название'}
    });
};