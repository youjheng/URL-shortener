const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const generateShorten = require('../../generateShorten')

const PORT = 3000
const mainUrl = `http://localhost:${PORT}/`
let shortUrl = ''

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
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