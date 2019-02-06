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
    const dayStartDate = state$.value.store.dayStartDate[userid]

    if (!dayStartDate || moment(dayStartDate).isBefore(new Date((new Date()).toLocaleString()), 'D')) {
      const data = {
        starttime: new Date((new Date()).toLocaleString()),
        companyid,
        userid,
        subsectionid: action.data
      }

      return api.dayStart(data).pipe(
        map(response => {
          if (response.ok) {
            return StoresActions.dayStartSuccess(response.data.pjpId, userid)
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
    const userid = state$.value.login.payload.user.userid
    const PjpShops = R.length(state$.value.store.pjpShops)
    const PjpVisited = R.length(R.filter(R.propEq('pjp', true)(state$.value.store.achieved[userid])))
    const Productive = R.length(R.filter(R.propEq('productive', true)(state$.value.store.achieved[userid])))
    const VisitedShop = R.length(state$.value.store.achieved[userid])
    const OutOfPjpVisited = VisitedShop - PjpVisited
    const NotProductive = VisitedShop - Productive
    const NotVisited = PjpShops - PjpVisited

    const data =
      {
        pjpId: state$.value.store.pjpId[userid],
        starttime: state$.value.store.dayStartDate[userid],
        endtime: new Date((new Date()).toLocaleString()),
        userid,
        companyid: state$.value.login.payload.user.companyid,
        subsectionid: state$.value.store.subsection[userid],
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
          return StoresActions.dayEndSuccess(data.userid)
        } else {
          return StoresActions.storesFailure(response)
        }
      })
    )
  })
)
