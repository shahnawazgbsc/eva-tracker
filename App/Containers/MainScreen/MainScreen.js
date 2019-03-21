import React from 'react'
import { Alert, Linking } from 'react-native'
import { connect } from 'react-redux'
import { Body, Button, ActionSheet, Container, Footer, Header, Icon, Left, Right, Text } from 'native-base'
import MapView from 'react-native-maps'
import { Colors, Images } from '../../Themes'
import StoresRedux from '../../Redux/StoresRedux'
import InventoryRedux from '../../Redux/InventoryTakingRedux'
import GpsLocationRedux from '../../Redux/GpsLocationRedux'
import GradientWrapper from '../../Components/GradientWrapper'
import styles from './MainScreenStyle'
import LoginRedux from '../../Redux/LoginRedux'
import * as R from 'ramda'
import extractModuleFeatures from '../../Lib/extractModuleFeatures'
import AppConfig from '../../Config/AppConfig'
import 'firebase/firestore'
import firebase from '../../Lib/Firebase'
import ShopRedux from '../../Redux/ShopRedux'

var package1 = require('../../../package.json')

class MainScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}

    firebase.firestore()
      .collection('release')
      .doc('update-release')
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (doc.data().version != package1.version) {

            Alert.alert(
              'New version available',
              'Please, update app to new version',
              [
                {
                  text: 'NO, THANKS',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'UPDATE', onPress: () =>
                    Linking.openURL(
                      `https://play.google.com/store/apps/details?id=com.tracking.store`
                    )
                },
              ],
              { cancelable: false },
            )

          }
        }
      })

  }

  async checkPermission () {
    const enabled = await firebase.messaging().hasPermission()
    if (enabled) {
      this.getToken()
      // console.log(this.getToken());
    } else {
      this.requestPermission()
    }
  }

  async getToken () {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken()
      if (fcmToken) {
        // user has a device token
        // console.log(fcmToken);

        this.showAlert(fcmToken, fcmToken)
        //  await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async createNotificationListeners () {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification
      this.showAlert(title, body)
    })

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification
      this.showAlert(title, body)
    })

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification()
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification
      this.showAlert(title, body)
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message))
    })
  }

  showAlert (title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    )
  }

  async requestPermission () {
    try {
      await firebase.messaging().requestPermission()
      // User has authorised
      this.getToken()
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected')
    }
  }

  componentDidMount () {
    this.props.request()
    this.props.inventorySKUs()
    this.props.getReasons()
    this.checkPermission()
    this.createNotificationListeners()

  }

  componentWillUnmount () {
    this.notificationListener()
    this.notificationOpenedListener()
  }

  menu = () => {
    if (this.props.dayStarted) {
      this.props.navigation.openDrawer()
    }
  }

  render () {
    return (
      <Container>
        <GradientWrapper>
          <Header style={styles.header}>
            <Left style={{ flex: 1 }}>
              <Button transparent light onPress={this.menu}>
                <Icon
                  name={'menu'}
                />
              </Button>
            </Left>
            <Body style={{ flex: 2 }}>
            <Text style={styles.titleText}>Eva Tracker App</Text>
            </Body>
            <Right style={{ flex: 1 }}>
              {
                AppConfig.env === 'DEV' &&
                <Button transparent light onPress={() => {
                  this.props.reset()
                  this.props.logout()
                }}>
                  <Icon name={'close'}
                  />
                </Button>
              }
              <Button transparent light onPress={this.props.logout}>
                <Icon name={'log-out'}
                />
              </Button>
            </Right>
          </Header>
        </GradientWrapper>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: parseFloat(this.props.latitude),
            longitude: parseFloat(this.props.longitude),
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
          }}
          followsUserLocation
        >
          <MapView.Marker
            coordinate={{
              latitude: parseFloat(this.props.latitude),
              longitude: parseFloat(this.props.longitude)
            }}
            image={Images.marker}
          />
          {!!this.props.waypoint &&
          <MapView.Polyline
            coordinates={this.props.waypoint}
            strokeWidth={4}
            strokeColor={Colors.coal}
          />
          }
          {
            !!this.props.stores &&
            this.props.stores.filter(value => value.latitude !== null).map(value => (
              <MapView.Marker
                coordinate={{
                  latitude: parseFloat(value.latitude),
                  longitude: parseFloat(value.longitude)
                }}
                onPress={() => {
                  if (this.props.dayStarted) {
                    Alert.alert(
                      'Select option',
                      `Please select an action on ${value.shopName}`,
                      [
                        { text: 'Cancel', style: 'cancel' },
                        {
                          text: 'Details',
                          onPress: () => this.props.navigation.navigate('ShopDetail', { item: value })
                        },
                        {
                          text: 'Directions',
                          onPress: () => this.props.directions({
                            latitude: value.latitude,
                            longitude: value.longitude
                          })
                        }
                      ]
                    )
                  }
                }}
                image={Images.pin}
              />
            ))
          }
        </MapView>
        <Footer style={{
          paddingTop: 3,
          alignItems: 'center',
          justifyContent: 'space-around',
          borderTopWidth: 3,
          borderTopColor: Colors.success,
          backgroundColor: Colors.background
        }}>
          <Button success disabled={this.props.dayStarted} onPress={() => {
            if (this.props.subSection && this.props.subSection.length > 0) {
              ActionSheet.show(
                {
                  options: R.concat(R.map(R.prop('name'))(this.props.subSection), ['Cancel']),
                  cancelButtonIndex: this.props.subSection.length,
                  title: 'Select Subsection'
                },
                buttonIndex => {
                  console.log(buttonIndex)
                  if (buttonIndex < this.props.subSection.length) {
                    this.props.dayStart(this.props.subSection[buttonIndex].subsectionId, this.props.userid)
                  }
                }
              )
            } else {
              // No subsection Logic
              Alert.alert(null, 'No subsection assigned to this user.')
            }
          }
          }>
            <Text>Day Start</Text>
          </Button>
          <Button success disabled={!(this.props.dayStarted && this.props.isMarketAvailable)} onPress={() => {
            this.props.navigation.navigate('Market')
          }}>
            <Text>Market</Text>
          </Button>
          <Button success disabled={!this.props.dayStarted} onPress={() => {
            this.props.dayEnd('')
          }}>
            <Text>End Day</Text>
          </Button>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  userid: R.path(['login', 'payload', 'user', 'userid'], state),
  isMarketAvailable: R.contains('Market', extractModuleFeatures(state)),
  dayStarted: state.store.dayStarted[state.login.payload.user.userid],
  stores: state.store && state.store.payload,
  subSection: state.createStore && state.createStore.subSection,
  waypoint: state.gps && state.gps.waypoint,
  latitude: state.gps && state.gps.data && state.gps.data.latitude,
  longitude: state.gps && state.gps.data && state.gps.data.longitude
})

const mapDispatchToProps = dispatch => ({
  directions: (location) => dispatch(GpsLocationRedux.gpsDirection(location)),
  dayStart: (subsection, userid) => dispatch(StoresRedux.dayStartRequest(subsection, userid)),
  dayEnd: (note) => dispatch(StoresRedux.dayEndRequest(note)),
  request: () => dispatch(StoresRedux.storesRequest()),
  logout: () => dispatch(LoginRedux.logout()),
  reset: () => dispatch(StoresRedux.reset()),
  inventorySKUs: () => dispatch(InventoryRedux.inventory_sku_request()),
  getReasons: () => dispatch(ShopRedux.nonProductiveReasons())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
