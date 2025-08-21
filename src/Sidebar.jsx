import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Offcanvas, Nav, Button } from 'react-bootstrap'

function Sidebar({ show, setShow }) {
    const toggleSidebar = () => setShow(prev => !prev);

    // Toggle sidebar open/close


    return (
        <div style={{ position: 'relative', minHeight: '5vh' }}>
            <Button
                variant="primary"
                onClick={toggleSidebar}
                style={{
                    position: 'fixed',
                    top: 15,
                    left: show ? 100 : 20, // Move button right when sidebar is open
                    zIndex: 1051, // Above Offcanvas backdrop
                    transition: 'left 0.3s'
                }}
            >
                <i class="fa-solid fa-bars"></i>
            </Button>
            <Offcanvas
                show={show}
                onHide={toggleSidebar}
                placement="start"
                style={{ width: 70, opacity: 0.8 }}
                backdrop={false}
            >
                <Offcanvas.Header>
                    <img src="https://images.icon-icons.com/2699/PNG/512/simple_logo_icon_168826.png" style={{ width: '40px' }} alt="" />
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column justify-content-between" style={{ height: '100%' }}>
                    <Nav className="flex-column">
                        <Nav.Link className='py-2' as={Link} to="#" onClick={toggleSidebar}><i class="fa-solid fa-house fa-xl"></i></Nav.Link>
                        <Nav.Link className='py-2' as={Link} to="#" onClick={toggleSidebar}><i class="fa-solid fa-user-group fa-xl"></i></Nav.Link>
                        <Nav.Link className='py-2' as={Link} to="#" onClick={toggleSidebar}><i class="fa-solid fa-envelope fa-xl"></i></Nav.Link>
                        <Nav.Link className='py-2' as={Link} to="#" onClick={toggleSidebar}><i class="fa-solid fa-phone-volume fa-xl"></i></Nav.Link>
                        <Nav.Link className='py-2' as={Link} to="#" onClick={toggleSidebar}><i class="fa-regular fa-file-lines fa-xl"></i></Nav.Link>
                        <Nav.Link className='py-2' as={Link} to="#" onClick={toggleSidebar}><i class="fa-solid fa-layer-group fa-xl"></i></Nav.Link>
                        <Nav.Link className='py-2' as={Link} to="#" onClick={toggleSidebar}><i class="fa-solid fa-list fa-xl"></i></Nav.Link>
                        <Nav.Link className='py-2' as={Link} to="#" onClick={toggleSidebar}><i class="fa-solid fa-chart-line fa-xl"></i></Nav.Link>
                        <Nav.Link className='py-2' as={Link} to="#" onClick={toggleSidebar}><i class="fa-solid fa-receipt fa-xl"></i></Nav.Link>
                    </Nav>
                    <Nav className="flex-column mb-2">
                        <Nav.Link className='py-2' as={Link} to="/about" onClick={toggleSidebar}><i class="fa-regular fa-circle-question fa-xl"></i></Nav.Link>
                        <Nav.Link className='py-2' as={Link} to="/contact" onClick={toggleSidebar}><i class="fa-regular fa-circle-user fa-xl"></i></Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Sidebar