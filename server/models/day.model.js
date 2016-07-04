import mongoose from 'mongoose';
var Schema = mongoose.Schema;


var schema = new Schema(
    {
        date: Date,
        capacity: Number
    }
);

module.exports = {
    DaySchema: schema,
    Day: mongoose.model('Day', schema)
};