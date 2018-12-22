import MainScreen from '../Containers/MainScreen/MainScreen'
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation'
import OrderTaking from '../Containers/OrderTaking'
import Inventory from '../Containers/Inventory'
import ShopDetail from '../Containers/ShopDetail'
import MarketList from '../Containers/MarketList'
import DaySelection from '../Containers/DaySelection'
import StoreRegistrationScreen from '../Containers/StoreRegistrationScreen'

import styles from './Styles/NavigationStyles'

const daySelection = createStackNavigator({
  Root: { screen: DaySelection }
}, {
  mode: 'modal',
  initialRouteName: 'Root',
  headerMode: 'none'
})

const storeRegistration = createStackNavigator({
  StoreMain: { screen: StoreRegistrationScreen },
  DaySelection: { screen: daySelection }
}, {
  initialRouteName: 'StoreMain',
  headerMode: 'none'
})
const MarketStack = createStackNavigator({
  'MarketMain': { screen: MarketList },
  'ShopDetail': { screen: ShopDetail }
}, {
  headerMode: 'none',
  initialRouteName: 'MarketMain',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const homeNav = createStackNavigator({
  'Main': { screen: MainScreen },
  'Market': { screen: MarketStack }
}, {
  headerMode: 'none',
  initialRouteName: 'Main',
  navigationOptions: {
    headerStyle: styles.header
  }
})

// Manifest of possible screens
const PrimaryNav = createDrawerNavigator({
  'Home': { screen: homeNav },
  'Store Registration': { screen: storeRegistration }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
