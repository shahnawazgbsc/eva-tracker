import * as React from 'react'
import { Alert, BackHandler, FlatList, Image, View } from 'react-native'
import { withNavigationFocus } from 'react-navigation'
import { Body, Button, Card, CardItem, Container, Header, Icon, Left, Right, Subtitle, Text, Title } from 'native-base'
import { connect } from 'react-redux'
import GradientWrapper from '../../Components/GradientWrapper'
import styles from './ShopProfileStyle'
import { Images } from '../../Themes'
import ParseImagePath from '../../Lib/ParseImagePath'
import ShopRedux from '../../Redux/ShopRedux'
import * as R from 'ramda'

class ShopProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      enabledOptions: [
        { title: 'Check In', icon: 'log-in', type: '' },
        { title: 'Check Out', icon: 'log-out', type: '' },
        { title: 'Inventory Taking', icon: 'clipboard', type: 'FontAwesome' },
        { title: 'Order Taking', icon: 'add-shopping-cart', type: 'MaterialIcons' },
        { title: 'Gift Order', icon: 'gift', type: 'FontAwesome' },
        { title: 'Market Survey', icon: 'analytics', type: '' },
        { title: 'Merchandising', icon: 'cube', type: '' },
        { title: 'Shop Query', icon: 'question-circle', type: 'FontAwesome' }
      ]
    }
  }

  render () {
    return (
      <Container>
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
          extraData={this.props.checkedIn}
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
          <View>
            <Title style={styles.darkText}>{item.shopName}</Title>
            <Subtitle style={styles.lightDarkText}>{item.address}</Subtitle>
            <Button transparent>
              <Icon style={[styles.lightDarkText, styles.iconPhone]} name={'phone-square'} type={'FontAwesome'}
              />
              <Text style={[styles.lightDarkText, { marginTop: 10, flexWrap: 'wrap' }]}>{item.contactNo}</Text>
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
    if (!this.props.checkedIn || !this.props.isFocused) {
      this.props.navigation.goBack(null)
    }
    return true
  }

  renderItem = ({ item }) => {
    let button = true
    if (item.title === 'Check In') button = !this.props.checkedIn
    else if (item.title === 'Check Out') button = this.props.checkedIn

    return (
      <Card style={button ? styles.cardChildContainer : styles.cardChildContainerDisabled}>
        <CardItem button={button} cardBody style={styles.cardChildItem} onPress={() => {
          switch (item.title) {
            case 'Order Taking':
              if (this.props.checkedIn) {
                this.props.navigation.navigate('OrderTaking')
              } else {
                Alert.alert(null, 'Please check in first to place order')
              }
              break
            case 'Inventory Taking':
              if (this.props.checkedIn) {
                this.props.navigation.navigate('Inventory')
              } else {
                Alert.alert(null, 'Please check in first to place order')
              }
              break
            case 'Check In':
              this.props.checkIn(this.props.navigation.getParam('item'))
              break
            case 'Check Out':
              if (this.props.orderPlaced) {
                this.props.checkOut({
                  onSuccess: () => this.props.navigation.goBack(null),
                  productive: true,
                  pjp: this.props.pjp
                })
              } else {
                // TODO show reason for not placing order
                this.props.navigation.navigate('Reason')
              }
              break
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

const mapStateToProps = (state) => {
  return {
    checkedIn: state.shop && state.shop.checkedIn,
    orderPlaced: state.shop && state.shop.orderPlaced,
    pjp: !R.contains(state.shop.shop.storeId)(state.store.achieved)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkIn: (data) => dispatch(ShopRedux.checkInRequest(data)),
    checkOut: (data) => dispatch(ShopRedux.checkOutRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(ShopProfile))
