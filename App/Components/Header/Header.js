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
      headerText:props.header
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
    <Text>{this.state.headerText}</Text>
    </Body>
    <Right>
      <Button transparent onPress={this.onPressHandlers()}>
      {this.renderRightIcon()}
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
    }
  }
  renderRightIcon() {
    switch(this.state.screen) {
      case 'main screen':
        return (<Icon style={styles.icon} name='settings'/>)
      case 'market':
        return(
          <Icon style={styles.icon} name='tune' type="MaterialIcons"/>)
      case 'market survey':
        return(
          <Icon style={styles.icon} name='add'/>)
    }
  }
  onPressHandlers() {
    switch(this.state.screen) {
      case 'main screen':
        return setting
      case 'market survey':
        return add
      case 'market':
        return filters

    }
  }
}
