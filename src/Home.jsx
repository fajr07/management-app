import React, { useState, useEffect, useRef } from 'react'
import { Table, Badge, Col, Row, Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import Add from './Add';
import { deleteDataAPI, getAllDataAPI } from './services/allAPI';
import { all } from 'axios';
import { toast } from 'react-toastify';


function Home({ sidebarOpen }) {
    const [openIndex, setOpenIndex] = useState(null);
    const menuRef = useRef(null);

    const [allData, setAllData] = useState([]);

    const getAllData = async () => {
        const result = await getAllDataAPI();
        console.log(result);
        if (result.status == 200) {
            setAllData(result.data);
        } else {
            console.log("API Error: ", result);
            setAllData([])

        }
    }

    console.log(allData);

    const deleteData = async (id) => {
        try {
            const result = await deleteDataAPI(id);
            if (result.status === 200) {
                // Update state locally without reloading
                setAllData(prevData => prevData.filter(item => item.id !== id));
                setOpenIndex(null); // Close the dropdown menu
                toast.success('Data deleted successfully');
            } else {
                toast.error('Failed to delete data');
            }
        } catch (error) {
            console.error('Delete error:', error);
            showAlert('Error deleting data');
        }
    }

    useEffect(() => {
        getAllData();
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenIndex(null);
            }
        }
        if (openIndex !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openIndex]);

    return (
        <div>
            <div className="p-4" style={{
                marginLeft: sidebarOpen ? '70px' : '0px', transition: 'margin-left 0.3s'
            }}>
                <Row>
                    <Col sm={12} lg={6}><h5 className="mb-4">Leads Management</h5></Col>
                    <Col sm={12} lg={6}><Add onAddResponse={getAllData} /></Col>
                </Row>
                <Row>
                    <Col className='value'><h5 className='text-primary'>New</h5><h5>127</h5></Col>
                    <Col className='value'><h5 className='text-warning'>Contacted</h5><h5>705K</h5></Col>
                    <Col className='value'><h5>Qualified</h5><h5>249K</h5></Col>
                    <Col className='value'><h5 className='text-info'>Working</h5><h5>57K</h5></Col>
                    <Col className='value'><h5 className='text-success'>Proposal Sent</h5><h5>1.1K</h5></Col>
                    <Col className='value'><h5 className='text-secondary'>Customer</h5><h5>3.7K</h5></Col>
                    <Col className='value'><h5>Lost Leads</h5><h5>5.2K</h5></Col>
                </Row>
                <nav className='d-flex p-2'>
                    <Button className='m-2'><i class="fa-solid fa-filter fa-lg"></i>Filter</Button>
                    <Button className='m-2'><i class="fa-solid fa-layer-group fa-lg"></i>Bulk Action</Button>
                    <Button className='m-2'><i class="fa-solid fa-arrows-rotate fa-lg"></i></Button>
                    <div style={{ flex: 1 }}></div>
                    <InputGroup style={{ width: '250px', marginRight: '10px' }}>
                        <InputGroup.Text>
                            <i className="fa fa-search"></i>
                        </InputGroup.Text>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                    </InputGroup>
                    <Button className='m-2'><i class="fa-solid fa-lines-leaning fa-lg"></i> View</Button>
                </nav>
                <Table striped bordered hover responsive className="text-center" style={{ marginBottom: '70px' }}>
                    <thead className="text-center">
                        <tr>
                            <th><Form.Check type="checkbox" /></th>
                            <th>Lead Id</th>
                            <th>Customer</th>
                            <th>Company</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>value</th>
                            <th>Tags</th>
                            <th>Source</th>
                            <th>Assigned</th>
                            <th>Status</th>
                            <th>created</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allData.length > 0 ? allData.map((lead, index) => (
                            <tr key={index}>
                                <th><Form.Check type="checkbox" /></th>
                                <td>{lead.id}</td>
                                <td>{lead.customer}</td>
                                <td>{lead.company}</td>
                                <td>{lead.email}</td>
                                <td>{lead.phone}</td>
                                <td>{lead.value}</td>
                                <td>
                                    <Badge>
                                        {lead.tags}
                                    </Badge>
                                </td>
                                <td>{lead.source}</td>
                                <td><img src={lead.assigned} alt="" style={{ width: '30px', height: '30px', objectFit: 'cover' }} className="rounded-circle" /></td>
                                <td>
                                    <Badge>
                                        {lead.status}
                                    </Badge>
                                </td>
                                <td>customer.time</td>
                                <td style={{ position: 'relative' }}>
                                    <Button onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                    </Button>
                                    {openIndex == index && (
                                        <div
                                            ref={menuRef}
                                            style={{
                                                position: 'absolute',
                                                top: '130%',
                                                right: '70%',
                                                background: '#fff',
                                                border: '1px solid #ddd',
                                                borderRadius: '5px',
                                                boxShadow: '0 2px 8px black',
                                                zIndex: 50000,
                                                minWidth: '100px',
                                                transform: 'translateY(-50%)'
                                            }}
                                        >
                                            <button
                                                className="dropdown-item"
                                                style={{ width: '100%', textAlign: 'left', border: 'none', background: 'none', padding: '8px 16px', cursor: 'pointer' }}>
                                                <i class="fa-solid fa-pen-to-square"></i>  Edit
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                style={{ width: '100%', textAlign: 'left', border: 'none', background: 'none', padding: '8px 16px', cursor: 'pointer', color: 'red' }} onClick={e => deleteData(lead?.id)}>
                                                <i class="fa-solid fa-trash"></i>  Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="13" className="text-center">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1">Previous</a>
                    </li>
                    <li class="page-item active"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Home
