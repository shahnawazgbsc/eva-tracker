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
import Colors from '../Themes/Colors'
import Images from '../Themes/Images'
import GradientWrapper from '../Components/GradientWrapper'
import ShopRedux from '../Redux/ShopRedux'
import Immutable from 'seamless-immutable'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html
    var litresMes=[]
    var grossAmount=[]
    var lessTO = []
    var lessExtraDiscount = []
    var netAmount=[]

class AddItemScreen extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      selected: [],
      quantity: [],
      extraDiscount:[],
      selectedValue: '',
      data: []
    }
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
    if (index === '') {
      litresMes=[]
      grossAmount=[]
      lessTO = []
      lessExtraDiscount = []
      netAmount=[]
      this.setState({ data: [], quantity: [],extraDiscount:[] })
      return
    }

    let data = this.props.items[index].items
    let quantity = []
    let extraDiscount = []
    for (let i = 0; i < data.length; i++){ quantity[i] = '1'
  extraDiscount[i] = '0'}
    this.setState({ data, quantity, extraDiscount,selected: [] })
  }
  renderHeader = () => (
    <Item fixedLabel>
      <Label>Category</Label>
      <Picker
        mode='dropdown'
        placeholder='Select Category'
        iosIcon={<Icon name='ios-arrow-down-outline'
        />}
        itemTextStyle={{ color: '#788ad2', fontSize: 12 }}
        selectedValue={this.state.selectedValue}
        onValueChange={this.onCategorySelect}
      >
        <Picker.Item label={'Select Category'} key={'first'} value={''}/>
        {
          this.props.items &&
          this.props.items.map((value, index) => (
            <Picker.Item label={value.productType} value={index} key={index}/>))
        }
      </Picker>
    </Item>
  )
  
  renderRow = ({ item, index }) => {
    litresMes[index] = 0
    grossAmount[index] = item.retailPrice*this.state.quantity[index];
    lessTO[index] = item.tradeOfferAmount*litresMes[index];
    lessExtraDiscount[index] = this.state.extraDiscount[index] * litresMes[index]
    netAmount[index] = grossAmount[index] - lessTO[index] - lessExtraDiscount[index];
    return (
      <Card style={styles.row}>
        <CardItem header style={{ paddingLeft: 0, paddingBottom: 0, paddingTop: 0, paddingRight: 0 }}>
          <Icon style={[styles.item1, { color: Colors.success }]} name={'arrow-dropdown'}
          />
          <Text style={[styles.item2, { fontSize: 14, fontWeight: 'bold' }]}>Product</Text>
          <Text style={[styles.item3, { fontSize: 14, fontWeight: 'bold' }]}>Qty</Text>
          <Text style={[styles.item4, { fontSize: 14, fontWeight: 'bold' }]}>SKU</Text>
          <View style={styles.item5}
          />
        </CardItem>
        <CardItem cardBody style={{ alignContent: 'flex-start' }}>
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
              <View style={styles.item3}>
                <Input
                  style={styles.input}
                  onChangeText={(text) => {
                    let isNumber = !isNaN(parseInt(text))
                    if (isNumber || text.length === 0) {
                      let clone = JSON.parse(JSON.stringify(this.state))
                      clone.quantity[index] = text
                      this.setState(clone)
                    }
                  }}
                  value={this.state.quantity[index]}
                  keyboardType={'numeric'}
                />
              </View>
              <Text style={styles.item4}>{item.unit}</Text>
            </Row>
            <Row>
              <Text style={styles.item3}>Ltrs / Mes</Text>
              <Text style={styles.item4}>{litresMes[index]}</Text>
            </Row>
            <Row>
              <Text style={styles.item3}>Trade Price</Text>
              <Text style={styles.item4}>{item.retailPrice}</Text>
            </Row>
            <Row>
              <Text style={styles.item3}>Gross Amount</Text>
              <Text style={styles.item4}>{grossAmount[index]}</Text>
            </Row>
            <Row>
              <Text style={styles.item3}>TO / Ltr / Kg</Text>
              <Text style={styles.item4}>{item.tradeOfferAmount}</Text>
            </Row>
            <Row>
              <Text style={styles.item3}>Less TO</Text>
              <Text style={styles.item4}>{lessTO[index]}</Text>
            </Row>
            <Row>
              <Text style={styles.item3}>RD %</Text>
              <Text style={styles.item4}>-</Text>
            </Row>
            <Row>
              <Text style={styles.item3}>Regular Discount</Text>
              <Text style={styles.item4}>-</Text>
            </Row>
            <Row>
              <Text style={styles.item3}>Extra Discount / Ltr / Kg</Text>
              <View style={styles.item3}>
                <Input
                  style={styles.discountInput}
                  onChangeText={(text) => {
                    let isNumber = !isNaN(parseInt(text))
                    if (isNumber || text.length === 0) {
                      let clone = JSON.parse(JSON.stringify(this.state))
                      clone.extraDiscount[index] = text
                      this.setState(clone)
                    }
                  }}
                  value={this.state.extraDiscount[index]==null?0:this.state.extraDiscount[index]}
                  keyboardType={'numeric'}
                />
              </View>
            </Row>
            <Row>
              <Text style={styles.item3}>Less Extra Discount</Text>
              <Text style={styles.item4}>{lessExtraDiscount[index]}</Text>
            </Row>
            <Row>
              <Text style={[styles.item3, { fontWeight: 'bold' }]}>Net Amount</Text>
              <Text style={styles.item4}>{netAmount[index]}</Text>
            </Row>
          </View>
          <Button transparent style={styles.item5} onPress={() => {
            let clone = JSON.parse(JSON.stringify(this.state))
            clone.selected[index] = !clone.selected[index]
            this.setState(clone)
          }}>
            <Icon
              style={{ color: Colors.fire, marginLeft: 0, marginRight: 0 }}
              name={this.state.selected && this.state.selected[index] ? 'check-box' : 'check-box-outline-blank'}
              type={'MaterialIcons'}
            />
          </Button>
        </CardItem>
      </Card>
    )
  }

  /* ***********************************************************
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

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
    this.state.selected.forEach((value, index) => {
      if (value) {
        let item = Immutable.asMutable(this.props.items[this.state.selectedValue].items[index])
        item.quantity = this.state.quantity[index]
        item.extraDiscount = this.state.extraDiscount[index]
        item.litresMes = litresMes[index]
        item.netAmount = netAmount[index]
        item.grossAmount = grossAmount[index]
        item.lessTO = lessTO[index]
        cartItems.push(item)
      }
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
      <Button danger rounded style={{ alignSelf: 'flex-end', margin: 10,marginBottom:30 }} onPress={this.addToCart}>
        <Icon
          name={'add-shopping-cart'}
          type={'MaterialIcons'}
        />
        <Text>Add To Cart</Text>
      </Button>
    )
  }

  render () {
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
            <Text style={styles.titleText}>
              Add Items
            </Text>
            </Body>
            <Right/>
          </Header>
        </GradientWrapper>
        <FlatList
          style={styles.container}
          data={this.state.data}
          extraData={this.state.selectedValue}
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
    items: state.brands && state.brands.payload.find(value => value.brandName.toLowerCase() === 'EVA'.toLowerCase()).items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (items) => dispatch(ShopRedux.addToCart(items))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItemScreen)
