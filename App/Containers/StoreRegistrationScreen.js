import React, { Component } from 'react'
import { Alert, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { connect } from 'react-redux'
import { Body, Button, Container, Form, Header, Icon, Input, Item, Label, Left, Picker, Right, Text } from 'native-base'
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox'
import ImagePicker from 'react-native-image-picker'
import CreateStoreActions from '../Redux/CreateStoreRedux'
// Styles
import styles from './Styles/StoreRegistrationScreenStyle'
import GradientWrapper from '../Components/GradientWrapper'
import { Days } from './DaySelection'
import Geocoder from 'react-native-geocoder'
import moment from 'moment'
import * as R from 'ramda'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

var baseState = {}
var cityName = ''

class StoreRegistrationScreen extends Component {
  Categories = ['LMT', 'V/S', 'Retail']
  Classification = ['500 & Above', '250 to 499', '100 to 249', 'Less then 100']

  constructor (props) {
    super(props)
    var currentdatetime = moment().format('MM/DD/YYYY HH:mm')
    this.state = {
      image: undefined,
      StartTime: currentdatetime,
      shopName: __DEV__ ? 'Test Shop' : '',
      shopKeeper: __DEV__ ? 'Test Shopkeeper' : '',
      contactNo: __DEV__ ? '12345678910' : '',
      landline: __DEV__ ? '12345678910' : '',
      address: __DEV__ ? 'Abc Address' : '',
      street: __DEV__ ? 'Abc street' : '',
      city: __DEV__ ? 'Karachi' : '',
      landMark: __DEV__ ? 'LandMark' : '',
      cnic: __DEV__ ? '4210122222222' : '',
      activeStatus: true,
      category: undefined,
      subsectionId: undefined,
      classification: undefined,
      days: []
    }
    baseState = this.state
  }

  createStore = () => {
    const msg = this.validateFields()
    if (msg === undefined) {
      this.props.createStore({
        ...this.state,
        subsectionId: this.props.subSection[this.state.subsectionId].subsectionId,
        category: this.Categories[this.state.category],
        classification: this.Classification[this.state.classification],
        visitDays: this.props.days.map(value => ({ day: value })),
        onSuccess: () => {
          this.setState(baseState)
          this.setState({ city: this.props.city == null ? cityName : this.props.city })
          this.props.resetDays()
          this.props.navigation.goBack(null)
        }
      })
    } else {
      Alert.alert('Info', msg)
    }
  }

  validateFields () {
    if (this.state.shopName.length === 0) {
      return 'Shop name is required'
    } else if (this.state.shopKeeper.length === 0) {
      return 'Shopkeeper name is required'
    } else if (this.state.contactNo.length !== 11) {
      return 'Contact number is required'
    } else if (this.state.subsectionId === undefined) {
      return 'Subsection is required'
    } else if (this.state.address.length === 0) {
      return 'Address is required'
    } else if (this.state.street.length === 0) {
      return 'Street name is required'
    } else if (this.state.city.length === 0 && (this.props.city && this.props.city.length === 0)) {
      return 'City is required'
    } else if (this.state.landMark.length === 0) {
      return 'Landmark is required'
    } else if (!this.props.days || this.props.days.length === 0) {
      return 'Select visit days'
    } else if (this.state.category === undefined) {
      return 'Select category'
    } else if (this.state.classification === undefined) {
      return 'Select classification'
    } else if (this.state.image === undefined) {
      return 'Select image'
    } else {
      return undefined
    }
  }

  componentDidMount (): void {
    this.props.resetDays()
    if (this.props.city == null) {
      Geocoder.fallbackToGoogle('AIzaSyAkzbji8MfNjpWXG42WS5L0dItXEkKjSRE')
      Geocoder.geocodePosition({ lat: this.props.latitude, lng: this.props.longitude }).then(res => {
        cityName = res[0].locality
        this.setState({ city: res[0].locality })
      })
        .catch(err => alert(err))
    } else this.setState({ city: this.props.city })
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      days: newProps.days
    })
  }

  onShopName = (txt) => {
    this.setState({ shopName: txt })
  }

  onShopKeeperName = (txt) => {
    this.setState({ shopKeeper: txt })
  }

  onLandLine = (txt) => {
    this.setState({ landline: txt })
  }

  onContact = (txt) => {
    this.setState({ contactNo: txt })
  }

  onAddress = (txt) => {
    this.setState({ address: txt })
  }

  onStreet = (txt) => {
    this.setState({ street: txt })
  }

  onCity = (txt) => {
    this.setState({ city: this.props.city == null ? txt : this.props.city })
  }

  onLandmark = (txt) => {
    this.setState({ landMark: txt })
  }

  onCNIC = (txt) => {
    this.setState({ cnic: txt })
  }

  onCategorySelected = (value) => {
    this.setState({ category: value })
  }

  onSubSectionSelected = (value) => {
    this.setState({ subsectionId: value })
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
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        waitUntilSaved: true
      }
    }

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
        Alert.alert(null, String(response.error))
      } else {
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          image: R.pick(['uri', 'fileName'], response)
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
                  value={this.state.shopKeeper}
                />
              </Item>
              <Item floatingLabel>
                <Label>Contact Number</Label>
                <Input
                  keyboardType={'phone-pad'}
                  maxLength={11}
                  onChangeText={this.onContact}
                  value={this.state.contactNo}
                />
              </Item>

              <Item floatingLabel>
                <Label>Land Line</Label>
                <Input
                  onChangeText={this.onLandLine}
                  maxLength={11}
                  value={this.state.landline}
                  keyboardType={'phone-pad'}
                />
              </Item>

              <Item fixedLabel>
                <Label>Subsection</Label>
                <Picker
                  mode='dropdown'
                  placeholder='Select Subsection'
                  iosIcon={<Icon name='ios-arrow-down-outline'
                  />}
                  itemTextStyle={{ color: '#788ad2', fontSize: 12 }}
                  selectedValue={this.state.subsectionId}
                  onValueChange={this.onSubSectionSelected}
                >
                  <Picker.Item label={'Select Subsection'} key={'first'} value={''}/>
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
                  value={this.props.city == null ? this.state.city : this.props.city}
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
                  maxLength={13}
                  onChangeText={this.onCNIC}
                  value={this.state.cnic}
                />
              </Item>
              <Item fixedLabel onPress={() => this.props.navigation.push('DaySelection')}>
                <Label>Days</Label>
                <Label style={{ textAlign: 'right', marginRight: 15, marginVertical: 15 }}>
                  {this.props.days ? this.props.days.map(value => Days.find(value1 => value1.key === value).title.substring(0, 3)).join(', ') : 'Select Days'}</Label>
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
                  <Picker.Item label={'Select Category'} key={'first'} value={''}/>
                  {
                    this.Categories.map((value, index) => (<Picker.Item label={value} value={index} key={index}/>))
                  }
                </Picker>
              </Item>
              <Item fixedLabel>

                <Picker
                  mode='dropdown'
                  placeholder='Select Classification'
                  iosIcon={<Icon name='ios-arrow-down-outline'
                  />}
                  itemTextStyle={{ color: '#788ad2', fontSize: 12 }}
                  selectedValue={this.state.classification}
                  onValueChange={this.onClassificationSelected}
                >
                  <Picker.Item label={'Select Classification'} key={'first'} value={''}/>
                  {
                    this.Classification.map((value, index) => <Picker.Item label={value} value={index} key={index}/>)
                  }
                </Picker>
              </Item>
              <Item fixedLabel>
                <Label style={{ marginVertical: 15 }}>Status</Label>
                <CircleCheckBox
                  checked={this.state.activeStatus}
                  onToggle={(checked) => this.setState({ activeStatus: true })}
                  labelPosition={LABEL_POSITION.RIGHT}
                  outerColor='rgb(35, 92, 114)'
                  label='Active'
                  style={{ marginBottom: 7, width: 10, height: 10 }}
                />
                <CircleCheckBox
                  checked={!this.state.activeStatus}
                  onToggle={(checked) => this.setState({ activeStatus: false })}
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
                onPress={this.createStore}
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
    days: state.createStore && state.createStore.days,
    latitude: state.gps && state.gps.data && state.gps.data.latitude,
    longitude: state.gps && state.gps.data && state.gps.data.longitude,
    city: state.createStore && state.createStore.payload && state.createStore.payload.city
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetDays: () => dispatch(CreateStoreActions.resetDays()),
    createStore: (data) => dispatch(CreateStoreActions.createStoreRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreRegistrationScreen)
