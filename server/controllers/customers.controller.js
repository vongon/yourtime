import {Customer} from '../models/customer.model';
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


/*
 Create new or update
 @body.stripe_token: required, token from stripe checkout component
 */
export function postCustomers(req, res) {
    if (!req.body.stripe_token) return res.status(400).send({err: 'requires a stripe_token attribute in body to create day'});
    var user_id = req.user.sub;

    Customer.findOne({user_id: user_id}, function (err, customer) {
        if (err) {
            res.status(500).send({err: 'could not query customer'});
            return console.error(err);
        }
        if (!customer) {
            /*create new stripe customer*/
            stripe.customers.create({
                description: 'Customer for ' + req.user.email,
                email: req.body.email,
                source: req.body.stripe_token
            }, function (err, stripe_customer) {
                if (err) return res.status(500).send({err: err.message});

                var customer = new Customer;
                customer.user_id = user_id;
                customer.customer_id = stripe_customer.id;
                customer.save(function (err, customer) {
                    if (err) return res.status(500).send({err: 'could not save customer object to database'});
                    res.send(customer);
                });
            });
        }
        else {
            /*update stripe customer with stripe_token*/
            stripe.customers.update(customer.customer_id, {
                source: req.body.stripe_token
            }, function (err, stripe_customer) {
                if (err) return res.status(500).send({err: err.message});
                res.send(customer);
            });
        }
    });
}
