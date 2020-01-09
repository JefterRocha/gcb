import React from 'react'

const StatesList = ({ states }) => states.map((state, index) => <option key={index}>{state}</option>)

export default StatesList
