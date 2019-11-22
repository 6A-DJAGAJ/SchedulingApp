
var mongoose = require('mongoose'), 
    uPin = require('../models/uPin.server.model.js')
    timeClock = require('../models/timeClock.server.model')

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
      uPin.find({}, null, null, function (err, pins) {
        if (err) return handleError(err);
        console.log("calling all pins" + pins);
        res.send(pins);
      }); //add sorted functionality
    };

    exports.read = function(req,res){
      res.json(req.pinNum)
    };



    exports.findPin = function(req, res) {
      uPin.findOne({pinNum:req.params.pinNum}).exec(function (err, user) {
        //console.log(req.params.pinNum);
        if (err) return handleError(err);
        if (user==null){
          console.log("Pin" + pinNum + "not found.")
        }
        else{
          //var clockedIn = logPin(user._id);
        }
        console.log("Pin matched to user: " + user)
        res.json(user._id);
      });
    };
    //findPin+, logs the person in
    /*function logPin(userId) {
      //check for if the user is clockedIn and haven't clocked out today
      timeClock.find({_id:userId},{clockIn:Date().today()}).exec(function(){
        
      });
      timeClock.create({_id:userId},{clockIn:Date()},{clockOut:null}).exec(function (err, user){
            
      })
      
    };*/


}
catch(err){
    console.log(err);
  }

