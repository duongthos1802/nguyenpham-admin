export default {
  uploadFile () {
    return `
      mutation($file: Upload!) {
        uploadFile(file: $file) {
          id
          path
          filename
          mimetype
          encoding
          createdAt
          updatedAt
        }
      }
    `
  }
}