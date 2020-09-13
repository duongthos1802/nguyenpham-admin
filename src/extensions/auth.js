import cookie from 'js-cookie'

const EXPIRES_DAY_COOKIES = 1

export const setCookieLoginStatus = status => {
  cookie.set('login', status, {expires: EXPIRES_DAY_COOKIES})
}

export const removeCookie = () => {
  cookie.remove('auth')
  cookie.remove('user')
  setCookieLoginStatus(false)
}

export const getCookie = (name) => {
  return name ? cookie.get(name) : null
}

export const setCookieUser = user => {
  cookie.set('user', user, {expires: EXPIRES_DAY_COOKIES})
}

export const setCookieAuth = auth => {
  cookie.set('auth', auth, {expires: EXPIRES_DAY_COOKIES})
}

export const setCookieToken = auth => {
  cookie.set('token', auth, { expires: EXPIRES_DAY_COOKIES })
}