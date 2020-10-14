require('./config/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.put('/user/:id', function (req, res) {
    let id = req.params.id
    //res.json(`put user con id: ${id}`)
    res.json({id})
})
app.delete('/user', function (req, res) {
    res.json('delete user he ')
})

app.post('/user', function (req, res) {
    res.json('post user :o')
})
app.get('/user', function (req, res) {
    res.json('get user he ?')
})

app.get('/', function (req, res) {
  res.json('Hello World')
})
 
app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ', 3000);
})