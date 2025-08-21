import { Button, Collapse } from 'react-bootstrap'
import React, { useState } from 'react'


function Profile() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div>
                <Button onClick={() => setOpen(!open)} className='btn btn-outline-dark'><i className="fa-regular fa-circle-user fa-lg"></i></Button>
            </div>
            <Collapse in={open}>
                <div className="position-absolute end-0 mt-3 row p-3 bg-warning bg-opacity-75 z-3 rounded" style={{ marginRight: '0.5%' }}>
                    <ul className="list-unstyled dropdown text-center">
                        <li><a href="#" className="text-dark text-bold text-decoration-none d-block">Account</a></li>
                        <hr />
                        <li><a href="#" className="text-dark text-bold text-decoration-none d-block">Billing</a></li>
                        <hr />
                        <li><a href="#" className="text-dark text-bold text-decoration-none d-block">Settings</a></li>
                    </ul>
                    <Button className='btn btn-success'>Logout</Button>
                </div>
            </Collapse>
        </div>
    )
}
export default Profile
