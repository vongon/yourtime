import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var schema = new Schema(
    {
        type: String,
        name: String,
        description: String,
        price: Number,
        workplace_id: Schema.Types.ObjectId,
        workplace_name: String
    }
);

module.exports = {
    ServiceSchema: schema,
    Service: mongoose.model('Service', schema)
};