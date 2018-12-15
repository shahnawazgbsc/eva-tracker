import MainScreen from '../Containers/LaunchScreen'
import { createAppContainer, createDrawerNavigator } from 'react-navigation'
import StoreRegistrationScreen from '../Containers/StoreRegistrationScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createDrawerNavigator({
  Home: { screen: MainScreen },
  StoreRegistrationScreen: { screen: StoreRegistrationScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
