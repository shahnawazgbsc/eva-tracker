import {LatLng, Region} from "react-native-maps";
import * as R from "ramda";
import {ProviderResultsItem} from "../../Services/DataModel/SearchByNameResponse";
import supercluster, {Cluster, Supercluster} from "supercluster";
import {async} from "rxjs/internal/scheduler/async";

export function getZoomLevel(region: Region) {
  if (!region) return 0;
  const angle = region.longitudeDelta;
  return Math.round(Math.log(360 / angle) / Math.LN2);
}


export function filterFromCluster(cluster: Cluster[]): ProviderResultsItem[] {
  return cluster.map(v => v.properties.item);
}

export function createRegions(cluster: Supercluster, region: Region, zoom: number) {
  return cluster.getClusters([
    region.longitude - (region.longitudeDelta),
    region.latitude - (region.latitudeDelta),
    region.longitude + (region.longitudeDelta),
    region.latitude + (region.latitudeDelta),
  ], zoom);
}
