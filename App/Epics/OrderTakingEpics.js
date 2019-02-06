import { ofType } from 'redux-observable'
import { Alert } from 'react-native'
import { map, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'
import * as R from 'ramda'
import ShopActions, { ShopTypes } from '../Redux/ShopRedux'
import 'firebase/firestore'

export const checkInEpic = (action$, state$, { api }) => action$.pipe(
  ofType(ShopTypes.CHECK_IN_REQUEST),
  mergeMap(action => {
    const companyId = state$.value.login.payload.user.companyid
    const latitude = state$.value.gps.data && state$.value.gps.data.latitude
    const longitude = state$.value.gps.data && state$.value.gps.data.longitude

    if (latitude && longitude) {
      const data = {
        StoreId: action.data.storeId,
        pjp: !!action.data.pjp,
        companyId,
        latitude,
        longitude,
        ContactPersonName: '',
        ContactNo: '',
        StartTime: new Date((new Date()).toLocaleString()),
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
    } else {
      Alert.alert('Failed to grab your location. Please try again')
      return of(ShopActions.shopFailure(null))
    }
  })
)

export const checkOutEpic = (action$, state$, { api, firebase }) => action$.pipe(
  ofType(ShopTypes.CHECK_OUT_REQUEST),
  mergeMap(action => {
    const latitude = state$.value.gps.data && state$.value.gps.data.latitude
    const longitude = state$.value.gps.data && state$.value.gps.data.longitude

    const checkInParam = state$.value.shop.checkInParam
    const userId = state$.value.login.payload.user.userid

    if (latitude && longitude) {
      const data = {
        StoreId: checkInParam.StoreId,
        pjp: !!action.data.pjp,
        companyId: checkInParam.companyId,
        latitude,
        longitude,
        ContactPersonName: '',
        ContactNo: '',
        StartTime: checkInParam.StartTime,
        NextScheduledVisit: '',
        Location: '',
        Notes: '',
        EndTime: new Date((new Date()).toLocaleString()),
        StoreVisitId: checkInParam.storeVisitId,
        Status: 'Achieved'
      }
      const dateNow = String(new Date().getMilliseconds())

      return api.checkOut(data).pipe(
        map(response => {
          if (response.ok) {
            firebase.firestore().batch().set(
              firebase.firestore()
                .collection('tbl_shops')
                .doc(String(checkInParam.StoreId))
                .collection('shop_events')
                .doc(dateNow),
              {
                device_name: 'ABC_Device',
                lng: latitude,
                lat: longitude,
                shopId: String(checkInParam.StoreId),
                eventId: dateNow,
                userId: String(userId),
                timestamp: new Date((new Date()).toLocaleString())
              }).set(firebase.firestore().collection('tbl_shops')
                .doc(String(checkInParam.StoreId))
                .collection('visit_summary')
                .doc(dateNow),
              {
                pjp: !!action.data.pjp,
                productive: action.data.productive,
                lat: latitude,
                lng: longitude,
                shopId: checkInParam.StoreId,
                userId: userId,
                visitId: Number.parseInt(dateNow),
                timestamp: new Date((new Date()).toLocaleString())
              }).commit()

              firebase.firestore().collection('tbl_shops')
                .doc(String(checkInParam.StoreId))
                .set(
              {
                userId: userId,
                lng: longitude,
                lat: latitude,
                shopId: checkInParam.StoreId,
                timestamp: new Date((new Date()).toLocaleString())
              })

            if (action.data.onSuccess) action.data.onSuccess()
            return ShopActions.checkOutSuccess(
              {
                id: checkInParam.StoreId,
                pjp: !!action.data.pjp,
                productive: action.data.productive
              }, userId
            )
          } else {
            return ShopActions.shopFailure(response)
          }
        })
      )
    } else {
      Alert.alert('GPS Error', 'Failed to grab your location. Please try again')
      return of(ShopActions.shopFailure(null))
    }
  })
)
export const nonProductiveReasonsEpics = (action$, state$, { api }) => action$.pipe(
  ofType(ShopTypes.NON_PRODUCTIVE_REASONS),
  mergeMap(action => {
    const companyId = state$.value.login.payload.user.companyid
    return api.nonProductiveReasons(companyId).pipe(
      map(response => {
        if (response.ok) {
          return ShopActions.nonProductiveReasonsSuccess(response.data)
        } else {
          return ShopActions.nonProductiveReasonsFailure(response)
        }
      }))
  })
)
export const placeOrderEpics = (action$, state$, { api }) => action$.pipe(
  ofType(ShopTypes.PLACE_ORDER_REQUEST),
  mergeMap(action => {
    const checkInParams = state$.value.shop.checkInParam
    const userId = state$.value.login.payload.user.userid
    const Order = action.data.items.map(value => ({
      ...value,
      storeVisitId: checkInParams.storeVisitId,
      companyId: checkInParams.companyId,
      StoreId: checkInParams.StoreId,
      userId: userId
    }))

    const hasReason = R.has('noorderreason')(action.data.items[0])
    var extra = action.data.items[0].extraDiscount

    return api.addItems({ Order }).pipe(
      mergeMap(response => {
        if (!response.ok || hasReason) {
          return of(response)
        } else {
          const array = response.data.response[0].orderTakings.map(value => ({
            orderTakingId: value.orderTakingId,
            inventoryItemId: value.inventoryItemId,
            quantity: value.quantity,
            storeVisitId: value.storeVisitId,
            companyId: value.companyId,
            storeId: value.storeId,
            extraDiscount: extra,
            userId: userId
          }))
          return api.salesIndents(array)
        }
      }),
      mergeMap(response => {
        if (response.ok) {
          if (action.data.onSuccess) action.data.onSuccess()
          return of(ShopActions.placeOrderSuccess())
        } else {
          if (action.data.onFailure) action.data.onFailure()
          return of(ShopActions.placeOrderFailure(response))
        }
      })
    )
  })
)
