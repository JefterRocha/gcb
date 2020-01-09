/**
*** @author Jefter de A. Rocha <jefterrocha7@gmail.com>
**/

const mysql = require('mysql')

function openConnection() {
	try {
		return mysql.createConnection({
			host: 'localhost',
			port: 3306,
			user: 'root',
			password: '',
			database: 'gcb_db'
		})
	} catch (err) {
		console.log(err)
	}
}

function getOne(table, attrib, res) {
	const connection = openConnection()
	const filter = /[0-9]/.test(attrib) ? `CRM = ${parseInt(attrib)}` : `NAME = ${attrib}`
	connection.query(`SELECT * FROM ${table} WHERE ${filter}`, (error, results, fields) => {
		if (error) res.json(error)
		else {
			const datas = [ ...results ].map(result => {
				const specialties = JSON.parse(result.specialties)
				return { ...result, specialties }
			})
			res.json(datas)
		}
		connection.end()
	})
}

function getAll(table, res) {
	const connection = openConnection()
	connection.query(`SELECT * FROM ${table}`, (error, results, fields) => {
		if (error) res.json(error)
		else {
			const datas = [ ...results ].map(result => {
				const specialties = JSON.parse(result.specialties)
				return { ...result, specialties }
			})
			res.json(datas)
		}
		connection.end()
	})
}

function destroy(table, filter, res) {
	const connection = openConnection()
	connection.query(`DELETE FROM ${table} WHERE ${filter}`, (error, results, fields) => {
		if (error) res.json(error)
		else res.json(results)
		connection.end()
	})
}

function create(table, values, res) {
	const connection = openConnection()
	connection.query(`INSERT INTO ${table} VALUES ?`, [ values ], (error, results, fields) => {
		if (error) res.json(error)
		else res.json(results)
		connection.end()
	})
}

function update(table, datas, filter, res) {
	const connection = openConnection()
	const dataArr = []

	for (const key in datas) {
		if (datas.hasOwnProperty(key)) dataArr.push(`${key}='${datas[key]}'`)
	}

	const condition = []

	for (const key in filter) {
		if (filter.hasOwnProperty(key)) condition.push(`${key}='${filter[key]}'`)
	}

	connection.query(`UPDATE ${table} SET ${dataArr.join(',')} WHERE ${condition.join(' AND ')}`, (error, results, fields) => {
		if (error) res.json(error)
		else res.json(results)
		connection.end()
	})
}

module.exports = { openConnection, getOne, getAll, destroy, create, update }


