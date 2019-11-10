import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import Zoom from "./Zoom";



class Scheduler extends Component {
    //DayPilot.SchedulerPropsAndEvents.rowCreateHandling = "Enabled";
    
  
    constructor(props) {
        super(props);

        this.state = {
            startDate: "2019-11-08",
            days: 31,
            scale: "Day",
            timeHeaders: [
                { groupBy: "Month"},
                { groupBy: "Day", format: "d"}
            ],
            cellWidthSpec: "Auto",
            cellWidth: 50,
            resources: [
                {name: "Name", id: "R1"},
                {name: "person2", id: "R2"},
                {name: "person3", id: "R3"},
                {name: "person4", id: "R4"},
                {name: "person5", id: "R5"},
                //add list here of name & id
            ],
            events: []
        };
    }
   
    
    zoomChange(args) {
        switch (args.level) {
            case "month":
                this.setState({
                    startDate: DayPilot.Date.today().firstDayOfMonth(),
                    days: DayPilot.Date.today().daysInMonth(),
                    scale: "Day"
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
                    <Zoom onChange={args => this.zoomChange(args)} />
                    
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
                        //barColor: color,
                        //barBackColor: color
                      });
                      console.log("Args.start is " + this.scheduler.events)
                    }); 
                  }}
                  
                  onRowCreate = {args =>{
                        throw "erre";
                        DayPilot.modal.prompt("New Person", "Resource")
                        DayPilot.Row.addClass("test");
                        this.scheduler.resources.add({
                            id: DayPilot.guid(),
                            name: args.text
                        });
                  }}
                  ref={component => { this.scheduler = component && component.control; }}
                />
            </div>
        );
    }
}

export default Scheduler;