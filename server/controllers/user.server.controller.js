
var mongoose = require('mongoose'), 
    bcrypt = require('bcryptjs')
    Users = require('../models/Users.server.model.js')
    uPins = require('../controllers/pin.server.controller.js')


try{    
    //create a new user using req.body
    /* Sample axios:
    axios({
      method:'post',
      url:'http://localhost:3000/Users/create',
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

      /* Instantiate a User */
      var user = new Users(req.body);

      // Hash the password and save to database
      bcrypt.hash(user.password, 10).then(function(hash) {
        user.password = hash;
        user.save(function(err) {
          if(err) {
            console.log(err);
            res.status(400).send(err);
          } else {
            res.json(user);
            console.log(user)
          }
        });
      });
    }; 

    // use url localhost:3000/Users/list/
    exports.list = function(req, res) {
      //only sends _id and name (scheduler use)
      Users.find({}, '_id name', null, function (err, users) {
        if (err) return handleError(err);
        console.log("calling all users" + users);
        res.send(users);
      }).sort('name');
    };

    // Compares form email and password to database
    exports.validate = function(req, res) {
      Users.findOne({email : req.body.formEmail})
      .exec(function (err, user) {
        if (err) {
          return callback(err);
        } else if (!user) {
          res.status(202).send('User not found');
        } else {
          // Check for matching password
          bcrypt.compare(req.body.formPassword, user.password, function (err, result) {
            if (result) {
              req.session.user = user.email
              res.status(200).send('User found');
            } else {
              res.status(202).send('Incorrect password');
            }
          })
        }
      });
    };

    exports.delete = function(req, res) {
      Users.findOneAndRemove({'_id' : req.body._id}, function(err,document){
        res.send(document);
      })
    }

    exports.update = function(req, res) {
      Users.findOneAndUpdate({'_id' : req.body._id}, req.body.changes, function(err,document){
        res.send(document);
      })
    }

}
catch(err){
    console.log(err);
  }

