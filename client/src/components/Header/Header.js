import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { tsConstructorType } from '@babel/types';

class Header extends React.Component {
    updatePage(val){
        //const pageVal = this.pageChange
        this.props.updatePage(val)
        this.forceUpdate();
        console.log(val)
    }

    render(){
    
    if (this.props.admin === false) {
        console.log('rendering user');
        return (
            <div style={{paddingBottom:"10px"}}>
                <Navbar className="bg-dark" expand="lg">
                <Navbar.Brand style={{color:"white"}}>SchedulingApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#dash" className="nav-colors" id="navDash" onClick={() => this.updatePage('dash')}>Dashboard</Nav.Link>
                    <Nav.Link href="#schedule" className="nav-colors" onClick={() => this.updatePage('schedule')}>Schedule</Nav.Link>
                    <Nav.Link href="#timeclock" className="nav-colors" onClick={() => this.updatePage('timeclock')}>Timeclock</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        )
        
    } else if (this.props.admin === true) {
        console.log('rendering admin');
        return (
            <div style={{paddingBottom:"10px"}}>
                <Navbar className="bg-dark" expand="lg">
                <Navbar.Brand style={{color:"white"}}>SchedulingApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#dash" className="nav-colors" id="navDash" onClick={() => this.updatePage('dash')}>Dashboard</Nav.Link>
                    <Nav.Link href="#schedule" className="nav-colors" onClick={() => this.updatePage('schedule')}>Schedule</Nav.Link>
                    <Nav.Link href="#timeclock" className="nav-colors" onClick={() => this.updatePage('timeclock')}>Timeclock</Nav.Link>
                    <Nav.Link href="#addUsers" className="nav-colors" onClick={() => this.updatePage('addUsers')}>Add User</Nav.Link>
                    <Nav.Link href="#deleteUsers" className="nav-colors" onClick={() => this.updatePage('deleteUsers')}>Delete User</Nav.Link>
                    <Nav.Link href="#editUsers" className="nav-colors" onClick={() => this.updatePage('editUsers')}>Edit User</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        )
    } else {
        console.log('rendering undefined');
        return (
            <div style={{paddingBottom:"10px"}}>
                <Navbar className="bg-dark" expand="lg">
                <Navbar.Brand style={{color:"white"}}>SchedulingApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div id="navDash" onClick={() => this.updatePage('dash')}>
                    <Nav className="mr-auto">
                    <Nav.Link href="#dash" className="nav-colors" onClick={() => this.updatePage('dash')}>Dashboard</Nav.Link>
                    </Nav>
                    </div>
                </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
    }
}

//
export default Header;