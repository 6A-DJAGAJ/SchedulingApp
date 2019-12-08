
var mongoose = require('mongoose'),
moment = require('moment'),
format = require('format'),
uNoAvail = require('../models/uNoAvail.server.model.js')
Users = require('../models/Users.server.model.js')


try{
/*

  Preface:
    Axios is used as a means of communicating between
    the client and the server
    - axios uses a parameter called 'data' for when
    a req.body needs to be sent, same formats
    - see the routes folder for on whether axios needs
    to use a GET/POST/DELETE etc.

    ex. 
      axios({
        method:'post',
        url:'/uAvail/create',
        data:{
          'employeeID': (string),
          'start': (moment||Date),
          'end': (moment||Date)
        }
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });





  Working Functions:

    create avail
      - creates on sending info to req.body
      ex. /uAvail/create/
      data = {
        'employeeID': (string),
        'start': (moment||Date),
        'end': (moment||Date)
      }

    
    updateAvail
      - must be able to update ID, start, and end
      - uses req.body to make new doc
      ex. /uAvail/update/
      data = {
        '_id': (string),
        'employeeID': (string),
        'start': (moment||Date),
        'end': (moment||Date)
      }


    listBy... year/month/week/day
          ex. /uAvail/month/
          data = {
            'employeeID': (string),
            'dayRange': moment().subtract(1,'month').format()
          }
        // takes parameter dayRange to give a specific month/week/day


    delete
      - deletes by uniqueID from req.body
      ex. /uAvail/delete/
      // must set axios to delete
      data = {
        '_id': (string)
      }

  Future implementations:

    connection between pin controller and availability 
    to only allow clockIns when the user has an availability scheduled

    not allow edits to unavailability today or the days before

    not allow edits to other user's unavailability

    deleteAllByEmployeeID (needs Admin permissions)

*/





exports.create = function(req, res) {

  /* Instantiate an event */
  var noAvail = new uNoAvail(req.body);
  
  /* Must be in form
    data = {
        'employeeID': (string),
        'start': (moment||Date),
        'end': (moment||Date)
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
    data = {
        '_id': (string),
        'employeeID': (string),
        'start': (moment||Date),
        'end': (moment||Date)
      }
   */
  // check to see if valid user
  // To Implement:
  // should check if the current employee has the correct permissions
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
  /* a url to this would look like 
    POST with axios setting data to send as req.body

    data = {
      'employeeID': (string),
      'dayRange': moment().subtract(1,'month').format()
    }
  */
  
  var start;
  var end;
  //first check if the employeeID exists in database
  Users.findOne({employeeID:req.body.employeeID},
     function(err,user){
      if (err) {res.json(err)}
      else if (user !== undefined){
        //check for valid zoom (DayPilot scheduler) paramaters in url
        if (req.params.listBy === 'year' 
        || req.params.listBy === 'month' 
        || req.params.listBy === 'week'
        || req.params.listBy === 'day'){
          // use dayRange to find the start and end times of the zoom
          if (req.body.dayRange !== null){
            start = moment(req.body.dayRange)
              .startOf(req.params.listBy).format();
            end = moment(req.body.dayRange)
              .endOf(req.params.listBy).format();
            //console.log(moment('2019-10-12').subtract(1,'month').format());
            //console.log(new Date('2019-10-12'));
          }
          else {
            // if a valid date is not found, just send the current month/week/day
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
  /* receives a value in the req.body of an ID to delete
    data = {
      '_id': (string)
    }
  */
  // needs to check auth of current user and if the dates are now or earlier

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

