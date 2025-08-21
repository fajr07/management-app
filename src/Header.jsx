import React from 'react'
import { Container, Form, FormControl, Navbar } from 'react-bootstrap'
import Profile from './Profile'
import Sidebar from './Sidebar'


function Header({ sidebarOpen, setSidebarOpen }) {




    return (
        <div>
            <div>
                <Navbar className="bg-info">
                    <Container fluid>
                        <Navbar.Brand className="d-flex align-items-center">
                            <Sidebar show={sidebarOpen} setShow={setSidebarOpen} />
                            <Form style={{ width: '250', marginLeft: sidebarOpen ? '150px' : '70px', transition: 'margin-left 0.3s' }}>
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                            </Form>
                        </Navbar.Brand>
                        <Profile />
                    </Container>
                </Navbar>
            </div>
        </div>
    )
}

export default Header
