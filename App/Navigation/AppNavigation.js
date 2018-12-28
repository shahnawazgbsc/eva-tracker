import MainScreen from '../Containers/MainScreen/MainScreen'
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation'
import ReasonScreen from '../Containers/ReasonScreen'
import AddItemScreen from '../Containers/AddItemScreen'
import MarketList from '../Containers/MarketList'
import DaySelection from '../Containers/DaySelection'
import StoreRegistrationScreen from '../Containers/StoreRegistrationScreen'
import React from 'react'
import { connect } from 'react-redux'
import styles from './Styles/NavigationStyles'
import ShopProfile from '../Containers/Market/ShopProfile'
import OrderScreen from '../Containers/OrderScreen'
import InventoryTaking from '../Containers/InventoryTakingScreen/InventoryTaking'
import { Body, Container, Content, Header, ListItem, Text } from 'native-base'
import { Image, View } from 'react-native'
import GradientWrapper from '../Components/GradientWrapper'

const storeRegistration = createStackNavigator({
  StoreMain: { screen: StoreRegistrationScreen },
  DaySelection: { screen: DaySelection },
  'Main': { screen: MainScreen },

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
  'Inventory': { screen: InventoryTaking },
  'AddNewItem': { screen: AddItemScreen }
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
const CoustomDrawer = (props) => (

  <Container>
    <GradientWrapper>
      <Header style={styles.drawerHeader}>
        <Body>
        <View style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignSelf: 'center',

        }}>
          <Image style={styles.drawerImage} source={require('../Images/logo.png')}/>
          <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>{props.name}</Text>
          <Text style={{ textAlign: 'center', fontSize: 12, color: 'white' }}>{props.email}</Text>
        </View>
        </Body>
      </Header>
    </GradientWrapper>
    <Content>
      {props.dayStarted &&
      <ListItem button onPress={() => props.navigation.navigate('Store Registration')}>
        <Text>Store Registration</Text>
      </ListItem>
      }

    </Content>
  </Container>

)

const mapDrawerStateToProps = (state) => ({
  dayStarted: state.store.dayStarted,
  name: state.login.payload && state.login.payload.user.firstname + ' ' + state.login.payload.user.lastname,
  email: state.login.payload && state.login.payload.user.email
})

// Manifest of possible screens
const PrimaryNav = createDrawerNavigator({
  'Home': {
    screen: homeNav
  },
  'Store Registration': { screen: storeRegistration },
  logout: { screen: 'Logout' }
}, {
  initialRouteName: 'Home',
  drawerPosition: 'left',
  contentComponent: connect(mapDrawerStateToProps, null)(CoustomDrawer),
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
