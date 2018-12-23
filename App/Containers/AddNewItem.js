import * as React from 'react'
import { View,FlatList,Image } from 'react-native'
import {
  Button,
  Card,
  CheckBox,
  Icon,
  Item,
  Text,
  Container,
  CardItem,
  Footer,
  Input
} from 'native-base'
import GradientWrapper from '../Components/GradientWrapper'
import styles from './Styles/AddNewItemScreenStyle'
import {Colors,Images} from '../Themes'
import {connect} from 'react-redux'
import { Row } from 'react-native-easy-grid';

const items=[
  {
    "brandName": "Mamtay",
    "items": [
      {
        "inventoryItemId": 22,
        "name": "3 Ltr Pet",
        "itemCode": "IC00006",
        "description": "654",
        "unitPrice": 654,
        "packTypeInPackageType": 654,
        "dose": "654",
        "minLevel": 654,
        "costPrice": 654,
        "retailPrice": 6554,
        "purchaseDate": "2018-10-01T00:00:00",
        "tradeOfferAmount": 4554,
        "unit": "Tin",
        "packType": null,
        "packSize": null,
        "packageType": null
      },
      {
        "inventoryItemId": 23,
        "name": "3 Ltr Pet",
        "itemCode": "IC00007",
        "description": "1212",
        "unitPrice": 122,
        "packTypeInPackageType": 11,
        "dose": "22",
        "minLevel": 1,
        "costPrice": 234,
        "retailPrice": 24,
        "purchaseDate": "2018-10-16T00:00:00",
        "tradeOfferAmount": 124,
        "unit": "Tin",
        "packType": "sdf",
        "packSize": 45,
        "packageType": "jf"
      }
    ]
  },
  {
    "brandName": "Dalda",
    "items": []
  },
  {
    "brandName": "Eva",
    "items": [
      {
        "inventoryItemId": 19,
        "name": "Oil Pouch",
        "itemCode": "IC00003",
        "description": "as",
        "unitPrice": 123,
        "packTypeInPackageType": 123,
        "dose": "123",
        "minLevel": 123,
        "costPrice": 321,
        "retailPrice": 123,
        "purchaseDate": "2018-09-12T19:00:00",
        "tradeOfferAmount": 123,
        "unit": "Cann",
        "packType": "sdf",
        "packSize": 45,
        "packageType": "iu"
      },
      {
        "inventoryItemId": 20,
        "name": "Ghee Pouch",
        "itemCode": "IC00004",
        "description": "123",
        "unitPrice": 123,
        "packTypeInPackageType": 123,
        "dose": "123",
        "minLevel": 123,
        "costPrice": 123,
        "retailPrice": 123,
        "purchaseDate": "2018-10-30T00:00:00",
        "tradeOfferAmount": 123,
        "unit": "Pet",
        "packType": "sdf",
        "packSize": 45,
        "packageType": "iu"
      },
      {
        "inventoryItemId": 21,
        "name": "3 Ltr Pet",
        "itemCode": "IC00005",
        "description": "123",
        "unitPrice": 123,
        "packTypeInPackageType": 123,
        "dose": "123",
        "minLevel": 123,
        "costPrice": 12,
        "retailPrice": 123,
        "purchaseDate": "2018-10-16T00:00:00",
        "tradeOfferAmount": 123,
        "unit": "Pet",
        "packType": "sdf",
        "packSize": 45,
        "packageType": "iu"
      }
    ]
  },
  {
    "brandName": "Habib Oil",
    "items": []
  },
  {
    "brandName": "Olive",
    "items": []
  },
  {
    "brandName": "Canola",
    "items": []
  },
  {
    "brandName": "Coconut",
    "items": []
  },
  {
    "brandName": "A Oil",
    "items": []
  },
  {
    "brandName": "Soya Supreme",
    "items": []
  }
]

class AddNewItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected2: undefined,
      selectedProduct: undefined,
      select: false,
      productSelect: false,
      quantity: 0,
      items: [
        'Ltrs/Mes',
        'Ltrs/Mes',
        'Ltrs/Mes',
        'Ltrs/Mes',
        'Ltrs/Mes',
        'Ltrs/Mes',
        'Ltrs/Mes',
        'Ltrs/Mes'
      ],
      checked: false
    }
  }

  onValueChange2 (value) {
    this.setState({
      selected2: value,
      select: true
    })
  }

  onProductSelect = (value) => {
    this.setState({
      selectedProduct: value,
      productSelect: true
    })
  }
  header = () => {
    return (
      <View style={styles.listHeader}>
        <Icon style={[styles.item1, { color: Colors.success }]} name={'arrow-dropdown'}
        />
        <Text style={[styles.item2, { fontSize: 14, fontWeight: 'bold' }]}>Product</Text>
        <Text style={[styles.item3, { fontSize: 14, fontWeight: 'bold' }]}>Qty</Text>
        <Text style={[styles.item4, { fontSize: 14, fontWeight: 'bold' }]}>SU</Text>
        <View style={styles.item5}/>
      </View>
    )
  }
  renderRow = ( {item} ) => {
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
            <Item style={styles.item3} rounded>
              <Input placeholder='Rounded Textbox'/>
            </Item>
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
            <Item style={styles.item4} rounded>
              <Input placeholder='Rounded Textbox'/>
            </Item>
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
        <CheckBox/>
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
            onPress={this.menu}
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
            <Text style={styles.headerText}>Add To Cart</Text>
          </View>
        </View>
      </GradientWrapper>

        <View style={styles.containerContent}>
          {
            !!items[0].items &&
            <Card>
              <CardItem>
                <FlatList
                  renderItem={this.renderRow}
                  data={items[0].items}
                  ListHeaderComponent={this.header}
                  ItemSeparatorComponent={this.separator}
                />
              </CardItem>
            </Card>
          }
        </View>
        <GradientWrapper>
          <Footer style={[styles.header, styles.footer]}>
            <Button danger>
              <Icon
                name={'arrow-dropleft'}
              />
              <Text>Add To Cart</Text>
            </Button>
          </Footer>
        </GradientWrapper>
      </Container>
    )
  }
  quantityChanged (quantity) {
    this.setState({
      quantity: quantity
    })
  }

  onChecked () {
    this.setState({
      checked: !this.state.checked
    })
  }
}

const mapStateToProps = (state) => {
  return {
    //items: state.brands && state.brands.payload[2].items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewItem)
