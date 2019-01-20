import * as React from 'react'
import { Alert, FlatList, Image, View } from 'react-native'
import { Button, Card, CardItem, Container, Content, Fab, Footer, Icon, Row, Text } from 'native-base'
import { connect } from 'react-redux'
import GradientWrapper from '../Components/GradientWrapper'
import styles from './Styles/OrderScreenStyle'
import { Colors, Images } from '../Themes'
import ShopActions from '../Redux/ShopRedux'
import * as R from 'ramda'

class OrderScreen extends React.Component {
  addOrder = () => {
    if (this.props.itemsBrands) {
      this.props.navigation.navigate('AddNewItem')
    } else {
      Alert.alert('No Company Added', 'Please add company from portal')
    }
  }
  back = () => {
    this.props.navigation.goBack(null)
  }

  header = () => {
    return (
      <View style={styles.listHeader}>
        <Icon style={[styles.item1, { color: Colors.success }]} name={'arrow-dropdown'}
        />
        <Text style={[styles.item2, { fontSize: 14, fontWeight: 'bold' }]}>Product</Text>
        <Text style={[styles.item3, { fontSize: 14, fontWeight: 'bold' }]}>Qty</Text>
        <Text style={[styles.item4, { fontSize: 14, fontWeight: 'bold' }]}>SKU</Text>
        <View style={styles.item5}
        />
      </View>
    )
  }

  renderRow = ({ item }) => {
    return (
      <View style={styles.listHeader}>
        <Image
          style={[styles.item1, { color: Colors.success }]}
          source={Images.evalogo}
          resizeMode={'contain'}
        />
        <View style={styles.item2}>
          <Text style={{ fontSize: 10 }}>{item.name}</Text>
          <Text style={{ fontSize: 10 }}>Product ID: {item.itemCode}</Text>
        </View>
        <View style={styles.itemRow}>
          <Row>
            <Text style={styles.item3}>{item.quantity}</Text>
            <Text style={styles.item4}>{item.unit}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>Ltrs / Mes</Text>
            <Text style={styles.item4}>{item.measure}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>Trade Price</Text>
            <Text style={styles.item4}>{item.unitPrice}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>Gross Amount</Text>
            <Text style={styles.item4}>{item.grossAmount}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>TO / Ltr / Kg</Text>
            <Text style={styles.item4}>{item.tradeOfferAmount}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>Less To</Text>
            <Text style={styles.item4}>{item.tradeOff}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>Regular Discount</Text>
            <Text style={styles.item4}>{item.regularDiscount}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>Less Regular Discount</Text>
            <Text style={styles.item4}>{item.lessRegularDiscount}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>Extra Discount / Ltr / Kg</Text>
            <Text style={styles.item4}>{item.extraDiscount}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>Less Extra Discount</Text>
            <Text style={styles.item4}>{item.extraDiscountAmount}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>Total Offer Item</Text>
            <Text style={styles.item4}>{item.totalOffer}</Text>
          </Row>
          <Row>
            <Text style={[styles.item3, { fontWeight: 'bold' }]}>Net Amount</Text>
            <Text style={styles.item4}>{item.netTotal}</Text>
          </Row>
        </View>
        <Button transparent style={styles.item5} onPress={() => { this.props.removeItem(item) }}>
          <Icon name={'trash'} style={{ color: Colors.fire, marginLeft: 0, marginRight: 0 }}
          />
        </Button>
      </View>
    )
  }

  separator = () => {
    return (
      <View style={[styles.divider, { marginVertical: 5 }]}
      />
    )
  }

  render () {
    const Total = R.reduce(R.add, 0)(R.map(R.prop('netTotal'))(this.props.items))
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
              <Text style={styles.headerText}>Booking Sales / Order</Text>
            </View>
            <Fab
              active
              position={'topRight'}
              style={[styles.fab, { position: 'relative', marginTop: 10, marginRight: 10 }]}
              onPress={this.addOrder}
            >
              <Icon
                name={'add'}
                style={styles.iconStyle}
              />
            </Fab>
          </View>
        </GradientWrapper>
        <View style={{ width: '100%', height: 5, backgroundColor: '#fcc430' }}/>
        <Content style={styles.containerContent}>
          {
            <Card>
              <CardItem>
                <FlatList
                  renderItem={this.renderRow}
                  data={this.props.items}
                  extraData={this.props.items}
                  ListHeaderComponent={this.header}
                  ItemSeparatorComponent={this.separator}
                />
              </CardItem>
            </Card>
          }
        </Content>
        <View style={{ width: '100%', height: 5, backgroundColor: '#fcc430' }}/>
        <GradientWrapper>
          <Footer style={[styles.header, styles.footer]}>
            <Text style={styles.amountText}>TOTAL PAYMENT = {Math.abs(Total)}</Text>
            {this.renderCheckoutButton()}
          </Footer>
        </GradientWrapper>
      </Container>
    )
  }

  renderCheckoutButton = () => {
    if ((this.props.items && this.props.items.length > 0)) {
      return (
        <Button danger onPress={this.checkout} style={{ flexWrap: 'wrap', margin: 5, justifyContent: 'flex-end' }}>
          <Icon
            name={'arrow-dropleft'}
          />
          <Text>CheckOut</Text>
        </Button>
      )
    } else {
      return (
        <View style={{ height: 0 }}/>
      )
    }
  }
  checkout = () => {
    if ((this.props.items && this.props.items.length > 0)) {
      this.props.placeOrder({
        items: this.props.items.map(value => ({ quantity: value.quantity, inventoryItemId: value.inventoryItemId ,extraDiscount: value.extraDiscount})),
        onSuccess: () => {
          this.props.navigation.navigate('OrderSMS', {
            orderItem: this.props.navigation.getParam('extraItem'),
            inventoryDetails: this.props.items
          })
        }
      })
    } else {
      Alert.alert('Error', 'Please add items to checkout')
    }
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.shop && state.shop.orderItems,
    itemsBrands: state.brands && state.brands.payload.find(value => value.brandName.toLowerCase() === 'EVA'.toLowerCase()) &&
      state.brands.payload.find(value => value.brandName.toLowerCase() === 'EVA'.toLowerCase()).items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    placeOrder: (data) => dispatch(ShopActions.placeOrderRequest(data)),
    removeItem: (item) => dispatch(ShopActions.removeItem(item))
  }
  z
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen)
