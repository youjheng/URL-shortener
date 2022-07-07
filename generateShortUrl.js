const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const upperCaseLetters = lowerCaseLetters.toUpperCase()
const numbers = '1234567890'
const collection = lowerCaseLetters + upperCaseLetters + numbers

const randomSelector = arr => arr[Math.floor(Math.random() * arr.length)]

function generateShortUrl() {
  let shortUrl = ''
  for (let i = 0; i < 5; i++) {
    shortUrl += randomSelector(collection)
  }
  return shortUrl
}

module.exports = generateShortUrl