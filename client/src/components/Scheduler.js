import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import Zoom from "./Zoom";
import PinInput from "./PinInput"
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import moment from 'moment';
import mongoose from 'mongoose';
//import '../Scheduler.css'

class Scheduler extends Component {
    constructor(props) {
        super(props);

        // Initializing pre-state
        this.state = {
          // start date
            startDate: DayPilot.Date.firstDayOfMonth,
            days: DayPilot.Date.today().daysInMonth(),
            scale: "Day",
            timeHeaders: [
                { groupBy: "Month"},
                { groupBy: "Day", format: "d"}
            ],
            cellWidthSpec: "Auto",
            cellWidth: 50,
            resources: [],
            events: [],
            //items: [],
            //rowCreateHandling: "Enabled",
            // turning on deletion.
            eventDeleteHandling: "Update",
            //theme: "blue",
            //theme:"scheduler_green",
        };
        

       
        
        //const resources.name = res.name;
        //resources.id = res._id;
        //console.log(persons);
        //this.setState({ resources });      
    }
    componentDidMount() {
      
      // Load up all people on server.
       this.loadPeople();
     
    }

   

    zoomChange(args) {
        switch (args.level) {
          // Loading in initial dates for each zoom context
            case "month":
              //asking for start Date
                DayPilot.Modal.prompt("Type in a start date", "Format: YYYY-MM-DD").then(modal =>{
                   if (!modal.result) {
                        return;
                      }
                  // if correct format
                  if(modal.result!="Format: YYYY-MM-DD"){
                    // set Start Date and correct scale for display.
                  this.setState({
                      startDate: new Date(modal.result),
                      days: DayPilot.Date.today().daysInMonth(),
                      scale: "Day",
                      timeHeaders: [
                          { groupBy: "Month"},
                          { groupBy: "Day", format: "d"}
                      ],
                      cellWidthSpec: "Auto",
                      cellWidth: 50,
                  });
                }
                //if no input just throw in today's date as the input.
                else{
                  // init start Date is today's date
                  this.setState({
                      startDate: DayPilot.Date.today(),
                      days: DayPilot.Date.today().daysInMonth(),
                      scale: "Day",
                      //setting correct time headers
                      timeHeaders: [ 
                          { groupBy: "Month"},
                          { groupBy: "Day", format: "d"}
                      ],
                      cellWidthSpec: "Auto",
                      cellWidth: 50,
                  });

                }
                });
                break;
                /*DayPilot.Modal.prompt("New event name", "Event").then(modal => {
                      this.scheduler.clearSelection();
                      if (!modal.result) {
                        return;
                      }
                      console.log(args);
                      this.scheduler.events.add({
                        id: DayPilot.guid(),
                        text: modal.result,
                        start: args.start,
                        end: args.end,
                        resource: args.resource
                      });
                    }); */
            case "week":
            //asking for start Date
              DayPilot.Modal.prompt("Type in a start date", "Format: YYYY-MM-DD").then(modal =>{
                if (!modal.result) {
                        return;
                      }
                if(modal.result!="Format: YYYY-MM-DD"){
                  this.setState({
                      startDate: new Date(modal.result),
                      days: 7,
                      scale: "Day",
                      //setting correct time headers
                      timeHeaders: [
                        { groupBy: "Month", format: "MMMM yyyy"},
                        { groupBy: "Day" }
                      ],
                  });
                }
                //if no input just throw in today's date as the input.
                else{
                  // init start Date is today's date
                  this.setState({
                      startDate: DayPilot.Date.today(),
                      days: 7,
                      scale: "Day",
                      timeHeaders: [
                        { groupBy: "Month", format: "MMMM yyyy"},
                        { groupBy: "Day" }
                      ],
                  });
                }
                });
              break;
              case "day":
              //asking for start Date
              DayPilot.Modal.prompt("Type in a date", "Format: YYYY-MM-DD").then(modal =>{
                 if (!modal.result) {
                        return;
                      }
                if(modal.result!="Format: YYYY-MM-DD"){
              this.setState({
                   startDate: new Date(modal.result),
                    days: 1,
                    scale: "CellDuration",
                    cellDuration: 15,
                    //setting correct time headers
                    timeHeaders: [ 
                     { groupBy: "Day", format: "M/d/yyyy"},
                      { groupBy: "Hour" }
                    ],
                });
            }
             //if no input just throw in today's date as the input.
            else{
              // init start Date is today's date
               this.setState({
                   startDate: DayPilot.Date.today(),
                    days: 1,
                    scale: "CellDuration",
                    cellDuration: 15,
                    timeHeaders: [ 
                     { groupBy: "Day", format: "M/d/yyyy"},
                      { groupBy: "Hour" }
                    ],
                });
            }
              });
              break;
            default:
                throw new Error("Invalid zoom level");
        }
    }

    /*cellWidthChange(ev) {
        var checked = ev.target.checked;
        this.setState({
            cellWidthSpec: "Auto"
        });
    }*/


  
     loadPeople = () => {
        // creating a get axios call to the list of users
        axios.
        get('/users/list')
        .then(res =>{
        //console.log(res.data);
        res.data.map((list)=>
          this.setState({
            resources: this.state.resources.concat({id: list._id, name: list.name})
            // iterate through people array and insert all the users stored in dataBase
          }),
           
          );
         //console.log(this.state.resources);
        this.state.resources.map((users)=>
 
          // axios post request which will return all events once an indevidual user has been sent.
        axios({
              method:'post',
              url:'/uAvail/year',
              data:{
                "employeeID": users.id
              }
              // sent users
            })
            .then(res => {
              //console.log(res.data);
              // iterate through all of the events returned and insert them all into the scheduler with specific format.
              // the name of the event is given as the time started -- time ended.
              res.data.map((year)=>
                this.scheduler.events.add({
                              id: year._id,
                              text: moment(year.start).format("hh:mm") + "--" + moment(year.end).format("hh:mm"),
                              start: year.start,
                              end: year.end,
                              resource: year.employeeID
                }),
              );
              //console.log(this.state);
            })
            .catch(function (error) {
              console.log(error);
        }),
            );
        });
         
        //console.log(this.state);
      }

      makeid =(length) => {
        // function to generate special IDs
         var result           = '';
         var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
         var charactersLength = characters.length;
         for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
         }
         //ID created.
         return result;
      }

    render() {
        var {...config} = this.state;
        
        return (
            <div>
           
                <div className="toolbar">
                    <Row noGutters style={{margin:"center", paddingBottom:"10px", paddingLeft:"10px"}}>
                        <Col>
                            <Zoom onChange={args => this.zoomChange(args)} />
                        </Col>
                    </Row>
                </div>

                

                <DayPilotScheduler
                  {...config}

                  
                  
                  onTimeRangeSelected={args => {
                    // loading up ID for new event
                    var tempid = this.makeid(12);
                    //converting tempID
                    var id1 = mongoose.Types.ObjectId(tempid);
                    // load info into scheduler with all databse info
                      this.scheduler.clearSelection();
                      this.scheduler.events.add({
                        id: DayPilot.guid(),
                        text: args.start,
                        start: args.start,
                        end: args.end,
                        resource: args.resource
                      });
                      //console.log(id1);
                      //axios request in order to also post the event onto database
                      axios({
                        method:'post',
                        url:'uAvail/create',
                        data:{
                          "_id": id1,
                          "employeeID": args.resource,
                           "start": args.start,
                           "end": args.end
                        }
                      });

                   
                  }}

                  onEventResized= {args =>{
                    //console.log(args);
                    // post request to change the name of an event if the time have been extended or changed in any way.
                      axios({
                        method:'post',
                        url:'uAvail/update',
                        data:{
                          "_id": args.e.data.id,
                          "employeeID": args.resource,
                           "start": args.newStart,
                           "end": args.newEnd
                        }
                      });
                  }}

                 onEventMoved = {args =>{
                  //console.log(args);
                  // If event is moved there is a post request which allows us to rename the event if it is moved.
                  axios({
                        method:'post',
                        url:'uAvail/update',
                        data:{
                          "_id": args.e.data.id,
                          "employeeID": args.resource,
                           "start": args.newStart,
                           "end": args.newEnd
                        }
                      });
                 }}
              
                   onEventDelete  = {args =>{
                    
                    //Deletes event if prompted to otherwise cancel.
                      DayPilot.Modal.prompt("Are you sure?", "For yes OK, Otherwise Cancel.").then(modal =>{
                     if (!modal.result) {
                          return;
                        }
                    axios({
                        method:'delete',
                        url:'/uAvail/delete/',
                        data:{
                          "_id": args.e.data.id,
                        }
                      });
                });
                   }
                 }

                  ref={component => { this.scheduler = component && component.control; }}
                />
            </div>
        );
    }
}

export default Scheduler;