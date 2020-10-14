import axios from 'axios'

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ||
  'http://localhost:4000'

export const API_UPLOAD_URL = `${API_BASE_URL}/uploads`

export default {
  async uploadSingleFile(fileUpload, fileType, createdBy) {

    let operations = {
      query: `
      uploadFile (file: $file, fileType: ${fileType}, createdBy: "${createdBy}") {
        id
        mimeType
        fileExtension
        encoding
        contentType
        originalUrl
        cdnUrl
        uri
        isDeleted
        createdAt
        createdBy
      }
      `,
      variables: {
        file: null
      }
    }

    const map = {
      0: ['variables.file']
    }

    // form data
    let formData = new FormData()
    formData.append('operations', JSON.stringify(operations))
    formData.append('map', JSON.stringify(map))
    formData.append(0, fileUpload)

    // upload
    return await axios
      .post(API_BASE_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers': 'Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Allow-Headers',
        }
      })
      .then((res) => {
        console.log(res)
        return Promise.resolve(res.data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },

  async uploadFile(file, type) {
    // form data
    let formData = new FormData()
    formData.append('file', file)
    // upload
    return await axios
      .post(API_UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers': 'Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Allow-Headers',
          UploadType: type
        }
      })
      .then((res) => {
        return Promise.resolve(res.data)
      })
      .catch((error) => {
        console.log('errorerror...', error)
        return Promise.reject(error)
      })
  }
}