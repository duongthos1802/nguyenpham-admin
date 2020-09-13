import axios from 'axios'
import ActionTypes from './types'
import { loadSuccess } from './commonAction'

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ||
  'http://localhost:4000'

const uploadActions = {

  uploadSingleFile(fileUpload, fileType, createdBy = '') {
    console.log('upload single actions....')
    return async(dispatch) => {
      try {
        let operations = {
          query: `
            mutation ($file: Upload!) {
              uploadFile (file: $file, fileType: ${fileType}, createdBy: "${createdBy}") {
                id
                mimeType
                fileExtension
                encoding
                contentType
                originalUrl
                cdnUrl
                uri
              }
            }
          `,
          variables: {
            file: null
          }
        }

        const map = {
          0: ['variables.file']
        }

        // const fileUpload = document.getElementById('fileUpload')

        // form data
        let formData = new FormData()
        formData.append('operations', JSON.stringify(operations))
        formData.append('map', JSON.stringify(map))
        formData.append(0, fileUpload)

        console.log('formData', formData)
        // upload
        await axios.post(API_BASE_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
          }
        }).then((res) => {
          console.log('res', res)
          dispatch(
            loadSuccess({
                actionType: ActionTypes.UPLOAD_FILE_SUCCESS,
                data: res.data.data.uploadFile
              }
            )
          )
        }).catch((error) => {
          console.log('err', error)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default uploadActions