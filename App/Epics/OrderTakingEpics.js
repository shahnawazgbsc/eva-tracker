import { ofType } from 'redux-observable'
import { map, mergeMap } from 'rxjs/operators'
import ShopActions, { ShopTypes } from '../Redux/ShopRedux'
import moment from 'moment'

export const checkInEpic = (action$, state$, { api }) => action$.pipe(
  ofType(ShopTypes.CHECK_IN_REQUEST),
  mergeMap(action => {
    const companyId = state$.value.login.payload.user.companyid
    const latitude = state$.value.gps.data.latitude
    const longitude = state$.value.gps.data.longitude

    const data = {
      StoreId: action.data.storeId,
      companyId,
      latitude,
      longitude,
      ContactPersonName: '',
      ContactNo: '',
      StartTime: moment().format('YYYY-MM-DD LT'),
      Status: 'Pending',
      NextScheduledVisit: ''
    }
    return api.checkIn(data).pipe(
      map(response => {
        if (response.ok) {
          return ShopActions.checkInSuccess({ ...data, storeVisitId: response.data.storeVisitId })
        } else {
          return ShopActions.shopFailure(response)
        }
      })
    )
  })
)

export const checkOutEpic = (action$, state$, { api }) => action$.pipe(
  ofType(ShopTypes.CHECK_OUT_REQUEST),
  mergeMap(action => {
    const latitude = state$.value.gps.data.latitude
    const longitude = state$.value.gps.data.longitude

    const data = {
      StoreId: action.data.StoreId,
      companyId: action.data.companyId,
      latitude,
      longitude,
      ContactPersonName: '',
      ContactNo: '',
      StartTime: action.data.StartTime,
      NextScheduledVisit: '',
      Location: '',
      Notes: '',
      EndTime: moment().format('YYYY-MM-DD LT'),
      StoreVisitId: action.data.storeVisitId,
      Status: 'Achieved'
    }

    return api.checkOut(data).pipe(
      map(response => {
        if (response.ok) {
          if (action.data.onSuccess) action.data.onSuccess()
          return ShopActions.checkOutSuccess(response.data)
        } else {
          return ShopActions.shopFailure(response)
        }
      })
    )
  })
)

export const placeOrderEpics = (action$, state$, { api }) => action$.pipe(
  ofType(ShopTypes.PLACE_ORDER_REQUEST),
  mergeMap(action => {
    const checkInParams = state$.value.shop.checkInParam
    const Order = action.data.items.map(value => ({
      inventoryItemId: value.inventoryItemId,
      quantity: value.quantity,
      storeVisitId: checkInParams.storeVisitId,
      companyId: checkInParams.companyId,
      StoreId: checkInParams.StoreId
    }))

    return api.addItems({ Order }).pipe(
      map(response => {
        if (response.ok) {
          if (action.data.onSuccess) action.data.onSuccess()
          return ShopActions.placeOrderSuccess()
        } else {
          return ShopTypes.shopFailure(response)
        }
      })
    )
  })
)
