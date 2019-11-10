import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
    return (
        <div style={{paddingBottom:"10px"}}>
            <Navbar bg="dark" expand="lg">
            <Navbar.Brand href="#home" style={{color:"white"}}>SchedulingApp</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home" style={{color:"white"}}>Dashboard</Nav.Link>
                <Nav.Link href="#link" style={{color:"white"}}>Schedule</Nav.Link>
                <Nav.Link href="#link" style={{color:"white"}}>Tasks</Nav.Link>
                <Nav.Link href="#link" style={{color:"white"}}>Messages</Nav.Link>
                <Nav.Link href="#link" style={{color:"white"}}>Time Clock</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header;
