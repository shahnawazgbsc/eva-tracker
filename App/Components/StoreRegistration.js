import React, { Component } from 'react';
import { View, Text, ScrollView,StyleSheet } from 'react-native'
import { Form, Input, Label, Item, Picker, Icon, Header, Left, Right, Title, Button, Body } from 'native-base'

import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient'

export default class StoreRegistration extends Component {
    constructor(props) {
        super(props);


        this.state = {
            selected: undefined,
            num: 0,
            selected: [],
        };
    }
    onValueChange(value) {
        this.setState({
          selected: value
        });
      }
    selectPhotoTapped() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };

        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: response.uri };

            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

            this.setState({

              ImageSource: source

            });
          }
        });
      }

    render() {



        return (
            <View style={styles.container}>
            <LinearGradient colors={['#077940', '#00A150', '#019C4E']} style={styles.linearGradient}>

                <Header style={{backgroundColor:['#077940', '#00A150', '#019C4E'] }}>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={styles.TitleText}>Store Registration</Text>
                    </Body>
                    <Right>
                        <Button success style={styles.HedaerButton}>
                            <Text style={styles.HeaderText}>Check In</Text>
                        </Button>
                    </Right>
                </Header>
              </LinearGradient>
                <ScrollView>
                    <View style={styles.FormCotainer}>
                        <View style={{ width: "90%", marginTop: 20 }}>
                            <Item floatingLabel>
                                <Label style={{ color: "rgb(21, 48, 100)", fontSize: 12, fontWeight: 'bold', /*marginBottom: 12 */}}>* Shop Name</Label>
                                <Input />
                            </Item>
                            <View>
                                <Item floatingLabel>
                                    <Label style={styles.LableText}>* Shopkeeper Name</Label>
                                    <Input />
                                </Item>

                                <Item floatingLabel>
                                    <Label style={styles.LableText}>* Contact Number</Label>
                                    <Input />
                                </Item>


                                <Item floatingLabel style={{  /*marginBottom: 12,*/ marginTop: 8 }}   >
                                    <Label style={{ fontSize: 12, fontWeight: 'bold' }}>Landline</Label>
                                    <Input />
                                </Item>
                                <Item>

                                    <Picker
                                        mode="dropdown"
                                        placeholder="Select SubSection"
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        placeholder="Select SubSection"
                                        textStyle={{ color: "#5cb85c", fontSize: 10  }}
                                        itemStyle={{
                                            backgroundColor: "#d3d3d3",
                                            marginLeft: 0, fontSize: 5

                                        }}
                                        itemTextStyle={{ color: '#788ad2', fontSize: 5}}
                                        style={{ width: undefined }}
                                        selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item label="Select SubSection" value="key0" />
                                        <Picker.Item label="500 above" value="key1" />
                                        <Picker.Item label="250 to 499" value="key2" />

                                    </Picker>
                                </Item>


                                <Item floatingLabel>
                                    <Label style={styles.LableText}> Address</Label>
                                    <Input />
                                </Item>

                                <Item floatingLabel style={styles.LableText2}   >
                                    <Label style={{ fontSize: 12, fontWeight: 'bold' }}>Street</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel style={styles.LableText2}   >
                                    <Label style={{ fontSize: 12, fontWeight: 'bold' }}>City</Label>
                                    <Input />
                                </Item>

                                <Item floatingLabel style={styles.LableText2}   >
                                    <Label style={{ fontSize: 12, fontWeight: 'bold' }}>Landmark</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel style={{ /* marginBottom: 12 */marginTop: 8 }}   >
                                    <Label style={{ fontSize: 12, fontWeight: 'bold' }}>CNIC</Label>
                                    <Input />
                                </Item>
                                <Item>
                                    <Picker
                                        mode="dropdown"
                                        placeholder="*Select Days"
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        placeholder="Select Days"
                                        textStyle={{ color: "#5cb85c", fontSize: 12 }}

                                        style={{ width: undefined, fontSize: 12 }}
                                        selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange.bind(this)}

                                    >
                                        <Picker.Item label="Select Days" value="key0" style={styles.pickrStyle} />
                                        <Picker.Item label="MOnday" value="key1" style={styles.pickrStyle} />
                                        <Picker.Item label="Thuesday" value="key2" style={styles.pickrStyle} />
                                        <Picker.Item label="Wednesday" value="key3" style={styles.pickrStyle} />
                                        <Picker.Item label="Thusday" value="key4" style={styles.pickrStyle} />
                                        <Picker.Item label="Friday" value="key5" style={styles.pickrStyle} />
                                    </Picker>
                                </Item>
                                <Label style={{ fontSize: 12, fontWeight: 'bold', marginTop: 8 }}>Select Catergory</Label>
                                <Item>
                                    <Picker
                                        mode="dropdown"
                                        placeholder="*Select Category"
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        placeholder="Select Category"
                                        textStyle={{ color: "#5cb85c", fontSize: 12 }}
                                        itemTextStyle={{ fontSize: 12 }}
                                        style={{ width: undefined }}
                                        selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange.bind(this)}

                                    >
                                        <Picker.Item label="Select Category" value="key0" style={styles.pickrStyle} />
                                        <Picker.Item label="LMT" value="key1" style={styles.pickrStyle} />
                                        <Picker.Item label="V/S" value="key2" style={styles.pickrStyle} />
                                        <Picker.Item label="Retail" value="key3" style={styles.pickrStyle} />
                                    </Picker>
                                </Item>
                                <Label style={{ fontSize: 12, fontWeight: 'bold', marginTop: 8 }}>Select Classification</Label>
                                <Item>
                                    <Picker
                                        mode="dropdown"
                                        placeholder="Select Classification"
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        placeholder="Select Classification"

                                        itemTextStyle={{ color: '#788ad2', fontSize: 12 }}
                                        style={{ width: undefined }}
                                        selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item label="Select Classification" value="key0" />
                                        <Picker.Item label="500 Above" value="key1" />
                                        <Picker.Item label="250 to 499" value="key2" />
                                        <Picker.Item label="100 to249" value="key3" />
                                        <Picker.Item label="Less then 100" value="key4" />
                                    </Picker>
                                </Item>
                                <Label style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 7 ,marginTop:10}}>Status</Label>
                                <CircleCheckBox
                                    checked={true}
                                    onToggle={(checked) => console.log('My state is: ', checked)}
                                    labelPosition={LABEL_POSITION.RIGHT}
                                    outerColor='rgb(35, 92, 114)'
                                    label="Active"
                                    style={{ marginBottom: 7, width : 10, height : 10}}
                                />
                                <Text></Text>
                                <CircleCheckBox
                                    checked={false}
                                    onToggle={(checked) => console.log('My state is: ', checked)}
                                    labelPosition={LABEL_POSITION.RIGHT}
                                    label="Inactive"
                                    outerColor='rgb(35, 92, 114)'
                                />
                                <Item style={{ marginTop: 12 ,}}>
                                    <Button iconLeft style={{ backgroundColor: 'rgb(216,216,216)',paddingRight:12 }} onPress={this.selectPhotoTapped.bind(this)} >
                                        <Icon name='md-attach' style={{rotation:230, backgroundColor: 'rgb(216,216,216)', }} />

                                    </Button>
                                    <Label style={{ color: "rgb(242, 242, 242)" ,fontSize:12 }}> *Add Photo</Label>
                                </Item>

                                <Button full success style={{ backgroundColor: 'rgb(52, 191, 162)', marginTop: 8,marginBottom: 8, borderRadius: 8 }}>
                                    <Text style={{ color: 'white' }}>Add Store</Text>
                                </Button>
                            </View>
                        </View>
                    </View >
                </ScrollView>
            </View>
        )

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

        display: "flex"
    },
    HedaerButton:{
        borderRadius: 10 ,
        backgroundColor: 'white'
    },
    HeaderText:{
        color:'green',
        fontSize: 12,
        paddingRight: 5,
        paddingLeft: 5,

    },
    TitleText:{
        fontSize: 14,
        color:'white'
    }
    ,
    ButtonStyle: {
        justifyContent: "space-around", marginTop: 8, marginRight: 8,
        alignSelf: "flex-end",

    },
    FormCotainer:{ flex: 1, alignItems: 'center', backgroundColor: 'white' },
    LableText:{ fontSize: 12, fontWeight: 'bold',  marginBottom: 12, marginTop: 8 },
    LableText2:{ /* marginBottom: 12 */ marginTop: 8 },
    pickrStyle:{fontSize:12}
});