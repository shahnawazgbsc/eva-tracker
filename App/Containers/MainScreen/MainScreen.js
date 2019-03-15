import React from 'react'
import { Alert } from 'react-native'
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

class MainScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.request()
    this.props.inventorySKUs()
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
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
