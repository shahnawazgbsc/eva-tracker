import React, { Component } from 'react'
import { Image, ImageBackground, View, Alert } from 'react-native'
import { Button, Form, Icon, Input, Item, Text } from 'native-base'
import { scale } from '../Components/moderatescale'
import styles from './Styles/LoginScreenStyles'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'

class Login extends Component {

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  render () {
    return (
      <ImageBackground source={Images.loginbg} style={styles.ImageBackground}>
        <View style={styles.container}>
          <Image
            source={require('../Images/logo.png')}
            style={{ height: scale(100), width: scale(160), alignSelf: 'center', marginBottom: 10 }}
          />
          <View style={styles.mainstyle}>
            <Form>
              <Item rounded style={{ backgroundColor: '#c0b46a' }}>
                <Icon
                  name={'at'}
                  type={'FontAwesome'}
                />
                <Input
                  onChangeText={this.onEmailChange}
                  keyboardType={'email-address'}
                  placeholder='Username'
                />
              </Item>
              <Item rounded style={{ marginTop: 10, backgroundColor: '#c0b46a' }}>
                <Icon
                  name={'key'}
                  type={'FontAwesome'}
                />
                <Input
                  onChangeText={this.onPasswordChange}
                  placeholder='Password'
                  secureTextEntry
                />
              </Item>
            </Form>
            <Button rounded info success style={styles.ButtonStyle} onPress={this.onSubmit}>
              <Text>Login</Text>
            </Button>
          </View>
          <Text style={styles.forgetText}>Forget Password ?</Text>
        </View>
      </ImageBackground>
    )
  }

  onEmailChange = (text) => {
    this.setState({
      username: text
    })
  }
  onPasswordChange = (text) => {
    this.setState({
      password: text
    })
  }

  onSubmit = () => {
    if (this.state.username.length === 0 || this.state.password.length === 0) {
      Alert.alert('Error', 'Please provide valid user name and password.')
    } else {
      let params = { username: this.state.username, password: this.state.password }
      this.props.login(params)
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  // params = {username, password}
  login: (params) => dispatch(LoginActions.loginRequest(params))
})

export default connect(null, mapDispatchToProps)(Login)
