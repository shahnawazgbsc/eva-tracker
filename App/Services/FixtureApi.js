import { from } from 'rxjs'

export default {
  // Functions return fixtures
  setHeaders: (token) => {},
  login: (param) => from(Promise.resolve({
    ok: true,
    data: require('../Fixtures/login.json')
  })),
  storesByUserId: (id) => from(Promise.resolve({
    ok: true,
    data: require('../Fixtures/store.json')
  })),
  subsectionsByUser: (id) => from(Promise.resolve({
    ok: true,
    data: require('../Fixtures/subscription.json')
  })),
  direction: (current, location) => from(Promise.resolve({
    ok: true,
    data: require('../Fixtures/subscription.json')
  })),
  checkIn: (data) => from(Promise.resolve({
    ok: true,
    data: { storeVisitId: 1 }
  })),
  checkOut: (data) => from(Promise.resolve({
    ok: true,
    data: { storeVisitId: 1 }
  })),
  getBrands: (id) => from(Promise.resolve({
    ok: true,
    data: require('../Fixtures/subscription.json')
  })),
  addItems: (data) => from(Promise.resolve({
    ok: true,
    data: { response: 'All Orders Successfully Added' }
  })),
  addInventories: (data) => from(Promise.resolve({
    ok: true,
    data: { response: 'All Orders Successfully Added' }
  })),
  uploadImage: (path, name, id) => from(Promise.resolve({
    ok: true,
    data: { filepath: 'Images' }
  })),
  createStore: (data) => from(Promise.resolve({
    ok: true,
    data: { id: 117 }
  }))
}
