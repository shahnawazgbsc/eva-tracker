import * as React from "react";
import styles from "./HeaderStyle";
import {Body, Button, Header as NBHeader, Icon, Left, Right, Text} from "native-base";
import {Actions} from "react-native-router-flux";

const back = () => {
  Actions.pop();
};
const setting = () => {

};
const filters = () => {

}
const add = () => {

}
const menu = () => {
  Actions.drawerOpen();
};

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style:{},
      hideBack:false,
      screen:props.screenName,
      pressHandler:props.pressHandler
    }
  }
  componentWillMount(){

  }
  render(){
    return(
      <NBHeader style={[styles.menu]}>
    <Left>
      {
        <Button transparent onPress={menu}>
          {this.renderLeftIcon()}
        </Button>
      }

    </Left>
    <Body>
    <Text>{this.renderHeaderText()}</Text>
    </Body>
    <Right>
      <Button transparent onPress={this.state.pressHandler}>
      {this.renderRightIcon}
      </Button>
    </Right>
  </NBHeader>
    );
  }
  renderLeftIcon(){
    switch(this.state.screen) {
      case 'main screen':
        return (<Icon style={styles.icon} name='menu'/>)
      case 'market survey':
        return(
          <Icon style={styles.icon} name='menu'/>)
      case 'market':
        return(
          <Icon style={styles.icon} name='menu'/>)
      case 'inventory':
        return(
          <Icon style={styles.icon} name='menu'/>)
    }
  }
  renderRightIcon() {
    switch(this.state.screen) {
      case 'main screen':
        return (<Icon style={styles.icon} name='settings'/>)
      case 'market':
        return(
          <Icon style={styles.icon} name='tune' type='MaterialIcons'/>)
      case 'add order':
        return(
          <Icon style={styles.icon} name='tune' type='MaterialIcons'/>)
      case 'booking order':
        return(
          <Icon style={styles.icon} name='add'/>)
    }
  }
  renderHeaderText() {
    switch(this.state.screen) {
      case 'main screen':
        return "Main Screen"
      case 'market survey':
        return "Market Survey"
      case 'market':
        return "Market"
      case 'add order':
          return 'Add To Cart'
      case 'booking order':
          return 'Booking / Sales Order'
      case 'inventory':
          return 'Inventory Taking'
    }

  }
}
