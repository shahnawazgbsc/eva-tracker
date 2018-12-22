import * as React from 'react'
import {ScrollView,View,Text} from 'react-native'
import Header from '../../Components/Header/Header'
import {Button,Item,Picker,Input,Accordion,Card,List,ListItem,Left,Right,Body,CheckBox, Icon} from 'native-base'
import {connect} from 'react-redux'
import CreateStoreAction from '../../Redux/CreateStoreRedux'
var checked = false;
var selectedReason=""
class InventoryTaking extends React.Component {

    constructor(props){
        super(props)
        this.state={
            shopName:"General Store",
            shopAddress:"Shahrah.e.Faisal, Karachi.",
            shopNumber:"03456678432",
            productsList:[
                { title: "Eva Banaspati",content:{"productCategory": ["pouch","tin","bottle"],"checked":[false,false,false]}},
                { title: "Soya Supreme",content:{"productCategory": ["pouch","tin","bottle"],"checked":[false,false,false]}},
                { title: "Dalda Olive Oil",content:{"productCategory": ["pouch","tin","bottle"],"checked":[false,false,false]}}
              ]
            };
            this.saveProps(props)
        }
        componentWillMount() {
            
        }
        componentWillReceiveProps(newProps) {
            this.saveProps(newProps)
    
        }
        saveProps (props) {
            const map = new Map()
            if (props.productsList) {
              props.productsList.forEach(value => map.set(value, true))
            }
        
            this.setState({
              productsList:map,
              shopName:props.shopName,
              shopAddress:props.shopAddress,
              shopNumber:props.shopNumber
            })
          }
    render() {
        return(
            <View>
                <Header screenName = "inventory"/>
                <ScrollView  style={{margin:10,
                            marginBottom:"10%"}}>
                    <Card>
                        <View style={{left:20}}>
                            <Text style={{marginBottom:5,fontSize:20,fontWeight:"bold"}}>{this.state.shopName}</Text>  
                        </View>
                        <View style={{flexDirection:"row"}}>
                                <Text style={{flex:2,left:20}}>{this.state.shopAddress}</Text>  
                            <View style={{flex:1,flexDirection:"row",right:20}}>
                                <Icon name = 'phone' type="MaterialIcons"/>
                                <Text>{this.state.shopNumber}</Text>  
                            </View>
                        </View>
                        <View style={{margin:5}}>
                            <Accordion
                                dataArray={this.state.productsList}
                                renderContent={this.renderForm}
                            />
                        </View>
                        <View style={{
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex:1,
                            right:10}}>
                            <Button danger> 
                                <Text>Submit</Text>
                            </Button>
                        </View>
                    </Card>
                </ScrollView>
            </View>
        )
    }
    renderForm(content){
        return(
                <List>
                    <ListItem>
                        <Left>
                            <Text>Items</Text>
                        </Left>
                        <Body>
                            <Text>Qty</Text>
                        </Body>
                        <Right>
                            <Text>Unit</Text>
                        </Right>
                    </ListItem>
                    <List dataArray={content.content.productCategory}
                        renderRow={(category) =>
                        <ListItem>
                            <Left>
                                <View style={{flexDirection:"row"}}>
                                    <CheckBox checked= {checked} 
                                    onPress={()=>{
                                        category.checked = category.checked?false:true
                                    }}/>
                                    <Text style={{left:20}}>{category.productCategory}</Text>
                                </View>
                            </Left>
                            <Body>
                                <View style={{width:"50%"}}>
                                    <Item rounded>
                                        <Input/>
                                    </Item>
                                </View>
                            </Body>
                            <Right>
                                <View style={{width:"100%"}}>
                                    <Item rounded>
                                        <Input/>
                                    </Item>
                                </View>
                            </Right>
                        </ListItem>
                    }>
                    </List>
                    <ListItem>
                        <Left>
                            <Text>Reason</Text>
                        </Left>
                        <Body>
                            <Item picker>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    style={{ width: undefined }}
                                    placeholder="Select your SIM"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={selectedReason}
                                    onValueChange={(value)=>{
                                        selectedReason= value
                                    }}
                                >
                                    <Picker.Item label="Distribution" value="key0" />
                                    <Picker.Item label="Inventory" value="key1" />
                                    <Picker.Item label="Closing" value="key2" />
                                </Picker>
                            </Item>
                        </Body>
                    </ListItem>
                        <View style={{left:20,right:20}}>
                            <ListItem>
                                <Left>
                                    <Text>Note</Text>
                                </Left>
                                <Body>
                                    <Item regular>
                                        <Input placeholder='Quantity'/>
                                    </Item>
                                </Body>
                            </ListItem>
                        </View>
            </List>
        )
    }
}
const mapStateToProps = (state) => {
  return {
    productsList: state.createStore && state.createStore.productsList,
    shopName: state.createStore && state.createStore.shopName,
    shopAddress: state.createStore && state.createStore.shopAddress,
    shopNumber: state.createStore && state.createStore.shopNumber
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectProductsList: (payload) => dispatch(CreateStoreAction.selectProductsList(payload)),
    selectShopName: (payload) => dispatch(CreateStoreAction.selectShopName(payload)),
    selectShopAddress: (payload) => dispatch(CreateStoreAction.selectShopAddress(payload)),
    selectShopNumber: (payload) => dispatch(CreateStoreAction.selectShopNumber(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryTaking)