import React, { Component } from 'react'
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text } from 'native-base'
import { FlatList, View } from 'react-native'
import { connect } from 'react-redux'
// Styles
import styles from './Styles/InventoryScreenStyle'
import GradientWrapper from '../Components/GradientWrapper'
import Colors from '../Themes/Colors'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

class ShopHistory extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedBrand: '',
      quantity: '',
      unit: '',
      accordionData: [{ name: 'Last Visit', open: false }, { name: '3rd Last Visit', open: false }],
      selected: '',
      expanded: []
    }
  }

  keyExtractor = (item, index) => index

  renderContent = () => {
    return (
      <View style={{ backgroundColor: 'white', margin: 20 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={{ fontSize: 13, flex: 1, fontWeight: 'bold', color: '#676767' }}>Visited By : </Text>
            <Text style={{ fontSize: 13, flex: 4, color: '#616161' }}>Sumair</Text>
          </View>
          <View style={{ flexDirection: 'row', alignContent: 'space-between', flex: 1 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#676767' }}>Visit Date : </Text>
              <Text style={{ fontSize: 13, color: '#616161' }}>25-Aug-2018</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#676767' }}>Visit Time : </Text>
              <Text style={{ fontSize: 13, color: '#616161' }}>11:35 AM</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#676767' }}>Bill To </Text>
            <Text style={{ fontSize: 15, marginLeft: 5, color: '#005B2D' }}>Irfan Ali Khan</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#676767' }}>Bill Date : </Text>
            <Text style={{ fontSize: 13, color: '#616161' }}>04/01/2019 5:38:12 PM</Text>
          </View>
        </View>
        <View style={{ borderColor: 'black', borderBottomWidth: 1, marginTop: 10, flex: 1 }}>
          <View style={{
            flexDirection: 'row',
            alignConten: 'space-around',
            flex: 1,
            borderBottomWidth: 0.2,
            borderColor: 'black',
            marginVertical: 5,
            justifyContent: 'center'
          }}>
            <View style={{ flex: 3 }}><Text style={{ fontSize: 13, fontWeight: 'bold', color: '#676767' }}>Items</Text></View>
            <View style={{ flex: 2.5 }}><Text style={{ fontSize: 13, fontWeight: 'bold', color: '#676767' }}>Qty</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: '#676767',
                alignSelf: 'flex-end'
              }}>Price</Text></View>
          </View>

          <View style={{ flexDirection: 'row', flex: 1, marginVertical: 5, alignItems: 'center' }}>
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 12, color: '#616161' }}>Evo Oil</Text>
            </View>
            <View style={{ flex: 2.5 }}>
              <Text style={{ fontSize: 13, color: '#616161' }}>8 Ctn</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
              <Text style={{ fontSize: 13, color: '#616161', alignSelf: 'flex-end' }}>150</Text>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#616161', marginTop: 3 }}>.00</Text>
            </View>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          flex: 1,
          marginVertical: 5,
          alignContent: 'center'
        }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#676767' }}>Total = </Text>
          <Text style={{ fontSize: 13, color: '#616161' }}>250</Text>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#616161', marginTop: 3 }}>.00</Text>
        </View>
      </View>
    )
  }
  renderRow = ({ item, index }) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{
          flexDirection: 'row',
          width: '100%',
          flex: 1,
          backgroundColor: Colors.white,
          height: 50,
          borderRadius: 8,
          alignContent: 'center',
          justifyContent: 'center',
          borderBottomWidth: 1,
          borderColor: Colors.charcoal
        }}>
          <View style={{ flex: 1, justifyContent: 'center', marginLeft: 20 }}>
            <Text
              style={{
                fontSize: 16,
                color: Colors.black,
                fontWeight: 'bold'
              }}
            >{item.name}</Text>
          </View>
          <View style={{ flex: 2, alignContent: 'flex-end', justifyContent: 'center' }}>

            <Icon
              onPress={() => {
                this.state.accordionData[index].open = !this.state.accordionData[index].open
                this.setState({ accordionData: this.state.accordionData })
              }}
              style={{ alignSelf: 'flex-end', marginRight: 16 }}
              name={item.open ? 'md-arrow-dropup' : 'md-arrow-dropdown'}
            />
          </View>
        </View>
        {item.open ? this.renderContent() : null}
      </View>

    )
  }

  render () {
    return (
      <Container style={{ backgroundColor: Colors.silver }}>
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
              name={'graph-bar'}
              type={'Foundation'}
            />
            <Text style={styles.titleText}>Shop History</Text>
            </Body>
            <Right
            />
          </Header>
        </GradientWrapper>
        <Content padder>
          <FlatList
            style={styles.accordion}
            keyExtractor={this.keyExtractor}
            data={this.state.accordionData}
            extraData={this.state}
            renderItem={this.renderRow}
          />
        </Content>

      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { history: state.history.payload }
}

export default connect(mapStateToProps, null)(ShopHistory)
