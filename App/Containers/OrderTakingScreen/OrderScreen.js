import * as React from 'react'
import {View,Platform} from 'react-native'
import Header from '../../Components/Header/Header'
import {Text,Card,List,ListItem,Body,Left,Right,Icon,Thumbnail, Button} from 'native-base'
import {connect} from 'react-redux'
import {Colors} from '../../Themes'

class OrderScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            selected="Product",
            productName="Test Product",
            productQuantity="0.00",
            total:"0.00"
        }
        this.saveProps(props)
    }
    componentWillMount() {

    }
    componentWillReceiveProps(newProps) {
        this.saveProps(newProps)

    }
    saveProps (props) {
        const map = new Map()
        if (props.items) {
          props.items.forEach(value => map.set(value, true))
        }
    
        this.setState({
          items: [[
              "Ltrs/Mes 100.00",
              "Ltrs/Mes 100.00",
              "Ltrs/Mes 100.00",
              "Ltrs/Mes 100.00",
              "Ltrs/Mes 100.00",
              "Ltrs/Mes 100.00",
              "Ltrs/Mes 100.00",
              "Ltrs/Mes 100.00",
          ]],
          selected: map,
          total:"0.00"
        })
        this.setState(this.state)
      }
    render() {
        <View>
            <Header pressHandler={this.addNewItem.bind(this)} screen = 'booking order' />
            <Card>
                <Form>
                    <Left>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: undefined }}
                                placeholder="Product"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selectedProduct}
                                onValueChange={this.onProductSelect.bind(this)}
                            >
                            <Picker.Item label="Eva" value="key3" />
                            <Picker.Item label="Dalda" value="key4" />
                            <Picker.Item label="Supreme" value="key5" />
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
                    <List>
                        <ListItem thumbnail>
                            <Left>
                                <Thumbnail square source={{}} />
                                <Text>{this.state.productName}</Text>
                            </Left>
                            <Body>
                                <List dataArray={this.state.items}
                                    renderRow={(item) =>
                                    <ListItem>
                                        <Text>{item}</Text>
                                    </ListItem>
                                    }>
                                </List>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <Icon name='delete' type='MaterialIcons'/>
                                </Button>
                            </Right>
                        </ListItem>
                    </List>
                </Card>
            <View style={{flexDirection:'row',backgroundColor:Colors.menu}}>
                    <Right>
                        <Button danger>
                            <Text>Checkout</Text>
                        </Button>
                    </Right>
                    <Left>
                        <Text>{"TOTAL PAYMENT = "+this.state.total }</Text>
                    </Left>
            </View>
        </View>
    }
    onValueChange(value) {
        this.setState({
            selected:value
        })
    }
    renderPicker() {
        if(Platform.OS === 'ios') {
            return(
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    placeholder="Product"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    style={{ width: undefined }}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                >
            </Picker>
            )
        }
        else {
            return(
                <Picker
                    note
                    mode="dropdown"
                    style={{ width: 120 }}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                >
            </Picker>
            )
        }
    }
    addNewItem() {

    }
}
const mapStateToProps = (state) => {
  return {
    items: state.createStore && state.createStore.items,
    productName: state.createStore && state.createStore.productName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectItems: (payload) => dispatch(CreateStoreAction.selectItems(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen)