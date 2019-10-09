const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const path = require('path');
const cors= require('cors');



const app = express()



app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = app