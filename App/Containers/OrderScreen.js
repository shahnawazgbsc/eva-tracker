import * as React from 'react'
import { Alert, FlatList, Image, View } from 'react-native'
import { Button, Card, CardItem, Container, Content, Fab, Footer, Icon, Row, Text } from 'native-base'
import { connect } from 'react-redux'
import GradientWrapper from '../Components/GradientWrapper'
import styles from './Styles/OrderScreenStyle'
import ConvertToCurrency from '../Transforms/ConvertToCurrency'
import { Colors, Images } from '../Themes'
import ShopActions from '../Redux/ShopRedux'

class OrderScreen extends React.Component {
  addOrder = () => {
    this.props.navigation.navigate('AddNewItem')
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
        <View style={styles.item5} />
      </View>
    )
  }

  renderRow = ({ item }) => {
    return (
      <View style={styles.listHeader}>
        <Image
          style={[styles.item1, { color: Colors.success }]}
          source={Images.logo}
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
            <Text style={styles.item4}>{item.unit}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>Trade Price</Text>
            <Text style={styles.item4}>{item.tradeOfferAmount}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>Gross Amount</Text>
            <Text style={styles.item4}>{item.retailPrice}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>TO / Ltr / Kg</Text>
            <Text style={styles.item4}>{item.unit}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>Less TO</Text>
            <Text style={styles.item4}>{item.unit}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>RD %</Text>
            <Text style={styles.item4}>{item.unit}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>Regular Discount</Text>
            <Text style={styles.item4}>{item.unit}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>Extra Discount / Ltr / Kg</Text>
            <Text style={styles.item4}>{item.unit}</Text>
          </Row>
          <Row>
            <Text style={styles.item3}>Less Extra Discount</Text>
            <Text style={styles.item4}>{item.unit}</Text>
          </Row>
          <Row>
            <Text style={[styles.item3, { fontWeight: 'bold' }]}>Net Amount</Text>
            <Text style={styles.item4}>{item.unit}</Text>
          </Row>
        </View>
        <Button transparent style={styles.item5} onPress={() => {
          this.props.removeItem(item)
        }}>
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
        <GradientWrapper>
          <Footer style={[styles.header, styles.footer]}>
            <Text style={styles.amountText}>TOTAL PAYMENT = {ConvertToCurrency(0)}</Text>
            <Button danger onPress={this.checkout} style={{margin:5,    justifyContent:'flex-end'}}>
              <Icon
                name={'arrow-dropleft'}
              />
              <Text>CheckOut</Text>
            </Button>
          </Footer>
        </GradientWrapper>
      </Container>
    )
  }

  checkout = () => {
    if ((this.props.items && this.props.items.length > 0)) {
      this.props.placeOrder({
        items: this.props.items.map(value => ({ quantity: value.quantity, inventoryItemId: value.inventoryItemId })),
        onSuccess: () => {
          Alert.alert('Success', 'Your order for this shop has been placed')
        }
      })
    } else {
      Alert.alert('Error', 'Please add items to checkout')
    }
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.shop && state.shop.orderItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    placeOrder: (data) => dispatch(ShopActions.placeOrderRequest(data)),
    removeItem: (item) => dispatch(ShopActions.removeItem(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen)
