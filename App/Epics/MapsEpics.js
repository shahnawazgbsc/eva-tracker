import { ofType } from 'redux-observable'
import GpsActions, { GpsLocationTypes } from '../Redux/GpsLocationRedux'
import { mergeMap, map } from 'rxjs/operators'
import PolyLine from '@mapbox/polyline'

export const directionsEpic = (action$, state$, { api }) => action$.pipe(
  ofType(GpsLocationTypes.GPS_DIRECTION),
  mergeMap(action => {
    let current = state$.value.gps.data
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
  })
)
