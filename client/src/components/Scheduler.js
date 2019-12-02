import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import Zoom from "./Zoom";
import PinInput from "./PinInput"
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

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
            items: [],
            //rowCreateHandling: "Enabled",
            eventDeleteHandling: "Update",
        };
        this.loadPeople();
        
        //const resources.name = res.name;
        //resources.id = res._id;
        //console.log(persons);
        //this.setState({ resources });      
    }
   

    zoomChange(args) {
        switch (args.level) {
            case "year":
                this.setState({
                    startDate: DayPilot.Date.today().firstDayOfYear(),
                    days: DayPilot.Date.today().daysInYear(),
                    scale: "Day",
                    timeHeaders: [
                        { groupBy: "Year"},
                        { groupBy: "Month"}
                    ],
                    cellWidthSpec: "Auto",
                    cellWidth: 50,
                });
                break;
            case "month":
                DayPilot.Modal.prompt("Type in a start date", "Format: YYYY-MM-DD").then(modal =>{
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
                  this.setState({
                      startDate: new Date(modal.result),
                      days: 7,
                      scale: "Day",
                      timeHeaders: [
                        { groupBy: "Month", format: "MMMM yyyy"},
                        { groupBy: "Day" }
                      ],
                  });
                });
              break;
              case "day":
              DayPilot.Modal.prompt("Type in a date", "Format: YYYY-MM-DD").then(modal =>{
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
        get('http://localhost:3000/users/list')
        .then(res =>{
        //console.log(res.data);
        res.data.map((list)=>
          this.setState({
            resources: this.state.resources.concat({id: list._id, name: list.name}),
            items: this.state.items.concat(list._id),
          }),
           axios({
              method:'post',
              url:'http://localhost:3000/uAvail/year',
              data:{
                "employeeID": "5de425559aa62a4c9cd99fa3"
              }
            })
            .then(res => {
              //console.log(res.data);
              res.data.map((year)=>
                this.scheduler.events.add({
                              id: year._id,
                              text: year.start,
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

        


      

         
        //console.log(this.resources);
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
                    DayPilot.Modal.prompt("New event name", "Event").then(modal => {
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

                  

               



                  ref={component => { this.scheduler = component && component.control; }}
                />
            </div>
        );
    }
}

export default Scheduler;