import React, {Component} from 'react';
import NumPad from 'react-numpad';
import axios from 'axios';
import { monoBlue } from 'react-syntax-highlighter/dist/styles/hljs';
//<button>Clock in/Clock out</button>
//</NumPad.Number>
class PinInput extends Component {
	constructor(props){
		super(props)
		this.state = {
		logString: "no logs",
		messages: []
	}
}


	displayRule = value => value.replace(/0|1|2|3|4|5|6|7|8|9/g, '*');

	clearLog = () => {
		var messages = this.state.messages;
		messages.length = 0;
		this.setState({messages})
	}
	
	OnChange =(value, director) => {
		//Status codes:
		// 0 = nothing has happened yet
		// 1 = successfully clocked in
		// 10 = found user, already clocked in
		// 11 = successfully clocked out
		// 33 = found user, nowhere to clock out
		// 404 = error, no user found
		// 911 = there was an error
		//############################################//

			 var messages = this.state.messages;
			 var fromServer = this.state.fromServer;
			 var log;
			 axios.get('http://localhost:3000/uPins/' + director + '/' + value)
			.then(res => {
				const fromServer = res.data;
				console.log(fromServer.name)
				console.log(this.fromServer)
				var d = new Date();
				d = d.toLocaleString();
				console.log(fromServer.name + " " + fromServer.clockedIn + " " + fromServer.status)
				switch(fromServer.status)
				{
					case 1:
						log = `${fromServer.name} clocked in at ${d}`;
					break;
					case 10:
						log = "Already clocked in";
					break;
					case 11:
						log = `${fromServer.name} clocked out at ${d}`;
					break;
					case 33:
						log = "Not clocked in";
					break;
					case 404:
						log = "User not found";
					break;
					case 911:
						log = "Error"
						console.log("911, what's your emergency?")
					break;
				}
				messages.push(log);
				this.setState({messages});
			})
		 }
	PrintList = () => {
		const ul={
			 listStyleType: 'none',
			 paddingLeft:'0',
		 }
		 const li={
			 width:'100%'
		 }
		var messages = this.state.messages;
		console.log({messages})
		return(
			<ul style={ul}>
			{messages.map(messages => <li style={li}>{messages}</li>)}
			</ul>
			)
	}
				
	
	render() {
		console.log(this.state.logString)
		
		 
		 const clockin ={
			 display: 'inline-block',
			 marginLeft:'23.5%',
			 marginTop:'10%',
		 };

		 const clockout={
			display: 'inline-block',
		   float: 'right',
		   marginRight:'26.5%',
		   marginTop:'10%',
		};

		 const displayBox={
			 height:'300px',
			 width:'50%',
			borderStyle:'inset',
			 overflow:'auto',
			 //marginTop:'5%',
			 marginLeft:'23.5%',
		 }
		 const bigone={
			 marginLeft:'auto',
			 marginRight:'auto',
			 width:'960px'
		 }
		 const clickButton={
			fontSize: '36px',
			textAlign: 'center',
			borderRadius: '8px',
			color: 'white',
			backgroundColor: '#007BFF',

		 }
		 const log={
			 marginLeft:'23.5%',
			 marginTop:'8%',
		 }

		 const clearbutton={
			 marginLeft:'68.5%',
			 marginTop:'1%'
		 }
			 
        return (
		<div style={bigone}>
			<div style={clockin}>
                <NumPad.Number
				onChange= {(value) => this.OnChange(value,'clockIn')}
				placeholder={'my placeholder'}
				decimal={false}
				negative={false}
				displayRule={this.displayRule}
				>
				<button class="btn btn-lg btn-primary btn-block">Clock In</button>
				</NumPad.Number>
			</div>
			<div style={clockout}>
                <NumPad.Number
				onChange= {(value) => this.OnChange(value, 'clockOut')}
				placeholder={'my placeholder'}
				decimal={false}
				negative={false}
				displayRule={this.displayRule}
				>
				<button class="btn btn-lg btn-primary btn-block">Clock Out</button>
				</NumPad.Number>
			</div>
			<div style={log}>Clock-Log:</div>
			<div style={displayBox}>
			<p>{this.PrintList()}</p>
			</div>
			<button style ={clearbutton} class="btn btn-sm btn-secondary" onClick={() => this.clearLog()}>Clear</button>
		</div>
				
			);
		}
	}
export default PinInput;