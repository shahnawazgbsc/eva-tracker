import * as React from 'react'
import { FlatList, Image, View } from 'react-native'
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Header,
  Icon,
  Left,
  Right,
  Subtitle,
  Text,
  Title
} from 'native-base'
import { connect } from 'react-redux'
import CreateStoreAction from '../../Redux/CreateStoreRedux'
import GradientWrapper from '../../Components/GradientWrapper'
import styles from './ShopProfileStyle'
import { Images } from '../../Themes'

class ShopProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      enabledOptions: [
        { title: 'Inventory Taking', icon: 'clipboard', type: 'FontAwesome' },
        { title: 'Order Taking', icon: 'add-shopping-cart', type: 'MaterialIcons' },
        { title: 'Gift Order', icon: 'gift', type: 'FontAwesome' },
        { title: 'Market Survey', icon: 'analytics', type: '' },
        { title: 'Merchandising', icon: 'cube', type: '' },
        { title: 'Shop Query', icon: 'question-circle', type: 'FontAwesome' }
      ]
    }
    this.saveProps(props)
  }

  componentWillMount () {

  }

  componentWillReceiveProps (newProps) {
    this.saveProps(newProps)

  }

  saveProps (props) {
    this.setState({
      shopName: props.shopName,
      shopAddress: props.shopAddress,
      shopNumber: props.shopNumber
    })
  }

  back = () => {
    this.props.navigation.goBack(null)
  }

  render () {
    return (
      <Container>
        <GradientWrapper>
          <Header style={[styles.header, styles.headerExtra]}>
            <Left style={{ alignSelf: 'flex-start' }}>
              <Button transparent onPress={this.back}>
                <Icon
                  name={'arrow-back'}
                />
              </Button>
            </Left>
            <Body style={{ alignSelf: 'flex-start', marginTop: 10 }}>
            <Title style={styles.headerText}>Shop Profile</Title>
            </Body>
            <Right/>
          </Header>
        </GradientWrapper>

        <FlatList
          style={styles.listStyle}
          ListHeaderComponent={this.header}
          numColumns={2}
          data={this.state.enabledOptions}
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
                item.imageUrl ? { uri: item.imageUrl } : Images.logo
              }
              resizeMode={'cover'}
            />
          </View>
          <View>
            <Title style={styles.darkText}>{item.shopName}</Title>
            <Subtitle style={styles.lightDarkText}>{item.address}</Subtitle>
            <Button transparent>
              <Icon style={[styles.lightDarkText, styles.iconPhone]} name={'phone-square'} type={'FontAwesome'}/>
              <Text style={[styles.lightDarkText, { marginTop: 10 }]}>{item.contactNo}</Text>
            </Button>
          </View>
        </CardItem>
      </Card>)
  }

  renderItem = ({ item }) => {
    return (
      <Card style={styles.cardChildContainer}>
        <CardItem button cardBody style={styles.cardChildItem} onPress={() => {
          switch (item.title) {
            case 'Order Taking':
              this.props.navigation.navigate('OrderTaking')
              break
            case 'Inventory Taking':
              this.props.navigation.navigate('Inventory')
              break
          }
        }}>
          <Icon
            style={styles.childIcon}
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
