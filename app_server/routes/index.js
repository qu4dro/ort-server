var express = require('express');
var router = express.Router();
// var mainController = require('../controllers/main');
var othersController = require('../controllers/others');
var locationsController = require('../controllers/locations')

//страница локации
router.get('/', locationsController.locationsList);
router.get('/location/:locationId', locationsController.locationInfo);
router.get('/location/review/addReview', locationsController.addReview)

// /* GET home page. */
// router.get('/', mainController.index);

//остальные страницы
router.get('/about', othersController.about);

module.exports = router;
