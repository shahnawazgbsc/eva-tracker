import React from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { Button, Title, Right, Body, Left, Icon, Container, Footer, Text, Header } from 'native-base'
import MapView from 'react-native-maps'
import { Colors, Images } from '../../Themes'
import StoresRedux from '../../Redux/StoresRedux'
import GpsLocationRedux from '../../Redux/GpsLocationRedux'
import GradientWrapper from '../../Components/GradientWrapper'
import styles from './MainScreenStyle'
import LoginRedux from '../../Redux/LoginRedux'

import firebase from '../../firebaseconfig';


class MainScreen extends React.Component {
  constructor (props) {
    super(props)
    this.ref = firebase.firestore().collection('tbl_users');
    this.state = {}
  }

  componentDidMount () {
    this.props.request()
  }
  componentWillUpdate(){
    this.senddatatofirebase
  }



  menu = () => {
    if (this.props.dayStarted) {
      this.props.navigation.openDrawer()
    }
  }
  senddatatofirebase = () => {
    console.warn('sending data1')
    firebase.firestore().collection('tbl_users').doc('222').collection('user_history').add({
      lang: this.props.longitude,
      latitude:this.props.latitude,
      timestamp:new Date()

    }).then((docRef) => {
      console.warn('done1 ')
    })
      .catch((error) => {
        console.warn("Error adding document: ", error);

      });
    console.warn('req end now')
  }
  render () {
    return (
      <Container>
        <GradientWrapper>
          <Header style={styles.header}>
            <Left>
              <Button transparent light onPress={this.menu}>
                <Icon
                  name={'menu'}
                />
              </Button>
            </Left>
            <Body>
            <Text style={styles.titleText}>Eva Tracker App</Text>
            </Body>
            <Right>
              <Button transparent light onPress={this.props.logout}>
                <Icon name={'log-out'}/>
              </Button>
            </Right>
          </Header>
        </GradientWrapper>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: parseFloat(this.props.latitude) || 0,
            longitude: parseFloat(this.props.longitude) || 0,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
          }}
          followsUserLocation
        >
          {
            this.props.latitude &&
            <MapView.Marker
              coordinate={{
                latitude: parseFloat(this.props.latitude),
                longitude: parseFloat(this.props.longitude)
              }}
              image={Images.marker}
            />
          }
          {this.props.waypoint &&
          <MapView.Polyline
            coordinates={this.props.waypoint}
            strokeWidth={4}
            strokeColor={Colors.coal}
          />
          }
          {
            this.props.stores &&
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
                          onPress: () => this.props.directions({ latitude: value.latitude, longitude: value.longitude })
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
        <Footer style={{ alignItems: 'center', justifyContent: 'space-around', backgroundColor: Colors.background }}>
          <Button success disabled={this.props.dayStarted} onPress={this.props.dayStart}>
            <Text>Day Start</Text>
          </Button>
          <Button success disabled={!this.props.dayStarted} onPress={() => {
            this.props.navigation.navigate('Market')
          }}>
            <Text>Market</Text>
          </Button>
          <Button success disabled={!this.props.dayStarted} onPress={this.props.dayEnd}>
            <Text>End Day</Text>
          </Button>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  dayStarted: state.store.dayStarted,
  stores: state.store && state.store.payload,
  waypoint: state.gps && state.gps.waypoint,
  latitude: state.gps && state.gps.data && state.gps.data.latitude,
  longitude: state.gps && state.gps.data && state.gps.data.longitude
})

const mapDispatchToProps = dispatch => ({
  directions: (location) => dispatch(GpsLocationRedux.gpsDirection(location)),
  dayStart: () => dispatch(StoresRedux.dayStartRequest()),
  dayEnd: () => dispatch(StoresRedux.dayEndRequest()),
  request: () => dispatch(StoresRedux.storesRequest()),
  logout: () => dispatch(LoginRedux.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
