var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



  var noAvailSchema = new Schema({
    dateStart: Date,
    dateEnd: Date,
    timeStart: String,
    timeEnd: String,
});

noAvailSchema.pre('save', function(next, err) {
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
var uNoAvail = mongoose.model('uNoAvail', noAvailSchema, 'uNoAvail');

module.exports = uNoAvail;
