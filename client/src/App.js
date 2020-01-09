import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import Home from './screens/Home'
import List from './screens/List'
import Add from './screens/Add'
import Edit from './screens/Edit'
import Remove from './screens/Remove'

import './App.css'

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<header className='App-header'>
					<Navbar />
				</header>
				<main>
					<Route exact path='/' component={Home} />
					<Route path='/list' component={List} />
					<Route path='/add' component={Add} />
					<Route path='/edit/:crm' component={Edit} />
					<Route path='/remove/:crm' component={Remove} />
				</main>
			</div>
		</BrowserRouter>
	)
}

export default App
