import React from 'react'
import {View} from 'react-native'
import {Button,Text} from 'native-base'
import Header from '../../Components/Header/Header'
import styles from './MainScreenStyle'
import ClusterMapView from '../../Components/ClusterMapView/ClusterMapView'

export default class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    render() {
        return(
            <View styles={styles.mainContainer}>
                <Header screenName = "main screen"/>
                <View style={styles.body}>
                    {/* <ClusterMapView style={{height:'75%'}}/> */}
                    <View style={styles.buttonContainer}>
                        <Button rounded success>
                            <Text>Day Start</Text>
                        </Button>
                        <Button rounded success>
                            <Text>Market</Text>
                        </Button>
                        <Button rounded success>
                            <Text>End Day</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}