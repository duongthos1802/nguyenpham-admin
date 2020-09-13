export default {
  isUser: {

  },
  getUsername(author) {
    return author
      ? author.username
      : null
  }
}