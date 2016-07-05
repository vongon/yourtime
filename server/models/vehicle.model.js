import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var schema = new Schema(
    {
        user_id: String, //Auth0 id, not mongodb id
        edmunds_id: String //Edmunds id, not mongodb id
    }
);

module.exports = {
    VehicleSchema: schema,
    Vehicle: mongoose.model('Vehicle', schema)
};