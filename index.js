const express = require('express')
require('./src/db/mongoose');
const userRouter = require('./src/routers/user');
const taskRouter = require('./src/routers/task');
const path = require('path');
const cors= require('cors');



const app = express()

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('*',cors());



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})