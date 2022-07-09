const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Url = require('./models/url')
const generateShorten = require('./generateShorten')

const app = express()
const PORT = 3000
const mainUrl = `http://localhost:${PORT}/`
let shortUrl = ''

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const inputUrl = req.body.originalUrl
  Url.find()
    .lean()
    .then((links) => {
      shortUrl = links.find((link) => link.originalUrl === inputUrl)
      if (shortUrl) {
        shortUrl = mainUrl + shortUrl.shorten
        return res.render('index', { inputUrl, shortUrl })
      } 

      let shorten = generateShorten()
      shortUrl = mainUrl + shorten
      while (links.some(link => link.shorten === shorten)) {
        shorten = generateShorten()
      }
      return Url.create({
        originalUrl: inputUrl,
        shorten: shorten,
      })
        .then(() => res.render('index', { inputUrl, shortUrl }))
    })
    .catch(error => console.log(error))
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})