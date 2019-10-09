const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/task-manger-react", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
