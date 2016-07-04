import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var schema = new Schema(
    {
        location_id: Schema.Types.ObjectId,
        name: String
    }
);

module.exports = {
    WorkplaceSchema: schema,
    Workplace: mongoose.model('Workplace', schema)
};