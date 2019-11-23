
var mongoose = require('mongoose'), 
    moment = require('moment'),
    format = require('format'),
    uPin = require('../models/uPin.server.model.js')
    timeClock = require('../models/timeClock.server.model')
    Users = require('../models/Users.server.model')

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
      uPin.findOne({pinNum:req.params.pinNum}).exec(async function (err, user) {
        //console.log(req.params.pinNum);
        if (err) return handleError(err);
        if (user==null){
          console.log("Pin" + pinNum + "not found.")
          //respond with {name,clockedIn:bool}
          clockedIn={name:null,clockedIn:false};
        }
        else{
          console.log("Pin matched to user: " + user)
          var clockedIn = new Promise(function(resolve, reject){
              setTimeout(function() {
                resolve(clockPin(user._id));
              }, 500);
          });
          
          var valueReturned = await clockedIn;
          console.log("Returned:" + valueReturned);
          res.json(valueReturned);
          
          
        }
        
        
        
      });
    };
    //findPin+, logs the person in
    async function clockPin(userId) {
      console.log("Searching database for entries where clockedOut is false")
      //############################################################//
      //Assumes users have been clocked out the day before//
      //###########################################################//
      var createInstStatus = {"name":null,"clockedIn":false};
      timeClock.findOne({_id:userId, boolClockedOut:false}, 'boolClockedOut')
      .exec(async function(todayClockOut,err){
        if (err){
          console.log("Find timeClocks error: " + err)
          createInstStatus = {"name":null,"clockedIn":false}
        }
        else if (todayClockOut !== null) {
          //user needs to clock out before clocking in again
          console.log("User has not clocked out")
          createInstStatus = {name:getName(userId),clockedIn:false}
        }
        else{
          //create new data in db showing a user has clocked in
          console.log("Creating new instance in database")
          timeClock.create([{_id:userId},{clockIn:moment().format()},
          {clockOut:null},{boolClockedOut:false}], null, function (err){
              if (err[0]!==undefined) {
                console.log("Create error: " + err);
                createInstStatus = {"name":null,"clockedIn":false}
              }
              else{
                console.log("Success!")
                createInstStatus = {"name":"updated","clockedIn":true}
              }
              console.log("Current createInstStatus: " + createInstStatus.name)
          })
        }
        return;
      });
      console.log("Current createInstStatus: " + createInstStatus.name)
      return createInstStatus
    };

    //function helper for getting name by ID
    function getName(userId){
      Users.findOne({_id:userId}, 'name', null, function (err, userName) {
        if (err) {
          console.log("Find user error:" + err)
          return null
        }
        else {return userName}
      });
    }


}
catch(err){
    console.log(err);
  }

