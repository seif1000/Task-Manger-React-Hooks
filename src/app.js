const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const path = require('path');
const cors= require('cors');



const app = express()



app.use(cors());



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

module.exports = app