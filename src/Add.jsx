import React from 'react'
import { useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { uploadDataAPI } from './services/allAPI';


function Add({onAddResponse}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [data, setData] = useState({ id: "", customer: "", company: "", email: "", phone: "", value: "", tags: "", source: "", assigned: "", status: "" });
    console.log(data);


    const handleAdd =async() => {
        const { id, customer, company, email, phone, value, tags, source, assigned, status } = data;
        if (!id || !customer || !company || !email || !phone || !value || !tags || !source || !assigned || !status) {
            toast.error("Please fill all fields");
            return;
        }else{
            // upload data to json server
            const result = await uploadDataAPI(data);
            console.log(result);
            if (result.status>=200 && result.status<300) {
                toast.success("Lead added successfully");
                handleClose();
                setData({ id: "", customer: "", company: "", email: "", phone: "", value: "", tags: "", source: "", assigned: "", status: "" });
                onAddResponse(); // Call the function to refresh data in Home component
            }else{
                toast.error(result.message);
            }
        }
    }
    return (
        <div>
            <div className='position-absolute end-0 me-3'>
                <Button className='btn btn-warning' onClick={handleShow}>New Lead</Button>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Employee Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label style={{ display:'flex', justifyContent: 'center' }}>
                        <input type="file" style={{ display: 'none' }} />
                        <img width={'30%'} height={'200px'} src="https://cdn-icons-png.flaticon.com/512/6325/6325109.png" alt="profile" />
                    </label>
                    <div className="row">
                        <div className="col-6">
                            <div className='mb-2'>
                                <FloatingLabel
                                    controlId="floatingInput2"
                                    label="Lead Id"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder="Lead Id" onChange={(e) => setData({ ...data, id: e.target.value })} />
                                </FloatingLabel>
                            </div>
                            <div className='mb-2'>
                                <FloatingLabel
                                    controlId="floatingInput1"
                                    label="Customer"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder="Customer" onChange={(e) => setData({ ...data, customer: e.target.value })} />
                                </FloatingLabel>
                            </div>

                            <div className='mb-2'>
                                <FloatingLabel
                                    controlId="floatingInput2"
                                    label="Company"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder="Company" onChange={(e) => setData({ ...data, company: e.target.value })} />
                                </FloatingLabel>
                            </div>

                            <div className='mb-2'>
                                <FloatingLabel
                                    controlId="floatingInput3"
                                    label="Email"
                                    className="mb-3"
                                >
                                    <Form.Control type="email" placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
                                </FloatingLabel>
                            </div>

                            <div className='mb-2'>
                                <FloatingLabel
                                    controlId="floatingInput4"
                                    label="Phone"
                                    className="mb-3"
                                >
                                    <Form.Control type="phone" placeholder="Phone" onChange={(e) => setData({ ...data, phone: e.target.value })} />
                                </FloatingLabel>
                            </div>
                            {/* {fileStatus && <p className='text-danger fw-bolder'>please upload following formats only(png/jpg/jpeg)</p>} */}
                        </div>

                        <div className="col-6">
                            <Form>
                                <div className='mb-2'>
                                    <FloatingLabel
                                        controlId="floatingInput5"
                                        label="value"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" placeholder="value" onChange={(e) => setData({ ...data, value: e.target.value })} />
                                    </FloatingLabel>
                                </div>

                                <div className='mb-2'>
                                    <FloatingLabel
                                        controlId="floatingInput4"
                                        label="Status"
                                        className="mb-3"
                                    >
                                        <Form.Select
                                            onChange={(e) => setData({ ...data, status: e.target.value })}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Select Status</option>
                                            <option value="customer">Customer</option>
                                            <option value="qualified">Qualified</option>
                                            <option value="working">Working</option>
                                            <option value="contacted">Contacted</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </div>
                                <div className='mb-2'>
                                    <FloatingLabel
                                        controlId="floatingInput4"
                                        label="Source"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" placeholder="Source" onChange={(e) => setData({ ...data, source: e.target.value })} />
                                    </FloatingLabel>
                                </div>
                                <div className='mb-2'>
                                    <FloatingLabel
                                        controlId="floatingInput4"
                                        label="Assigned"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" placeholder="Assigned" onChange={(e) => setData({ ...data, assigned: e.target.value })} />
                                    </FloatingLabel>
                                </div>
                                <div className='mb-2'>
                                    <FloatingLabel
                                        controlId="floatingInput4"
                                        label="Tags"
                                        className="mb-3"
                                    >
                                        <Form.Select
                                            onChange={(e) => setData({ ...data, tags: e.target.value })}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Select Tag</option>
                                            <option value="important">Important</option>
                                            <option value="follow up">Follow Up</option>
                                            <option value="review">Review</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </div>

                            </Form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>Add</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}

export default Add
