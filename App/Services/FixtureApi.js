import { from } from 'rxjs'

export default {
  // Functions return fixtures
  setHeaders: (token) => {},
  login: (params) => from(Promise.resolve({
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
  }))
}
