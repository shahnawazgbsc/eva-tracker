import React, { Component } from 'react'
import { Text, TextInput } from 'react-native'
import { Body, Button, CheckBox, Container, Content, Form, H3, Header, Icon, Left, ListItem, Right } from 'native-base'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation'
import { Colors } from '../Themes'
// Styles
import styles from './Styles/ReasonScreenStyle'
import GradientWrapper from '../Components/GradientWrapper'
import ShopRedux from '../Redux/ShopRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

class ReasonScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  componentWillMount () {
    this.props.nonProductiveReasons()
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
    this.props.placeOrder({ items: [{ noorderreason: reason }] })
    this.props.checkOutRequest({
      onSuccess: () => this.props.navigation.dispatch(StackActions.popToTop()),
      productive: false,
      pjp: this.props.pjp
    })
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
                <Icon name={'close'} />
              </Button>
            </Left>
            <Body>
              <Text style={styles.titleText}>Select Reason</Text>
            </Body>
            <Right>
              <Button transparent light onPress={this.accept}>
                <Icon name={'checkmark'} />
              </Button>
            </Right>
          </Header>
        </GradientWrapper>
        <Content padder>
          <H3>Please provide reason for not placing an order</H3>
          <Form>
            {
              this.props.reasons.map((value) => (
                <ListItem onPress={() => {
                  this.setState({ selected: value.reason })
                }}>
                  <Body>
                    <Text>{value.reason}</Text>
                  </Body>
                  <Right>
                    <CheckBox checked={this.state.selected === value.reason} />
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
    pjp: ownProps.navigation.getParam('item').pjp,
    reasons: state.shop.reasons || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    nonProductiveReasons: () => dispatch(ShopRedux.nonProductiveReasons()),
    checkOutRequest: (data) => dispatch(ShopRedux.checkOutRequest(data)),
    placeOrder: (data) => dispatch(ShopRedux.placeOrderRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReasonScreen)
