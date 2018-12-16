import React from 'react'
import {View} from 'react-native'
import Header from '../../Components/Header/Header'
import {Colors} from '../../Themes'
import {Scene,Tabs} from 'react-native-router-flux'
import MarketListScreen from '../Market/MarketListScreen'
import MarketNearMeScreen from '../Market/MarketNearMeScreen'
import MarketSearchScreen from '../Market/MarketSearchScreen'

export default class Market extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <View>
                <Header screen = 'market'/>
                <Tabs
                  key="marketContainerTabs"
                  swipeEnabled
                  showLabel={true}
                  tabBarPosition='top'
                  tabBarStyle={{ backgroundColor: Colors.menu }}
                  labelStyle={{ color: Colors.text }}
                  activeBackgroundColor={Colors.menu}
                  wrap={false}
                  lazy
                  >
                    <Scene
                      key="NearMe"
                      component={MarketNearMeScreen}
                      title="Near Me"
                      hideNavBar
                      back={false}
                    />
                    <Scene
                      key="ShopList"
                      component={MarketListScreen}
                      title="Shop List"
                      hideNavBar
                      back={false}
                    />
                    <Scene
                      key="Search"
                      component={MarketSearchScreen}
                      title="Search"
                      hideNavBar
                      back={false}
                    />
              </Tabs>
            </View>
        )
    }
}