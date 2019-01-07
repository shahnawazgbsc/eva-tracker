const converter = require('number-to-words')
export default function (num) {
  return converter.toWords(num)
}
