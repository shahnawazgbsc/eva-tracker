import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import apis from '../Services/Api'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  login: require('./LoginRedux').reducer,
  store: require('./StoresRedux').reducer
})

export default () => {
  let { store, persistor } = configureStore(reducers, apis.create())
  const api = apis.api()

  return { store, api, persistor }
}
