import axios from 'axios'
import {getCookie} from '../../extensions/auth'

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const token = getCookie('token') 

const axiosProvider = axios.create({
  // baseURL: API_PROXY_URL,
  baseURL: API_BASE_URL,
  // withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Credentials": true,
    'Access-Control-Allow-Headers': 'Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Allow-Headers',
    Authorization: {
      toString () {
        return `Bearer ${token}`
      }
    }
  },
  // timeout: 30000
  timeout: 99999
})
export default axiosProvider
