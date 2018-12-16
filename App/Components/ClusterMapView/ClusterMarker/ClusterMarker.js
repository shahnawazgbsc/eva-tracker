import * as React from "react";
import {Text, View} from "react-native";
import styles from "./ClusterMarkerStyle";
import {Marker, LatLng} from "react-native-maps";
import {ClusterProperties, Supercluster} from "supercluster";

export default class ClusterMarker extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Marker
        style={styles.container}
        coordinate={LatLng}
        tracksViewChanges={false}
        onPress={()=>{}}>
          <View style={styles.circle}>
            <Text style={styles.text}>{ClusterProperties.point_count}</Text>
          </View>
      </Marker>
    );
  };
}

export default ClusterMarker;
