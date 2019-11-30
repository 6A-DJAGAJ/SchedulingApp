import React, {Component} from 'react';
import NumPad from 'react-numpad';
<<<<<<< HEAD

=======
import axios from 'axios';
>>>>>>> a235086fddf49ba55fc31123b0a57885561d5979
//<button>Clock in/Clock out</button>
//</NumPad.Number>
class PinInput extends Component {
	constructor(props){
		super(props)
		this.state = {
<<<<<<< HEAD
		
		employees : [
				{ id: 1, name : 'Gus', pin: 5437, clocked: false},
				{ id: 2, name: 'Austin', pin: 2537, clocked: false},
				{ id: 3, name: 'Jaxon', pin: 4857, clocked: false},
				{ id: 4, name: 'Daniel', pin: 4555, clocked: false},
			 ],
		valueState : 0,
		success: "no logs",
		input: []
		
	}
}
	displayRule = value => value.replace(/0|1|2|3|4|5|6|7|8|9/g, '*');
	
	OnChangeIn =(value) => {
			 var valueState = this.state.valueState;
			 var employees = this.state.employees;
			 var success = this.state.success;
			 var input = this.state.input;
			 valueState = parseInt(value,10);
			employees.forEach((element) => {
			 if (valueState === element.pin)
			 {
				 if(element.clocked === false)
				 {
					console.log(element.name);
					 var d = new Date();
					 d = d.toLocaleString();
					 element.clocked = true;
					 this.setState({element});
					 success = `${element.name} clocked in at ${d}`;
					 console.log(success);
					 input.push(success);
					 this.setState({input});
				 }
				 else
				 {
					 success = `${element.name} is already clocked in`;
					 input.push(success);
					this.setState({input});
				 }
			 }
			})
			
		 }
		 
	OnChangeOut =(value) => {
			 var valueState = this.state.valueState;
			 var employees = this.state.employees;
			 var success = this.state.success;
			 var input = this.state.input;
			 valueState = parseInt(value,10);
			employees.forEach((element) => {
			 if (valueState === element.pin)
			 {
				 if(element.clocked === true)
				 {
					console.log(element.name);
					 var d = new Date();
					 d = d.toLocaleString();
					 element.clocked = false;
					 this.setState({element});
					 success = `${element.name} clocked out at ${d}`;
					 console.log(success);
					 input.push(success);
					console.log({input});
					 this.setState({input});
				 }
				 else
				 {
					 success = `${element.name} is not clocked in`;
					input.push(success);
					this.setState({input});
				 }
			 }
			})
			
=======
		fromServer : [],
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
>>>>>>> a235086fddf49ba55fc31123b0a57885561d5979
		 }
	PrintList = () => {
		const ul={
			 listStyleType: 'none',
			 paddingLeft:'0',
		 }
		 const li={
			 width:'100%'
		 }
<<<<<<< HEAD
		var input = this.state.input;
		console.log({input})
		return(
			<ul style={ul}>
			{input.map(input => <li style={li}>{input}</li>)}
=======
		var messages = this.state.messages;
		console.log({messages})
		return(
			<ul style={ul}>
			{messages.map(messages => <li style={li}>{messages}</li>)}
>>>>>>> a235086fddf49ba55fc31123b0a57885561d5979
			</ul>
			)
	}
				
	
	render() {
<<<<<<< HEAD
		console.log(this.state.success)
=======
		console.log(this.state.logString)
>>>>>>> a235086fddf49ba55fc31123b0a57885561d5979
		
		 
		 const clockin ={
			 display: 'inline-block',
			 marginLeft:'23.5%',
			 marginTop:'10%',
		 };
<<<<<<< HEAD
		 const clockout={
			 display: 'inline-block',
			float: 'right',
			marginRight:'26.5%',
			marginTop:'10%',
		 };
=======

		 const clockout={
			display: 'inline-block',
		   float: 'right',
		   marginRight:'26.5%',
		   marginTop:'10%',
		};

>>>>>>> a235086fddf49ba55fc31123b0a57885561d5979
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
<<<<<<< HEAD
			boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
			fontSize: '48px',
			textAlign: 'center'
=======
			fontSize: '36px',
			textAlign: 'center',
			borderRadius: '8px',
			color: 'white',
			backgroundColor: '#007BFF',

>>>>>>> a235086fddf49ba55fc31123b0a57885561d5979
		 }
		 const log={
			 marginLeft:'23.5%',
			 marginTop:'8%',
		 }
<<<<<<< HEAD
=======

		 const clearbutton={
			 marginLeft:'68.5%',
			 marginTop:'1%'
		 }
>>>>>>> a235086fddf49ba55fc31123b0a57885561d5979
			 
        return (
		<div style={bigone}>
			<div style={clockin}>
                <NumPad.Number
<<<<<<< HEAD
				onChange= {(value) => this.OnChangeIn(value)}
=======
				onChange= {(value) => this.OnChange(value,'clockIn')}
>>>>>>> a235086fddf49ba55fc31123b0a57885561d5979
				placeholder={'my placeholder'}
				decimal={false}
				negative={false}
				displayRule={this.displayRule}
				>
<<<<<<< HEAD
				<button style={clickButton}>Clock In</button>
				</NumPad.Number>
			</div>
			<div style={clockout}>
			<NumPad.Number
				onChange= {(value) => this.OnChangeOut(value)}
=======
				<button class="btn btn-lg btn-primary btn-block">Clock In</button>
				</NumPad.Number>
			</div>
			<div style={clockout}>
                <NumPad.Number
				onChange= {(value) => this.OnChange(value, 'clockOut')}
>>>>>>> a235086fddf49ba55fc31123b0a57885561d5979
				placeholder={'my placeholder'}
				decimal={false}
				negative={false}
				displayRule={this.displayRule}
				>
<<<<<<< HEAD
				<button style={clickButton}>Clock Out</button>
=======
				<button class="btn btn-lg btn-primary btn-block">Clock Out</button>
>>>>>>> a235086fddf49ba55fc31123b0a57885561d5979
				</NumPad.Number>
			</div>
			<div style={log}>Clock-Log:</div>
			<div style={displayBox}>
			<p>{this.PrintList()}</p>
			</div>
<<<<<<< HEAD
=======
			<button style ={clearbutton} class="btn btn-sm btn-secondary" onClick={() => this.clearLog()}>Clear</button>
>>>>>>> a235086fddf49ba55fc31123b0a57885561d5979
		</div>
				
			);
		}
	}
export default PinInput;