
'use strict'

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

require('dotenv').config()
app.set('view engine', 'ejs')
app.use(express.static('public'))
const {Article} = require('./db')



app.get('/', (req, res) => {
  res.send('success')
})


app.get('/articles', (req, res) => {
  Article.find()
  .then(articleData => res.send(articleData))
  .catch(err => res.send(err.message))
})



const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server is running on port ' + port))
