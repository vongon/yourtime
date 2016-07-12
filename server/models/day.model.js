import mongoose from 'mongoose';
import { Workplace } from './workplace.model';
import { Event } from './event.model';
import parallel from 'async/parallel';
var Schema = mongoose.Schema;


var schema = new Schema(
    {
        location_id: Schema.Types.ObjectId,
        date: Date,
        capacity: Number
    }
);

schema.method('getEventCount',function(mCb){
    Workplace.find({location_id: this.location_id},
        function(err, workplaces){
            if(err) return mCb(err);

            var func_array = [];
            for(var i=0; i<workplaces.length; i++){
                var workplace = workplaces[i];
                func_array.push(
                    (pCb) => {
                        Event.find({workplace_id: workplace._id},
                            (err, events)=>{
                                if(err) return pCb(err);
                                pCb(null, events.length);
                            });
                    }
                );
            }

            parallel(func_array,
                (err, result)=>{
                    if(err) return mCb(err);
                    var total = 0;
                    for(var i=0; i<result.length; i++){
                        total += result[i];
                    }
                    mCb(null, total);
                }
            );
        });
});

module.exports = {
    DaySchema: schema,
    Day: mongoose.model('Day', schema)
};