import MainScreen from '../Containers/MainScreen/MainScreen'
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation'
import ReasonScreen from '../Containers/ReasonScreen'
import AddItemScreen from '../Containers/AddItemScreen'
import MarketList from '../Containers/MarketList'
import DaySelection from '../Containers/DaySelection'
import StoreRegistrationScreen from '../Containers/StoreRegistrationScreen'
import React from 'react'

import styles from './Styles/NavigationStyles'
import ShopProfile from '../Containers/Market/ShopProfile'
import OrderScreen from '../Containers/OrderScreen'
import InventoryTaking from '../Containers/InventoryTakingScreen/InventoryTaking'
import { Container, Content, Header, Body, ListItem, Icon } from 'native-base'
import { Image, View, Text } from 'react-native'
import GradientWrapper from '../Components/GradientWrapper'

const storeRegistration = createStackNavigator({
  StoreMain: { screen: StoreRegistrationScreen },
  DaySelection: { screen: DaySelection },
  "Main": { screen: MainScreen },


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
        <Body >

          <View style={{
            display:'flex',
            flex: 1,
            justifyContent: 'center',
            alignSelf:'center',


          }}>
            <Image style={styles.drawerImage} source={require('../Images/logo.png')} />
            <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>Irfan Samro</Text>
            <Text style={{ textAlign: 'center', fontSize: 12, color: 'white' }}>irfansamro@gmail.com</Text>
          </View>
        </Body>
      </Header>
    </GradientWrapper>
    <Content>

      <DrawerItems {...props}  style={{borderBottomColor: 'red',
    borderBottomWidth: 1,boderWidth:2}} />



    </Content>
  </Container>

)

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
    contentComponent: CoustomDrawer,
    draweropenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',




    // Default config for all screens
    // headerMode: 'none',
    // initialRouteName: 'Home',
    // navigationOptions: {
    //   headerStyle: styles.header,
    //   drawerLockMode: 'locked-close'
    // }
  })




export default createAppContainer(PrimaryNav)
