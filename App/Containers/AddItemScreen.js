import React from 'react'
import { connect } from 'react-redux'
import { Alert, FlatList, Image, View } from 'react-native'
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Picker,
  Right,
  Row,
  Text
} from 'native-base'
// Styles
import styles from './Styles/AddItemScreenStyle'
import { Colors, Images } from '../Themes'
import GradientWrapper from '../Components/GradientWrapper'
import ShopRedux from '../Redux/ShopRedux'
import * as R from 'ramda'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

class AddItemScreen extends React.PureComponent {
  constructor (props) {
    super(props)
    this.calculate = (obj) => {
      const measure = obj.packSize * obj.quantity
      const grossAmount = obj.unitPrice * obj.quantity
      const tradeOff = measure * obj.tradeOfferAmount
      const extraDiscountAmount = obj.extraDiscount * measure
      const netTotal = grossAmount - tradeOff - extraDiscountAmount
      const totalOffer = obj.quantity ? netTotal / obj.quantity : 0

      return R.merge(obj, {
        measure,
        netTotal,
        grossAmount,
        tradeOff,
        regularDiscountTotal: measure * obj.regularDiscount,
        totalOffer,
        extraDiscountAmount
      })
    }
    this.changeItem = R.curry((index, merge) => {
      this.state.data[this.state.selectedValue].items[index] = merge
      return R.clone(this.state.data)
    })

    let data = R.map(value =>
      R.assoc('items', R.map(value2 => this.calculate(R.merge(value2, {
        quantity: '0',
        extraDiscount: '0'
      })), value.items), value)
    )(props.items)

    this.state = {
      selectedValue: '',
      data
    }
    console.log(data)
  }

  /* ***********************************************************
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  onCategorySelect = (index) => {
    this.setState({ selectedValue: index })
  }
  renderHeader = () => (
    <Item fixedLabel>
      <Label>Product Category</Label>
      <Picker
        mode='dropdown'
        placeholder='Select Product Category'
        iosIcon={<Icon name='ios-arrow-down-outline'
        />}
        itemTextStyle={{ color: '#788ad2', fontSize: 12 }}
        selectedValue={this.state.selectedValue}
        onValueChange={this.onCategorySelect}
      >
        <Picker.Item label={'Select Category'} key={'first'} value={'first'}
        />
        {
          this.props.items.map((value, index) => (<Picker.Item label={value.productType} value={index} key={index}/>))
        }
      </Picker>
    </Item>
  )

  renderRow = ({ item, index }) => {
    return (
      <Card style={styles.row}>
        <CardItem header style={{ paddingLeft: 0, paddingBottom: 0, paddingTop: 0, paddingRight: 0 }}>
          <Icon style={[styles.item1, { color: Colors.success }]} name={'arrow-dropdown'}
          />
          <Text style={[styles.item2, { fontSize: 14, fontWeight: 'bold' }]}>Product</Text>
          <Text style={[styles.item3, { fontSize: 14, fontWeight: 'bold' }]}>Qty</Text>
          <Text style={[styles.item4, { fontSize: 14, fontWeight: 'bold' }]}>SU</Text>
          <View style={styles.item5}
          />
        </CardItem>
        <CardItem cardBody style={{ alignContent: 'flex-start' }}>
          <Image
            style={[styles.item1, { color: Colors.success }]}
            source={Images.evalogo}
            resizeMode={'contain'}
          />
          <View style={styles.item2}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ fontSize: 10 }}>Product ID: {item.itemCode}</Text>
          </View>
          <View style={styles.itemRow}>
            <Row>
              <View style={styles.item3}>
                <Input
                  style={styles.input}
                  onChangeText={(text) => {
                    if (R.is(Number, (parseInt(text)))) {
                      this.setState({ data: this.changeItem(index, this.calculate(R.merge(item, { quantity: text }))) })
                      console.log(this.state.data)
                    }
                  }}
                  value={item.quantity}
                  keyboardType={'numeric'}
                />
              </View>
              <Text style={styles.item4}>{item.salesUnit}</Text>
            </Row>
            <Row>
              <Text
                style={styles.item3}>{item.measure}</Text>
              <Text style={styles.item4}>{item.unit}</Text>
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
              <Text style={styles.item3}>Less TO</Text>
              <Text style={styles.item4}>{item.tradeOff}</Text>
            </Row>
            <Row>
              <Text style={styles.item7}>Regular Discount</Text>
              <Text style={styles.item4}>{item.regularDiscount}</Text>
            </Row>
            <Row>
              <Text style={styles.item3}>Less Regular Discount</Text>
              <Text style={styles.item4}>{item.regularDiscountTotal}</Text>
            </Row>
            <Row>
              <Text style={styles.item6}>Extra Discount / Ltr / Kg</Text>
              <View style={styles.item3}>
                <Input
                  style={styles.discountInput}
                  onChangeText={(text) => this.setState({ data: this.changeItem(index, this.calculate(R.merge(item, { extraDiscount: text }))) })
                  }
                  value={item.extraDiscount}
                  keyboardType={'numeric'}
                />
              </View>
            </Row>
            <Row>
              <Text style={styles.item3}>Less Extra Discount</Text>
              <Text style={styles.item4}>{item.extraDiscountAmount == null ? 0 : item.extraDiscountAmount}</Text>
            </Row>
            <Row>
              <Text style={styles.item3}>Total Offer Item</Text>
              <Text style={styles.item4}>{item.totalOffer == null ? 0 : item.totalOffer}</Text>
            </Row>
            <Row>
              <Text style={[styles.item3, { fontWeight: 'bold' }]}>Net Amount</Text>
              <Text style={styles.item4}>{item.netTotal == null ? 0 : item.netTotal}</Text>
            </Row>
          </View>

        </CardItem>
      </Card>
    )
  }

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering. Otherwise index is fine
  keyExtractor = (item, index) => index

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders. This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  back = () => {
    this.props.navigation.goBack(null)
  }

  addToCart = () => {
    let cartItems = []
    this.state.data.forEach(value => {
      value.items.forEach(value => {
        if (!isNaN(value.quantity) && value.quantity !== 0) {
          cartItems.push(value)
        }
      })
    })

    if (cartItems.length > 0) {
      this.props.addToCart(cartItems)
      this.props.navigation.goBack(null)
    } else {
      Alert.alert(null, 'Please select items to add')
    }
  }

  renderFooter = () => {
    return (

      <Button danger rounded style={{ alignSelf: 'flex-end', marginVertical: 20 }} onPress={this.addToCart}>
        <Icon
          name={'add-shopping-cart'}
          type={'MaterialIcons'}
        />
        <Text>Process To order</Text>
      </Button>
    )
  }

  render () {
    const data = R.path([this.state.selectedValue, 'items'], this.state.data)

    return (
      <Container>
        <GradientWrapper>
          <Header style={styles.header}>
            <Left>
              <Button transparent onPress={this.back}>
                <Icon
                  name={'arrow-back'}
                />
              </Button>
            </Left>
            <Body>
            <Text style={styles.titleText}>Add Items</Text>
            </Body>
            <Right
            />
          </Header>
        </GradientWrapper>

        <FlatList
          style={styles.container}
          data={data || []}
          extraData={this.state.data}
          ListFooterComponent={this.renderFooter}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
        />
      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.nonBrands.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (items) => dispatch(ShopRedux.addToCart(items))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItemScreen)
