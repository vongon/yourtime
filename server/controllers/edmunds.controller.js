import request from 'superagent';

/*
 Get all makes,models,years from edmunds api
 */
export function getMakes(req, res) {
    request
        .get('https://api.edmunds.com/api/vehicle/v2/makes')
        .query({api_key:process.env.EDMUNDS_KEY})
        .query({fmt: 'json'})
        .end((err, api_res)=>{
            if(err){
                return res.status(500).send({err: 'error requesting data from edmunds API'});
            }
            var makes = api_res.body.makes;
            var compare = function(a, b){
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            };
            res.send(makes.sort(compare));
        });
}


/*
* Get all styles for make/model/year combo
* */
export function getStyles(req, res) {
    if (!req.query.make) return res.status(400).send({err: 'requires query param: make'});
    if (!req.query.model) return res.status(400).send({err: 'requires query param: model'});
    if (!req.query.year) return res.status(400).send({err: 'requires query param: year'});
    request
        .get('https://api.edmunds.com/api/vehicle/v2/' +
            req.query.make + '/' +
            req.query.model + '/' +
            req.query.year + '/styles')
        .query({api_key: process.env.EDMUNDS_KEY})
        .query({fmt: 'json'})
        .end((err, api_res)=> {
            if (err) {
                return res.status(500).send({err: 'error requesting data from edmunds API'});
            }
            res.send(api_res.body.styles);
        });
}