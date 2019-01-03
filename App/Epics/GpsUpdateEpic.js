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
      firebase.firestore()
        .collection('tbl_users')
        .doc(userId.toString())
        .collection('user_history')
        .add({
          lng: longitude,
          userId: userId,
          lat: latitude,
          timestamp: new Date()
        })
        .then(docRef => { })
        .catch(error => { })


        firebase.firestore()
        .collection('tbl_users')
        .doc(userId.toString())
        .set({
          lng: longitude,
          userId: userId,
          lat: latitude,
          timestamp: new Date()
        })
        .then(docRef => { })
        .catch(error => { })
    }

    return of(StartupActions.voidAction())
  })
)
