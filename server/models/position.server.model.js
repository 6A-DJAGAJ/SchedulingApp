var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var positionSchema = new Schema({
    Position: String
});

/* positionSchema.pre('save', function(next, err) {
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
  }); */



//model decides database, schema, collection
var Positions = mongoose.model('positions', positionSchema, 'positions');

module.exports = Positions;