import React from "react";
import MapView, {Callout, Marker, Region} from "react-native-maps";
import {Subject} from "rxjs";
import {Images} from "../../Themes";
import {Text} from "react-native";

export const EDGE_PADDING = {top: 20, bottom: 10, left: 10, right: 10};
export default class ClusterMapView extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      style:props.style,
      region:null,
      features:null
    }
  }
  render() {
    if (!this.state.features) return null;
    return(
    <MapView
      style={this.state.style}
      mapPadding={EDGE_PADDING}
      initialRegion={this.state.region}
      onRegionChange={this.onRegionComplete}
      ref={component => this._map = component}>
      {this.state.features.map((value, index) => this.renderMarker(value, index))}
    </MapView>
    );
  }
  onRegionComplete(region){
    new Subject().next(region);

  }
  renderMarker(value,index){
    let coordinate = {latitude: parseFloat(value.geometry.coordinates[1]), 
      longitude: parseFloat(value.geometry.coordinates[0])};

    if (!value.properties.cluster) {
      return (
        <Marker coordinate={coordinate} key={index} image={Images.Marker}>
          <Callout>
            <Text>Provider name: {value.properties.item.providerName}</Text>
          </Callout>
        </Marker>
      );

    } 
  }
}
