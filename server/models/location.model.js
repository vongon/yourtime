import mongoose from 'mongoose';
var Schema = mongoose.Schema;


var schema = new Schema(
    {
        name: String,
        days: [ Schema.Types.ObjectId ]
    }
);

module.exports = {
    LocationSchema: schema,
    Location: mongoose.model('Location', schema)
};