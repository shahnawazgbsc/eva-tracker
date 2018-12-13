import React, { Component } from "react";
import { StyleSheet, View,ImageBackground ,Image} from "react-native";
import { Form, Item, Input,Icon, Text, Button } from "native-base";
import {moderateScale, scale} from "./moderatescale";


export default class Login extends Component {
    render() {
        return (
            <ImageBackground source={require('../../assets/LoginScreen.png')} style={ styles.ImageBackground}>


            <View style={styles.container}>
             <Image source={require('../Images/logo.png')} style={{ height:scale(100),width:scale(160),alignSelf:'center', marginBottom: 10}}/>
                <View style={styles.mainstyle}>
                    <Form>

                        <Item rounded style={{border: 0.15,backgroundColor:'#c0b46a', borderColor:'gray', height : 40}}>

                            <Image
                                source={require("../Images/email.png")}
                                style={styles.email}
                            />
                            <Input placeholder="Email Address" />
                        </Item>
                        <Item rounded style={{ marginTop: 10 ,border: 0.15,justifyContent:'center',borderColor:'gray', backgroundColor:'#c0b46a', height : 40}}>
                            <Image
                                source={require("../Images/ic_password.png")}
                                style={styles.email}
                            />
                            <Input placeholder="Password" secureTextEntry style={{alignSelf:'center'}}/>
                        </Item>
                    </Form>
                    <Button
                        rounded success style={
                            styles.ButtonStyle
                        }>
                        <Text>Login</Text>
                    </Button>
                </View>
                <View style={styles.mainstyle}>
                <Text style={styles.forgetText}>Forget Password ?</Text>
                </View>
            </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        display: "flex"
    },
    ImageBackground:{
        flex: 1,
                width: null,
                height: null,
                resizeMode: 'cover'
    },
    mainstyle:{
        margin:15
    },
    email: {
        width: moderateScale(20),
        height: moderateScale(20),
        margin: 20,
        padding:1
    },
    ButtonStyle: {
        justifyContent: "space-around", marginTop: 20, marginRight: 8,
        alignSelf: "flex-end",
        backgroundColor:'rgb(0,164,81)',
        fontSize:50,paddingLeft:10,paddingRight:10,paddingTop:-6,paddingBottom:-20

    },
forgetText:{
     textAlign:'right',color:'rgb(91, 87, 55)',marginTop:30
}
});
