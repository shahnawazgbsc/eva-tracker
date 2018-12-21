import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'native-base'
import Header from '../Header/Header'
import styles from './mainscreenstyle'
import MapView, { Marker } from 'react-native-maps'

import Polyline from '@mapbox/polyline'
import flagPinkImg from './marker.png'
import currentImage from './pin.png'
const current = flagPinkImg;
const IMAGE = currentImage

export default class MainScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            daystart: false,
            endday: true,
            latitude: null,
            longitude: null,
            error: null,
            mapRegion: null,
            direction: false,
            waypoint: null,
            markerRegion: [
                { longitude: 67.0645, latitude: 24.9273, name: 'Tabba Heart' },
                { longitude: 67.0814, latitude: 24.896, name: 'National Studium' },
                { longitude: 67.2162, latitude: 24.8937, name: 'Bolan' }
            ],
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            let region = {
                latitude: Number(position.coords.latitude),
                longitude: Number(position.coords.longitude),
                latitudeDelta: 0.00922 * 1.5,
                longitudeDelta: 0.00421 * 1.5
            }
            this.setState({ mapRegion: region })
        }, (error) => {
            console.log(error)
        }, { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
    }

    async Direction(place) {
        var current = this.state.mapRegion.latitude + "," + this.state.mapRegion.longitude;
        var destination = place.latitude + "," + place.longitude;
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${current}&destination=${destination}&key=AIzaSyBrb2XMt6F8A37iCwSDUbsTj3P1GNYJmD4`)
            let respcheck = await resp.json();
            let way = Polyline.decode(respcheck.routes[0].overview_polyline.points);
            let waypoint = way.map((val, index) => {
                return {
                    latitude: val[0],
                    longitude: val[1]
                }
            })
            this.setState({
                waypoint,
                region: this.state.mapRegion,
                direction: true
            })
            return waypoint
        } catch (error) {
            return (error) => { console.log(error, 'error error error') }
        }
    }

    render() {
        return (
            <View style={{ display: 'flex', flex: 1 }}>
                <Header screenName='main screen' />
                <View style={styles.body}>
                    <MapView
                        style={{ flex: 5 }}
                        showsMyLocationButton={true}
                        region={this.state.mapRegion}
                        showsMyLocationButton={true}
                        showsUserLocation={false}
                        initialRegion={{
                            longitude: 67.001137,
                            latitude: 24.860735,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {this.state.mapRegion ?
                            <MapView.Marker
                                coordinate={{
                                    latitude: this.state.mapRegion.latitude,
                                    longitude: this.state.mapRegion.longitude,
                                }}

                                image={current}

                            />
                            : null}


                        {this.state.direction ?
                            <MapView.Polyline
                                coordinates={this.state.waypoint}
                                strokeWidth={7}
                                strokeColor='#1E88E5'
                            />
                            : null}

                        {this.state.markerRegion ? this.state.markerRegion.map((val, ind) => {
                            return (
                                <MapView.Marker
                                    onPress={(e) => { e.stopPropagation(); this.Direction.bind(this, val) }}
                                    coordinate={{
                                        latitude: val.latitude,
                                        longitude: val.longitude,
                                    }}
                                    image={IMAGE}

                                    key={ind}>
                                    <MapView.Callout onPress={() => { this.Direction(val) }}>
                                        <View>
                                            <Text style={{ fontSize: 18 }}>{val.name}</Text>
                                        </View>
                                    </MapView.Callout>
                                </MapView.Marker>
                            )
                        }) : null}
                    </MapView>

                    <View style={{ height: 70, backgroundColor: 'white' }}>
                        <View style={{ height: 12, backgroundColor: 'rgb(0, 164, 81)' }}></View>

                        <View style={{ height: 90, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 7 }}>
                            <Button style={styles.ButtonStyle} disabled={this.state.startday} onPress={() => {
                                this.setState({ startday: true }, () => { this.setState({ endday: false }) })
                            }}><Text style={styles.ButtonTextStyle}  >Day Start</Text></Button>
                            <Button style={styles.ButtonStyle} disabled={this.state.endday}><Text style={styles.ButtonTextStyle} >Market</Text></Button>
                            <Button style={styles.ButtonStyle} disabled={this.state.endday} onPress={() => {
                                this.setState({ endday: true }, () => { this.setState({ startday: false }) })
                            }} ><Text style={styles.ButtonTextStyle}   >End Day</Text></Button>
                        </View>
                        <View style={{ height: 8, backgroundColor: 'green' }}></View>

                    </View>
                </View>
            </View>
        )
    }
}
