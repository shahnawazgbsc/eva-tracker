import React, { Component } from 'react'
import { Button, Card, CardItem, Grid, ListItem, Row, Col, Container, Content, Icon, Subtitle, Text } from 'native-base'
import { FlatList, View } from 'react-native'
import { connect } from 'react-redux'
// Styles
import styles from './Styles/OrderSMSStyle'
import InventoryActions from '../Redux/InventoryTakingRedux'
import GradientWrapper from '../Components/GradientWrapper'
import numberToWords from '../Transforms/NumberToWords'
import * as R from 'ramda'
import { Colors } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

class OrderSMS extends Component {
  constructor (props) {
    super(props)
    this.state = {
      totalAmount: 0
    }
  }

  render () {
    let item = this.props.navigation.getParam('orderItem')
    let inventoryDetails = this.props.navigation.getParam('inventoryDetails')
    const total = R.reduce(R.add, 0)(R.map(R.prop('netAmount'))(inventoryDetails))
    return (
      <Container>
        <GradientWrapper>
          <View style={[styles.header, styles.headerContainer]}>
            <Button
              style={{ position: 'absolute' }}
              transparent
              light
              onPress={this.back}
            >
              <Icon
                name={'arrow-back'}
              />
            </Button>
            <View style={{ marginVertical: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon
                style={styles.headerIcon}
                name={'add-shopping-cart'}
                type={'MaterialIcons'}
              />
              <Text style={styles.headerText}>Booking / Order SMS To ShopKeeper</Text>
            </View>
          </View>
        </GradientWrapper>
        <Content padder>
          <Card>
            <CardItem>
              <Grid style={styles.cardContainer}>
                <Row>
                  <Col size={1}>
                    <Text style={{ fontWeight: 'bold' }}>Bill To</Text>
                  </Col>
                  <Col size={3}>
                    <Text style={[styles.darkText, { color: Colors.fire }]}>{this.props.userFirstName}</Text>
                    <Subtitle style={[styles.lightDarkText]}>{item.address + ','}</Subtitle>
                    <Text style={[styles.lightDarkText]}>{this.getPhoneNumber(item.contactNo)}</Text>
                    <Text style={[styles.lightDarkText]}>{this.getEmail()}</Text>
                  </Col>
                </Row>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 20,
                  }}>{'Dear ' + this.props.userFirstName + ', Thanks for Booking'}</Text>
                <Text style={{ textAlign: 'center', marginBottom: 15 }}>{'Your order is booked as'}</Text>

                <FlatList
                  renderItem={this.renderRow}
                  data={inventoryDetails}
                  ListHeaderComponent={this.header}
                />

                <Text style={{ textAlign: 'right', fontWeight: 'bold', marginTop: 10 }}>
                  {'Total: ' + total}
                </Text>
                <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>
                  {'In Words: ' + numberToWords(total).toUpperCase()}
                </Text>
                <Text style={{ textAlign: 'center', marginVertical: 20 }}>
                  THANK YOU FOR YOUR PAYMENT
                </Text>
                <Button
                  danger
                  style={{ paddingHorizontal: 40, alignSelf: 'center' }}
                  rounded
                  onPress={this.completeOrder}>
                  <Text>Done</Text>
                </Button>
              </Grid>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
  getPhoneNumber(number) {
    if(number!=null)
      return "P\t:\t" + number
    else return "P\t:\t-"
  }
  getEmail() {
    if(this.props.email != null)
      return "M\t:\t" + this.props.email
    else return "M\t:\t-"
  }
  completeOrder = () => {
    this.props.navigation.navigate('ShopDetail')
  }
  header = () => {
    return (
      <ListItem style={styles.listHeader}>
        <Text style={[styles.item2, { fontSize: 14, fontWeight: 'bold' }]}>Items</Text>
        <Text style={[styles.item3, { fontSize: 14, fontWeight: 'bold' }]}>Qty</Text>
        <Text style={[styles.item4, { fontSize: 14, fontWeight: 'bold' }]}>Price</Text>
      </ListItem>
    )
  }

  renderRow = ({ item }) => {
    return (
      <ListItem style={styles.listHeader}>
        <Text style={styles.item2}>{item.name}</Text>
        <Text style={styles.item3}>{`${item.quantity}${item.unit ? ' ' + item.unit : ''}`}</Text>
        <Text style={styles.item4}>{item.netAmount}</Text>
      </ListItem>)
  }
  back = () => {
    this.props.navigation.goBack(null)
  }
}

const mapStateToProps = (state) => {
  return {
    brands: state.brands.payload,
    userFirstName: state.login.payload.user.firstname + ' ' + state.login.payload.user.lastname,
    email: state.login.payload && state.login.payload.user.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendInventory: (data) => dispatch(InventoryActions.inventoryRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSMS)
