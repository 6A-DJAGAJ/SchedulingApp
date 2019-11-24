import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';


class ReportTable extends Component {
    sortTable(table, col, reverse) {
        var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
            tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
            i;
        reverse = -((+reverse) || -1);
        tr = tr.sort(function (a, b) { // sort rows
            return reverse // `-1 *` if want opposite order
                * (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
                    .localeCompare(b.cells[col].textContent.trim())
                   );
        });
        for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
    }
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