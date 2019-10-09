const app = require('./src/app')
const port = process.env.PORT

app.listen(5000, () => {
    console.log('Server is up on port ' + port);
})