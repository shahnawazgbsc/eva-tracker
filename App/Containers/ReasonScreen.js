import React, { Component } from 'react'
import { Text, TextInput } from 'react-native'
import * as R from 'ramda'
import {
  Body,
  Button,
  CheckBox,
  Container,
  Content,
  Form,
  H3,
  Header,
  Icon,
  Left,
  ListItem,
  Right
} from 'native-base'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation'
import { Colors } from '../Themes'
// Styles
import styles from './Styles/ReasonScreenStyle'
import GradientWrapper from '../Components/GradientWrapper'
import ShopRedux from '../Redux/ShopRedux'
import realm from '../Database/realm'
import moment from 'moment'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
  
var nonProductiveReasons = []

class ReasonScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selected: null,
      nonProductiveReasons:[]
    }
  }
componentWillMount() {
}
componentDidMount() {
  nonProductiveReasons = realm.objects("NonProductiveReasons").slice(0);
  var reasons = [];
  for(var iter in nonProductiveReasons) {
    reasons.push(nonProductiveReasons[iter].reason)
  }
  this.setState({
    nonProductiveReasons:reasons
  })
}
componentWillReceiveProps(newProps) {
}
  close = () => {
    this.props.navigation.goBack(null)
  }

  accept = () => {
    let reason = this.state.selected
    if (reason === null) return

    if (reason === 'Other') {
      reason = this.state.otherText ? this.state.otherText : reason
    }
    realm.write(()=>{
      realm.create("CheckIn",{
          id:moment().format('x'),
          StoreId: this.props.checkedIn[0].StoreId,
          pjp: !!this.props.checkedIn[0].pjp,
          companyId:this.props.checkedIn[0].companyId,
          latitude:this.props.checkedIn[0].latitude,
          longitude:this.props.checkedIn[0].longitude,
          ContactPersonName: '',
          ContactNo: '',
          NextScheduledVisit: '',
          Location: '',
          Notes: '',
          StartTime:this.props.checkedIn[0].StartTime,
          EndTime: moment().format("MM/DD/YYYY HH:mm"),
          checkedIn:false,
          productive:false,
          stat:false
      },true)
      realm.create("NoOrderReason",{
        StoreId:this.props.checkedIn[0].StoreId,
        reason:reason,
        status:false
      },true)
    })
    this.props.navigation.dispatch(StackActions.popToTop())    
  }

  otherText = (text) => {
    this.setState({ otherText: text })
  }

  render () {
    return (
      <Container style={styles.container}>
        <GradientWrapper>
          <Header style={styles.header}>
            <Left>
              <Button transparent light onPress={this.close}>
                <Icon name={'close'}/>
              </Button>
            </Left>
            <Body>
            <Text style={styles.titleText}>Select Reason</Text>
            </Body>
            <Right>
              <Button transparent light onPress={this.accept}>
                <Icon name={'checkmark'}/>
              </Button>
            </Right>
          </Header>
        </GradientWrapper>
        <Content padder>
          <H3>Please provide reason for not placing an order</H3>
          <Form>
            {
              this.state.nonProductiveReasons.map((value) => (
                <ListItem onPress={() => {
                  this.setState({ selected: value })
                }}>
                  <Body>
                  <Text>{value}</Text>
                  </Body>
                  <Right>
                    <CheckBox checked={this.state.selected === value}/>
                  </Right>
                </ListItem>
              ))
            }
            {
              this.state.selected === 'Other' &&
              <TextInput
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 3,
                  borderWidth: 1,
                  backgroundImage: Colors.white,
                  textAlignVertical: 'top',
                  borderColor: Colors.border
                }}
                multiline
                numberOfLines={6}
                value={this.state.otherText}
                onChangeText={this.otherText}
              />
            }
          </Form>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    checkedIn: ownProps.navigation.getParam('checkedIn')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    placeOrder: (data) => dispatch(ShopRedux.placeOrderRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReasonScreen)
