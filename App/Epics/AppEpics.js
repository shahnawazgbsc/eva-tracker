import { filter, mergeMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import StartupActions from '../Redux/StartupRedux'
import { Alert } from 'react-native'
import { ofType } from 'redux-observable'
import { OfflineTypes } from '../Redux/OfflineRedux'
import * as R from 'ramda'

export const appEpic = (action$) => action$.pipe(
  filter(action => false), // R.pathSatisfies(R.compose(R.not, R.isEmpty), ['error', 'problem'], action)),
  mergeMap(action => {
    Alert.alert('Error', 'Something went wrong. Please try again later.')
    return of(StartupActions.voidAction())
  })
)

export const processStores = (action$, state$) => action$.pipe(
  ofType(OfflineTypes.SYNC_WITH_SERVER),
  mergeMap((action) => {
    let offline = state$.value.offline

    return from(R.map(value => R.merge({ offline: true, id: value.data.storeId }, value.action)
      , R.concat(offline.pjpShops, offline.otherShops)))
  })
)
