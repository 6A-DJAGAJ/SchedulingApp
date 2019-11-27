
var mongoose = require('mongoose'), 
    Users = require('../models/Users.server.model.js')
    uPins = require('../controllers/pin.server.controller.js')

/* Create a listing */
try{
    exports.create = function(req, res) {
    
      /* Instantiate a User */
      var user = new Users(req.body);
     
      /* Then save the User */
      Users.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.json(user);
          console.log(user)
        }
      });
    };
    exports.list = function(req, res) {
      /* Add your code */
      Users.find({}, null, null, function (err, users) {
        if (err) return handleError(err);
        console.log("calling all users" + users);
        res.send(users);
      }); //add sorted functionality
    };
    exports.delete = function(req, res) {
      Users.findOneAndRemove({'_id' : req.body._id}, function(err,document){
        res.send(document);
      })
    }
    
}
catch(err){
    console.log(err);
  }

