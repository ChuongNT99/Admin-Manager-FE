import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {FiEdit3} from 'react-icons/fi'
import {RiDeleteBin6Fill} from 'react-icons/ri'
const url ='https://f255-210-245-110-144.ngrok-free.app/'
const TableEmployee = () => {
    const [employees, setEmployees] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState(' ')
    const [editId, setEditID] = useState(-1)

    useEffect(() => {
        axios.get(url +'/employee',
                {
                    withCredentials: true
                }).then(res => {
                    setEmployees(res.data.employee)})
    }, []);

    
    const handleSubmit = (event) => {
        event.preventDefault();
        const id = employees.length + 1;
        axios.post(url + '/employee', { employees_id: id, employees_name: name, email: email, phone_number: number })
            .then(res => {
                setEmployees(res.data.employee)
                window.location.reload();
            })
            .catch(err => console.log(err))
    }
    const handleEdit = (id) => {
        setEditID(id)
    }
    const handleUpdate = () => {
        axios.put(url +'/employee/' + editId, { employees_id: editId, employees_name: name, email: email, phone_number: number })
            .then(res => {
                console.log(res.data.employee);
                setEmployees(res.data.employee)
                setEditID(-1);
                window.location.reload();
            }).catch(err => console.log(err));
    }
    const handleDelete = (id) => {
        //  event.preventDefault();
        axios.delete( url+ '/employee/' + id, { employees_id: id, employees_name: name, email: email, phone_number: number })
        .then( res =>{
            setEmployees(res.data.employee)
            window.location.reload();
        })
        .catch(er=> console.log(er))
    }
    return (
        <div className='container'>
            <div className='form-div gap-3'>
                <form className='form-control' onSubmit={handleSubmit} action='' >
                    <input className='form-control mt-2' type='text' placeholder='Enter Name ' onChange={e => setName(e.target.value)} />
                    <input className='form-control mt-2' type='text' placeholder='Enter Email' onChange={e => setEmail(e.target.value)} />
                    <input className='form-control mt-2' type='text' placeholder='Enter Phone Number' onChange={e => setNumber(e.target.value)} />
                    <button className='form-control mt-2 btn-secondary btn-lg' onClick={handleSubmit}>Add</button>
                </form>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, key) => {
                        return(<>
                       
                    
                        <tr key={employee.employees_id}>
                        <td>{employee.employees_id}</td>
                        <td>{editId === employee.employees_id ? (
                            <input type='text' value={name} onChange={e => setName(e.target.value)} />
                        ) : (
                            employee.employees_name
                        )}
                        </td>
                        <td>{editId === employee.employees_id ? (
                            <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
                        ) : (
                            employee.email
                        )}
                        </td>
                        <td>{editId === employee.employees_id ? (
                            <input type='text' value={number} onChange={e => setNumber(e.target.value)} />
                        ) : (
                            employee.phone_number
                        )}
                        </td>
                        <td>
                            {editId === employee.employees_id ? (
                                <button onClick={handleUpdate}>Update</button>
                            ) : (
                                <FiEdit3 onClick={() => handleEdit(employee.employees_id)} style={{color: "blue"}}/>
                            )}
                            <RiDeleteBin6Fill onClick={() => handleDelete(employee.employees_id)} style={{color: "red", marginLeft:12}}/>
                        </td>
                    </tr>
                    
                    </>)}
                    )}

                </tbody>
            </table>
        </div>
    )
}

export default TableEmployee