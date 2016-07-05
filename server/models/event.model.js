import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var schema = new Schema(
    {
        user_id: String, //auth0 id
        workplace_id: Schema.Types.ObjectId,
        vehicle_id: Schema.Types.ObjectId,
        services: [ Schema.Types.ObjectId ],
        date: Date
    }
);

module.exports = {
    EventSchema: schema,
    Event: mongoose.model('Event', schema)
};