import React, { Component } from 'react'
import { Text, View, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import {
  Container,
  Content,
  Body,
  Button,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Picker,
  Right
} from 'native-base'
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox'
import ImagePicker from 'react-native-image-picker'
import LinearGradient from 'react-native-linear-gradient'
// Styles
import styles from './Styles/StoreRegistrationScreenStyle'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

class StoreRegistrationScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      num: 0,
      selected: []
    }
  }

  onValueChange (value) {
    this.setState({
      selected: value
    })
  }

  selectPhotoTapped () {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    }

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        let source = { uri: response.uri }

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          ImageSource: source
        })
      }
    })
  }

  render () {
    return (
      <Container style={styles.container}>
        <LinearGradient colors={['#077940', '#00A150', '#019C4E']} style={styles.linearGradient}>

          <Header style={{ backgroundColor: ['#077940', '#00A150', '#019C4E'] }}>
            <Left>
              <Button transparent>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Text style={styles.TitleText}>Store Registration</Text>
            </Body>
            <Right>
              <Button success style={styles.HedaerButton}>
                <Text style={styles.HeaderText}>Check In</Text>
              </Button>
            </Right>
          </Header>
        </LinearGradient>
        <Content>
          <KeyboardAvoidingView
            enabled
            keyboardVerticalOffset={100}
            behavior={'position'}>
            <Form style={styles.FormCotainer}>
              <Item floatingLabel>
                <Label>Shop Name</Label>
                <Input />
              </Item>
              <View>
                <Item floatingLabel>
                  <Label>* Shopkeeper Name</Label>
                  <Input />
                </Item>

                <Item floatingLabel>
                  <Label>* Contact Number</Label>
                  <Input />
                </Item>

                <Item floatingLabel>
                  <Label>Landline</Label>
                  <Input />
                </Item>
                <Item>
                  <Picker
                    style={styles.pickerStyle}
                    mode='dropdown'
                    placeholder='Select SubSection'
                    iosIcon={<Icon name='ios-arrow-down-outline' />}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label='500 above' value='key1' />
                    <Picker.Item label='250 to 499' value='key2' />
                  </Picker>
                </Item>

                <Item floatingLabel>
                  <Label>Address</Label>
                  <Input />
                </Item>

                <Item floatingLabel>
                  <Label>Street</Label>
                  <Input />
                </Item>
                <Item floatingLabel>
                  <Label>City</Label>
                  <Input />
                </Item>

                <Item floatingLabel>
                  <Label>Landmark</Label>
                  <Input />
                </Item>
                <Item floatingLabel>
                  <Label>CNIC</Label>
                  <Input />
                </Item>
                <Item>
                  <Picker
                    mode='dropdown'
                    style={styles.pickerStyle}
                    placeholder='*Select Days'
                    iosIcon={<Icon name='ios-arrow-down-outline' />}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label='Monday' value='key1' />
                    <Picker.Item label='Tuesday' value='key2' />
                    <Picker.Item label='Wednesday' value='key3' />
                    <Picker.Item label='Thursday' value='key4' />
                    <Picker.Item label='Friday' value='key5' />
                  </Picker>
                </Item>
                <Item>
                  <Picker
                    style={styles.pickerStyle}
                    mode='dropdown'
                    placeholder='*Select Category'
                    iosIcon={<Icon name='ios-arrow-down-outline' />}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label='LMT' value='key1' />
                    <Picker.Item label='V/S' value='key2' />
                    <Picker.Item label='Retail' value='key3' />
                  </Picker>
                </Item>
                <Item>
                  <Picker
                    style={styles.pickerStyle}
                    mode='dropdown'
                    placeholder='Select Classification'
                    iosIcon={<Icon name='ios-arrow-down-outline' />}
                    itemTextStyle={{ color: '#788ad2', fontSize: 12 }}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label='Select Classification' value='key0' />
                    <Picker.Item label='500 Above' value='key1' />
                    <Picker.Item label='250 to 499' value='key2' />
                    <Picker.Item label='100 to249' value='key3' />
                    <Picker.Item label='Less then 100' value='key4' />
                  </Picker>
                </Item>
                <Label style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 7, marginTop: 10 }}>Status</Label>
                <CircleCheckBox
                  checked
                  onToggle={(checked) => console.log('My state is: ', checked)}
                  labelPosition={LABEL_POSITION.RIGHT}
                  outerColor='rgb(35, 92, 114)'
                  label='Active'
                  style={{ marginBottom: 7, width: 10, height: 10 }}
                />
                <CircleCheckBox
                  checked={false}
                  onToggle={(checked) => console.log('My state is: ', checked)}
                  labelPosition={LABEL_POSITION.RIGHT}
                  label='Inactive'
                  outerColor='rgb(35, 92, 114)'
                />
                <Item style={{ marginTop: 12 }}>
                  <Button iconLeft style={{ backgroundColor: 'rgb(216,216,216)', paddingRight: 12 }}
                    onPress={this.selectPhotoTapped.bind(this)}>
                    <Icon name='md-attach' style={{ rotation: 230, backgroundColor: 'rgb(216,216,216)' }} />
                  </Button>
                  <Label style={{ color: 'rgb(242, 242, 242)', fontSize: 12 }}>*Add Photo</Label>
                </Item>

                <Button full success style={{
                  backgroundColor: 'rgb(52, 191, 162)',
                  marginTop: 8,
                  marginBottom: 8,
                  borderRadius: 8
                }}>
                  <Text style={{ color: 'white' }}>Add Store</Text>
                </Button>
              </View>
            </Form>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreRegistrationScreen)
