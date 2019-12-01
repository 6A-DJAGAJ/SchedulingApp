import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class ReportTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			employees: [
            { id: 1, Name: 'Person D', ClockIn: new Date('Sat Nov 30 2019 15:34:26').toString(), ClockOut: new Date().toString(), Issues: "Late", Role: 'Employee', TotalPaid: 1000},
            { id: 2, Name: 'Person B', ClockIn: new Date('Fri Nov 29 2019 12:00:00').toString(), ClockOut: new Date('Fri Nov 29 2019 16:00:00').toString(), Issues: "Lazy", Role: 'Manager', TotalPaid: 1025},
            { id: 3, Name: 'Person A', ClockIn: new Date('Sun Dec 1 2019 14:00:00').toString(), ClockOut: new Date('Sun Dec 1 2019 20:00:00').toString(), Issues: "Rude", Role: 'CEO', TotalPaid: 3000},
            { id: 4, Name: 'Person C', ClockIn: new Date('Wed Nov 6 2019 8:00:00').toString(), ClockOut: new Date('Wed Nov 6 2019 22:00:00').toString(), Issues: "Skips work", Role: 'Intern', TotalPaid: 1500}
         ],
			orientation: 'default'
      }
   }
   renderTableHeader() {
	   var i = 1;
	   let header = Object.keys(this.state.employees[0])
	   header = header.slice(1);
	   return header.map((key,index) => {
		 return <th key={index} onClick={e => this.onSort(e, {key})}>{key}</th>
   })
}

   renderTableData() {
	   return this.state.employees.map((employee, index) => {
		   const {id, Name, ClockIn, ClockOut, Issues, Role, TotalPaid} = employee
  			return (

		   <tr key={id}>
				<td>{Name}</td>
				<td>{ClockIn}</td>
				<td>{ClockOut}</td>
				<td>{Issues}</td>
				<td>{Role}</td>
				<td>${TotalPaid}</td>
			</tr>
			)
	   })
	}
	
	onSort(event, sortBase){
		const data = this.state.employees;
		
		if(sortBase.key === 'Name' || sortBase.key === 'Issues' ||  sortBase.key === 'Role')
		{
			data.sort(function(a,b) {
				var stringA = a[sortBase.key].toUpperCase();
				var stringB = b[sortBase.key].toUpperCase();
				if (stringA < stringB){
					return -1;
				}
				if (stringA > stringB){
					return 1;
				}
				return 0;
			})

			this.setState({data})
		}
		else if(sortBase.key === 'ClockIn' || sortBase.key === 'ClockOut')
		{
			data.sort(function(a,b){
				var DateA = new Date(a[sortBase.key]);
				var DateB = new Date(b[sortBase.key]);
				return DateA-DateB;
			})
			this.setState({data})
		}
		else
		{
			data.sort(function(a,b) {
				return a[sortBase.key] - b[sortBase.key];
				
			})
		this.setState({data})
			
		}
	}
		
	
   render(){
	   const employees = this.state.employees;

	   return(
	   <div>
			<table class="table table-bordered table-sm sortable">
				<thead class="thead-dark">
				{this.renderTableHeader()}
				</thead>
				<tbody>
				{this.renderTableData()}
				</tbody>
			</table>
		</div>
	   )
   }
}
export default ReportTable;