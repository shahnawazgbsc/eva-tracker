import * as R from 'ramda'
import { mergeMap, filter } from 'rxjs/operators'
import { of } from 'rxjs'
import StartupActions from '../Redux/StartupRedux'
import { Alert } from 'react-native'

export const appEpic = (action$) => action$.pipe(
  filter(action => false), // R.pathSatisfies(R.compose(R.not, R.isEmpty), ['error', 'problem'], action)),
  mergeMap(action => {
    Alert.alert('Error', 'Something went wrong. Please try again later.')
    return of(StartupActions.voidAction())
  })
)
