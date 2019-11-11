import React, {Component} from 'react';
import NumPad from 'react-numpad';

//<button>Clock in/Clock out</button>
//</NumPad.Number>
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
				/>
			</div>
			);
		}
	}
export default PinInput;