const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Zips = mongoose.model('zips', new Schema({ 
	zip: Number, hoursOfSunPerDay: Number})
);

module.exports = {Zips};