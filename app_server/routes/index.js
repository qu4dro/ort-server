var express = require('express');
var router = express.Router();
// var mainController = require('../controllers/main');
var othersController = require('../controllers/others');
var locationsController = require('../controllers/locations')

//location pages
router.get('/', locationsController.homePage);
router.get('/location', locationsController.locationInfo);
router.get('/location/review/addReview', locationsController.addReview)

// /* GET home page. */
// router.get('/', mainController.index);

//other pages
router.get('/about', othersController.about);

module.exports = router;
