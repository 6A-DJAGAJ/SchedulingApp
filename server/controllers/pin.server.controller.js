
const mongoose = require('mongoose'), 
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
      pin.save(function(err) {
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
        if (err) return console.error(err);
        console.log("calling all pins" + pins);
        res.send(pins);
      }); //add sorted functionality
    };

    exports.read = function(req,res){
      if (req.params.pinNumIn !== null){
        res.json(req.params.pinNumIn)
      }
      else if (req.params.pinNumOut !== null){
        res.json(req.params.pinNumOut)
      }
    };

    exports.delete = function(req, res) {
      Users.findOneAndRemove({'_id' : req.body._id}, function(err,document){
        res.send(document);
      })
    }


//#######################           #######################//
//####################### Clock  In #######################//
//#######################           #######################//
    
    //############################################//
    var resStatus = {"name":null,"clockedIn":false, "status":0};
    //Status codes:
    // 0 = nothing has happened yet
    // 1 = successfully clocked in
    // 10 = found user, already clocked in
    // 11 = successfully clocked out
    // 33 = found user, nowhere to clock out
    // 404 = error, no user found
    // 911 = there was an error
    //############################################//
    exports.clockIn = async function(req, res) {
      var oldPin = "";

      uPin.findOne({pinNum:req.params.pinNumIn})
      .exec(async function (err, user) {
        //console.log(req.params.pinNumIn);
        if (err){ 
          resStatus.status = 911;
          return console.error(err);
        }
        else if (user===null){
          console.log("Pin " + req.params.pinNumIn + " not found.")
          //respond with {name,clockedIn:bool}
          res.json({"name":null,"clockedIn":false, "status":404});
        }
        else{
          let waitResStatus = new Promise((resolve,rej)=>{
            
            setTimeout(() => {
              if (oldPin === req.params.pinNumIn){
                console.log("Same pin entered")
              }
              else {
                getName(user._id);
                clockPinIn(user._id); //prep name
              }
              resolve()
            }, 50);
          });
          let sendResStatus = new Promise((resolve,rej)=>{
            
            setTimeout(() => {
              //console.log("Sent! "+resStatus.name)
              res.json(resStatus);
              resolve()
            }, 500);
          });
          await waitResStatus;
          await sendResStatus;
        }
      });
    };

    //find entries with same id and bool false
    //clockPin will depend on the server clocking out employees
    // at the end of their shift
    function clockPinIn(userId) {
      //console.log("Searching database for entries where clockedOut is false")

      timeClock.findOne({employeeID:userId, boolClockedOut:false}, 
        'boolClockedOut', function(err, todayClockOut){
        if (err){
          console.log("Find timeClocks error: " + err)
          resStatus.status = 911;
        }
        else if (todayClockOut !== null) {
          //user needs to clock out before clocking in again
          
          console.log(resStatus.name + " has not clocked out")
          resStatus.status = 10;
          resStatus.clockedIn = true;
        }
        else{
          //create new data in db showing a user has clocked in
          //console.log("Creating new instance in database")

          var newTimeClock = new timeClock({
            employeeID:userId,
            clockIn:moment().format(),
            clockOut:"",
            boolClockedOut:false
          });
          //console.log(newTimeClock)
          newTimeClock.save(function (err,entry){
              if (err) {
                resStatus.status = 911;
                console.error("Create error: " + err);
              }
              else{
                console.log("Success! Entry Added: " + entry._id)
                resStatus.status = 1;
                resStatus.clockedIn = true;
                
              }
          })
        }
      });
    };

//#######################    END    #######################//
//####################### Clock  In #######################//
//#######################    END    #######################//


//#######################           #######################//
//####################### Clock Out #######################//
//#######################           #######################//


exports.clockOut = async function(req, res) {
  var oldPin = "";
      uPin.findOne({pinNum:req.params.pinNumOut})
      .exec(async function (err, user) {
        //console.log(req.params.pinNumOut);
        if (err){ 
          console.error(err);
          resStatus.status = 911;
        }
        else if (user===null){
          console.log("Pin " + req.params.pinNumOut + " not found.")
          //respond with {name,clockedIn:bool}
          res.json({"name":null,"clockedIn":null,"status":404});
          resStatus.status = 404;
        }
        else{
          let waitResStatus = new Promise((resolve,rej)=>{
            
            setTimeout(() => {
              if (oldPin === req.params.pinNumOut){
                console.log("Same pin entered")
              }
              else {
                getName(user._id);
                clockPinOut(user._id); //prep name
              }
              resolve()
            }, 100);
          });
          let sendResStatus = new Promise((resolve,rej)=>{
            
            setTimeout(() => {
              //console.log("Sent! "+resStatus.name)
              res.json(resStatus);
              resolve()
            }, 500);
          });
          await waitResStatus;
          await sendResStatus;
        }
      });
    };

    //find entries with same id and bool false
    //clockPinOut will depend on the server clocking out employees
    // at the end of their shift
    function clockPinOut(userId) {
      //console.log("Searching database for entries where clockedOut is false")

      timeClock.findOne({employeeID:userId, boolClockedOut:false}, 
        function(err, todayClockOut){
        if (err){
          console.log("Find timeClocks error: " + err)
          resStatus.status = 911;
        }
        else if (todayClockOut === null) {
          //user needs to clock out before clocking in again
          
          console.log(resStatus.name + " has clocked out")
          resStatus.clockedIn = false;
          resStatus.status = 33;
        }
        else{
          //create new data in db showing a user has clocked in
          //console.log("Creating new instance in database")
          var newTimeClock = new timeClock({
            _id: todayClockOut._id,
            employeeID:todayClockOut.employeeID,
            clockIn:todayClockOut.clockIn,
            clockOut:moment().format(),
            boolClockedOut:true
          });
          timeClock.findOneAndUpdate({employeeID:userId, boolClockedOut:false}, 
            newTimeClock, function (err,entry){
              if (err) {
                console.error("Update error: " + err);
                resStatus.status = 911;
              }
              else{
                console.log("Updated entry: " + entry._id)
                resStatus.clockedIn = false;
                resStatus.status = 11;
                
              }
          })
        }
      });
    };


//#######################   END     #######################//
//####################### Clock Out #######################//
//#######################   END     #######################//







    //function helper for getting name by ID to change resStatus
    function getName(userId){
      Users.findOne({_id:mongoose.Types.ObjectId(userId)},'name',
      function (err, userName) {
        if (err) {
          console.error("Could not getName:" + err)
          resStatus.status = 404;
        }
        else {
          resStatus.name = userName.name;
        }
      })
    }
}
catch(err){
  console.log(err);
}

