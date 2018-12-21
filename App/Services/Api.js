// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { from } from 'rxjs'
import AppConfig from '../Config/AppConfig'

let api
// our "constructor"
const create = (baseURL = AppConfig.baseUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const login = (params) => from(api.post('api/auth/login', params))
  const storesByUserId = (id) => from(api.get(`api/store/getalluserstores/${id}`))
  const subsectionsByUser = (id) => from(api.get(`api/territory/GetSubsectionsByUser/${id}`))
  const uploadImage = (path, id) => {
    const form = new FormData()
    form.append('file', {
      name: 'uploadImage',
      uri: path,
      type: 'image/jpeg'
    })
    const headers = {
      ...api.headers,
      'Content-Type': 'multipart/form-data'
    }
    return from(api.post(`api/store/uploadfiles/${id}`, form, { headers }))
  }
  const createStore = (data) => from(api.post('api/store/createstore', data))
  const setHeaders = (token) => api.setHeader('api_key', token)

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    login,
    storesByUserId,
    subsectionsByUser,
    uploadImage,
    createStore,
    setHeaders
  }
}

// let's return back our create method as the default.
export default {
  create,
  api: () => api
}
