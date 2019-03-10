import * as React from 'react'
import { ActivityIndicator,Modal,Alert, BackHandler, FlatList, Image, View,AsyncStorage } from 'react-native'
import { withNavigationFocus } from 'react-navigation'
import { Body, Button, Card, CardItem, Container, Header, Icon, Left, Right, Subtitle, Text, Title } from 'native-base'
import { connect } from 'react-redux'
import GradientWrapper from '../../Components/GradientWrapper'
import styles from './ShopProfileStyle'
import { Images } from '../../Themes'
import ParseImagePath from '../../Lib/ParseImagePath'
import ShopRedux from '../../Redux/ShopRedux'
import InventoryActions from '../../Redux/InventoryTakingRedux'
import moment from 'moment'
import * as R from 'ramda'
import {isConnectedToInternet} from '../../util/CheckInternetConnectivity'
import extractModuleFeatures from '../../Lib/extractModuleFeatures'
import realm from '../../Database/realm';

class ShopProfile extends React.Component {
  constructor (props) {
    super(props)
    var checkedIn = realm.objects('CheckIn').filtered('StoreId == $0 AND Status == $1',
      this.props.navigation.getParam('item').storeId.toString(),"Pending").slice(0)
    this.state = {
      enabledOptions: [
        { title: 'Check In', icon: 'log-in', type: '' },
        { title: 'Check Out', icon: 'log-out', type: '' },
        { title: 'Inventory Taking', icon: 'clipboard', type: 'FontAwesome' },
        { title: 'Order Taking', icon: 'add-shopping-cart', type: 'MaterialIcons' },
        { title: 'Gift Order', icon: 'gift', type: 'FontAwesome' },
        { title: 'Market Survey', icon: 'analytics', type: '' },
        { title: 'Merchandising', icon: 'cube', type: '' },
        { title: 'Shop Query', icon: 'question-circle', type: 'FontAwesome' },
        { title: 'Sync', icon: 'sync', type: 'MaterialIcons' }
      ],
      checkedIn:checkedIn.length > 0?checkedIn[0].checkedIn : false,
      visible:false
    }
  }

  render () {
    return (
      <Container>
      <Modal
            visible={this.state.visible}
            transparent
            onRequestClose={()=>{console.log("closing modal")}}
        >
        
            <View style={styles.containerStyle}>
                <View style={styles.dialogContainer}>
                    <Card>
                        <Text style={styles.textStyle}>
                            "Synchronizing"
                        </Text>
                    </Card>
                    <Card>
                      <ActivityIndicator size={'large'} />
                    </Card>
                </View>
            </View>
            
        </Modal>
        <GradientWrapper>
          <Header style={[styles.header, styles.headerExtra]}>
            <Left style={{ alignSelf: 'flex-start' }}>
              <Button transparent light onPress={this.handleBack}>
                <Icon
                  name={'arrow-back'}
                />
                <Text>Back</Text>
              </Button>
            </Left>
            <Body style={{ alignSelf: 'flex-start', marginTop: 10 }}>
            <Text style={styles.titleText}>Shop Profile</Text>
            </Body>
            <Right
            />
          </Header>
        </GradientWrapper>

        <FlatList
          style={styles.listStyle}
          ListHeaderComponent={this.header}
          numColumns={2}
          data={this.state.enabledOptions}
          extraData={this.state.checkedIn}
          renderItem={this.renderItem}
        />

      </Container>
    )
  }

  header = () => {
    const item = this.props.navigation.getParam('item')
    return (
      <Card style={styles.cardHeaderContainer}>
        <CardItem cardBody style={styles.cardItem}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={
                item.imageUrl ? { uri: ParseImagePath(item.imageUrl) } : Images.logo
              }
              resizeMode={'cover'}
            />
          </View>
          <View style={{ display: 'flex', flex: 1 }}>
            <Title style={styles.darkText}>{item.shopName}</Title>
            <Subtitle style={styles.lightDarkText}>{item.address}</Subtitle>
            <Button transparent>
              <Icon style={[styles.lightDarkText, styles.iconPhone]} name={'phone-square'} type={'FontAwesome'}
              />
              <Text style={[styles.lightDarkText, { marginTop: 10, flexWrap: 'wrap', flex: 1 }]}>{item.contactNo}</Text>
            </Button>
            <Button
              disabled={!this.props.hasHistory} small success
              onPress={() => { this.props.navigation.navigate('ShopHistory', { StoreID: item.storeId }) }}
              style={{ marginLeft: 100, marginRight: 8, marginBottom: 4, paddingBottom: 10 }}>
              <Icon style={[styles.HistoryButton, styles.iconPhone]} name={'history'} type={'FontAwesome'}
              />
              <Text uppercase={false} style={[styles.HistoryButton, {
                marginTop: 8,
                flexWrap: 'wrap',
                flex: 1,
                color: 'white'
              }]}>History</Text>
            </Button>

          </View>
        </CardItem>
      </Card>)
  }

  componentDidMount (): void {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount (): void {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    if (!this.state.checkedIn || !this.props.isFocused) {
      this.props.navigation.goBack(null)
    }
    return true
  }

  renderItem = ({ item }) => {
    let button = false
    if (item.title === 'Check In') button = !this.state.checkedIn
    else if (item.title === 'Check Out') button = this.state.checkedIn
    else if (item.title === 'Order Taking') button = this.props.hasOrderTaking
    else if (item.title === 'Inventory Taking') button = this.props.hasInventoryTaking
    else if (item.title === 'Sync') button = this.props.hasOrderTaking

    return (
      <Card style={button ? styles.cardChildContainer : styles.cardChildContainerDisabled}>
        <CardItem button={__DEV__ || button} cardBody style={styles.cardChildItem} onPress={() => {
          switch (item.title) {
            case 'Order Taking':
              if (this.state.checkedIn) {
                this.props.navigation.navigate('OrderTaking', { extraItem: this.props.navigation.getParam('item') })
              } else {
                Alert.alert(null, 'Please check in first to place order')
              }
              break
            case 'Inventory Taking':
              if (this.state.checkedIn) {
                this.props.navigation.navigate('Inventory', { item: this.props.navigation.getParam('item') })
              } else {
                Alert.alert(null, 'Please check in first to place order')
              }
              break
            case 'Check In':
              this.setState({checkedIn:true})
              var items = this.props.navigation.getParam('item')
              AsyncStorage.multiGet(['companyId','latitude','longitude']).then((response)=>{
                const companyId = response[0][1]
                const latitude = response[1][1]
                const longitude = response[2][1]
                  realm.write(()=>{
                    realm.create("CheckIn",{
                        StoreId: items.storeId.toString(),
                        pjp: !!items.pjp,
                        companyId:companyId,
                        latitude:latitude,
                        longitude:longitude,
                        ContactPersonName: '',
                        ContactNo: '',
                        StartTime: moment().format("MM/DD/YYYY HH:mm"),
                        Status: 'Pending',
                        NextScheduledVisit: '',
                        productive: false,
                        checkedIn:true,stat:false
                    },true)
                  })
              })
              break
            case 'Check Out':
              var checkedIn = realm.objects('CheckIn').filtered('StoreId == $0 AND Status == $1',
                this.props.navigation.getParam('item').storeId.toString(),"Pending").slice(0)
              if (this.props.orderPlaced) {
              var items = this.props.navigation.getParam('item')
                  realm.write(()=>{
                    realm.create("CheckIn",{
                        StoreId: checkedIn[0].StoreId,
                        pjp: !!items.pjp,
                        companyId:checkedIn[0].companyId,
                        latitude:checkedIn[0].latitude,
                        longitude:checkedIn[0].longitude,
                        ContactPersonName: '',
                        ContactNo: '',
                        NextScheduledVisit: '',
                        Location: '',
                        Notes: '',
                        StartTime:checkedIn[0].StartTime,
                        EndTime: moment().format("MM/DD/YYYY HH:mm"),
                        checkedIn:false,
                        productive:true,
                        stat:false
                    },true)
                  })
              this.setState({checkedIn:false})
              } else {
                this.props.navigation.navigate('Reason', { checkedIn:checkedIn })
              }
              break
              case 'Sync':
                isConnectedToInternet(
                  ()=>{
                    if(!this.state.checkedIn) {
                    this.setState({
                      visible:true
                    })
                    var shopsToCheckIn = realm.objects('CheckIn')
                      .filtered('Status==$0 AND stat == $1',"Pending",false).slice(0);
                      var inventory = realm.objects('Inventory').filtered("status==$0",false)
                      if(shopsToCheckIn.length > 0) {
                      AsyncStorage.getItem("userId").then((response)=>{
                      for(var iter in shopsToCheckIn) {
                      var orders = realm.objects('Order').filtered("status==$0 AND StoreId == $1",
                      false,shopsToCheckIn[iter].StoreId).slice(0)
                      var noorderreasons = realm.objects('NoOrderReason').filtered("status==$0 AND StoreId == $1",
                      false,shopsToCheckIn[iter].StoreId).slice(0)
                        this.props.checkIn(shopsToCheckIn[iter])
                        if(noorderreasons.length > 0) {
                          for(var itera in orders) {
                            this.props.placeOrder(
                              { 
                                items: [{ noorderreason: noorderreasons[iter].reason }],
                                onSuccess: () => {
                                  realm.write(()=>{
                                    realm.create("Order",{
                                      id:noorderreasons[itera].id,
                                      StoreId:shopsToCheckIn[iter].StoreId,
                                      status:true,
                                    },true)
                                  })
                                } 
                              })
                          }
                        } 
                        if(orders.length > 0) {
                          for(var count in orders) {
                        this.props.placeOrder({
                          items: [{ quantity: orders[count].quantity, 
                            inventoryItemId: orders[count].inventoryItemId,
                            extraDiscount: orders[count].extraDiscount}],
                            checkIn:shopsToCheckIn[iter],
                            userId:response,
                            onSuccess: () => {
                             realm.write(()=>{
                               realm.create("Order",{
                                 id:orders[count].id,
                                 StoreId:shopsToCheckIn[iter].StoreId,
                                 status:true,
                               },true)
                             })
                            }
                        })
                          }
                        }
                        if(inventory.length > 0) {
                          this.props.sendInventory({
                            items: inventory[iter].inventories,
                            checkIn:shopsToCheckIn[iter],
                            onSuccess: () => {
                              realm.write(()=>{
                               realm.create("Inventory",{
                                 StoreId:shopsToCheckIn[iter].StoreId,
                                 status:true,
                               },true)
                             })
                            },
                            onFailure: () => {
                              this.props.navigation.goBack(null)
                            }
                          })
                        }
                         this.props.checkOut({
                           onSuccess: () => {
                             realm.write(()=>{
                               realm.create("CheckIn",{
                                 StoreId:shopsToCheckIn[iter].StoreId,
                                 Status:'Achieved',
                                 stat:true,
                               },true)
                             })
                             this.props.navigation.goBack(null)
                           
                           },
                           shop: shopsToCheckIn[iter],
                           userId:response
                         })
                          this.setState({
                            visible:false
                          })
                          alert("Sync completed successfully")
                      }

                      })
                      }
                      else {
                          this.setState({
                            visible:false
                          })
                        alert("All of your items are synced with sever.")
                      }
                  }
                  else {
                    alert("Checkout to sync")
                  }
                  },
                  ()=>{
                    alert("You are not connected to internet, try again.")
                  }
                )
              break;
          }
        }}>
          <Icon
            style={button ? styles.childIcon : styles.childIconDisabled}
            type={item.type}
            name={item.icon}
          />
          <Text>{item.title}</Text>
        </CardItem>
      </Card>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  let screens = extractModuleFeatures(state)
  return {
    //checkedIn: state.shop && state.shop.checkedIn,
    orderPlaced: state.shop && state.shop.orderPlaced,
    hasInventoryTaking: R.contains('Inventory Taking', screens),
    hasOrderTaking: R.contains('Order Taking', screens),
    hasHistory: R.contains('Shop History', screens)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkIn: (data) => dispatch(ShopRedux.checkInRequest(data)),
    checkOut: (data) => dispatch(ShopRedux.checkOutRequest(data)),
    placeOrder: (data) => dispatch(ShopRedux.placeOrderRequest(data)),
    sendInventory: (data) => dispatch(InventoryActions.inventoryRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(ShopProfile))
