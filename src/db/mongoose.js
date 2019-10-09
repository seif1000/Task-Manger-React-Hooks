const mongoose = require('mongoose')
const {mongoURI} = require('../config/key');

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
