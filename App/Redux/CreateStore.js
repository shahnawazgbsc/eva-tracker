import { applyMiddleware, compose, createStore } from 'redux'
import Config from '../Config/DebugConfig'
import { persistReducer, persistStore } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { AsyncStorage } from 'react-native'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { createEpicMiddleware } from 'redux-observable'
import rootEpics from '../Epics'
import firebase from '../Lib/Firebase'
import { createLogger } from 'redux-logger'

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
  const reduxLogger = applyMiddleware(createLogger())

  /* ------------- Saga Middleware ------------- */

  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      api,
      firebase
    }
  })
  middleware.push(epicMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: hardSet // see "Merge Process" section for details.
  }

  const pReducer = persistReducer(persistConfig, rootReducer)

  let store
  if (Config.useReactotron) {
    store = createAppropriateStore(pReducer, compose(...enhancers))
  } else {
    store = createAppropriateStore(pReducer, compose(...enhancers, reduxLogger))
  }

  const persistor = persistStore(store)

  // kick off root saga
  epicMiddleware.run(rootEpics)

  return {
    store,
    persistor
  }
}
