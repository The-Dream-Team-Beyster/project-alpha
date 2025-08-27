const express = require('express')
const cors = require('cors')

const locationRouter = require('./routers/locations')
const userRouter = require('./routers/user')
const logger = require('./middleware/logger')

const app = express()
app.use(express.json())
app.use(cors())
app.use(logger)

app.use('/location', locationRouter)
app.use('/users', userRouter)

module.exports = app