import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoaderScreenStyle'
import { Colors } from '../Themes'

class LoaderScreen extends Component {
  render () {
    if (this.props.isLoading) {
      return (
        <View style={[styles.backgroundImage, styles.loader]}>
          <ActivityIndicator
            color={Colors.success}
            size={'large'}
          />
        </View>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.login.fetching || state.createStore.fetching || state.store.fetching || state.gps.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoaderScreen)
