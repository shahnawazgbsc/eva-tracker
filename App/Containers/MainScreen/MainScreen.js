import React from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { Body, Button, ActionSheet, Container, Footer, Header, Icon, Left, Right, Text } from 'native-base'
import MapView from 'react-native-maps'
import { Colors, Images } from '../../Themes'
import StoresRedux from '../../Redux/StoresRedux'
import GpsLocationRedux from '../../Redux/GpsLocationRedux'
import GradientWrapper from '../../Components/GradientWrapper'
import styles from './MainScreenStyle'
import LoginRedux from '../../Redux/LoginRedux'
import * as R from 'ramda'

class MainScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.request()
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

        <Footer style={{ alignItems: 'center', justifyContent: 'space-around', backgroundColor: Colors.background }}>
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
                    this.props.dayStart(this.props.subSection[buttonIndex].subsectionId)
                  }
                }
              )
            } else {
              // No subsection Logic
            }
          }
          }>
            <Text>Day Start</Text>
          </Button>
          <Button success disabled={!this.props.dayStarted} onPress={() => {
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
  dayStarted: state.store.dayStarted,
  stores: state.store && state.store.payload,
  subSection: state.createStore && state.createStore.subSection,
  waypoint: state.gps && state.gps.waypoint,
  latitude: state.gps && state.gps.data && state.gps.data.latitude,
  longitude: state.gps && state.gps.data && state.gps.data.longitude
})

const mapDispatchToProps = dispatch => ({
  directions: (location) => dispatch(GpsLocationRedux.gpsDirection(location)),
  dayStart: (subsection) => dispatch(StoresRedux.dayStartRequest(subsection)),
  dayEnd: (note) => dispatch(StoresRedux.dayEndRequest(note)),
  request: () => dispatch(StoresRedux.storesRequest()),
  logout: () => dispatch(LoginRedux.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
