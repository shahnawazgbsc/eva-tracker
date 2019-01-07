import { ofType } from 'redux-observable'
import { GpsLocationTypes } from '../Redux/GpsLocationRedux'
import { of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import StartupActions from '../Redux/StartupRedux'

export default (action$, state$, { firebase }) => action$.pipe(
  ofType(GpsLocationTypes.GPS_UPDATE),
  mergeMap(action => {
    let { latitude, longitude } = action.data
    const userId = state$.value.login.payload && state$.value.login.payload.user.userid

    if (userId) {
      const add = firebase.firestore()
        .collection('tbl_users')
        .doc(userId.toString())
        .collection('user_history')
        .doc()

      const tblUsers = firebase.firestore()
        .collection('tbl_users')
        .doc(userId.toString())

      firebase.firestore().batch()
        .set(add, {
          lng: longitude,
          userId,
          lat: latitude,
          timestamp: new Date()
        })
        .set(tblUsers, {
          lng: longitude,
          userId,
          lat: latitude,
          timestamp: new Date()
        }).commit()
    }

    return of(StartupActions.voidAction())
  })
)
