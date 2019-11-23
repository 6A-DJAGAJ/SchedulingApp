import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';


class ReportTable extends Component {
    render(){
        return(
            <table id="Reports" class="table sortable">
            <thead>
                <tr>
                    <th class="th-sm">First Name</th>
                    <th class="th-sm">Last Name</th>
                    <th class="th-sm">Time Cards</th>
                    <th class="th-sm">Issues</th>
                    <th class="th-sm">Role</th>
                    <th class="th-sm">Total Paid</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Person</td>
                    <td>A</td>
                    <td>placeholder</td>
                    <td>placeholder</td>
                    <td>employee</td>
                    <td>$10</td>
                </tr>
                <tr>
                    <td>Person</td>
                    <td>B</td>
                    <td>placeholder</td>
                    <td>placeholder</td>
                    <td>employee</td>
                    <td>$12</td>
                </tr>
                <tr>
                    <td>Person</td>
                    <td>C</td>
                    <td>placeholder</td>
                    <td>placeholder</td>
                    <td>employee</td>
                    <td>$8</td>
                </tr>
                <tr>
                    <td>Person</td>
                    <td>D</td>
                    <td>placeholder</td>
                    <td>placeholder</td>
                    <td>employee</td>
                    <td>$16</td>
                </tr>
            </tbody>
            </table>
        );
    }
}

export default ReportTable;