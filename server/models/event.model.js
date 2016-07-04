import mongoose from 'mongoose';
var Schema = mongoose.Schema;
import { ServiceSchema } from './service.model';

var schema = new Schema(
    {
        user_id: Schema.Types.ObjectId,
        workplace_id: Schema.Types.ObjectId,
        vehicle_id: Schema.Types.ObjectId,
        services: [ ServiceSchema ],
        date: Date
    }
);

module.exports = {
    EventSchema: schema,
    Event: mongoose.model('Event', schema)
};