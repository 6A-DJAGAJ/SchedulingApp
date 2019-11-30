import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import Zoom from "./Zoom";
import PinInput from "./PinInput"
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
            resources: [{name: "Person A", id: "test1"}
            ,{ name:"Person B", id: "test2"},
            {name: "Person C", id: "test3"}
            ,{ name:"Person D", id: "test4"}],
            events: [],
            //rowCreateHandling: "Enabled",
            eventDeleteHandling: "Update",
        };
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
                this.setState({
                    startDate: DayPilot.Date.today().firstDayOfMonth(),
                    days: DayPilot.Date.today().daysInMonth(),
                    scale: "Day",
                    timeHeaders: [
                        { groupBy: "Month"},
                        { groupBy: "Day", format: "d"}
                    ],
                    cellWidthSpec: "Auto",
                    cellWidth: 50,
                });
                break;
            case "week":
                this.setState({
                    startDate: DayPilot.Date.today().firstDayOfWeek(),
                    days: 7,
                    scale: "Day",
                    timeHeaders: [
                      { groupBy: "Month", format: "MMMM yyyy"},
                      { groupBy: "Day" }
                    ],
                });
              break;
              case "day":
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
                     //console.log(args.e.text); 
                        DayPilot.Modal.prompt("Edit", "Event").then(modal => {
                        args.e.text(modal.result);
                        console.log(args.e.text);
                        this.scheduler.events.update(args.e);
                        this.scheduler.init();
                        });
                        
                  }}

               

                  /*onBeforeTimeHeaderRender= {args =>{ 
                    if(args.header.start.getYear() === 0){
                         args.header.html = "<a href='http://google.com/'>" + "Year1" + "</a>";
                    }
                    else if(args.header.start.getYear() === 1){
                         args.header.html = "<a href='http://google.com/'>" + "Year2" + "</a>";
                    }
                    else if(args.header.start.getYear() === 2){
                         args.header.html = "<a href='http://google.com/'>" + "Year3" + "</a>";
                    }
                    else if(args.header.start.getYear() === 3){
                         args.header.html = "<a href='http://google.com/'>" + "Year4" + "</a>";
                    }
                    else if(args.header.start.getYear() === 4){
                         args.header.html = "<a href='http://google.com/'>" + "Year5" + "</a>";
                    }
                    else if(args.header.start.getMonth() === 0){
                          args.header.html = "<a href='http://google.com/'>" + "Month" + "</a>";
                    }
                    else if(args.header.start.getMonth() === 1){
                          args.header.html = "<a href='http://google.com/'>" + "Month2" + "</a>";
                    }
                    else if(args.header.start.getMonth() === 2){
                          args.header.html = "<a href='http://google.com/'>" + "Month3" + "</a>";
                    }
                    else if(args.header.start.getMonth() === 3){
                          args.header.html = "<a href='http://google.com/'>" + "Month4" + "</a>";
                    }
                    else if(args.header.start.getMonth() === 4){
                          args.header.html = "<a href='http://google.com/'>" + "Month5" + "</a>";
                    }
                    else if(args.header.start.getMonth() === 5){
                          args.header.html = "<a href='http://google.com/'>" + "Month6" + "</a>";
                    }
                      else if(args.header.start.getMonth() === 6){
                          args.header.html = "<a href='http://google.com/'>" + "Month7" + "</a>";
                    }
                      else if(args.header.start.getMonth() === 7){
                          args.header.html = "<a href='http://google.com/'>" + "Month8" + "</a>";
                    }
                      else if(args.header.start.getMonth() === 8){
                          args.header.html = "<a href='http://google.com/'>" + "Month9" + "</a>";
                    }
                    else if(args.header.start.getMonth() === 9){
                          args.header.html = "<a href='http://google.com/'>" + "Month10" + "</a>";
                    }
                    else if(args.header.start.getMonth() === 10){
                          args.header.html = "<a href='http://google.com/'>" + "Month11" + "</a>";
                    }
                    else if(args.header.start.getMonth() === 11){
                          args.header.html = "<a href='http://google.com/'>" + "Month12" + "</a>";
                    }
                    else if(args.header.start.getDayOfWeek() === 1){
                         args.header.html = "<a href='http://google.com/'>" + "Monday" + "</a>";
                    }
                  }}*/

                  /*onBeforeTimeHeaderRender = {args =>{ 
                         if(args.header.start.getDayOfWeek() === 0){
                            args.header.html = "Sun";
                            args.header.html<a href="https://www.google.com">testing!</a>
                        }
                        if(args.header.start.getDayOfWeek() === 1){
                            args.header.html = "Mon";
                        }
                        if(args.header.start.getDayOfWeek() === 2){
                            args.header.html = "Tue";
                        }
                        if(args.header.start.getDayOfWeek() === 3){
                            args.header.html = "Wed";
                        }
                        if(args.header.start.getDayOfWeek() === 4){
                            args.header.html = "Thu";
                        }
                        if(args.header.start.getDayOfWeek() === 5){
                            args.header.html = "Fri";
                        }
                        if (args.header.start.getDayOfWeek() === 6) {
                            args.header.html = "Sat";
                          }                       
                  }}*/


                  ref={component => { this.scheduler = component && component.control; }}
                />
            </div>
        );
    }
}

export default Scheduler;