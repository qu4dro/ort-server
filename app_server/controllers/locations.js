module.exports.locationsList = function(req, res) {
    res.render('locationsList', { title: 'Список мест'});
};
module.exports.locationInfo = function(req, res) {
    res.render('locationInfo', { title: 'Информания о месте'});
};
module.exports.addReview = function(req, res) {
    res.render('locationReview', { title: 'Добавить отзыв'});
};