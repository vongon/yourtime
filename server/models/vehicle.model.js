import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var schema = new Schema(
    {
        user_id: Schema.Types.ObjectId,
        make: String,
        model: String,
        year: String,
        license_plate: String,
        vin: String
    }
);

module.exports = {
    VehicleSchema: schema,
    Vehicle: mongoose.model('Vehicle', schema)
};