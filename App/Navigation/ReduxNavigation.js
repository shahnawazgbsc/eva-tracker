import React from 'react'
import { BackHandler, Platform } from 'react-native'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
import LoginNavigation from './LoginNavigation'

class ReduxNavigation extends React.Component {
  componentWillMount () {
    if (Platform.OS === 'ios') return
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { dispatch, nav } = this.props
      // change to whatever is your first screen, otherwise unpredictable results may occur
      if (nav.routes.length === 1 && (nav.routes[0].routeName === 'LoginScreen')) {
        return false
      }
      // if (shouldCloseApp(nav)) return false
      dispatch({ type: 'Navigation/BACK' })
      return true
    })
  }

  componentWillUnmount () {
    if (Platform.OS === 'ios') return
    BackHandler.removeEventListener('hardwareBackPress')
  }

  render () {
    if (this.props.login && this.props.login.payload) {
      return <AppNavigation />
    } else {
      return <LoginNavigation />
    }
  }
}

const mapStateToProps = state => ({ nav: state.nav, login: state.login })
export default connect(mapStateToProps)(ReduxNavigation)
