
var mongoose = require('mongoose'), 
    uAvail = require('../models/uAvail.server.model.js')

/* Create a listing */
try{
    exports.create = function(req, res) {
    
      /* Instantiate a User */
      var avail = new uAvail(req.body);
     
      /* Then save the User */
      uAvail.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.json(avail);
          console.log(avail)
        }
      });
    };
    exports.list = function(req, res) {
      /* Add your code */
      uAvail.find({}, null, null, function (err, avail) {
        if (err) return handleError(err);
        console.log("calling all users" + avail);
        res.send(avail);
      }); //add sorted functionality
    };
}
catch(err){
    console.log(err);
  }

