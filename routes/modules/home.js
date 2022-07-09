const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const generateShorten = require('../../generateShorten')

const PORT = 3000
const mainUrl = `http://localhost:${PORT}/`
let shortUrl = ''

// home page
router.get('/', (req, res) => {
  res.render('index')
})

// generate short Url
router.post('/', (req, res) => {
  const inputUrl = req.body.originalUrl
  Url.find()
    .lean()
    .then((links) => {
      // check existed original Url 輸入相同網址時，產生一樣的短網址
      shortUrl = links.find((link) => link.originalUrl === inputUrl)
      if (shortUrl) {
        shortUrl = mainUrl + shortUrl.shorten
        return res.render('index', { inputUrl, shortUrl })
      }

      let shorten = generateShorten()
      shortUrl = mainUrl + shorten
      // check existed shorten
      while (links.some(link => link.shorten === shorten)) {
        shorten = generateShorten()
      }
      // create new short Url
      return Url.create({
        originalUrl: inputUrl,
        shorten: shorten,
      })
        .then(() => res.render('index', { inputUrl, shortUrl }))
    })
    .catch(error => console.log(error))
})

// redirect to original Url
router.get('/:shorten', (req, res) => {
  const shorten = req.params.shorten
  Url.findOne({ shorten })
    .lean()
    .then((link) => {
      if (link) {
        return res.redirect(link.originalUrl)
      }
    })
    .catch(error => console.log(error))
})

module.exports = router