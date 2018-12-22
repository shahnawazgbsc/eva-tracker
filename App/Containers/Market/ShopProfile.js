import * as React from 'react'
import {View,TouchableOpacity,Image,Text} from 'react-native'
import {List,ListItem,Left,Icon,Body,Thumbnail,Card,CardItem} from 'native-base'
import Header from '../../Components/Header/Header'
import {connect} from 'react-redux'
import CreateStoreAction from '../../Redux/CreateStoreRedux'

class ShopProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            shopName:"General Store",
            shopAddress:"Shahrah.e.Faisal, Karachi.",
            shopNumber:"03456678432"
            };
            this.saveProps(props)
        }
        componentWillMount() {
            
        }
        componentWillReceiveProps(newProps) {
            this.saveProps(newProps)
    
        }
        saveProps (props) {
            this.setState({
              shopName:props.shopName,
              shopAddress:props.shopAddress,
              shopNumber:props.shopNumber
            })
          }
    render() {
        return(
        <View style={{flex:1,backgroundColor:'#F0EFF2'}}>
            <Header screenName = 'shop profile'/>
            <View style={{margin:15}}>
                <Card>
                    <List>
                        <ListItem avatar>
                        <Left>
                            <Thumbnail source={""} />
                        </Left>
                        <Body>
                            <Text style={{marginBottom:5,fontSize:20,fontWeight:"bold"}}>{this.state.shopName}</Text>
                            <Text note>{this.state.shopAddress}</Text>
                            <View style={{flexDirection:"row"}}>
                                <Icon name = 'phone' type="MaterialIcons"/>
                                <Text>{this.state.shopNumber}</Text>  
                            </View>
                        </Body>
                        </ListItem>
                    </List>
                </Card>
                <View>
                    <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                        <Card>
                            <View style={{width:'100%'}}>
                                <CardItem header button onPress={() => alert("This is Card Header")}>
                                    <Text>Inventory Taking</Text>
                                </CardItem>
                            </View>
                        </Card>
                        <Card>
                            <View style={{width:'100%'}}>
                                <CardItem header button onPress={() => alert("This is Card Header")}>
                                    <Text>Order Taking</Text>
                                </CardItem>
                            </View>
                        </Card>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Card>
                            <View style={{width:'100%'}}>
                                <CardItem header button onPress={() => alert("This is Card Header")}>
                                    <Text>Gift Order</Text>
                                </CardItem>
                            </View>
                        </Card>
                        <Card>
                            <View style={{width:'100%'}}>
                                <CardItem header button onPress={() => alert("This is Card Header")}>
                                    <Text>Market Survey</Text>
                                </CardItem>
                            </View>
                        </Card>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Card>
                            <View style={{width:'100%'}}>
                                <CardItem header button onPress={() => alert("This is Card Header")}>
                                    <Text>Merchandising</Text>
                                </CardItem>
                            </View>
                        </Card>
                        <Card>
                            <View style={{width:'100%'}}>
                                <CardItem header button onPress={() => alert("This is Card Header")}>
                                    <Text>Shop Query</Text>
                                </CardItem>
                            </View>
                        </Card>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                        <Card>
                            <View style={{width:'100%'}}>
                                <CardItem header button onPress={() => alert("This is Card Header")}>
                                    <Text>Shop History</Text>
                                </CardItem>
                            </View>
                        </Card>
                    </View>
                </View>
            </View>
        </View>
        )
            
    }
    renderItem(image,onPress,children){
      return (
        <TouchableOpacity style={styles.itemStyle} onPress={onPress} >
            <View style={{flex:1}}/>
            <Image 
                style={{flex:2}}
                source={image}
                 
                resizeMode="contain"
                >
            </Image>
            <Text style={{flex:2,color:"#2F226E"}}>
                {children}
            </Text>
        </TouchableOpacity>
      );
    }

}
const styles = {
    itemStyle:{
        alignItems: 'center',
        flex:1,
        marginLeft:5,
        marginRight:5,
        marginBottom:5,
        shadowRadius:2,
        shadowColor:'#000000',
        shadowOpacity:1.0,
        shadowOffset:{width:2,height:5},
        elevation:2, 
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    }
}
const mapStateToProps = (state) => {
  return {
    shopName: state.createStore && state.createStore.shopName,
    shopAddress: state.createStore && state.createStore.shopAddress,
    shopNumber: state.createStore && state.createStore.shopNumber
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectShopName: (payload) => dispatch(CreateStoreAction.selectShopName(payload)),
    selectShopAddress: (payload) => dispatch(CreateStoreAction.selectShopAddress(payload)),
    selectShopNumber: (payload) => dispatch(CreateStoreAction.selectShopNumber(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopProfile)