/**
*** @author Jefter de A. Rocha <jefterrocha7@gmail.com>
**/
const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => res.render('index', { title: 'Doctors Manager' }))

router.get('/doctors', (req, res) => db.getAll('doctors', res))

router.get('/doctors/:filter', (req, res) => {
	const { filter } = req.params
	db.getOne('doctors', filter, res)
})

router.delete('/doctors/:crm', (req, res) => {
	const { crm } = req.params
	const filter = `crm=${crm}`
	db.destroy('doctors', filter, res)
})

router.post('/doctors', (req, res) => {
	const { crm, name, phone, city, state, specialties } = req.body
	db.create('doctors', [ [ crm, name, phone, city, state, JSON.stringify(specialties) ] ], res)
})

router.patch('/doctors/:crm', (req, res) => {
	const { crm } = req.params
	const { name, phone, city, state, specialties } = req.body
	db.update('doctors', { name, phone, city, state, specialties: JSON.stringify(specialties) }, { crm }, res)
})

module.exports = router
