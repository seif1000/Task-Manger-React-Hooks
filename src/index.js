const app = require('./app')
const port = process.env.PORT

app.listen(5000, () => {
    console.log('Server is up on port ' + 5000)
})