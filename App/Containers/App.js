import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Root } from 'native-base'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import LoaderScreen from './LoaderScreen'

// create our store
const { store, api, persistor } = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  componentDidMount (): void {
    // persistor.purge()
  }

  componentWillUnmount (): void {
    // persistor.flush()
  }

  render () {
    return (
      <Provider store={store}>
        <PersistGate loading={<LoaderScreen />} persistor={persistor}>
          <Root>
            <RootContainer api={api} />
            <LoaderScreen />
          </Root>
        </PersistGate>
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
