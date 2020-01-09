/**
*** @author Jefter de A. Rocha <jefterrocha7@gmail.com>
**/
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const routes = require('./routes/index')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found')
	err.status = 404
	next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use((error, req, res, next) => {
		res.status(error.status || 500)
		res.json(error)
	})
}

// production error handler
// no stacktraces leaked to user
app.use((error, req, res, next) => {
	res.status(error.status || 500)
	res.json(error)
})

module.exports = app
