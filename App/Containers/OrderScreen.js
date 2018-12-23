import * as React from 'react'
import { FlatList, Image, View } from 'react-native'
import { Button, Card, CardItem, Container, Content, Fab, Footer, Icon, Text } from 'native-base'
import { connect } from 'react-redux'
import GradientWrapper from '../Components/GradientWrapper'
import styles from './Styles/OrderScreenStyle'
import ConvertToCurrency from '../Transforms/ConvertToCurrency'
import { Colors, Images } from '../Themes'

class OrderScreen extends React.Component {

  addOrder = () => {
    console.log('Add Item')
    this.props.navigation.navigate('AddNewItem')
  }

  menu = () => {

  }

  header = () => {
    return (
      <View style={styles.listHeader}>
        <Icon style={[styles.item1, { color: Colors.success }]} name={'arrow-dropdown'}
        />
        <Text style={styles.item2}>Product</Text>
        <Text style={styles.item3}>Qty</Text>
        <Text style={styles.item4}>SKU</Text>
        <View style={styles.item5}/>
      </View>
    )
  }

  renderRow = ({ item }) => {
    return (
      <View style={styles.listHeader}>
        <Image
          style={[styles.item1, { color: Colors.success }]}
          source={Images.logo}
          resizeMode={'contain'}
        />
        <View style={styles.item2}>
          <Text>{item.name}</Text>
          <Text>Product ID: {item.itemCode}</Text>
        </View>
        <View style={styles.item3}>

        </View>
        <View style={styles.item4}>

        </View>
        <Button transparent style={styles.item5}>
          <Icon name={'trash'} style={{ color: Colors.fire }}
          />
        </Button>
      </View>
    )
  }

  separator = () => {
    return (
      <View style={styles.divider}
      />
    )
  }

  render () {
    return (
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
                name={'add-shopping-cart'}
                type={'MaterialIcons'}
              />
              <Text style={styles.headerText}>Booking Sales / Order</Text>
            </View>
            <Fab
              active
              position={'topRight'}
              style={[styles.fab]}
              onPress={this.addOrder}
            >
              <Icon
                name={'add'}
              />
            </Fab>
          </View>
        </GradientWrapper>
        <Content style={styles.containerContent}>
          {
            !!this.props.items &&
            <Card>
              <CardItem>
                <FlatList
                  renderItem={this.renderRow}
                  data={this.props.items}
                  ListHeaderComponent={this.header}
                  ItemSeparatorComponent={this.separator}
                />
              </CardItem>
            </Card>
          }
        </Content>
        <GradientWrapper>
          <Footer style={[styles.header, styles.footer]}>
            <Text style={styles.amountText}>TOTAL PAYMENT = {ConvertToCurrency(0)}</Text>
            <Button danger>
              <Icon
                name={'arrow-dropleft'}
              />
              <Text>CheckOut</Text>
            </Button>
          </Footer>
        </GradientWrapper>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.brands && state.brands.payload[2].items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen)
