import React, {Component} from 'react';
import NumPad from 'react-numpad';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
/*This component handles the Clockin/Out Page. The actual logic is handled on the 
server end, so the main responsibilty of this component is to interpret what is returned
by the server in order to give the user the proper feedback. Currently, the messages are
created locally using the information received from the server, but if possible it would 
be preferable to have the messages also created on the server end and then sent to the 
component for rendering so they can be preserved on refresh*/

class PinInput extends Component {
	constructor(props){
		super(props)
		this.state = {
		fromServer : [], //the server status response
		logString: "no logs", //console debug variable 
		messages: [], //stores the messages printed to the log
		display : false, //boolean for modal display
		modalText: "", //the field that will hold the text for the modal passed by the case
		curName:"" //the first name of the user to display in the modal
	}
}


	displayRule = value => value.replace(/0|1|2|3|4|5|6|7|8|9/g, '*'); //Display rule for React Numpad to convert displayed numbers to *

	clearLog = () => { 
		var messages = this.state.messages;
		messages.length = 0;
		this.setState({messages})
	}
	
	OnChange =(value, director) => { //the function called when the numpad's onChange is fired
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
			 axios.get('/uPins/' + director + '/' + value) //axios call with format uPin/Clockin( or out)/PinValue
			.then(res => {
				const fromServer = res.data;
				console.log(fromServer.name)
				console.log(this.fromServer)
				var d = new Date();
				d = d.toLocaleString();
				console.log(fromServer.name + " " + fromServer.clockedIn + " " + fromServer.status)
				switch(fromServer.status) //determine log and modal response via server response codes
				{
					case 1:
						log = `${fromServer.name} clocked in at ${d}`;
						this.setState({
							display: true,
							modalText:"You clocked in!",
							curName:fromServer.name.split(" ")
						})
					break;
					case 10:
						log = "Already clocked in";
						this.setState({
							display: true,
							modalText:"You are already clocked in!",
							curName:fromServer.name.split(" ")
						})
					break;
					case 11:
						log = `${fromServer.name} clocked out at ${d}`;
						this.setState({
							display: true,
							modalText:"You clocked out!",
							curName:fromServer.name.split(" ")
						})
					break;
					case 33:
						log = "Not clocked in";
						this.setState({
							display: true,
							modalText:"You are not clocked in yet!",
							curName:fromServer.name.split(" ")
						})
					break;
					case 404:
						log = "User not found";
					break;
					case 911:
						log = "Error"
						console.log("911, what's your emergency?")
					break;
				}
				messages.unshift(log); //puts newest message at the front
				this.setState({messages});
			})
		 }
	PrintList = () => { //method for printing the log with proper formatting
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
	
	handleClose = () => { // for closing the modal
		var display = this.state.display
			display = false;
			this.setState({display})
	}

		
				
	
	render() {
		console.log(this.state.logString)
		
		 //css formatting
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
			<Modal show={this.state.display} onHide={this.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Hello, {this.state.curName[0]}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{this.state.modalText}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
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
