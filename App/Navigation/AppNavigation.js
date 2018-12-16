import MainScreen from '../Containers/LaunchScreen'
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation'
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

// Manifest of possible screens
const PrimaryNav = createDrawerNavigator({
  Home: { screen: MainScreen },
  StoreRegistrationScreen: { screen: storeRegistration }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
