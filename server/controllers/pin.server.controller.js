
var mongoose = require('mongoose'), 
    uPin = require('../models/uPin.server.model.js')

/* Create a listing */
try{
    exports.create = function(req, res) {
    
      /* Instantiate a User */
      var pin = new uPin(req.body);
     
      /* Then save the User */
      uPin.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.json(pin);
          console.log(pin)
        }
      });
    };
    exports.list = function(req, res) {
      /* Add your code */
      uPin.find({}, null, null, function (err, pins) {
        if (err) return handleError(err);
        console.log("calling all pins" + pins);
        res.send(pins);
      }); //add sorted functionality
    };
}
catch(err){
    console.log(err);
  }

