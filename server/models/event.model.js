import mongoose from 'mongoose';
import { ServiceSchema } from './service.model';
import { WorkplaceSchema } from './workplace.model';

var schema = new mongoose.Schema(
    {
        user_id: String,
        user: {},
        service: ServiceSchema,
        workplace: WorkplaceSchema,
        date: Date,
        vehicle: {
            make: String,
            model: String,
            year: String
        }
    }
);

module.exports = {
    EventSchema: schema,
    Event: mongoose.model('Event', schema)
};