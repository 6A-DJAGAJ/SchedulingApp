import React, {Component} from 'react';
import NumPad from 'react-numpad';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

class PinInput extends Component {
	render() {
		const displayRule = value => value.replace(/0|1|2|3|4|5|6|7|8|9/g, '*');
        return (
			<div>
                <NumPad.Number
				onChange={(value) => { console.log('value', value)}}
				placeholder={'my placeholder'}
				decimal={false}
				negative={false}
				displayRule={displayRule}
				>
					<div class="float-right" style={{paddingRight:"10px"}}>
						<Button >Clock in/Clock out</Button>
					</div>
				</NumPad.Number>
			</div>
			);
		}
	}
export default PinInput;