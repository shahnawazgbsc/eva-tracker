import React from 'react'
import {View} from 'react-native'
import Header from '../../Components/Header/Header'
import {Colors} from '../../Themes'
import {Scene,Tabs} from 'react-native-router-flux'
import MarketTabs from './MarketTabs'

export default class Market extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
                <MarketTabs/>
            
        )
    }
}