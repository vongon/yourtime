import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var schema = new Schema(
    {
        user_id: String, //auth0 id
        customer_id: String //stripe id
    }
);

module.exports = {
    CustomerSchema: schema,
    Customer: mongoose.model('Customer', schema)
};