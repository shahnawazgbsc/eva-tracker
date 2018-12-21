import { createMaterialTopTabNavigator } from 'react-navigation';
import MarketListScreen from '../Market/MarketListScreen'
import MarketNearMeScreen from '../Market/MarketNearMeScreen'
import MarketSearchScreen from '../Market/MarketSearchScreen'

export default createMaterialTopTabNavigator({
    "Near Me": { screen: MarketNearMeScreen },
    "Shop List": { screen: MarketListScreen },
    Search: { screen: MarketSearchScreen }
}, {
    tabStyle: {backgroundColor:'#F44336',
    activeTintColor: '#F44336',
    activeBackgroundColor: '#F44336'
}
  });