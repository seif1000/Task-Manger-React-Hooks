const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const cors= require('cors');


const app = express()



app.use(cors());

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app