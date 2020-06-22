import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
// import './Navigation.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigationbar(){
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
                <img
                    src="/icon.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />{' '}
                Placement Prep Assistant
            </Navbar.Brand>
            <Nav className="ml-auto">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/dreamjob" className="nav-link">Dream Job</Link>
            </Nav>
        </Navbar>
    );
}
export default Navigationbar;