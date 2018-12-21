import { applyMiddleware, compose, createStore } from 'redux'
import Config from '../Config/DebugConfig'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { createEpicMiddleware } from 'redux-observable'
import rootEpics from '../Epics'

// creates the store
export default (rootReducer, api) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Navigation Middleware ------------ */
  const navigationMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
  )
  middleware.push(navigationMiddleware)

  /* ------------- Analytics Middleware ------------- */

  /* ------------- Saga Middleware ------------- */

  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      api
    }
  })
  middleware.push(epicMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore
  const store = createAppropriateStore(persistReducer(
    { key: 'root', storage: storage }, rootReducer
    ),
    compose(...enhancers)
  )
  const persistor = persistStore(store)

  // kick off root saga
  epicMiddleware.run(rootEpics)

  return {
    store, persistor
  }
}
