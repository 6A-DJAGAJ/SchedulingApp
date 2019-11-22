var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  var timeCSchema = new Schema({
    _id: Schema.Types.ObjectId,
    clockInDate: Date,
    clockInTime: String,
    clockOutDate: Date,
    clockOutDate: String
});

timeCSchema.pre('save', function(next, err) {
    if (!this.name){
      next(err);
    }
    else{
    var currentDate = new Date();
    this.updated_at = currentDate;
    if(!this.created_at)
      this.created_at = currentDate;
      next();
    }
  });




//model decides database, schema, collection
var timeClock = mongoose.model('timeClock', timeCSchema, 'timeClock');

module.exports = timeClock;