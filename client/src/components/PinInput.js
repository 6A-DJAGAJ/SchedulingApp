import React, {Component} from 'react';
import NumPad from 'react-numpad';

//<button>Clock in/Clock out</button>
//</NumPad.Number>
class PinInput extends Component {
	constructor(props){
		super(props)
		this.state = {
		
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
			
		 }
	PrintList = () => {
		const ul={
			 listStyleType: 'none',
			 paddingLeft:'0',
		 }
		 const li={
			 width:'100%'
		 }
		var input = this.state.input;
		console.log({input})
		return(
			<ul style={ul}>
			{input.map(input => <li style={li}>{input}</li>)}
			</ul>
			)
	}
				
	
	render() {
		console.log(this.state.success)
		
		 
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
			boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
			fontSize: '48px',
			textAlign: 'center'
		 }
		 const log={
			 marginLeft:'23.5%',
			 marginTop:'8%',
		 }
			 
        return (
		<div style={bigone}>
			<div style={clockin}>
                <NumPad.Number
				onChange= {(value) => this.OnChangeIn(value)}
				placeholder={'my placeholder'}
				decimal={false}
				negative={false}
				displayRule={this.displayRule}
				>
				<button style={clickButton}>Clock In</button>
				</NumPad.Number>
			</div>
			<div style={clockout}>
			<NumPad.Number
				onChange= {(value) => this.OnChangeOut(value)}
				placeholder={'my placeholder'}
				decimal={false}
				negative={false}
				displayRule={this.displayRule}
				>
				<button style={clickButton}>Clock Out</button>
				</NumPad.Number>
			</div>
			<div style={log}>Clock-Log:</div>
			<div style={displayBox}>
			<p>{this.PrintList()}</p>
			</div>
		</div>
				
			);
		}
	}
export default PinInput;