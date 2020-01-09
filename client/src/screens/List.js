import React, { Component } from 'react'

import OrderList from '../components/OrderList'
import DoctorList from '../components/DoctorList'

import { fetchData } from '../functions/services'

import { orders } from '../domain-datas.json'

export default class List extends Component {
	state = { doctors: [], orders, filter: false, order: 'name', loading: true }

	async componentDidMount() {
		const doctors = await fetchData()
		this.setState({ doctors })
		this.setState({ loading: false })
	}

	HandleChange = ({ target }) => {
		const { value: filter } = target
		this.setState({ filter })
	}

	handleSelectChange = ({ target }) => {
		const { value: order } = target

		this.setState({ order })
		const { doctors: oldDoctors } = this.state
		const doctors = oldDoctors.sort(this.sortBy)
		this.setState({ doctors })
	}

	sortBy = (a, b) => {
        const { order } = this.state
		return a[order] < b[order] ? -1 : 1
	}

	render() {
		const { doctors, orders, filter, loading } = this.state
		return <div className='content'>
				<div className='filters'>
					<div className='filter'>
						<span>Filter by: </span>
						<input
							type='text'
							placeholder={orders.join(', ')}
							onChange={this.HandleChange}
						/>
					</div>
					<div className='order'>
						Order by:
						<select id='orderBy' name='order' onChange={this.handleSelectChange}>
							<OrderList orders={orders} />
						</select>
					</div>
				</div>
			<ul id='doctor-list'>{loading ?
				<div className='loader' /> :
				<DoctorList doctors={doctors} filter={filter}/>}
			</ul>
			</div>
	}
}
