import React, { Component } from 'react'

import Form from '../components/Form'
import { fetchData } from '../functions/services'

export default class Edit extends Component {
	state = { doctor: {}, loading: true }

	async componentDidMount() {
		const { crm } = this.props.match.params
		const doctor = await fetchData(crm)
		this.setState({ doctor: doctor[0], loading: false })
	}

	render() {
		const { doctor, loading } = this.state
		return loading ? <div className='content'>
			<div className='loader' />
		</div> : <Form doctor={doctor} isEdit={true} />
	}
}
