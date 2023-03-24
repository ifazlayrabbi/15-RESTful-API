
'use strict'

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

require('dotenv').config()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
const _ = require('lodash')
const {Article} = require('./db')





// RESTful API creation       (REpresentational State Transfer)
// 1. HTTP request verbs      (get, post, put, patch, delete)
// 2. specific pattern for route/endpoint url   (  app.route('/articles')  )



app.route('/articles')

// find all articles
.get((req, res) => {
  Article.find()
  .then(articleData => {
    console.log('Found all the articles.')
    res.send(articleData)
  })
  .catch(err => res.send(err.message))
})

// create one article
.post((req, res) => {
  const {title, content} = req.body

  const article = new Article({
    title: _.kebabCase(title),
    content: content
  })
  article.save()
  .then(() => {
    console.log('New Article created.')
    res.redirect('/articles')
  })
  .catch(err => console.log(err.message))

})

// delete all articles
.delete((req, res) => {
  // Article.deleteMany()
  // Article.deleteMany({_id: {$in: ["641d56abad3733301b2edb12", "641d57a0667ec8c74fb125a2", "641d580fd1e6612aacc87aad"]}})
  Article.deleteMany({title: {$in: [_.kebabCase("title1"), _.kebabCase("title2")]}})
  .then(() => {
    console.log('Deleted many articles.')
    res.redirect('/articles')
  })
  .catch(err => console.log(err.message))
})






app.route('/articles/:articleTitle')

// find one article
.get((req, res) => {
  Article.find({title: _.kebabCase(req.params.articleTitle)})
  .then(resp => {
    console.log('Article found.')
    res.send(resp)
  })
  .catch(err => res.send(err.message))
})

// update one article
.put((req, res) => {
  const {title, content} = req.body

  Article.updateOne(
    {title: _.kebabCase(req.params.articleTitle)},
    {$set: {title: _.kebabCase(title), content: content}},
  )
  .then(() => {
    console.log('Article is updated.')
    res.redirect('/articles')
  })
  .catch(err => console.log(err.message))
})

// update one article
.patch((req, res) => {
  // Article.updateOne(
  //   {title: 'title2'},
  //   {$set: {body: {title1: 'title2 bb', content1: 'content2 bb'}}}
  // )
  // Article.updateOne(
  //   {title: 'title2'},
  //   {$push: {body: {title1: 'title4 dd', content1: 'content4 dd'}}}
  // )
  // Article.updateOne(
  //   {title: 'title2'},
  //   {$pull: {body: {title1: 'title4 dd'}}}
  // )


  const {title, content} = req.body

  Article.updateOne(
    {title: _.kebabCase(req.params.articleTitle)},
    {$set: {title: _.kebabCase(title), content: content}},
  )
  .then(() => {
    console.log('Updated the document.')
    res.redirect('/articles')
  })
  .catch(err => console.log(err.message))
})

// delete one article
.delete((req, res) => {
  Article.deleteOne({title: _.kebabCase(req.params.articleTitle)})
  .then(() => {
    console.log('Deleted the article.')
    res.redirect('/articles')
  })
  .catch(err => console.log(err.message))
})






const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server is running on port ' + port))
