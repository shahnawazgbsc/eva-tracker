import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { Root, StyleProvider } from 'native-base'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import getTheme from '../../native-base-theme/components'
import platform from '../../native-base-theme/variables/platform'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    this.props.startup()
  }

  componentWillReceiveProps (nextProps, nextContext): void {
    if (nextProps.headers) { this.props.api.setHeader('api_key', nextProps.headers) }
  }

  render () {
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

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

const mapStateToProps = (state) => ({
  headers: state.login && state.login.response && state.login.response.auth_token
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
