import { ofType } from 'redux-observable'
import { Alert } from 'react-native'
import { map, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'
import * as R from 'ramda'
import moment from 'moment'
import ShopActions, { ShopTypes } from '../Redux/ShopRedux'
import 'firebase/firestore'
import realm from '../Database/realm'

export const checkInEpic = (action$, state$, { api }) => action$.pipe(
  ofType(ShopTypes.CHECK_IN_REQUEST),
  mergeMap(action => {
    // const companyId = state$.value.login.payload.user.companyid
    // const latitude = state$.value.gps.data && state$.value.gps.data.latitude
    // const longitude = state$.value.gps.data && state$.value.gps.data.longitude
    if (action.data.latitude && action.data.longitude) {
      const data = {
        StoreId: action.data.storeId,
        pjp: !!action.data.pjp,
        companyId:action.data.companyId,
        latitude:action.data.latitude,
        longitude:action.data.latitude,
        ContactPersonName: '',
        ContactNo: '',
        StartTime: action.data.StartTime,
        Status: 'Pending',
        NextScheduledVisit: ''
      }
      return api.checkIn(data).pipe(
        map(response => {
          if (response.ok) {
            realm.write(()=>{
              realm.create('CheckIn',{
                StoreId:action.data.storeId,
                StoreVisitId:response.data.storeVisitId
              },true)
            })
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
alert(JSON.stringify(action))
    if (action.data.shop.latitude && action.data.shop.longitude) {
      const data = {
        StoreId: action.data.shop.StoreId,
        pjp: !!action.data.shop.pjp,
        companyId: action.data.shop.companyId,
        latitude:action.data.shop.latitude,
        longitude:action.data.shop.longitude,
        ContactPersonName: '',
        ContactNo: '',
        StartTime: action.data.shop.StartTime,
        NextScheduledVisit: '',
        Location: '',
        Notes: '',
        EndTime: action.data.shop.EndTime,
        StoreVisitId: action.data.shop.storeVisitId,
        Status: 'Achieved'
      }
      const dateNow = String(new Date().getMilliseconds())

      return api.checkOut(data).pipe(
        map(response => {
          if (response.ok) {
            firebase.firestore().batch().set(
              firebase.firestore()
                .collection('tbl_shops')
                .doc(String(action.data.shop.StoreId))
                .collection('shop_events')
                .doc(dateNow),
              {
                device_name: 'ABC_Device',
                lng: action.data.shop.latitude,
                lat: action.data.shop.longitude,
                shopId: String(action.data.shop.StoreId),
                eventId: dateNow,
                userId: String(action.data.userId),
                timestamp: moment().format("MM/DD/YYYY HH:mm")
              }).set(firebase.firestore().collection('tbl_shops')
                .doc(String(action.data.shop.StoreId))
                .collection('visit_summary')
                .doc(dateNow),
              {
                pjp: !!action.data.shop.pjp,
                productive: action.data.shop.productive,
                lat: action.data.shop.latitude,
                lng: action.data.shop.longitude,
                shopId: action.data.shop.StoreId,
                userId: action.data.userId,
                visitId: Number.parseInt(dateNow),
                timestamp: moment().format("MM/DD/YYYY HH:mm")
              }).commit()

            firebase.firestore().collection('tbl_shops')
              .doc(String(action.data.shop.StoreId))
              .set(
                {
                  userId: action.data.userId,
                  lng: action.data.shop.longitude,
                  lat: action.data.shop.latitude,
                  shopId: action.data.shop.StoreId,
                  timestamp: moment().format("MM/DD/YYYY HH:mm")
                })

            if (action.data.onSuccess) action.data.onSuccess()
            return ShopActions.checkOutSuccess(
              {
                id: action.data.shop.StoreId,
                pjp: !!action.data.shop.pjp,
                productive: action.data.shop.productive
              }, action.data.userId
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
    const Order = action.data.items.map(value => ({
      ...value,
      storeVisitId: action.data.checkIn.storeVisitId,
      companyId: action.data.checkIn.companyId,
      StoreId: action.data.checkIn.StoreId,
      userId: action.data.userId
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
            userId: action.data.userId
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
