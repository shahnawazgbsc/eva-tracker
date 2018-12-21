import React from 'react'
import {View} from 'react-native'
import {Colors} from '../../Themes'
import MarketListView from './MarketListView'

export default class MarketListScreen extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <MarketListView/>
        )
    }
 }
