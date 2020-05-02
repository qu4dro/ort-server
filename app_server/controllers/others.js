module.exports.about = function(req, res) {
    res.render('information', { 
        title: 'Информация',
        text: 'Приложение, созданное для поиска мест на карте по критериям. \n\n Приложение, созданное для поиска мест на карте по критериям.'
    });
};