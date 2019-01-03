import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types';
import { Image, Text, View } from 'react-native'
import styles from './Styles/CustomDrawerStyle'
import GradientWrapper from './GradientWrapper'
import { Body, Container, Content, Header, ListItem } from 'native-base'

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

  render () {
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
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  dayStarted: state.store.dayStarted,
  name: state.login.payload && state.login.payload.user.firstname + ' ' + state.login.payload.user.lastname,
  email: state.login.payload && state.login.payload.user.email
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer)
