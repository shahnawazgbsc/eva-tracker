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
import GetVisitDay from '../Lib/GetVisitDay'
import Colors from '../Themes/Colors';

let screens = [];

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
      segmantIndex: [],
      segmantIndex1: [],
      segmantIndex2: [],
      segment: 0,
      dataObjects: [],


    }
  }
  componentWillMount() {

    this.setState({ segmantIndex: this.getList(0, this.props) })
    this.setState({ dataObjects: this.getList(0, this.props) })
    this.setState({ segmantIndex1: this.getList(1, this.props) })
    this.setState({ segmantIndex2: this.getList(2, this.props) })
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
    this.props.navigation.navigate('ShopDetail', { item,mobileScreens:screens })
  }

  renderRow = ({ item }) => {
    return (
      <Card style={styles.row}>
        <CardItem style={styles.card} button disabled={this.state.segment===0 && this.isPJPDisabled()} onPress={() => { this.gotoDetail(item) }}>
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
      dataObjects: this.props.otherShops.filter(value => value.shopName.toLowerCase().includes(text.toLowerCase()))
    })
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

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
            R.prop('storeId')),
          props.pjpShops)
        break
      case 1:
        list = R.filter(R.compose(R.flip(R.contains)(props.achieved), R.prop('storeId')),
          R.concat(props.pjpShops, props.otherShops))
        break
    }
    return list
  }

  segmentNearMe = () => {
    this.setState({
      text: '',
      segment: 0,
      dataObjects: this.getList(0, this.props),
      segmantIndex:this.getList(0, this.props)

    })
  }

  segmentShopList = () => {
    this.setState({
      text: '',
      segment: 1,
      dataObjects: this.getList(1, this.props),

      segmantIndex1:this.getList(1, this.props)
    })
  }

  segmentSearch = () => {
    this.setState({
      text: '',
      segment: 2,
      dataObjects: this.props.otherShops,

      segmantIndex2:this.props.otherShops
    })
  }

  render() {
    const { segmantIndex,segmantIndex1,segmantIndex2 ,      dataObjects
    } = this.state;
    screens = this.props.navigation.getParam('screens')
    return (
      <Container>
        <GradientWrapper>
          <Header style={styles.header}>
            <Left>
              <Button light transparent onPress={this.back}>
                <Icon name={'arrow-back'} />
                <Text>Back</Text>
              </Button>
            </Left>
            <Body style={{}}>
              <Text style={styles.titleText}>Market</Text>
            </Body>
            {/* <Right >
              <Text style={{ color: 'white', fontSize: 14 }}>Counter= {dataObjects==null?0:dataObjects.length}</Text>
            </Right> */}
          </Header>
        </GradientWrapper>
        <Segment style={{}}>
          <Button disabled={this.isPJPDisabled()} style={{ flex: 1, marginLeft: 20, alignItems: 'center', justifyContent: 'center' }} first active={this.state.segment === 0} onPress={this.segmentNearMe}><Text>PJP  ({segmantIndex == null?0:segmantIndex.length})</Text></Button>
          <Button disabled={this.isVisitedDisabled()} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} active={this.state.segment === 1} onPress={this.segmentShopList}><Text>Visited ({segmantIndex1 == null?0:segmantIndex1.length})</Text></Button>
          <Button disabled={this.isOthersDisabled()} style={{ flex: 1, marginRight: 20, alignItems: 'center', justifyContent: 'center' }} last active={this.state.segment === 2} onPress={this.segmentSearch}><Text>Other ({segmantIndex2 == null?0:segmantIndex2.length})</Text></Button>
        </Segment>
        {this.state.segment === 2 &&
          <View searchBar rounded style={{ width: '100%', height: 40, backgroundColor: 'white' }}>
            <View style={{ flex: 1, marginLeft: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name='ios-search' />
              <Input
                style={{ width: '70%' }}
                value={this.state.text}
                placeholder='Search'
                onChangeText={this.onChangeText}
              />
            </View>
          </View>
        }

        {dataObjects && dataObjects.length ?
          <FlatList
            renderItem={this.renderRow}
            style={styles.listContent}
            data={this.state.dataObjects}
            extraData={this.state.dataObjects && this.state.dataObjects.length}
            initialNumToRender={20}
            keyExtractor={this.keyExtractor}
          /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: Colors.charcoal }}>{this.state.segment === 0 || this.isPJPDisabled() ? "PJP shops are not available" : this.state.segment === 1 || this.isVisitedDisabled()? "Visited shops are not available" : this.state.segment === 2 || this.isOthersDisabled() ? "Others are not available" : "Not available"}</Text>
          </View>}
      </Container>
    )
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)

    if (nextProps) {
      this.setState({ dataObjects: this.getList(this.state.segment, nextProps) })
    }
  }
  isPJPDisabled() {
    for (var iter in screens) {
      if(screens[iter] === "PJP") return false
    }
    return true
  }
  isVisitedDisabled() {
    for (var iter in screens) {
      if(screens[iter] === "Visited") return false
    }
    return true
  }
  isOthersDisabled() {
    for (var iter in screens) {
      if(screens[iter] === "Other") return false
    }
    return true
  }
}


const mapStateToProps = (state) => {
  return {
    pjpShops: state.store && state.store.pjpShops,
    otherShops: state.store && state.store.others,
    achieved: state.store && R.map(R.prop('id'), state.store.achieved)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketList)
