import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import StoresActions, { StoresTypes } from '../Redux/StoresRedux'
import { map, mergeMap } from 'rxjs/operators'
import moment from 'moment'
import { Alert } from 'react-native'
import * as R from 'ramda'

export const dayStartEpic = (action$, state$, { api }) => action$.pipe(
  ofType(StoresTypes.DAY_START_REQUEST),
  mergeMap(action => {
    const companyid = state$.value.login.payload.user.companyid
    const userid = state$.value.login.payload.user.userid
    const dayStartDate = state$.value.store.dayStartDate

    if (!dayStartDate || moment(dayStartDate).isBefore(new Date(), 'D')) {
      const data = {
        starttime: new Date(),
        companyid,
        userid,
        subsectionid: action.data
      }

      return api.dayStart(data).pipe(
        map(response => {
          if (response.ok) {
            return StoresActions.dayStartSuccess(response.data.pjpId)
          } else {
            return StoresActions.storesFailure(response)
          }
        })
      )
    } else {
      Alert.alert(null, 'Day has been ended for today')
      return of(StoresActions.storesFailure(null))
    }
  })
)

export const dayEndEpic = (action$, state$, { api }) => action$.pipe(
  ofType(StoresTypes.DAY_END_REQUEST),
  mergeMap(action => {
    const PjpShops = R.length(state$.value.store.pjpShops)
    const PjpVisited = R.length(R.filter(R.propEq('pjp', true)(state$.value.store.achieved)))
    const Productive = R.length(R.filter(R.propEq('productive', true)(state$.value.store.achieved)))
    const VisitedShop = R.length(state$.value.store.achieved)
    const OutOfPjpVisited = VisitedShop - PjpVisited
    const NotProductive = VisitedShop - Productive
    const NotVisited = PjpShops - PjpVisited

    const data =
      {
        pjpId: state$.value.store.pjpId,
        starttime: state$.value.store.dayStartDate,
        endtime: new Date(),
        userid: state$.value.login.payload.user.userid,
        companyid: state$.value.login.payload.user.companyid,
        subsectionid: state$.value.store.subsection,
        PjpShops,
        PjpVisited,
        OutOfPjpVisited,
        VisitedShop,
        Productive,
        NotProductive,
        NotVisited,
        note: action.note
      }

    return api.dayEnd(data).pipe(
      map(response => {
        if (response.ok) {
          return StoresActions.dayEndSuccess()
        } else {
          return StoresActions.storesFailure(response)
        }
      })
    )
  })
)
