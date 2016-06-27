import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var schema = new Schema(
    {
        name: String,
        day_of_week: Number
    }
);

module.exports = {
    WorkplaceSchema: schema,
    Workplace: mongoose.model('Workplace', schema)
};