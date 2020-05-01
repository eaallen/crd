import React from 'react'
import {Nav, Navbar, NavDropdown,Button} from 'react-bootstrap'
import {withFirebase} from '../Firebase'
function TopBase(props){
    
    return(
        <div className='bg-primary '>
            <Navbar bg="primary" expand="lg">
            <Navbar.Brand href="#home">Custom Ring Design</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Button variant="outline-success">Sign In/Out</Button>
            </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
const Top = withFirebase(TopBase)
export default Top