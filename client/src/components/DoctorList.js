import React from 'react'
import { Link } from 'react-router-dom'

const DoctorList = ({ doctors, filter }) => {

    const filteredDoctors = doctors.filter(doctor => {
        if(!filter) return doctor
        const regEx = new RegExp(filter, 'gi')
        const values = Object.values(doctor)
        return regEx.test(values) && doctor
    })
    return filteredDoctors.map(doctor =>  (
        <li id='doctor-wrapper' key={doctor.crm}>
            <div className='doctor'>
                <h3>{ doctor.name }</h3>
                <div className='action-attributes'>
                    <Link className='edit action-btn' to={`/edit/${doctor.crm}`}>edit</Link>
                    <Link className='remove action-btn' to={`/remove/${doctor.crm}`}>remove</Link>
                </div>
            </div>
            <table id='doctor-info'>
                <tbody>
                    <tr>
                        <th>CRM</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Specialties</th>
                    </tr>
                    <tr>
                        <td>{ doctor.crm }</td>
                        <td>{ doctor.name }</td>
                        <td>{ doctor.phone }</td>
                        <td>{ doctor.city }</td>
                        <td>{ doctor.state }</td>
                        <td>{ doctor.specialties.join(', ') }</td>
                    </tr>
                </tbody>
            </table>
        </li>
    ))
}


export  default DoctorList