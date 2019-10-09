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


app.use(express.static(path.join(__dirname, 'client/build')));

if(process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, 'client/build'))); 
      app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'client/build/index.html'));  })
    }
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

module.exports = app