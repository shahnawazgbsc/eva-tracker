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

  const googleApi = apisauce.create({
    baseURL: 'https://maps.googleapis.com/maps/api/directions/',
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    },
    // 20 second timeout...
    timeout: 20000
  })

  api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    },
    // 20 second timeout...
    timeout: 20000
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
  const login = (params) => from(api.post('etracker/api/auth/login', params))
  const storesByUserId = (id) => from(api.get(`etracker/api/store/getalluserstores/${id}`))
  const subsectionsByUser = (id) => from(api.get(`etracker/api/territory/GetSubsectionsByUser/${id}`))

  const uploadImage = (path, name, id) => {
    const form = new FormData()
    form.append('file', {
      name: name,
      uri: path,
      type: 'image/jpeg'
    })
    const headers = {
      ...api.headers,
      'Content-Type': 'multipart/form-data'
    }
    return from(api.post(`etracker/api/store/uploadfiles/${id}`, form, { headers }))
  }

  const direction = (current, location) => from(googleApi.get(`json?origin=${current.latitude},${current.longitude}&destination=${location.latitude},${location.longitude}&key=${AppConfig.GOOGLE_API}`))

  const getBrands = (id) => from(api.get(`inventory/api/setup/GetBrandsWithInventoryItems/${id}`))
  const addItems = (data) => from(api.post('etracker/api/storevisit/addmultipleorders', data))
  const addInventories = (data) => from(api.post('etracker/api/storevisit/addmultipleinventorytakings', data))
  const checkIn = (data) => from(api.post('etracker/api/StoreVisit/AddStoreVisit', data))
  const checkOut = (data) => from(api.post('etracker/api/storevisit/updatestorevisit', data))
  const createStore = (data) => from(api.post('etracker/api/store/createstore', data))

  const dayStart = (data) => from(api.post('etracker/api/pjp/AddPJP', data))
  const dayEnd = (data) => from(api.put('etracker/api/pjp/UpdatePjp', data))

  const setHeaders = (token) => api.setHeader('api_key', token)
  const salesIndents = (data) => from(api.post('inventory/api/sales/GenerateSalesIndents', data))
  const history = (storeId) => from(api.get(`etracker/api/storevisit/GetLastTwoVisits/${storeId}`))

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
    direction,
    checkIn,
    checkOut,
    getBrands,
    addItems,
    addInventories,
    storesByUserId,
    subsectionsByUser,
    uploadImage,
    createStore,
    setHeaders,
    dayStart,
    dayEnd,
    history,
    salesIndents
  }
}

// let's return back our create method as the default.
export default {
  create,
  api: () => api
}
