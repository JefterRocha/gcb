import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import StatesList from '../components/StatesList'

import { states, specialties } from '../domain-datas.json'

import { fetchData } from '../functions/services'

class Form extends Component {  
    state = {
        doctor: {
            crm: '',
            name: '',
            phone: '',
            city: '',
            state: '',
            specialties: []
        },
        states, specialties, color: 'inherit', loading: false
    }

    componentDidMount() {
        const { doctor = false } = this.props
        if (doctor) {
            this.setState({ doctor })
        }
    }

    handleInputChanged = ({ target }) => {
        const atribute = {}
        const { value, name } = target
        atribute[name] = value
        const { doctor } = this.state
        this.setState({ doctor: { ...doctor, ...atribute } })
    }

    handleCheckBoxChange = ({ target }) => {
        const { doctor } = this.state
        const { specialties: oldSpecialties  } = doctor
        const { value, checked } = target
       
        const specialties = checked ? [...oldSpecialties, value] : oldSpecialties.filter(color => color !== value)
        this.setState({ doctor: { ...doctor, specialties } })
    }

    isChecked = speciality => {
        const { specialties = false } = this.state.doctor
        if (!speciality) return
        return specialties.some(sp => sp === speciality)
    }

    handleSubmit = async e => {
        e.preventDefault()
        const { doctor } = this.state
        if (doctor.specialties.length < 2) {
            this.setState({ color: 'red' })
            return
        }
        this.setState({ color: 'inherit', loading: true })

        const method = this.props.isEdit ? 'PATCH' : 'POST'
        const { crm = '' } = this.props.match.params

        const requestData = { method, body: JSON.stringify(doctor) }
        await fetchData(crm, requestData)
        this.props.history.push('/list')
    }

    render() {
        const { doctor, states, specialties, color, loading } = this.state,
            { isEdit } = this.props
        return (
            <div className='content'>
                { loading ? <div className='loader' /> : 
                    <form onSubmit={this.handleSubmit}>
                    { !isEdit ?
                        <input type='text' name='crm' placeholder='CRM' required={true} defaultValue={doctor.crm} onChange={this.handleInputChanged} /> : ''}
                    <input type='text' name='name' placeholder='Name' required={true} defaultValue={doctor.name} onChange={this.handleInputChanged} />
                    <input type='text' name='phone' placeholder='Phone' required={true} defaultValue={doctor.phone} onChange={this.handleInputChanged} />
                    <input type='text' name='city' placeholder='City' required={true} defaultValue={doctor.city} onChange={this.handleInputChanged} />
                    <select name='state' required={true} value={doctor.state} onChange={this.handleInputChanged}>
                        <StatesList states={states} />
                    </select>
                    <h4>Select doctor's specialty <span style={{color}}>(2 minimum)</span>.</h4>
                    <ul className='specialties'>
                    {specialties.map((speciality, index) => <li key={index}>
                            <input
                                type='checkbox'
                                name='specialties'
                                id={speciality}
                                value={speciality}
                                checked={this.isChecked(speciality)}
                                onChange={this.handleCheckBoxChange}
                            />
                            <label htmlFor={speciality}>{speciality}</label>
                        </li>)}
                    </ul>
                    <button className='submit-button' type='submit'>Send</button>
                </form> }
                
            </div>
        )
    }
}
export default withRouter(Form)
