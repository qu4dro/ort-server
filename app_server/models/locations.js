var mongoose = require('mongoose');

//схема для времени работы
var workingTimeMongooseSchema = new mongoose.Schema({
    days: {type: String, required: true},
    openTime: String,
    closeTime: String,
    isClosed: {type: Boolean, required: true}
})

//схема для отзывов
var reviewsMongooseSchema = new mongoose.Schema({
    author: String,
    date: {type: Date, "default": Date.now},
    text: String,
    stars: {type: Number, required: true, min: 0, max: 5}
})

//схема места
var locationMongooseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: String,
    stars: {type: Number, "default": 0, min: 0, max: 5},
    services: [String],
    coordinates: {type: [Number], index: '2dsphere'},
    workingTime: [workingTimeMongooseSchema],
    reviews: [reviewsMongooseSchema]
});

mongoose.model('Location', locationMongooseSchema);