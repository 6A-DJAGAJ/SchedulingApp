var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  var timeCSchema = new Schema({
    _id: Schema.Types.ObjectId,
    clockIn: String,
    clockOut: String,
    boolClockedOut: Boolean
});

timeCSchema.pre('save', function(next, err) {
    if (!this.name){
      next(err);
    }
    else{
      next()
    }
  });




//model decides database, schema, collection
var timeClock = mongoose.model('timeClock', timeCSchema, 'timeClock');

module.exports = timeClock;