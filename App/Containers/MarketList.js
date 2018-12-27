import React from 'react'
import { connect } from 'react-redux'
import { FlatList, Image, View } from 'react-native'
import * as R from 'ramda'
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Header,
  Icon,
  Input,
  Item,
  Left,
  Right,
  Segment,
  Subtitle,
  Text,
  Title
} from 'native-base'
// Styles
import styles from './Styles/MarketListStyle'
import GradientWrapper from '../Components/GradientWrapper'
import { Images } from '../Themes'
import ParseImagePath from '../Lib/ParseImagePath'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

class MarketList extends React.PureComponent {
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/

  constructor (props) {
    super(props)
    this.state = {
      dataObjects: this.getList(0, props),
      segment: 0
    }
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/

  gotoDetail = (item) => {
    this.props.navigation.navigate('ShopDetail', { item })
  }

  renderRow = ({ item }) => {
    return (
      <Card style={styles.row}>
        <CardItem style={styles.card} button onPress={() => { this.gotoDetail(item) }}>
          <View style={styles.profileImgContainer}>
            <Image
              style={styles.profileImg}
              source={
                item.imageUrl ? { uri: ParseImagePath(item.imageUrl) } : Images.logo
              }
              resizeMode={'cover'}
            />
          </View>

          <View style={{ justifyContent: 'flex-start', alignItems: 'stretch', flex: 1, margin: 10 }}>
            <Title style={styles.boldLabel}>{item.shopName}</Title>
            <Subtitle style={styles.label}>{item.address}</Subtitle>
          </View>
          <Icon name={'chevron-right'} type={'MaterialIcons'}/>
        </CardItem>
      </Card>
    )
  }

  onChangeText = (text) => {
    this.setState({
      text,
      dataObjects: this.props.shops.filter(value => value.shopName.toLowerCase().includes(text.toLowerCase()))
    })
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  back = () => {
    this.props.navigation.goBack(null)
  }

  getList = (segment, props) => {
    let list
    switch (segment) {
      case 0:
        list = R.filter(
          R.compose(
            R.flip(R.compose(R.not, R.contains))(props.achieved),
            R.prop('storeId'))
          ,
          props.shops)
        break
      case 1:
        list = R.filter(R.compose(R.flip(R.contains)(props.achieved), R.prop('storeId')), props.shops)
        break
    }
    return list
  }

  segmentNearMe = () => {
    this.setState({
      text: '',
      segment: 0,
      dataObjects: this.getList(0, this.props)
    })
  }

  segmentShopList = () => {
    this.setState({
      text: '',
      segment: 1,
      dataObjects: this.getList(1, this.props)
    })
  }

  segmentSearch = () => {
    this.setState({
      text: '',
      segment: 2,
      dataObjects: this.props.shops
    })
  }

  render () {
    return (
      <Container>
        <GradientWrapper>
          <Header style={styles.header}>
            <Left>
              <Button light transparent onPress={this.back}>
                <Icon name={'arrow-back'}/>
                <Text>Back</Text>
              </Button>
            </Left>
            <Body>
            <Text style={styles.titleText}>Market</Text>
            </Body>
            <Right/>
          </Header>
        </GradientWrapper>
        <Segment>
          <Button first active={this.state.segment === 0} onPress={this.segmentNearMe}><Text>PJP</Text></Button>
          <Button active={this.state.segment === 1} onPress={this.segmentShopList}><Text>Achieved</Text></Button>
          <Button last active={this.state.segment === 2} onPress={this.segmentSearch}><Text>Search</Text></Button>
        </Segment>
        {this.state.segment === 2 &&
        <Header searchBar rounded style={{ marginTop: 0, paddingTop: 0, backgroundColor: 'transparent' }}>
          <Item>
            <Icon name='ios-search'/>
            <Input
              value={this.state.text}
              placeholder='Search'
              onChangeText={this.onChangeText}
            />
          </Item>
        </Header>
        }


        <FlatList
          renderItem={this.renderRow}
          style={styles.listContent}
          data={this.state.dataObjects}
          extraData={this.state.dataObjects.length}
          initialNumToRender={20}
          keyExtractor={this.keyExtractor}
        />
      </Container>
    )
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)

    if (nextProps) {
      this.setState({ dataObjects: this.getList(this.state.segment, nextProps) })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    shops: state.store && state.store.payload,
    achieved: state.store && state.store.achieved
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketList)