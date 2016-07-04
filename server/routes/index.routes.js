import locations from './locations.routes';


var api_routes =  function(app){
    app.use('/api', locations);
};

export default api_routes;