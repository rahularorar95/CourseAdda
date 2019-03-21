import React from "react"
import { Link } from "react-router-dom"
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from "react-bootstrap"
export default () => {
    return (
        <div>
            <Navbar
                expand='lg'
                variant='dark'
                style={{
                    "background-color": "#00953A"
                }}
            >
                <Link to='/'>
                    <Navbar.Brand>CourseAdda </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link>
                            <Link to='/' style={{color:'white'}}> Home</Link>
                        </Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type='text' placeholder='Search' className='mr-sm-2' />
                        <Button variant='outline-success'>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
