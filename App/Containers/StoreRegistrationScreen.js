import React, { Component } from 'react'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { connect } from 'react-redux'
import { Body, Button, Container, Form, Header, Icon, Input, Item, Label, Left, Picker, Right, Text } from 'native-base'
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox'
import ImagePicker from 'react-native-image-picker'
import CreateStoreActions from '../Redux/CreateStoreRedux'
// Styles
import styles from './Styles/StoreRegistrationScreenStyle'
import GradientWrapper from '../Components/GradientWrapper'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

class StoreRegistrationScreen extends Component {
  Categories = ['LMT', 'V/S', 'Retail']
  Classification = ['500 & Above', '250 to 499', '100 to 249', 'Less then 100']

  constructor (props) {
    super(props)

    this.state = {
      image: undefined,
      shopName: '',
      shopkeeperName: '',
      contact: '',
      landLine: '',
      address: '',
      street: '',
      city: '',
      landMark: '',
      cnic: '',
      status: true,
      category: undefined,
      subSection: undefined,
      classification: undefined,
      days: undefined
    }
  }

  componentDidMount (): void {
    this.props.resetDays()
  }

  onShopName = (txt) => {
    this.setState({ shopName: txt })
  }

  onShopKeeperName = (txt) => {
    this.setState({ shopKeeperName: txt })
  }

  onLandLine = (txt) => {
    this.setState({ landline: txt })
  }

  onContact = (txt) => {
    this.setState({ contact: txt })
  }

  onAddress = (txt) => {
    this.setState({ address: txt })
  }

  onStreet = (txt) => {
    this.setState({ street: txt })
  }

  onCity = (txt) => {
    this.setState({ city: txt })
  }

  onLandmark = (txt) => {
    this.setState({ landmark: txt })
  }

  onCNIC = (txt) => {
    this.setState({ cnic: txt })
  }

  onCategorySelected = (value) => {
    this.setState({ category: value })
  }

  onSubSectionSelected = (value) => {
    this.setState({ subSection: value })
  }

  onClassificationSelected = (value) => {
    this.setState({ classification: value })
  }

  close = () => {
    this.props.navigation.goBack(null)
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
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          image: response
        })
      }
    })
  }

  render () {
    return (
      <Container>
        <GradientWrapper>
          <Header style={styles.header}>
            <Left>
              <Button transparent light onPress={this.close}>
                <Icon name='arrow-back'
                />
                <Text>Back</Text>
              </Button>
            </Left>
            <Body>
            <Text style={styles.titleText}>Store Registration</Text>
            </Body>
            <Right/>
          </Header>
        </GradientWrapper>
        <KeyboardAwareScrollView>
          <Form style={styles.FormContainer}>
            <Item floatingLabel>
              <Label>Shop Name</Label>
              <Input
                onChangeText={this.onShopName}
                value={this.state.shopName}
              />
            </Item>
            <View>
              <Item floatingLabel>
                <Label>Shopkeeper Name</Label>
                <Input
                  onChangeText={this.onShopKeeperName}
                  value={this.state.shopKeeperName}
                />
              </Item>
              <Item floatingLabel>
                <Label>Contact Number</Label>
                <Input
                  keyboardType={'phone-pad'}
                  onChangeText={this.onContact}
                  value={this.state.contact}
                />
              </Item>

              <Item floatingLabel>
                <Label>Land Line</Label>
                <Input
                  onChangeText={this.onLandLine}
                  value={this.state.landline}
                  keyboardType={'phone-pad'}
                />
              </Item>

              <Item fixedLabel>
                <Label>Subsection</Label>
                <Picker
                  mode='dropdown'
                  placeholder='Select SubSection'
                  iosIcon={<Icon name='ios-arrow-down-outline'
                  />}
                  itemTextStyle={{ color: '#788ad2', fontSize: 12 }}
                  selectedValue={this.state.subSection}
                  onValueChange={this.onSubSectionSelected}
                >
                  {
                    this.props.subSection &&
                    this.props.subSection.map((value, index) => (
                      <Picker.Item label={value.name} value={index} key={index}/>))
                  }
                </Picker>
              </Item>

              <Item floatingLabel>
                <Label>Address</Label>
                <Input
                  onChangeText={this.onAddress}
                  value={this.state.address}
                />
              </Item>

              <Item floatingLabel>
                <Label>Street</Label>
                <Input
                  onChangeText={this.onStreet}
                  value={this.state.street}
                />
              </Item>
              <Item floatingLabel>
                <Label>City</Label>
                <Input
                  onChangeText={this.onCity}
                  value={this.state.city}
                />
              </Item>

              <Item floatingLabel>
                <Label>Landmark</Label>
                <Input
                  onChangeText={this.onLandmark}
                  value={this.state.landMark}
                />
              </Item>
              <Item floatingLabel>
                <Label>CNIC</Label>
                <Input
                  keyboardType={'numeric'}
                  onChangeText={this.onCNIC}
                  value={this.state.cnic}
                />
              </Item>
              <Item fixedLabel onPress={() => this.props.navigation.navigate('DaySelection')}>
                <Label>Days</Label>
                <Label style={{ textAlign: 'right', marginRight: 15, marginVertical: 15 }}>
                  {this.props.days ? this.props.days.map(value => value.substring(0, 3)).join(', ') : 'Select Days'}</Label>
              </Item>
              <Item fixedLabel>
                <Label>Category</Label>
                <Picker
                  mode='dropdown'
                  placeholder='Select Category'
                  iosIcon={<Icon name='ios-arrow-down-outline'
                  />}
                  itemTextStyle={{ color: '#788ad2', fontSize: 12 }}
                  selectedValue={this.state.category}
                  onValueChange={this.onCategorySelected}
                >
                  {
                    this.Categories.map((value, index) => (<Picker.Item label={value} value={index} key={index}/>))
                  }
                </Picker>
              </Item>
              <Item fixedLabel>
                <Label>Classification</Label>
                <Picker
                  mode='dropdown'
                  placeholder='Select Classification'
                  iosIcon={<Icon name='ios-arrow-down-outline'
                  />}
                  itemTextStyle={{ color: '#788ad2', fontSize: 12 }}
                  selectedValue={this.state.classification}
                  onValueChange={this.onClassificationSelected}
                >
                  {
                    this.Classification.map((value, index) => <Picker.Item label={value} value={index} key={index}/>)
                  }
                </Picker>
              </Item>
              <Item fixedLabel>
                <Label style={{ marginVertical: 15 }}>Status</Label>
                <CircleCheckBox
                  checked={this.state.status}
                  onToggle={(checked) => this.setState({ status: true })}
                  labelPosition={LABEL_POSITION.RIGHT}
                  outerColor='rgb(35, 92, 114)'
                  label='Active'
                  style={{ marginBottom: 7, width: 10, height: 10 }}
                />
                <CircleCheckBox
                  checked={!this.state.status}
                  onToggle={(checked) => this.setState({ status: false })}
                  labelPosition={LABEL_POSITION.RIGHT}
                  label='Inactive'
                  outerColor='rgb(35, 92, 114)'
                />
              </Item>
              <Item>
                <Button
                  style={{ backgroundColor: 'rgb(216,216,216)', margin: 12, borderRadius: 8 }}
                  onPress={this.selectPhotoTapped.bind(this)}>
                  <Icon name='md-attach'
                  />
                </Button>
                <Label>{this.state.image ? this.state.image.fileName : 'Add Photo'}</Label>
              </Item>
              <Button
                full
                success
                style={{
                  margin: 15,
                  borderRadius: 8
                }}
                onPress={() => this.props.navigation.navigate('DaySelection')}
              >
                <Text style={{ color: 'white' }}>Add Store</Text>
              </Button>
            </View>
          </Form>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    subSection: state.createStore && state.createStore.subSection,
    days: state.createStore && state.createStore.days
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetDays: () => dispatch(CreateStoreActions.resetDays())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreRegistrationScreen)
