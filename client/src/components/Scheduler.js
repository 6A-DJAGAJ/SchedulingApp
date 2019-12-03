import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import Zoom from "./Zoom";
import PinInput from "./PinInput"
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import moment from 'moment'
//import '../Scheduler.css'

class Scheduler extends Component {
    constructor(props) {
        super(props);


        this.state = {
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
      //console.log(this.state);
       this.loadPeople();
       //console.log(this.state);
        //this.loadEvents();
    }

   

    zoomChange(args) {
        switch (args.level) {
            case "month":
                DayPilot.Modal.prompt("Type in a start date", "Format: YYYY-MM-DD").then(modal =>{
                   if (!modal.result) {
                        return;
                      }
                  if(modal.result!="Format: YYYY-MM-DD"){
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
                else{
                  this.setState({
                      startDate: DayPilot.Date.today(),
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
              DayPilot.Modal.prompt("Type in a start date", "Format: YYYY-MM-DD").then(modal =>{
                if (!modal.result) {
                        return;
                      }
                if(modal.result!="Format: YYYY-MM-DD"){
                  this.setState({
                      startDate: new Date(modal.result),
                      days: 7,
                      scale: "Day",
                      timeHeaders: [
                        { groupBy: "Month", format: "MMMM yyyy"},
                        { groupBy: "Day" }
                      ],
                  });
                }
                else{
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
                    timeHeaders: [ 
                     { groupBy: "Day", format: "M/d/yyyy"},
                      { groupBy: "Hour" }
                    ],
                });
            }
            else{
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
      
        axios.
        get('/users/list')
        .then(res =>{
        //console.log(res.data);
        res.data.map((list)=>
          this.setState({
            resources: this.state.resources.concat({id: list._id, name: list.name})
            //items: this.state.items.concat(list._id),
          }),
           
          );
         //console.log(this.state.resources);
        this.state.resources.map((users)=>
          //console.log(users.id),
        axios({
              method:'post',
              url:'/uAvail/year',
              data:{
                "employeeID": users.id
              }
            })
            .then(res => {
              //console.log(res.data);
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
                      this.scheduler.clearSelection();
                      this.scheduler.events.add({
                        id: DayPilot.guid(),
                        text: args.start,
                        start: args.start,
                        end: args.end,
                        resource: args.resource
                      });
                      axios({
                        method:'post',
                        url:'uAvail/create',
                        data:{
                          "employeeID": args.resource,
                           "start": args.start,
                           "end": args.end
                        }
                      });

                   
                  }}
                
                     onEventClick = {args =>{
                     console.log(args);
                        DayPilot.Modal.prompt("Edit", "Event").then(modal => {
                        args.e.text(modal.result);
                        //console.log(args.e.text);
                        this.scheduler.events.update(args.e);
                        this.scheduler.init();
                        });
                        
                  }}
                   onEventDelete  = {args =>{
                    console.log("test");
                   }
                 }

                  ref={component => { this.scheduler = component && component.control; }}
                />
            </div>
        );
    }
}

export default Scheduler;