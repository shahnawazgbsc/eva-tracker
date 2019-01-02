import React, { Component } from 'react'
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Row,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Picker,
  Right,
  Subtitle,
  Text
} from 'native-base'
import { Alert, FlatList, View } from 'react-native'
import { connect } from 'react-redux'
// Styles
import styles from './Styles/OrderSMSStyle'
import InventoryActions from '../Redux/InventoryTakingRedux'
import GradientWrapper from '../Components/GradientWrapper'
import Colors from '../Themes/Colors'
import numberToWords from '../Transforms/NumberToWords';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

var total = 0;
class OrderSMS extends Component {
  constructor(props) {
    super(props)
    this.state={
      totalAmount:0
    }
  }
render () {
    let item = this.props.navigation.getParam('orderItem')
    let inventoryDetails = this.props.navigation.getParam('inventoryDetails')
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
              <View style={styles.cardContainer}>
                <View style={{flexDirection:'row'}}>
                  <Text style={{fontWeight:"bold"}}>Bill To</Text>
                  <Text style={[styles.darkText,{marginLeft:30,color:'red'}]}>{this.props.userFirstName}</Text>
                </View>
                <Subtitle style={[styles.lightDarkText,{marginLeft:70}]}>{item.address+","}</Subtitle>
                <Text style={[styles.lightDarkText, {marginLeft:70}]}>{"P: "+item.contactNo}</Text>
                <Text style={[styles.lightDarkText, {marginLeft:70}]}>{"M: "+this.props.email}</Text>
                <View style={{marginTop:20,marginBottom:5}}>
                    <Text style={{textAlign:"center"}}>{"Dear "+this.props.userFirstName+", Thanks for Booking"}</Text>
                </View>
                <View>
                    <Text style={{textAlign:"center",marginBottom:5}}>{"Your order is booked as:"}</Text>
                </View>
                
                 <FlatList
                  renderItem={this.renderRow}
                  data={inventoryDetails}
                  extraData={inventoryDetails}
                  ListHeaderComponent={this.header}
                  ItemSeparatorComponent={this.separator}
                />
                <Text style={{textAlign:'right',fontWeight:'bold'}}>
                    {"Total: "+this.state.totalAmount};
                </Text>
                <Text style={{textAlign:'left',marginBottom:30,marginTop:15}}>
                    {"In Words: "+new numberToWords().convert(this.state.totalAmount)};
                </Text>
                <Text style={{textAlign:'center'}}>
                    THANKS FOR YOUR PAYMENT
                </Text>
                <View style={{justifyContent:'center',alignContent:'center'}}>
                  <Button danger rounded onPress={this.completeOrder} style={{margin:5,alignItems:'center',justifyContent:'center'}}>
                    <Text>Done</Text>
                  </Button>
                </View>
              </View>
            </CardItem>
          </Card>
        </Content>

      </Container>
    )
  }
  completeOrder = () => {
    this.props.navigation.navigate('ShopDetail')
  }
  header = () => {
    return (
      <View style={styles.listHeader}>
        <Text style={[styles.item2, { fontSize: 14, fontWeight: 'bold' }]}>Items</Text>
        <Text style={[styles.item3, { fontSize: 14, fontWeight: 'bold' }]}>Qty</Text>
        <Text style={[styles.item4, { fontSize: 14, fontWeight: 'bold' }]}>Price</Text>
      </View>
    )
  }
  
  separator = () => {
    return (
      <View style={[styles.divider, { marginVertical: 5 }]}
      />
    )
  }
  renderRow = ({item}) => {
    total+=item.netAmount
    this.setState({
      totalAmount:total
    })
    return(
      <View style={styles.listHeader}>
        <Text style={styles.item2}>{item.name}</Text>
        <Text style={styles.item3}>{item.quantity+" "+item.unit}</Text>
        <Text style={styles.item4}>{item.netAmount}</Text>
      </View>)
  }
  back = () => {
      this.props.navigation.goBack(null)
    }
}
const mapStateToProps = (state) => {
  return { brands: state.brands.payload,
  userFirstName: state.login.payload.user.firstname + ' ' + state.login.payload.user.lastname,
  email: state.login.payload && state.login.payload.user.email  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendInventory: (data) => dispatch(InventoryActions.inventoryRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSMS)