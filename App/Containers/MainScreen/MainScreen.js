import React from 'react'
import { Alert, AsyncStorage } from 'react-native'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { Body, Button, ActionSheet, Container, Footer, Header, Icon, Left, Right, Text } from 'native-base'
import MapView from 'react-native-maps'
import { Colors, Images } from '../../Themes'
import StoresRedux from '../../Redux/StoresRedux'
import InventoryRedux from '../../Redux/InventoryTakingRedux'
import ShopRedux from '../../Redux/ShopRedux'
import GpsLocationRedux from '../../Redux/GpsLocationRedux'
import GradientWrapper from '../../Components/GradientWrapper'
import styles from './MainScreenStyle'
import LoginRedux from '../../Redux/LoginRedux'
import extractModuleFeatures from '../../Lib/extractModuleFeatures'
import AppConfig from '../../Config/AppConfig' 
import realm from '../../Database/realm'

class MainScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.request()
    this.props.inventorySKUs()
    this.props.nonProductiveReasons()
  }

  menu = () => {
    if (this.props.dayStarted) {
      this.props.navigation.openDrawer()
    }
  }
  componentWillReceiveProps(newProps) {
      var shops = [];
      var brands = [];
      var skus = []
       if(newProps.userDetails!=null) {
         AsyncStorage.multiSet([
           ["companyId",newProps.userDetails.payload.user.companyid.toString()],
           ["userId",newProps.userDetails.payload.user.userid.toString()]
         ])
      }
      if(newProps.latitude != null) {
        AsyncStorage.multiSet([
          ["latitude",newProps.latitude.toString()],
          ["longitude",newProps.longitude.toString()]
        ])
      }
      realm.write(()=>{
        if(newProps.Reasons!=null) {
          for(var iter in newProps.Reasons) {
          realm.create('NonProductiveReasons',{
            id:newProps.Reasons[iter].nonproductiveVisitReasonId.toString(),
            reason:newProps.Reasons[iter].reason,
            companyId:newProps.Reasons[iter].companyId.toString()
          },true)
        }
        }
        if(newProps.items != null) {
          for(var iter in newProps.items) {
            for(var itera in newProps.items[iter].items) {
              var items = realm.objects("InventoryItems").filtered("inventoryItemId == $0",
              newProps.items[iter].items[itera].inventoryItemId).slice(0);
              if(items.length == 0) {
                realm.create('InventoryItems',{
                  brandName: "N/A",
                  name: newProps.items[iter].items[itera].name,
                  productType: newProps.items[iter].productType,
                  inventoryItemId: newProps.items[iter].items[itera].inventoryItemId,
                  itemCode: newProps.items[iter].items[itera].itemCode,
                  unitPrice: newProps.items[iter].items[itera].unitPrice,
                  tradeOfferAmount: newProps.items[iter].items[itera].tradeOfferAmount,
                  unit: newProps.items[iter].items[itera].unit,
                  packType:newProps.items[iter].items[itera].packType,
                  packSize:newProps.items[iter].items[itera].packSize,
                  packageType:newProps.items[iter].items[itera].packageType,
                  measurementUnt:newProps.items[iter].items[itera].measurementUnt,
                  salesUnit:newProps.items[iter].items[itera].salesUnit,
                  tradeUnit:newProps.items[iter].items[itera].tradeUnit,
                  muInRu:newProps.items[iter].items[itera].muInRu,
                  muInPu:newProps.items[iter].items[itera].muInPu,
                  mulnSu:newProps.items[iter].items[itera].mulnSu,
                  packageUnit:newProps.items[iter].items[itera].packageUnit,
                  regularDiscount:newProps.items[iter].items[itera].regularDiscount
                })
              }
  
            }
          }
        }
        if(newProps.skus != null) {
          for(var iter in newProps.skus) {
            skus = realm.objects('GeneralSkus').filtered('generalSKUId == $0',
              newProps.skus[iter].generalSKUId);
              if(skus.length == 0) {
                realm.create('GeneralSkus',{
                  generalSKUId: newProps.skus[iter].generalSKUId,
                itemName:newProps.skus[iter].itemName,
                unit:newProps.skus[iter].unit,
                skuCode:newProps.skus[iter].skuCode,
                companyId:newProps.skus[iter].companyId,
                cityId:newProps.skus[iter].cityId,
                countryId:newProps.skus[iter].countryId,
                branchId:newProps.skus[iter].branchId,
                departmentId:newProps.skus[iter].departmentId,
                createdAt:newProps.skus[iter].createdAt,
                editedAt:newProps.skus[iter].editedAt,
                editedBy:newProps.skus[iter].editedBy,
                deleted:newProps.skus[iter].deleted
            })
              }
          }
        }
        if(newProps.stores!=null) {
      for(var iter in newProps.stores) {
        shops = realm.objects('Store').filtered('storeId == $0 AND pjp == $1',newProps.stores[iter].storeId,true).slice(0);
        if(shops.length == 0) {
        realm.create('Store',{
          'storeId':newProps.stores[iter].storeId,
          'shopName':newProps.stores[iter].shopName,
          'shopKeeper': newProps.stores[iter].shopKeeper,
        'contactNo': newProps.stores[iter].contactNo,
        'landline': newProps.stores[iter].landline,
        'address': newProps.stores[iter].address,
        'street': newProps.stores[iter].street,
        'city': newProps.stores[iter].city,
        landMark: newProps.stores[iter].landMark,
        'cnic': newProps.stores[iter].cnic,
        'activeStatus': newProps.stores[iter].activeStatus,
        'category': newProps.stores[iter].category,
        'subsectionId':newProps.stores[iter].subsectionId,
        'classification': newProps.stores[iter].classification,
        'status':1,
        'dayRegistered':newProps.stores[iter].dayRegistered,
        'latitude':newProps.stores[iter].latitude,
        'longitude':newProps.stores[iter].longitude,
        'imageUrl':newProps.stores[iter].imageUrl
        })
        for(var itera in newProps.stores[iter].visitDays) {
            realm.create('StoreVisits',{
              'visitDayId':newProps.stores[iter].visitDays[itera].visitDayId,
              'day':newProps.stores[iter].visitDays[itera].day,
              'storeId':newProps.stores[iter].visitDays[itera].storeId,
              'companyId':newProps.stores[iter].visitDays[itera].companyId,
              'countryId':newProps.stores[iter].visitDays[itera].countryId,
              'cityId':newProps.stores[iter].visitDays[itera].cityId,
              'branchId':newProps.stores[iter].visitDays[itera].branchId,
              'departmentId':newProps.stores[iter].visitDays[itera].departmentId,
              'createdAt':newProps.stores[iter].visitDays[itera].createdAt,
              'editedAt':newProps.stores[iter].visitDays[itera].editedAt,
              'editedBy':newProps.stores[iter].visitDays[itera].editedBy,
              'deleted':newProps.stores[iter].visitDays[itera].deleted,

            },true)
        }
      }
    }
  }
  if(newProps.brands != null) {
    for(var itera in newProps.brands) {
      var productTypes = [];
      brands = realm.objects('Brands').filtered('brandName == $0',newProps.brands[itera].brandName).slice(0);
      if(brands.length == 0) {
        for(var iter in newProps.brands[itera].items) {
          productTypes.push(newProps.brands[itera].items[iter].productType)
          for(var it in newProps.brands[itera].items[iter].items) {
            var items = realm.objects("InventoryItems").filtered("inventoryItemId == $0",
            newProps.brands[itera].items[iter].items[it].inventoryItemId).slice(0);
            if(items.length == 0) {
              realm.create('InventoryItems',{
                brandName: newProps.brands[itera].brandName,
                name: newProps.brands[itera].items[iter].items[it].name,
                productType: newProps.brands[itera].items[iter].items[it].productType,
                inventoryItemId: newProps.brands[itera].items[iter].items[it].inventoryItemId,
                itemCode: newProps.brands[itera].items[iter].items[it].itemCode,
                unitPrice: newProps.brands[itera].items[iter].items[it].unitPrice,
                tradeOfferAmount: newProps.brands[itera].items[iter].items[it].tradeOfferAmount,
                unit: newProps.brands[itera].items[iter].items[it].unit,
                packType:newProps.brands[itera].items[iter].items[it].packType,
                packSize:newProps.brands[itera].items[iter].items[it].packSize,
                packageType:newProps.brands[itera].items[iter].items[it].packageType,
                measurementUnt:newProps.brands[itera].items[iter].items[it].measurementUnt,
                salesUnit:newProps.brands[itera].items[iter].items[it].salesUnit,
                tradeUnit:newProps.brands[itera].items[iter].items[it].tradeUnit,
                muInRu:newProps.brands[itera].items[iter].items[it].muInRu,
                muInPu:newProps.brands[itera].items[iter].items[it].muInPu,
                muInSu:newProps.brands[itera].items[iter].items[it].muInSu,
                packageUnit:newProps.brands[itera].items[iter].items[it].packageUnit,
                regularDiscount:newProps.brands[itera].items[iter].items[it].regularDiscount
              })
            }
          }
        }

        realm.create('Brands',{
          'brandName':newProps.brands[itera].brandName,
          'productType':productTypes
        })
      }   
    }
  }
    })
  }
  render () {
    return (
      <Container>
        <GradientWrapper>
          <Header style={styles.header}>
            <Left style={{ flex: 1 }}>
              <Button transparent light onPress={this.menu}>
                <Icon
                  name={'menu'}
                />
              </Button>
            </Left>
            <Body style={{ flex: 2 }}>
            <Text style={styles.titleText}>Eva Tracker App</Text>
            </Body>
            <Right style={{ flex: 1 }}>
              {
                AppConfig.env === 'DEV' &&
                <Button transparent light onPress={() => {
                  this.props.reset()
                  this.props.logout()
                }}>
                  <Icon name={'close'}
                  />
                </Button>
              }
              <Button transparent light onPress={this.props.logout}>
                <Icon name={'log-out'}
                />
              </Button>
            </Right>
          </Header>
        </GradientWrapper>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: parseFloat(this.props.latitude),
            longitude: parseFloat(this.props.longitude),
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
          }}
          followsUserLocation
        >
          <MapView.Marker
            coordinate={{
              latitude: parseFloat(this.props.latitude),
              longitude: parseFloat(this.props.longitude)
            }}
            image={Images.marker}
          />
          {!!this.props.waypoint &&
          <MapView.Polyline
            coordinates={this.props.waypoint}
            strokeWidth={4}
            strokeColor={Colors.coal}
          />
          }
          {
            !!this.props.stores &&
            this.props.stores.filter(value => value.latitude !== null).map(value => (
              <MapView.Marker
                coordinate={{
                  latitude: parseFloat(value.latitude),
                  longitude: parseFloat(value.longitude)
                }}
                onPress={() => {
                  if (this.props.dayStarted) {
                    Alert.alert(
                      'Select option',
                      `Please select an action on ${value.shopName}`,
                      [
                        { text: 'Cancel', style: 'cancel' },
                        {
                          text: 'Details',
                          onPress: () => this.props.navigation.navigate('ShopDetail', { item: value })
                        },
                        {
                          text: 'Directions',
                          onPress: () => this.props.directions({
                            latitude: value.latitude,
                            longitude: value.longitude
                          })
                        }
                      ]
                    )
                  }
                }}
                image={Images.pin}
              />
            ))
          }
        </MapView>
        <Footer style={{
          paddingTop: 3,
          alignItems: 'center',
          justifyContent: 'space-around',
          borderTopWidth: 3,
          borderTopColor: Colors.success,
          backgroundColor: Colors.background
        }}>
          <Button success disabled={this.props.dayStarted} onPress={() => {
            if (this.props.subSection && this.props.subSection.length > 0) {
              ActionSheet.show(
                {
                  options: R.concat(R.map(R.prop('name'))(this.props.subSection), ['Cancel']),
                  cancelButtonIndex: this.props.subSection.length,
                  title: 'Select Subsection'
                },
                buttonIndex => {
                  console.log(buttonIndex)
                  if (buttonIndex < this.props.subSection.length) {
                    this.props.dayStart(this.props.subSection[buttonIndex].subsectionId, this.props.userid)
                  }
                }
              )
            } else {
              // No subsection Logic
              Alert.alert(null, 'No subsection assigned to this user.')
            }
          }
          }>
            <Text>Day Start</Text>
          </Button>
          <Button success disabled={!(this.props.dayStarted && this.props.isMarketAvailable)} onPress={() => {
            this.props.navigation.navigate('Market')
          }}>
            <Text>Market</Text>
          </Button>
          <Button success disabled={!this.props.dayStarted} onPress={() => {
            this.props.dayEnd('')
          }}>
            <Text>End Day</Text>
          </Button>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = state =>{
  return({
      userid: R.path(['login', 'payload', 'user', 'userid'], state),
      userDetails: state.login,
      gpsUpdate: state.gps,
      skus: state.inventory.inventorySKUs,
      items: state.nonBrands.payload,
      Reasons: state.shop.reasons,
      isMarketAvailable: R.contains('Market', extractModuleFeatures(state)),
      dayStarted: state.store.dayStarted[state.login.payload.user.userid],
      stores: state.store && state.store.payload,
      brands: state.brands.payload,
      subSection: state.createStore && state.createStore.subSection,
      waypoint: state.gps && state.gps.waypoint,
      latitude: state.gps && state.gps.data && state.gps.data.latitude,
      longitude: state.gps && state.gps.data && state.gps.data.longitude
})
}

const mapDispatchToProps = dispatch => ({
  directions: (location) => dispatch(GpsLocationRedux.gpsDirection(location)),
  dayStart: (subsection, userid) => dispatch(StoresRedux.dayStartRequest(subsection, userid)),
  dayEnd: (note) => dispatch(StoresRedux.dayEndRequest(note)),
  request: () => dispatch(StoresRedux.storesRequest()),
  logout: () => dispatch(LoginRedux.logout()),
  reset: () => dispatch(StoresRedux.reset()),
  inventorySKUs: () => dispatch(InventoryRedux.inventory_sku_request()),
  nonProductiveReasons:()=>dispatch(ShopRedux.nonProductiveReasons())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
