import React from 'react'

const OrderList = ({ orders }) => orders.map(order => <option key={order}>{order}</option>)

export default OrderList
