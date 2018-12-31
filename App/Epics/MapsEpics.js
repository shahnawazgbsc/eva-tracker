import { ofType } from 'redux-observable'
import GpsActions, { GpsLocationTypes } from '../Redux/GpsLocationRedux'
import { map, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'
import PolyLine from '@mapbox/polyline'
import { Alert } from 'react-native'

export const directionsEpic = (action$, state$, { api }) => action$.pipe(
  ofType(GpsLocationTypes.GPS_DIRECTION),
  mergeMap(action => {
    let current = state$.value.gps.data
    if (current) {
      return api.direction(current, action.location).pipe(
        map(response => {
          if (response.ok) {
            let way = PolyLine.decode(response.data.routes[0].overview_polyline.points)
            let waypoint = way.map((val, index) => {
              return {
                latitude: val[0],
                longitude: val[1]
              }
            })
            return GpsActions.gpsDirectionSuccess(waypoint)
          } else {
            return GpsActions.gpsFailure(response)
          }
        })
      )
    } else {
      Alert.alert('GPS Error', 'Failed to grab your location. Please try again')
      return of(GpsActions.gpsFailure(null))
    }
  })
)
