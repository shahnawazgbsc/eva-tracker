import React, { Component } from 'react'
import {
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Icon,
  Input,
  Item,
  Label,
  Picker,
  Subtitle,
  Text
} from 'native-base'
import { Alert, FlatList, View } from 'react-native'
import { connect } from 'react-redux'
// Styles
import styles from './Styles/InventoryScreenStyle'
import InventoryActions from '../Redux/InventoryTakingRedux'
import GradientWrapper from '../Components/GradientWrapper'
import Colors from '../Themes/Colors'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

var quantity = []
var unit = []
var selected = []
var brandNames = []
var selectedBrandNames = []

class InventoryScreen extends Component {
  SKUs = this.props.skus

  constructor (props) {
    super(props)

    this.props.inventorySKU()
    this.state = {
      selectedBrand: '',
      selectedBrandName: [],
      inventorySKU: null,
      quantity,
      unit,
      selected,
      expanded: [],
      selectedBrandIndex: 0
    }
    this.props.brands.map((value, index) => {
      brandNames[index] = value.brandName
    })
  }

  componentWillMount () {
  }

  brandSelector = ((itemValue, itemIndex) => this.setState({
    selectedBrand: itemValue,
    selectedBrandName: itemValue === '' ? null : this.props.brands[itemValue].brandName,
    inventorySKU: itemValue === '' ? null : this.getDataArray(itemValue),
    selectedBrandIndex: itemIndex - 1
  }))

  getDataArray = (category) => {
    if (this.SKUs != null && this.SKUs.length > 0) {
      return this.SKUs
    } else {
      return null
    }
  }

  componentDidMount () {
    quantity = this.props.brands.map(value => this.props.skus.map(value => 0))
    unit = this.props.brands.map(value => this.props.skus.map(value => 'Ltr'))
    selected = this.props.brands.map(value => this.props.skus.map(value => false))
    this.setState({ selected: selected })
    this.setState({ quantity: quantity })
    this.setState({ unit: unit })
  }

  back = () => {
    this.props.navigation.goBack(null)
  }

  submit = () => {
    let array = []
    let inventoryMap = {
      brandName: '',
      quantity: [],
      generalSKUId: []
    }
    this.state.selected.forEach((brands, index) => {
      inventoryMap.brandName = brandNames[index]
      brands.forEach((sku, brandIndex) => {
        array.push({
          ...inventoryMap,
          quantity: this.state.quantity[index][brandIndex],
          generalSKUId: this.state.inventorySKU[brandIndex].generalSKUId,
        })
      })
    })
    if (array.length > 0) {
      this.props.sendInventory({
        items: array,
        onSuccess: () => {
          Alert.alert(null, 'Inventory updated')
          this.props.navigation.goBack(null)
        },
        onFailure: () => {
          this.props.navigation.goBack(null)
        }
      })
    } else {
      Alert.alert(null, 'Please select items to submit')
    }
  }

  renderContent = ({ content, index }) => {
    return (
      <View
        style={{ paddingVertical: 10 }}>
        {
          <Item onPress={() => {
            let clone = JSON.parse(JSON.stringify(this.state.selected))
            clone[this.state.selectedBrandIndex][index] = !clone[this.state.selectedBrandIndex][index]
            this.setState({ selected: clone })
          }
          }>
            <Button transparent>
              <Icon
                style={{ color: Colors.fire, marginLeft: 0, marginRight: 0 }}
                name={this.state.selected[this.state.selectedBrandIndex][index] ? 'check-box' : 'check-box-outline-blank'}
                type={'MaterialIcons'}
              />
            </Button>
            <Text style={styles.itemProduct}>{content.itemName}</Text>
            <Item rounded style={styles.input}>
              <Input
                style={styles.inputText}
                value={this.state.quantity[this.state.selectedBrand][index]}
                onChangeText={text => {
                  if (!isNaN(text)) {
                    let clone = JSON.parse(JSON.stringify(this.state.quantity))
                    clone[this.state.selectedBrandIndex][index] = text
                    this.setState({ quantity: clone })
                  }
                }}
                keyboardType={'numeric'}
              />
            </Item>
            <Item rounded style={styles.input}>
              <Input
                style={styles.inputText}
                value={content.unit}
                disabled
                editable={false}
                onChangeText={text => {
                  let clone = JSON.parse(JSON.stringify(content.unit))
                  clone[index] = text
                  this.setState({ unit: clone })
                }}
              />
            </Item>
          </Item>
        }
      </View>
    )
  }

  keyExtractor = (item, index) => index

  renderRow = ({ item, index }) => {
    return (
      <View>
        {this.renderContent({ content: item, index })}
      </View>
    )
  }

  render () {
    let item = this.props.navigation.getParam('item')
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
              <Icon name={'arrow-back'}/>
            </Button>
            <View style={{ marginVertical: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon
                style={styles.headerIcon}
                name={'graph-bar'}
                type={'Foundation'}
              />
              <Text style={styles.headerText}>Inventory Taking</Text>
            </View>
          </View>
        </GradientWrapper>
        <Content padder>
          <Card>
            <CardItem>
              <View style={styles.cardContainer}>
                <Text style={styles.darkText}>{item.shopName}</Text>
                <Subtitle style={styles.lightDarkText}>{item.address}</Subtitle>
                <Button transparent>
                  <Icon style={[styles.lightDarkText, styles.iconPhone]} name={'phone-square'} type={'FontAwesome'}
                  />
                  <Text style={[styles.lightDarkText, { marginTop: 10, flexWrap: 'wrap' }]}>{item.contactNo}</Text>
                </Button>

                {
                  this.props.brands && this.props.brands.length > 0 &&
                  <Item picker bordered={false} fixedLabel style={{ borderBottomWidth: 0 }}>
                    <Label>Select Brand: </Label>
                    <Card style={{ flex: 1 }}>
                      <Picker
                        mode={'dropdown'}
                        style={{ flex: 1 }}
                        placeholder={'Select Brand'}
                        selectedValue={this.state.selectedBrand}
                        onValueChange={this.brandSelector}
                      >
                        <Picker.Item
                          label='Select Brand'
                          value=''
                          key='0'
                        />
                        {
                          this.props.brands.map((value, index) => (
                            <Picker.Item
                              label={value.brandName}
                              value={index}
                              key={index + 1}
                            />
                          ))
                        }
                      </Picker>
                    </Card>
                  </Item>
                }
                {
                  !!this.state.inventorySKU &&
                  <React.Fragment>
                    <View style={{ paddingVertical: 10 }}>
                      <Item>
                        <Text style={[styles.itemProduct, styles.itemsTitle]}>Product name</Text>
                        <Text style={[styles.itemQty, styles.itemsTitle]}>Quantity</Text>
                        <Text style={[styles.itemUnit, styles.itemsTitle]}>Unit</Text>
                      </Item>
                    </View>
                    <FlatList
                      style={styles.accordion}
                      keyExtractor={this.keyExtractor}
                      data={this.state.inventorySKU}
                      extraData={this.state}
                      renderItem={this.renderRow}
                    />
                    <Button danger style={styles.button} rounded onPress={this.submit}>
                      <Text>Submit</Text>
                    </Button>
                  </React.Fragment>
                }
              </View>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    brands: state.brands.payload,
    skus: state.inventory.inventorySKUs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendInventory: (data) => dispatch(InventoryActions.inventoryRequest(data)),
    inventorySKU: () => dispatch(InventoryActions.inventory_sku_request())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryScreen)
