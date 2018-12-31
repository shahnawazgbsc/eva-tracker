import { ofType } from 'redux-observable'
import { Alert } from 'react-native'
import { map, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'
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
        StartTime: new Date(),
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
        EndTime: new Date(),
        StoreVisitId: checkInParam.storeVisitId,
        Status: 'Achieved'
      }
      const dateNow = String(new Date().getMilliseconds())

      return api.checkOut(data).pipe(
        map(response => {
          if (response.ok) {
            firebase.firestore()
              .collection('tbl_shops')
              .doc(String(checkInParam.StoreId))
              .collection('shop_events')
              .doc(dateNow)
              .set({
                device_name: 'ABC_Device',
                lng: latitude,
                lat: longitude,
                shopId: String(checkInParam.StoreId),
                eventId: dateNow,
                userId: String(userId),
                timestamp: new Date()
              })
              .then((docRef) => {
                console.log('done')
              })
              .catch((error) => {
                console.warn('Error adding document: ', error)
              })

            firebase
              .firestore()
              .collection('tbl_shops')
              .doc(String(checkInParam.StoreId))
              .collection('visit_summary')
              .doc(dateNow)
              .set({
                pjp: !!action.data.pjp,
                productive: action.data.productive,
                lat: latitude,
                lng: longitude,
                shopId: checkInParam.StoreId,
                userId: userId,
                visitId: dateNow,
                timestamp: new Date()
              })
              .then((docRef) => {
                console.log('done')
              })
              .catch((error) => {
                console.warn('Error adding document: ', error)
              })

            if (action.data.onSuccess) action.data.onSuccess()
            return ShopActions.checkOutSuccess(
              {
                id: checkInParam.StoreId,
                pjp: !!action.data.pjp,
                productive: action.data.productive
              }
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

export const placeOrderEpics = (action$, state$, { api }) => action$.pipe(
  ofType(ShopTypes.PLACE_ORDER_REQUEST),
  mergeMap(action => {
    const checkInParams = state$.value.shop.checkInParam
    const Order = action.data.items.map(value => ({
      ...value,
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
