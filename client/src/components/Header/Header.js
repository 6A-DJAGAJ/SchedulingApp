import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { tsConstructorType } from '@babel/types';

class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            pageChange:"dash"
        };
    }

    updatePage(){

        //const pageVal = this.pageChange
        this.props.updatePage(this.pageChange)
        console.log(this.pageChange)
    }

    render(){
    return (
        <div style={{paddingBottom:"10px"}}>
            <Navbar className="bg-dark" expand="lg">
            <Navbar.Brand style={{color:"white"}}>SchedulingApp</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#dash" className="nav-colors" ref = {this.pageChange="dash"} onClick={this.updatePage.bind(this)}>Dashboard</Nav.Link>
                <Nav.Link href="#schedule" className="nav-colors" ref = {this.pageChange="schedule"} onClick={this.updatePage.bind(this)}>Schedule</Nav.Link>
                <Nav.Link href="#tasks" className="nav-colors">Tasks</Nav.Link>
                <Nav.Link href="#messages" className="nav-colors">Messages</Nav.Link>
                <Nav.Link href="#timedata" className="nav-colors">Timeclock Data</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </div>
    )
    }
}

//
export default Header;