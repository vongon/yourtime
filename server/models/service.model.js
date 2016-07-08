import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var schema = new Schema(
    {
        name: String,
        type: {type: String, enum: ['auto']}, //we will add more service types in the future
        category: {type: String, enum: ['oil change','tire rotation', 'inspection']},
        description: String,
        price: Number,
        workplace_id: Schema.Types.ObjectId
    }
);

module.exports = {
    ServiceSchema: schema,
    Service: mongoose.model('Service', schema)
};