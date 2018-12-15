import { createStackNavigator, createAppContainer } from 'react-navigation'

import styles from './Styles/NavigationStyles'
import Login from '../Containers/Login'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LoginScreen: { screen: Login }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
