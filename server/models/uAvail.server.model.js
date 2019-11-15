var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


  var availSchema = new Schema({
    dateStart: Date,
    dateEnd: Date,
    timeStart: String,
    timeEnd: String,
});

availSchema.pre('save', function(next, err) {
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
var uAvail = mongoose.model('uAvail', availSchema, 'uAvail');

module.exports = uAvail;
