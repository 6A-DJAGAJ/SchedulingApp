
var mongoose = require('mongoose'), 
    Positions = require('../models/position.server.model.js')


try{    
    //create a new user using req.body
    /* Sample axios:
    axios({
      method:'post',
      url:'/Users/create',
      data:{
        'name': 'Jaxson Jerger',
        'email': 'jaxsonj@email.com',
        'position': 'Dev',
        'salary': 1000
      }
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });  */
    exports.create = function(req, res) {
    
      /* Instantiate a Position */
      var position = new Positions(req.body);
     
      /* Then save the User */
      position.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.json(position);
          console.log(position)
        }
      });
    };

    // use url localhost:3000/positions/list/
    exports.list = function(req, res) {
      //only sends _id and name (scheduler use)
      Positions.find({}, '_id Position', null, function (err, positions) {
        if (err) return handleError(err);
        console.log("calling all positions" + positions);
        res.send(positions);
      }).sort('Position');
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

