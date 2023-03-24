
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://'+process.env.user+':'+process.env.pass+'@cluster0.pbwxcxc.mongodb.net/wikiDB')
// mongoose.connect('mongodb://127.0.0.1:27017/wikiDB')

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is missing!']
  },
  content: String,
  body: [{
    title1: String,
    content1: String
  }]
})
const Article = mongoose.model('Article', articleSchema)
exports.Article = Article





// Article.deleteOne({title: 'title2'})
// .then(() => console.log('Deleted'))
// .catch(err => console.log(err.message))





const article1 = new Article({
  title: 'title4',
  content: 'content4'
})

// article1.save()
// .then(() => console.log('New article inserted.'))
// .catch(err => console.log(err.message))
