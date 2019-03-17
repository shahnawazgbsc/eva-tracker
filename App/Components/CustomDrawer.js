import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types';
import { Image, Text, View, Alert } from 'react-native'
import styles from './Styles/CustomDrawerStyle'
import GradientWrapper from './GradientWrapper'
import { Body, Container, Content, Header, ListItem } from 'native-base'
import OfflineActions from '../Redux/OfflineRedux'
import * as R from 'ramda'

class CustomDrawer extends PureComponent {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  syncCheckIns = () => {
    if (this.props.offlineShops > 0) {
      Alert.alert('Sync Stores', 'Please sync shops first.')
    } else if (this.props.checkIns === 0) {
      Alert.alert('Sync Store Visits', 'All visits are up to date.')
    } else {
      this.props.syncCheckIns()
    }
  }

  syncStores = () => {
    if (this.props.offlineShops > 0) {
      this.props.syncStores()
    } else {
      Alert.alert('Sync Stores', 'All stores are up to date')
    }
  }

  render () {
    console.log(this.props.offlineShops)
    return (
      <Container style={{ flex: 3 }}>
        <GradientWrapper>
          <Header style={styles.drawerHeader}>
            <Body>
            <View style={{
              justifyContent: 'center',
              alignSelf: 'center'
            }}>
              <Image style={styles.drawerImage} source={require('../Images/logo.png')}/>
              <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>{this.props.name}</Text>
              <Text style={{ textAlign: 'center', fontSize: 12, color: 'white' }}>{this.props.email}</Text>
            </View>
            </Body>
          </Header>
        </GradientWrapper>
        <Content style={{ flex: 2 }}>
          <ListItem button onPress={() => {
            this.props.navigation.navigate('Home')
            this.props.navigation.toggleDrawer()
          }}>
            <Text>Home</Text>
          </ListItem>
          {this.props.dayStarted &&
          <ListItem button onPress={() => this.props.navigation.navigate('Store Registration')}>
            <Text>Store Registration</Text>
          </ListItem>
          }
          <ListItem button onPress={this.syncStores}>
            <Text>Sync Stores {this.props.offlineShops > 0 ? `(${this.props.offlineShops})` : ''}</Text>
          </ListItem>

          <ListItem button onPress={this.syncCheckIns}>
            <Text>Sync Store Visits {this.props.checkIns > 0 ? `(${this.props.checkIns})` : ''}</Text>
          </ListItem>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  dayStarted: state.store.dayStarted,
  name: state.login.payload && state.login.payload.user.firstname + ' ' + state.login.payload.user.lastname,
  email: state.login.payload && state.login.payload.user.email,
  offlineShops: state.offline && R.length(R.concat(state.offline.pjpShops, state.offline.otherShops)),
  checkIns: state.offline && R.length(state.offline.checkIns)
})

const mapDispatchToProps = (dispatch) => ({
  syncStores: () => dispatch(OfflineActions.syncStores()),
  syncCheckIns: () => dispatch(OfflineActions.syncCheckIns())
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer)
