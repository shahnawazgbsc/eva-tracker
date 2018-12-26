import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/Containers/App'
import './App/Lib/Firebase'
// symbol polyfills
global.Symbol = require('core-js/es6/symbol')
require('core-js/fn/symbol/iterator')

// collection fn polyfills
require('core-js/fn/map')
require('core-js/fn/set')
require('core-js/fn/array/find')
AppRegistry.registerComponent('EvaTracker', () => App)
