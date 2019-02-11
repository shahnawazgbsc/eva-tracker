import React, { Component } from 'react'
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text } from 'native-base'
import { FlatList, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Styles
import styles from './Styles/InventoryScreenStyle'
import GradientWrapper from '../Components/GradientWrapper'
import Colors from '../Themes/Colors'
import shopHistoryIcon from '../Images/Icons/shop-history.png'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import ShopHistoryAction from '../Redux/ShopHistoryRedux'
import moment from 'moment';

class ShopHistory extends Component {
  constructor (props) {
    super(props)
    this.SampleNameArray = [ "Last Visit", "2nd Last Visit" ];
    this.state = {
      selectedBrand: '',
      quantity: '',
      unit: '',
      accordionData: [{ name: 'Last Visit', open: false }, { name: '2nd Last Visit', open: false }],
      selected: '',
      expanded: [],
      data: [],
      open: false,
      extends: [],
      storeId:''
    }
  }

  componentDidMount() {

    console.log(this.props.data,'DATA cOMPONET DID mOUNT')
    const { shopHistorySuccess, shopStoreId } = this.props;

    // if (shopStoreId && shopStoreId.shop && shopStoreId.shop.storeId) {
    //   shopHistorySuccess(shopStoreId.shop.storeId)

    // }
    const { navigation } = this.props;
    const StoreID = navigation.getParam('StoreID', 'NO-ID');
  if (StoreID){

      shopHistorySuccess(StoreID)


  }


  }
  componentWillReceiveProps(nextprops) {
    this.setState({ data: nextprops.data.history.data }, () => {

    })
  }



  keyExtractor = (item, index) => index

  renderContent = (data) => {
    let totalAmount = 0;

    var gmtDateTime = moment.utc(data.visitDateTime, "YYYY-MM-DD HH:mm")
    var local = gmtDateTime.local().format('hh:mma');

    return (

      <View style={{ backgroundColor: 'white', margin: 20 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={{ fontSize: 13, flex: 1, fontWeight: 'bold', color: '#676767' }}>Visited By: </Text>
            <Text style={{ fontSize: 13, flex: 3, color: '#616161' }}>{data.visitedBy}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignContent: 'space-between', flex: 2 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#676767' }}>Visit Date : </Text>
              <Text style={{ fontSize: 13, color: '#616161' }}>{((moment(new Date(data.visitDateTime)).format("MM/DD/YYYY HH:mm")))}</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#676767' }}>Visit Time : </Text>
              <Text style={{ fontSize: 13, color: '#616161' }}>{(local)}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#676767' }}>Bill To </Text>
            <Text style={{ fontSize: 15, marginLeft: 5, color: '#005B2D' }}>{data.billedTo}</Text>
          </View>
          {/* <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#676767' }}>Bill Date : </Text>
            <Text style={{ fontSize: 13, color: '#616161' }}>{(data.billDate == null ?  "" : (new Date(data.billDate).getDate() + '-' + (new Date(data.billDate).getMonth() + 1) + '-' + new Date(data.billDate).getFullYear()))}</Text>
          </View> */}
        </View>
        <View style={{ borderColor: 'black', borderBottomWidth: 1, marginTop: 10, flex: 1 }}>
          <View style={{
            flexDirection: 'row',
            alignConten: 'space-around',
            flex: 1,
            borderBottomWidth: 0.2,
            borderColor: 'black',
            marginVertical: 5,
            justifyContent: 'center'
          }}>
            <View style={{ flex: 3 }}><Text style={{ fontSize: 13, fontWeight: 'bold', color: '#676767' }}>Items</Text></View>
            <View style={{ flex: 2.5 }}><Text style={{ fontSize: 13, fontWeight: 'bold', color: '#676767' }}>Qty</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: '#676767',
                alignSelf: 'flex-end'
              }}>Price</Text></View>
          </View>
          {data.items.map((item, ind) => {

            totalAmount += item.netAmount;
            return (
              <View style={{ flexDirection: 'row', flex: 1, marginVertical: 5, alignItems: 'center' }}>
                <View style={{ flex: 3 }}>
                  <Text style={{ fontSize: 12, color: '#616161' }}>{item.itemName}</Text>
                </View>
                <View style={{ flex: 2.5 }}>
                  <Text style={{ fontSize: 13, color: '#616161' }}>{item.quantity + " " + item.packType}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                  <Text style={{ fontSize: 13, color: '#616161', alignSelf: 'flex-end' }}>{item.netAmount}</Text>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#616161', marginTop: 3 }}>.00</Text>
                </View>
              </View>
            )
          })}
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          flex: 1,
          marginVertical: 5,
          alignContent: 'center'
        }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#676767' }}>Total = </Text>
          <Text style={{ fontSize: 13, color: '#616161' }}>{totalAmount}</Text>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#616161', marginTop: 3 }}>.00</Text>
        </View>
      </View>
    )

  }
  renderRow = ({ item, index }) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={{
          flexDirection: 'row',
          width: '100%',
          flex: 1,
          backgroundColor: Colors.white,
          height: 50,
          borderRadius: 8,
          alignContent: 'center',
          justifyContent: 'center',
          borderBottomWidth: 1,
          borderColor: Colors.charcoal
        }}
          onPress={() => {
            if (this.state.open === index) this.setState({ open: false })
            else this.setState({ open: index })
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center', marginLeft: 20 }}>
            <Text
              style={{
                fontSize: 16,
                color: Colors.black,
                fontWeight: 'bold'
              }}
            >{this.SampleNameArray[index]}</Text>
          </View>
          
          <View style={{ flex: 2, alignContent: 'flex-end', justifyContent: 'center' }}>

            <Icon
              style={{ alignSelf: 'flex-end', marginRight: 16 }}
              name={this.state.open === index ? 'md-arrow-dropup' : 'md-arrow-dropdown'}
            />
          </View>
        </TouchableOpacity>
        {this.state.open === index ? this.renderContent(item) : null}
      </View>
    );
  };

  back = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    return (
      <Container style={{ backgroundColor: Colors.silver }}>
        <GradientWrapper>
          <Header style={styles.header}>
            <Left>
              <Button transparent light onPress={this.back}>
                <Icon name={'arrow-back'}
                />
                <Text>Back</Text>
              </Button>
            </Left>
            <Body style={{ alignSelf: 'flex-start', marginTop: 18 }}>
            <Text style={styles.titleText}>Shop History</Text>
            </Body>
            <Right
            />
          </Header>
        </GradientWrapper>
        <Content padder>
          <FlatList
            style={styles.accordion}
            keyExtractor={this.keyExtractor}
            data={this.state.data}
            extraData={this.state}
            renderItem={this.renderRow}
          />
        </Content>

      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state,
    shopStoreId: state.shop
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    shopHistorySuccess: (params) => dispatch(ShopHistoryAction.shopHistoryRequest(params))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShopHistory)
