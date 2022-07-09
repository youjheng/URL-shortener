const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const generateShorten = require('../../generateShorten')

// home page
router.get('/', (req, res) => {
  res.render('index')
})

// generate short Url
router.post('/', (req, res) => {
  const inputUrl = req.body.originalUrl
  const shorten = generateShorten()
  let shortUrl = ''
  Url.findOne({ originalUrl: inputUrl })
    .lean()
    .then((link) => {
      console.log(link)
      // check existed original Url 輸入相同網址時，產生一樣的短網址
      if (link) {
        shortUrl = `http://localhost:3000/${link.shorten}`
        return res.render('index', { inputUrl, shortUrl })
      } else {
        shortUrl = `http://localhost:3000/${shorten}`
        // create new short Url
        return Url.create({
          originalUrl: inputUrl,
          shorten: shorten,
        })
          .then(() => res.render('index', { inputUrl, shortUrl }))
      }
    })
    .catch(error => console.log(error))
})

// redirect to original Url
router.get('/:shorten', (req, res) => {
  const shorten = req.params.shorten
  Url.findOne({ shorten })
    .lean()
    .then((link) => {
      console.log(link)
      if (link) return res.redirect(link.originalUrl)
    })
    .catch(error => console.log(error))
})

module.exports = router