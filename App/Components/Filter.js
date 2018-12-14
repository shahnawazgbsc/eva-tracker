import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text, Item, Header,  Icon, Body, Title, Right, } from 'native-base'
// import { Button } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { CheckBox } from 'react-native-elements'
import Modal from "react-native-modal";

export default class popup extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    }
  }

  render() {
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <Button full success style={{ backgroundColor: 'rgb(52, 191, 162)', marginTop: 8, borderRadius: 8 }} onPress={() => {
          this.setState({ visible: true })
        }}>
          <Text style={{ color: 'white' }}>Add Store</Text>
        </Button>

        <Modal visible={this.state.visible}>
          <View style={{ backgroundColor: 'white' }}>
            <LinearGradient colors={['#077940', '#00A150', '#019C4E']} >

              <Header style={{ backgroundColor: ['#077940', '#00A150', '#019C4E'] }}>

                <Body>
                  <Title>FILTER BY</Title>
                </Body>
                <Right>
                  {/* <Button success style={styles.HedaerButton} > */}
                  <Icon name='ios-close-circle-outline' style={{ color: 'white' }} onPress={() => {
                    this.setState({ visible: false })
                  }} />
                  {/* </Button> */}
                </Right>
              </Header>
            </LinearGradient>
            <View style={{margin:10 }} >
            <Button bordered  block style={{marginBottom:8 ,borderRadius:4}}>
            <Text  style={{color:'black',fontWeight:'400'}}>Target Hospital</Text>
          </Button>
          <Button bordered  block style={{marginBottom:8 ,borderRadius:4,backgroundColor:'rgb(52,191,162)'}}>
            <Text style={{color:'black',fontWeight:'400'}}>Archieved Hospital</Text >
          </Button>
          <Button bordered  block style={{marginBottom:8 ,borderRadius:4}}>
            <Text  style={{color:'black',fontWeight:'400'}}>Unexpected Targets</Text>
          </Button>
          <Button bordered  block style={{marginBottom:8 ,borderRadius:4}}>
            <Text style={{color:'black',fontWeight:'400'}}>Rescheduled Targets</Text>
          </Button>


            </View>
          </View>
        </Modal>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    display: "flex"
  },
  HedaerButton: {
    borderRadius: 10,
    backgroundColor: 'white'
  },
  HeaderText: {
    color: 'green',

  }
  ,
  ButtonStyle: {
    justifyContent: "space-around", marginTop: 8, marginRight: 8,
    alignSelf: "flex-end",

  },
  FormCotainer: { flex: 1, alignItems: 'center', backgroundColor: 'white' },
  LableText: { fontSize: 12, fontWeight: 'bold', /* marginBottom: 12, */marginTop: 8 },
  LableText2: { /* marginBottom: 12 */ marginTop: 8 },
  pickrStyle: { fontSize: 12 }
});
