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
      screen:props.screenName
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
      <Button transparent onPress={this.onPressHandlers()}>
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
    }
  }
  renderRightIcon() {
    switch(this.state.screen) {
      case 'main screen':
        return (<Icon style={styles.icon} name='setting'/>)
      case 'market':
        return(
          <Icon style={styles.icon} name='tune'/>)
      case 'market survey':
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
