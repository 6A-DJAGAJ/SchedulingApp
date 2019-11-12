import React, {Component} from 'react';

class Table extends Component {
	constructor(props) {
		super(props)
		this.state = {
			students: [
            { id: 1, name : 'Wasif', age: 21, email: 'wasif@email.com'},
            { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
            { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
            { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
         ],
			orientation: 'default'
      }
   }
   renderTableHeader() {
	   let header = Object.keys(this.state.students[0])
	   header = header.slice(1);
	   return header.map((key,index) => {
		 return <th key={index} onClick={e => this.onSort(e, {key})}>{key}</th>
   })
}
   renderTableData() {
	   return this.state.students.map((student, index) => {
		   const {id, name, age, email} = student
		   return (
		   <tr key={id}>
				<td>{name}</td>
				<td>{age}</td>
				<td>{email}</td>
			</tr>
			)
	   })
	}
	
	onSort(event, sortBase){
	const data = this.state.students;
	if(sortBase.key === 'name' || sortBase.key === 'email')
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
	else
	{
		data.sort(function(a,b) {
			return a[sortBase.key] - b[sortBase.key];
			
	})
	this.setState({data})
	
}
	}
		
		
	
   render(){
	   const students = this.state.students;
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
export default Table;