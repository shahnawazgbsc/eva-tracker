import MainScreen from '../Containers/MainScreen/MainScreen'
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation'
import InventoryScreen from '../Containers/InventoryScreen'
import ReasonScreen from '../Containers/ReasonScreen'
import AddItemScreen from '../Containers/AddItemScreen'
import MarketList from '../Containers/MarketList'
import DaySelection from '../Containers/DaySelection'
import StoreRegistrationScreen from '../Containers/StoreRegistrationScreen'
import styles from './Styles/NavigationStyles'
import ShopProfile from '../Containers/Market/ShopProfile'
import OrderScreen from '../Containers/OrderScreen'
import CustomDrawer from '../Components/CustomDrawer'
import OrderSMS from '../Containers/OrderSMS'
import ShopHistory from '../Containers/ShopHistory'

const storeRegistration = createStackNavigator({
  StoreMain: { screen: StoreRegistrationScreen },
  DaySelection: { screen: DaySelection },
  'Main': { screen: MainScreen }

}, {
  initialRouteName: 'StoreMain',
  mode: 'modal',
  headerMode: 'none'
})

const MarketStack = createStackNavigator({
  'MarketMain': { screen: MarketList },
  'ShopDetail': { screen: ShopProfile },
  'OrderTaking': { screen: OrderScreen },
  'Reason': { screen: ReasonScreen },
  'Inventory': { screen: InventoryScreen },
  'AddNewItem': { screen: AddItemScreen },
  'OrderSMS': { screen: OrderSMS },
  'ShopHistory': { screen: ShopHistory }
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
  'Home': {
    screen: homeNav
  },
  'Store Registration': { screen: storeRegistration }
}, {
  initialRouteName: 'Home',
  drawerPosition: 'left',
  contentComponent: CustomDrawer,
  drawerLockMode: 'locked-close',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'

  // Default config for all screens
  // headerMode: 'none',
  // initialRouteName: 'Home',
  // navigationOptions: {
  //   headerStyle: styles.header,
  //   drawerLockMode: 'locked-close'
  // }
})

export default createAppContainer(PrimaryNav)
