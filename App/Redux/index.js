import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import apis from '../Services/Api'
import DebugConfig from '../Config/DebugConfig'
import FixtureApi from '../Services/FixtureApi'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  login: require('./LoginRedux').reducer,
  store: require('./StoresRedux').reducer,
  createStore: require('./CreateStoreRedux').reducer
})

export default () => {
  const api = DebugConfig.useFixtures ? FixtureApi : apis.create()
  let { store, persistor } = configureStore(reducers, api)
  const apiRef = apis.api()

  return { store, apiRef, persistor }
}
