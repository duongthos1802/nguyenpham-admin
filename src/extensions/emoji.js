const emojiParser = (content) => {
  if (content) {
    return content.replace(/\\u(\w\w\w\w)/g, function (a, b) {
      let codePoint = parseInt(b, 16)
      return String.fromCodePoint(codePoint)
    })
  }
  return ''
}

export default {
  emojiParser
}
