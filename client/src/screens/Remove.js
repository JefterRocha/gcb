import React, { Component } from 'react'

import { fetchData } from '../functions/services'

export default class Remove extends Component {
    state = { crm: '', loading: false }

    componentDidMount() {
        const { crm } = this.props.match.params
        this.setState({ crm })
    }

    backToList = () => this.props.history.push('/list')

    handleClick = async () => {
        const { crm } = this.state
        this.setState({ loading: true })
        await fetchData(crm, { method: 'DELETE' })
        this.backToList()
    }
   
    render() {
        const { crm, loading } = this.state
        return (
            <div className='content'>
                { loading ? <div className='loader' /> : 
                    <div className='btn-control'>
                        <span>Doctor CRM #{crm} will be removed, you confirm?</span>
                        <button className='remove' onClick={this.handleClick}>Yes, remove it</button>
                        <button className='edit' onClick={this.backToList}>No, keep it</button>
                    </div>
                }
            </div>
        )
    }
}
