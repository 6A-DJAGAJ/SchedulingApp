import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Row from 'react-bootstrap/Row';

class Zoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level: "month"
        }
    }

    change(ev) {
        //Switching to week first avoids overlay of month and day
        if (ev.target.value === "month" && this.state.level === "day"){
            //console.log(ev.target.value + " " + this.state.level)
            //only the props needs to be set
            this.props.onChange({level: "week"})
        }
        //DO NOT CHANGE ABOVE, TEMP FIX

        var newLevel = ev.target.value;

        this.setState({
            level: newLevel
        });

        if (this.props.onChange) {
            this.props.onChange({level: newLevel})
        }

    }

    render() {
        return (
            <div>
                <Row noGutters style={{margin:"center", paddingBottom:"10px"}}>
            {/*<span className="toolbar-item">*/}
                    
                        <ToggleButtonGroup type="radio"  value={this.state.level} name="zoom" defaultValue={"month"} >

                            <ToggleButton value="month" 
                            checked={this.state.level === "month"} onChange={ev => this.change(ev)}>
                                Month
                            </ToggleButton>

                            <ToggleButton value="week" 
                            checked={this.state.level === "week"} onChange={ev => this.change(ev)}>
                                Week
                            </ToggleButton>

                            <ToggleButton value="day" 
                            checked={this.state.level === "day"} onChange={ev => this.change(ev)}>
                                Day
                            </ToggleButton>

                        </ToggleButtonGroup>
                    
                
            {/*</span>*/}
                </Row>
            </div>
        );
    }
}

//<label><input type="radio" name="zoom" value="month" onChange={ev => this.change(ev)} checked={this.state.level === "month"} /> Month</label>
  //              <label><input type="radio" name="zoom" value="week"  onChange={ev => this.change(ev)} checked={this.state.level === "week"} /> Week</label>
    //            <label><input type="radio" name="zoom" value="day"  onChange={ev => this.change(ev)} checked={this.state.level === "day"} /> Day</label>

export default Zoom;