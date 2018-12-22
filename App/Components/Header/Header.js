import * as React from 'react'
import styles from './HeaderStyle'
import { Body, Button, Header as NBHeader, Icon, Left, Right, Text } from 'native-base'
import GradientWrapper from '../GradientWrapper'

export default class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hideBack: false,
      screen: props.screenName,
      headerText: props.header
    }
  }

  setting = () => {

  }
  filters = () => {

  }
  add = () => {

  }

  render () {
    return (
      <GradientWrapper>
        <NBHeader style={styles.header}>
          <Left>
            {
              <Button transparent light onPress={this.props.back}>
                {this.renderLeftIcon()}
              </Button>
            }

          </Left>
          <Body>
          <Text style={styles.titleText}>{this.state.headerText}</Text>
          </Body>
          <Right>
            <Button transparent light onPress={this.onPressHandlers()}>
              {this.renderRightIcon()}
            </Button>
          </Right>
        </NBHeader>
      </GradientWrapper>
    )
  }

  renderLeftIcon () {
    switch (this.state.screen) {
      case 'main screen':
        return (<Icon style={styles.icon} name='menu'/>)
      case 'market survey':
        return (
          <Icon style={styles.icon} name='menu'/>)
      case 'market':
        return (
          <Icon style={styles.icon} name='menu'/>)
    }
  }

  renderRightIcon () {
    switch (this.state.screen) {
      case 'main screen':
        return (<Icon style={styles.icon} name='settings'/>)
      case 'market':
        return (
          <Icon style={styles.icon} name='tune' type="MaterialIcons"/>)
      case 'market survey':
        return (
          <Icon style={styles.icon} name='add'/>)
    }
  }

  onPressHandlers () {
    switch (this.state.screen) {
      case 'main screen':
        return this.setting
      case 'market survey':
        return this.add
      case 'market':
        return this.filters
    }
  }
}
