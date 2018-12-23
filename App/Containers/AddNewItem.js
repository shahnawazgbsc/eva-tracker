import * as React from 'react'
import { View } from 'react-native'
import {
  Body,
  Button,
  Card,
  CheckBox,
  Form,
  Icon,
  Item,
  Left,
  List,
  ListItem,
  Picker,
  Right,
  Text,
  Thumbnail
} from 'native-base'
import Header from '../Components/Header/Header'
import { SimpleStepper } from 'react-native-simple-stepper'

export default class AddNewItem extends React.Component {
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

  render () {
    return (
      <View>
        <Header screen='add order'/>
        <Form>
          <Item picker>
            <Picker
              mode='dropdown'
              iosIcon={<Icon name='ios-arrow-down-outline'/>}
              style={{ width: undefined }}
              placeholder='Select Category'
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor='#007aff'
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)}
            >
              <Picker.Item label='Ghee' value='key0'/>
              <Picker.Item label='Oil' value='key1'/>
              <Picker.Item label='Butter' value='key2'/>
            </Picker>
          </Item>
        </Form>
        {this.renderItem()}
        <Right>
          <Button rounded danger>
            <Text>Danger</Text>
          </Button>
        </Right>
      </View>
    )
  }

  renderItem () {
    if (this.state.select) {
      return (
        <Card>
          <Form>
            <Left>
              <Item picker>
                <Picker
                  mode='dropdown'
                  iosIcon={<Icon name='ios-arrow-down-outline'/>}
                  style={{ width: undefined }}
                  placeholder='Product'
                  placeholderStyle={{ color: '#bfc6ea' }}
                  placeholderIconColor='#007aff'
                  selectedValue={this.state.selectedProduct}
                  onValueChange={this.onProductSelect.bind(this)}
                >
                  <Picker.Item label='Eva' value='key3'/>
                  <Picker.Item label='Dalda' value='key4'/>
                  <Picker.Item label='Supreme' value='key5'/>
                </Picker>
              </Item>
            </Left>
            <Body>
            <Item inlineLabel>
              <Label>Order Qty</Label>
            </Item>
            </Body>
            <Right>
              <Item inlineLabel>
                <Label>SU</Label>
              </Item>
            </Right>
          </Form>
        </Card>
      )
    } else {
      return (
        <View style={{ height: 0 }}/>
      )
    }
  }

  renderProduct () {
    if (this.state.productSelect) {
      return (
        <Card>
          <Left>
            <Thumbnail square source={{}}/>
            <Text>{this.state.selectedProduct}</Text>
          </Left>
          <Body>
          <SimpleStepper
            value={this.state.quantity}
            valueChanged={quantity => this.quantityChanged(quantity)}
            initialValue={0}
            minimumValue={0}
            stepValue={1}
          />
          <List
            ataArray={this.state.items}
            renderRow={(item) =>
              <ListItem>
                <Text>{item}</Text>
              </ListItem>
            }
          />
          </Body>
          <Right>
            <View style={{ flexDirection: 'row', flex: 5 }}>
              <Text style={{ flex: 3 }}>CTN</Text>
              <View style={{ flex: 2 }}>
                <CheckBox
                  checked={this.state.checked}
                  onPress={this.onChecked.bind(this)}/>
              </View>
            </View>
            <List
              dataArray={this.state.items}
              renderRow={(item) =>
                <ListItem>
                  <Text>{item}</Text>
                </ListItem>
              }/>
          </Right>
        </Card>
      )
    } else {
      return (
        <View style={{ height: 0 }}/>
      )
    }
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
