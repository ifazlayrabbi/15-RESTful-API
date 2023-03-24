
'use strict'

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

require('dotenv').config()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
const {Article} = require('./db')



app.get('/articles', (req, res) => {
  Article.find()
  .then(articleData => {
    console.log('Displaying all the articles.')
    res.send(articleData)
  })
  .catch(err => res.send(err.message))
})

app.post('/articles', (req, res) => {
  const {title, content} = req.body

  const article = new Article({
    title: title,
    content: content
  })
  article.save()
  .then(() => {
    console.log('New Article saved.')
    res.redirect('/articles')
  })
  .catch(err => console.log(err.message))

})

app.delete('/articles', (req, res) => {
  Article.deleteMany({title: {$in: "title2"}})
  .then(() => {
    console.log('Deleted the item.')
    res.redirect('/articles')
  })
  .catch(err => console.log(err.message))
})

app.patch('/articles', (req, res) => {
  // Article.updateOne(
  //   {title: 'title2'},
  //   {$set: {body: {title1: 'title2 bb', content1: 'content2 bb'}}}
  // )
  // Article.updateOne(
  //   {title: 'title2'},
  //   {$push: {body: {title1: 'title4 dd', content1: 'content4 dd'}}}
  // )
  Article.updateOne(
    {title: 'title2'},
    {$pull: {body: {title1: 'title4 dd'}}}
  )
  .then(() => {
    console.log('Updated the document.')
    res.redirect('/articles')
  })
  .catch(err => console.log(err.message))
})





const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server is running on port ' + port))
