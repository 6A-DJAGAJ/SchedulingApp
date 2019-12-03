
var mongoose = require('mongoose'),
moment = require('moment'),
format = require('format'),
uNoAvail = require('../models/uNoAvail.server.model.js')
Users = require('../models/Users.server.model.js')


try{
/*

Possible to include:
deleteAllByEmployeeID (needs Admin permissions)


Working:

create noAvail
  - creates on sending info to req.body
  ex. localhost:5000/uNoAvail/create/
  req.body = {
    employeeID: (string)
    start: (moment||Date)
    end: (moment||Date)
  }

listBy... year/month/week/day
  ex. localhost:5000/uNoAvail/month/
  //to keep consistency, using body
  req.body = {
    employeeID: (string)
    dayRange: moment().subtract(1,'month').format()
  }


updateAvail (high priority)
  - must be able to update ID, start, and end
  - uses req.body to make new doc
  ex. localhost:5000/uNoAvail/update/
  req.body = {
    _id: (string)
    employeeID: (string)
    start: (moment||Date)
    end: (moment||Date)
  }

delete (high priority)
  - deletes by uniqueID from req.body
  ex. localhost:5000/uNoAvail/delete/
  // must set axios to delete
  req.body = {
    _id: (string)
  }

Future implementations:

listBy... where it takes another parameter to give a
specified month/week/day

*/




exports.create = function(req, res) {

  /* Instantiate an event */
  var noAvail = new uNoAvail(req.body);
  
  /* Must be in form
    {
      employeeID: (String)
      start: (date)
      end: (date)
    }
   */
  //should not have to worry about start/end not existing
  // due to user error
  // check if employee exists
  Users.findOne({employeeID:noAvail.employeeID},
    function(err,user){
     if (err) {res.json(err)}
     else if (user !== undefined){
       //save if there is a match
        noAvail.save(function(err) {
          if(err) {
            console.log(err);
            res.status(400).send(err);
          } else {
            res.json(noAvail);
            console.log(noAvail)
          }
        });
    }
    else{
      res.status(400).send("employeeID not found")
    }
  });
}
exports.updateAvail = function(req,res){
  var noAvail = new uNoAvail(req.body);
  /* Must be in form
    {
      _id: (String [gets changed to Object])
      employeeID: (String)
      start: (date)
      end: (date)
    }
   */
  // check to see if valid user
    Users.findOne({employeeID:noAvail.employeeID},
      function(err,user){
      if (err) {res.json(err)}
      else if (user !== undefined){
        uNoAvail.findOneAndUpdate({_id:noAvail._id},
          noAvail, function(err){
          if(err) {
            console.log(err);
            res.status(400).send(err);
          } else {
            res.json(noAvail);
            console.log(noAvail)
          }
        })
      }
      else{
        res.status(400).send("employeeID not found")
      }
  });
}

exports.listBy = function(req, res) {
  /* a url to this would look like (without parenthesis)
   localhost:5000/uNoAvail/month/
  req.body = {
    employeeID: (string)
    dayRange: moment().subtract(1,'month')
  } */
  
  //Need to take all 
  var start;
  var end;
  //first check if the employeeID exists in database
  Users.findOne({employeeID:req.body.employeeID},
     function(err,user){
      if (err) {res.json(err)}
      else if (user !== undefined){
        if (req.params.listBy === 'year' 
        || req.params.listBy === 'month' 
        || req.params.listBy === 'week'
        || req.params.listBy === 'day'){
          if (req.body.dayRange !== null){
            start = moment(req.body.dayRange)
              .startOf(req.params.listBy).format();
            end = moment(req.body.dayRange)
              .endOf(req.params.listBy).format();
            //console.log(moment('2019-10-12').subtract(1,'month').format());
            //console.log(new Date('2019-10-12'));
          }
          else {
            start = moment().startOf(req.params.listBy).format();
            end = moment().endOf(req.params.listBy).format();
          }

        //gte represents starting date and lte is ending date
        //query finds the range from start to finish using 
        // date objects of the moments
          uNoAvail.find({employeeID: req.body.employeeID, start:{'$gte':start, '$lte': end}},
          null, null, function (err, noAvail) {
            if (err) res.status(400).send(err);
            else{
              res.json(noAvail);
            }
          }).sort({start:'asc'});
        }
        else {
          //scheduler app uses zoom component for showing
          // month/week/day views
          res.status(400)
          .send('Zoom not specified,\nexpected: month/week/day')
        }
      }
      else {
        res.status(400).send('employeeID not found');
      }
  })
};

exports.deleteAvail = function(req, res){
  // receives a value in the req.body of an ID to delete

  //checks to see if entry with matching _id exists
  uNoAvail.findById({_id:req.body._id},
    function(err, noAvail){
      if(err) {
        console.log(err);
        res.status(400).send(err);
      }
      else if (noAvail !== null){
        uNoAvail.findByIdAndDelete({_id:req.body._id},
          function(err){
                if(err) {
                  console.log(err);
                  res.status(400).send(err);
                } else {
                  res.status(200).send("Successfully Deleted _id: " + req.body._id);
                  console.log("Successfully Deleted _id: " + req.body._id)
                }
              });
        
      }
      else {
        res.status(400).send("No entry with that _id")
      }
    });
}


}
catch(err){
console.log(err);
}

