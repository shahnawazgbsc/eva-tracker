import React from 'react'
import { FlatList } from 'react-native'
import { Body, Button, CheckBox, Container, Header, Icon, Left, ListItem, Right, Text, Title } from 'native-base'
import { connect } from 'react-redux'
import CreateStoreAction from '../Redux/CreateStoreRedux'
// Styles
import styles from './Styles/DaySelectionStyle'
import GradientWrapper from '../Components/GradientWrapper'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

export const Days = [
  { title: 'Monday', key: 1 },
  { title: 'Tuesday', key: 2 },
  { title: 'Wednesday', key: 3 },
  { title: 'Thursday', key: 4 },
  { title: 'Friday', key: 5 },
  { title: 'Saturday', key: 6 },
  { title: 'Sunday', key: 7 }
]

class DaySelection extends React.PureComponent {
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow = ({ item, index }) => {
    return (
      <ListItem noIndent button onPress={() => {
        const selected = new Map(this.state.selected)
        selected.set(item.key, !selected.get(item.key))
        this.setState({
          selected: selected
        })
      }}>
        <Text style={{ flex: 1 }}>{item.title}</Text>
        <CheckBox
          checked={!!this.state.selected.get(item.key)}
        />
      </ListItem>
    )
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

  close = () => {
    this.props.navigation.goBack(null)
  }

  save = () => {
    const arr = []
    this.state.selected.forEach((value, key) => {
      if (value) arr.push(key)
    })

    if (arr.length > 0) {
      this.props.saveDays(arr)
    }
    this.close()
  }

  constructor (props) {
    super(props)
    this.handleProps(props)
  }

  handleProps (props) {
    const map = new Map()
    if (props.days) {
      props.days.forEach(value => map.set(value, true))
    }

    if (!this.state) {
      this.state = { dataObjects: Days, selected: map }
    } else {
      this.setState({ dataObjects: Days, selected: map })
    }
  }

  componentWillReceiveProps (nextProps): void {
    this.handleProps(nextProps)
  }

  render () {
    return (
      <Container>
        <GradientWrapper>
          <Header style={styles.header}>
            <Left>
              <Button transparent light onPress={this.close}>
                <Icon
                  name={'close'}
                />
              </Button>
            </Left>
            <Body>
            <Text style={styles.titleText}>Select Days</Text>
            </Body>
            <Right>
              <Button transparent onPress={this.save} light>
                <Icon
                  name={'checkmark'}
                />
              </Button>
            </Right>
          </Header>
        </GradientWrapper>

        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          extraData={this.state.selected}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    days: state.createStore && state.createStore.days
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveDays: (payload) => dispatch(CreateStoreAction.selectDays(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaySelection)
