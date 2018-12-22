import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import CheckInRedux, { CheckInTypes } from '../Redux/CheckInRedux'
import CheckOutRedux, { CheckOutTypes } from '../Redux/CheckOutRedux'
import OrderTakingRedux, { OrderTakingTypes } from '../Redux/OrderTakingRedux'

export const checkInEpic = (action$, state$, { api }) => action$.pipe(
  ofType(CheckInTypes.CHECK_IN_REQUEST),
  mergeMap(action => api.checkIn(action.data).pipe(
    map(response => {
      if (response.ok) {
        return CheckInRedux.checkInSuccess(response.data)
      } else {
        return CheckInRedux.checkInFailure(response.data)
      }
    })
  ))
)

export const checkOutEpic = (action$, state$, { api }) => action$.pipe(
  ofType(CheckOutTypes.CHECK_OUT_REQUEST),
  mergeMap(action => api.checkOut(action.data).pipe(
    map(response => {
      if (response.ok) {
        return CheckOutRedux.checkOutSuccess(response.data)
      } else {
        return CheckOutRedux.checkOutFailure(response.data)
      }
    })
  ))
)

export const addItemsEpic = (action$, state$, { api }) => action$.pipe(
  ofType(OrderTakingTypes.ORDER_TAKING_REQUEST),
  mergeMap(action => api.addItems(action.data).pipe(
    map(response => {
      if (response.ok) {
        return OrderTakingRedux.orderTakingSuccess(response.data)
      } else {
        return CheckInRedux.orderTakingFailure(response.data)
      }
    })
  ))
)
