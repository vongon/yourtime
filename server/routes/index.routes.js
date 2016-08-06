import locations from './locations.routes';
import workplaces from './workplaces.routes';
import days from './days.routes';
import vehicles from './vehicles.routes';
import services from './services.routes';
import events from './events.routes';
import edmunds from './edmunds.routes';
import customers from './customers.routes';

var api_routes =  function(app){
    app.use('/api', locations);
    app.use('/api', workplaces);
    app.use('/api', days);
    app.use('/api', vehicles);
    app.use('/api', services);
    app.use('/api', events);
    app.use('/api', edmunds);
    app.use('/api', customers);
};

export default api_routes;