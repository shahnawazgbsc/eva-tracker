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
import InventoryActions from '../../Redux/InventoryTakingRedux'
import GradientWrapper from '../../Components/GradientWrapper'
import styles from '../../Containers/Styles/InventoryTakingStyle'
import { Row, Col } from 'react-native-easy-grid';

var checked = false;
var brandNames = []
var productSubCategories = []
var productTypes = []
var productDetails = [{brandNames:[],
    productTypes:[],
    productChecks:{productSubCategories:[],checkedArray:[]}
}]
var checkedArray = []
var inventoryItemsIds=[]
var productsList = []
class InventoryTaking extends React.Component {

    constructor(props){
        super(props)
        this.state={
            shopName:props.shopName==null?"General Store":props.shopName,
            shopAddress:props.shopAddress==null?"Shahrah.e.Faisal, Karachi.":props.shopAddress,
            shopNumber:props.shopNumber==null?"03456678432":props.shopNumber,
            productsList:[],
            brandName:0,
            productType:0
            };
            this.saveProps(props)
        }
        componentWillMount() {
            brandNames=[]
            productTypes=[]
            checked=false
            this.props.selectProductsList();
        }
        componentWillReceiveProps(newProps) {
            this.saveProps(newProps)
    
        }
        saveProps (props) {
            var products = JSON.parse(JSON.stringify(props.productsList))
            var types=[]
            var checks=[]
            var productsSubCategory=[]
            var subCategory=[]
            var inventoryItems = []
            var inventoryItemsId = []
            var rowCheck=[]
            for(count in products)
                {
                    brandNames[count] = products[count].brandName
                    for(var iter in products[count].items) {
                        if(products[count].items[iter]!=null) {
                            types.push(products[count].items[iter].productType)
                            for(counter in products[count].items[iter].items) {
                                if(products[count].items[iter].items[counter] != null) {
                                    subCategory.push(products[count].items[iter].items[counter].name)
                                    inventoryItems.push(products[count].items[iter].items[counter].inventoryItemId)
                                    checks.push(false)
                                }
                            }
                            productsSubCategory.push(subCategory)
                            inventoryItemsId.push(inventoryItems)
                            rowCheck.push(checks)
                            subCategory=[]
                            checks=[]
                            inventoryItems=[]
                        }
                    }
                    productTypes[count]= types
                    checkedArray[count] = rowCheck
                    productSubCategories[count] = productsSubCategory
                    inventoryItemsIds[count] = inventoryItemsId
                    types=[];
                    rowCheck=[]
                    productsSubCategory=[];
                    inventoryItemsId=[]
                    productDetails=[{
                        brandNames:brandNames,
                        productTypes:productTypes,
                        productChecks:{productSubCategories:productSubCategories,
                            checkedArray:checkedArray}
                }]
                var finalJson = []
                for(i in brandNames) {
                    finalJson[i] = {title:brandNames[i],
                    content:{"name":productTypes[i],"Sub":productSubCategories[i],"checked":checkedArray[i]}}
                }
            }
             this.setState({
                shopName:props.shopName==null?"General Store":props.shopName,
                shopAddress:props.shopAddress==null?"Shahrah.e.Faisal, Karachi.":props.shopAddress,
                shopNumber:props.shopNumber==null?"03456678432":props.shopNumber
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
                            <Text>{this.state.shopAddress}</Text>  
                            <View style={{flexDirection:"row"}}>
                                <Icon name = 'phone' type="MaterialIcons"/>
                                <Text>{this.state.shopNumber}</Text>  
                            </View>
                            <ListItem>
                                <Left>
                                    <Text>Choose Brand:</Text>
                                </Left>
                                <Body>
                                <Card>
                                    <Item picker>
                                    <Picker
                                        mode='dropdown'
                                        iosIcon={<Icon name='ios-arrow-down-outline'/>}
                                        style={{ width: undefined }}
                                        placeholderStyle={{ color: '#bfc6ea' }}
                                        placeholderIconColor='#007aff'
                                        selectedValue={this.state.brandName}
                                        onValueChange={(itemValue,itemIndex) => {
                                        this.setState({brandName:itemValue})
                                        }}
                                    >
                                       {brandNames.map((brandName,index) => 
                                       <Picker.Item
                                       key={index}
                                        label={brandName}
                                        value={index} />)}
                                    </Picker>
                                    </Item>
                                </Card>
                                </Body>
                            </ListItem>
                             {this.renderProductTypes(this.state.brandName)} 
                        </View>
                        {this.renderProductItems(this.state.brandName,this.state.productType)}
                        <View style={{
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex:1,
                            right:10}}>
                            <Button rounded danger onPress={this.submit}>
                                <Text>Submit</Text>
                            </Button>
                        </View>
                    </Card>
                </ScrollView>
                </Container>
        )
    }
    submit() {
    }
    renderProductItems(brand,product) {

        if(productSubCategories[brand][product]!=null) {
        productsList = [{
            title:brandNames[brand],
            content:{
                "name":productSubCategories[brand][product],
                "checked":checkedArray[brand][product],
                "inventoryItemId":inventoryItemsIds[brand][product]
            }
        }]
            return(
                <View style={{margin:5}}>
                    <Accordion
                        dataArray={productsList}
                        renderContent={this.renderForm}
                    />
                </View>
            )
        }
        else 
            return(
                <View style={{height:0}}/>
            )
    }
    renderProductTypes(brand) {
        if(productTypes.length > 0) {
        if(productTypes[brand].length>0) {
            return(
                <ListItem>
                    <Left>
                        <Text>Product Type:</Text>
                    </Left>
                    <Body>
                    <Card>
                        <Item picker>
                        <Picker
                            mode='dropdown'
                            iosIcon={<Icon name='ios-arrow-down-outline'/>}
                            style={{ width: undefined }}
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor='#007aff'
                            selectedValue={this.state.productType}
                            onValueChange={(itemValue) => {
                                this.setState({
                                    productType:itemValue
                                })
                            }}>
                        {productTypes[brand].map((productType,index) => 
                                       <Picker.Item
                                        key={index}
                                        label={productType}
                                        value={index} />)}
                        </Picker>
                        </Item>
                    </Card>
                    </Body>
                </ListItem>
            )
        }
    }
        else return(
            <View style={{height:0}}/>
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
                    <List dataArray={content.content.name}
                        renderRow={(category) =>
                        <Col>
                            <Row na>
                                <CheckBox style={{marginTop:5}} checked= {checked} 
                                onPress={()=>{
                                    content.content.checked = content.content.checked?false:true
                                }}/>
                                <Left style = {{marginTop:5,marginBottom:5,marginLeft:15}}>
                                    <Text>{category}</Text>
                                </Left>
                                <Body style = {{marginTop:5,marginBottom:5,marginLeft:15}}>
                                    <Item style={{width:50,height:25}} rounded>
                                        <Input onChangeText={(text)=>{
                                            const inventoryItemIdIndex = content.content.name.findIndex(
                                                (value) => {
                                                    return value==category
                                                }
                                            )
                                            alert(inventoryItemIdIndex)
                                        }}/>
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
            </List>
        )
    }
    findCategory(value) {
        return 
    }
}
const mapStateToProps = (state) => {
    return {
        productsList: state.inventory && state.inventory.payload
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectProductsList: () => dispatch(InventoryActions.selectProductsList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryTaking)
