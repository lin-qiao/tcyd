import { getToken } from '../service/getData'

function checkToken(data) {
  if (data.submitToken) {
    //参数需要token
    data.submitToken = sessionStorage.token
    sessionStorage.removeItem('token')
  }
  return data
}

function setSessionStorageToken() {
  if (!sessionStorage.token) {
    getToken().then(res => {
      if (res.data) {
        sessionStorage.token = res.data.token
      }
    })
  }
}

export { checkToken, setSessionStorageToken }
