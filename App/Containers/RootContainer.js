import React, { Component } from 'react'
import { View, StatusBar, Platform, PermissionsAndroid } from 'react-native'
import { Root, StyleProvider, Text } from 'native-base'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
// import PlayServiceLocation from 'react-native-android-play-services-location'
import StartupActions from '../Redux/StartupRedux'
import getTheme from '../../native-base-theme/components'
import platform from '../../native-base-theme/variables/platform'

// Styles
import styles from './Styles/RootContainerStyles'
import GpsLocation from '../Redux/GpsLocationRedux'

class RootContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      error: null
    }
  }

  async requestLocationPermission () {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Eva Tracker Location Permission',
          'message': 'Eva Tracker needs access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.startWatch()
      } else {
        this.setState({
          error: { message: 'Location permission denied' }
        })
        console.log('Location permission denied')
      }
    } catch (err) {
      console.warn(err)
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
        console.log(error)
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
    )
  }

  async componentDidMount () {
    this.props.startup()

    if (Platform.OS === 'android') {
      await this.requestLocationPermission()
    } else {
      this.startWatch()
    }
  }

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchID)
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
