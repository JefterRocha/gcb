import React from 'react'
import { NavLink } from 'react-router-dom'

export default () => {
	return (
		<nav id='menu-bar'>
			<h1>Doctors Manager</h1>
			<ul>
				<li><NavLink to='/'>Home</NavLink></li>
				<li><NavLink to='/list'>List Doctors</NavLink></li>
				<li><NavLink to='/add'>Add Doctors</NavLink></li>
			</ul>
		</nav>
	)
}
