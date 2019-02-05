import React, { Component } from 'react'
import { View, StatusBar, Platform, PermissionsAndroid, AppState } from 'react-native'
import { Root, StyleProvider, Text } from 'native-base'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
// import PlayServiceLocation from 'react-native-android-play-services-location'
import StartupActions from '../Redux/StartupRedux'
import getTheme from '../../native-base-theme/components'
import platform from '../../native-base-theme/variables/platform'
import LocationModule from '../NativeModules/LocationModule'

// Styles
import styles from './Styles/RootContainerStyles'
import GpsLocation from '../Redux/GpsLocationRedux'

class RootContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      error: null,
      appState: AppState.currentState
    }
  }
  async requestLocationPermission () {
    try {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
      .then(is_granted => is_granted === PermissionsAndroid.RESULTS.GRANTED
        ? is_granted
        : PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ])
      )
      .then(_ => PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION))
      .then(is_granted => is_granted === PermissionsAndroid.RESULTS.GRANTED ? true : new Error())
      .then(_ => setTimeout(() => LocationModule.startService().then(()=>{
        LocationModule.getLocation().then((location)=>{
          this.props.updateGps({ "latitude":location.latitude,"longitude": location.longitude })
          this.setState({ error: null })
        }).catch((error)=>{
            console.error(error)
        })
      }), 300))
      .catch(e => console.error(e))
    } catch (err) {
      console.error(err)
    }
  }
  startWatch () {
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords
        this.props.updateGps({ latitude, longitude })
        this.setState({ error: null })
      },
      error => {
        console.error(error)
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
    )
  }

  async componentDidMount () {
    this.props.startup()

    if (Platform.OS === 'android') {
      await this.requestLocationPermission()
      AppState.addEventListener('change', this._handleAppStateChange);
    } else {
      this.startWatch()
    }
  }
   _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this.requestLocationPermission()
    }
    this.setState({appState: nextAppState});
  };
  componentWillUnmount () {
    LocationModule.stopService();
  }

  render () {
    if (this.state.error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{this.state.error.message}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.applicationView}>
          <StatusBar barStyle='light-content'
          />
          <StyleProvider style={getTheme(platform)}>
            <Root>
              <ReduxNavigation
              />
            </Root>
          </StyleProvider>
        </View>
      )
    }
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  updateGps: (data) => dispatch(GpsLocation.gpsUpdate(data))
})

const mapStateToProps = (state) => ({
  headers: state.login && state.login.response && state.login.response.auth_token
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
