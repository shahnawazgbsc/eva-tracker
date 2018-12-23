import * as React from 'react'
import {ScrollView,View} from 'react-native'
import {Button,
    Text,
    Item,
    Picker,
    Input,
    Accordion,
    Card,
    List,
    ListItem,
    Left,
    Right,
    Body,
    CheckBox,
    Icon,
Container} from 'native-base'
import {connect} from 'react-redux'
import {Colors} from '../../Themes'
import CreateStoreAction from '../../Redux/CreateStoreRedux'
import GradientWrapper from '../../Components/GradientWrapper'
import styles from '../../Containers/Styles/InventoryTakingStyle'
import { Row, Col } from 'react-native-easy-grid';
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
                    name={'graph-bar'}
                    type={'Foundation'}
                  />
                  <Text style={styles.headerText}>Inventory Taking</Text>
                </View>
              </View>
            </GradientWrapper>
                <ScrollView  style={{margin:10,
                            marginBottom:"10%"}}>
                    <Card>
                        <View style={{padding:15}}>
                            <Text style={{marginBottom:5,fontSize:20,fontWeight:"bold"}}>{this.state.shopName}</Text>  
                        <View style={{flexDirection:"row",alignContent:'space-between'}}>
                                <Text>{this.state.shopAddress}</Text>  
                            <View style={{flexDirection:"row"}}>
                                <Icon name = 'phone' type="MaterialIcons"/>
                                <Text>{this.state.shopNumber}</Text>  
                            </View>
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
                            <Button rounded danger> 
                                <Text>Submit</Text>
                            </Button>
                        </View>
                    </Card>
                </ScrollView>
                </Container>
        )
    }
    renderForm(content){
        return(
                <List style={{backgroundColor:Colors.silver}}>
                    <ListItem>
                        <Left style = {{marginLeft:15}}>
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
                        <Col>
                            <Row>
                                <CheckBox style={{marginTop:5}} checked= {checked} 
                                onPress={()=>{
                                    category.checked = category.checked?false:true
                                }}/>
                                <Left style = {{marginTop:5,marginBottom:5,marginLeft:15}}>
                                    <Text>{category}</Text>
                                </Left>
                                <Body style = {{marginTop:5,marginBottom:5,marginLeft:15}}>
                                    <Item style={{width:50,height:25}} rounded>
                                        <Input/>
                                    </Item>
                                </Body>
                                <Right style = {{marginRight:15,marginBottom:5,marginLeft:15}}>
                                    <Item style={{width:45,height:25}} rounded>
                                        <Input/>
                                    </Item>
                                </Right>
                            </Row>            
                        </Col>
            
                    }>
                    </List>
                    <ListItem>
                        <Left>
                            <Text>Reason</Text>
                        </Left>
                        <Body>
                            <Card>
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
                            </Card>
                        </Body>
                    </ListItem>
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