import React, { Component } from 'react'
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
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
import styles from './Styles/InventoryScreenStyle'
import InventoryActions from '../Redux/InventoryTakingRedux'
import GradientWrapper from '../Components/GradientWrapper'
import Colors from '../Themes/Colors'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

class OrderSMS extends Component {
render () {
    let item = this.props.navigation.getParam('orderItem')
    return (
      <Container>
        <GradientWrapper>
          <Header style={styles.header}>
            <Left>
              <Button transparent light onPress={this.back}>
                <Icon name={'arrow-back'}
                />
                <Text>Back</Text>
              </Button>
            </Left>
            <Body
              style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Icon
              style={styles.headerIcon}
                name={'add-shopping-cart'}
              type={'MaterialIcons'}
            />
            <Text style={styles.titleText}>Booking / Order SMS To ShopKeeper</Text>
            </Body>
            <Right
            />
          </Header>
        </GradientWrapper>
        <Content padder>
          <Card>
            <CardItem>
              <View style={styles.cardContainer}>
                <Text style={styles.darkText}>{item.shopName}</Text>
                <Subtitle style={styles.lightDarkText}>{item.address}</Subtitle>
                <Button transparent>
                  <Icon style={[styles.lightDarkText, styles.iconPhone]} name={'phone-square'} type={'FontAwesome'}
                  />
                  <Text style={[styles.lightDarkText, { marginTop: 10, flexWrap: 'wrap' }]}>{item.contactNo}</Text>
                </Button>
              </View>
            </CardItem>
          </Card>
        </Content>

      </Container>
    )
  }
}

back = () => {
    this.props.navigation.goBack(null)
  }
const mapStateToProps = (state) => {
  return { brands: state.brands.payload }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendInventory: (data) => dispatch(InventoryActions.inventoryRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSMS)