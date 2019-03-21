import { mergeMap } from 'rxjs/operators'
import { from, of, zip } from 'rxjs'
import { Alert } from 'react-native'
import { ofType } from 'redux-observable'
import StoresRedux, { StoresTypes } from '../Redux/StoresRedux'
import OfflineActions from '../Redux/OfflineRedux'
import CreateStoreActions, { CreateStoreTypes } from '../Redux/CreateStoreRedux'
import GetBrandsActions from '../Redux/GetBrandsRedux'
import GetNonBrandsActions from '../Redux/GetNonBrandsRedux'
import { NETWORK_ERROR, TIMEOUT_ERROR } from 'apisauce'
import { hasPJPDay } from '../Lib/GetVisitDay'
import * as R from 'ramda'
import moment from 'moment'

export const createStoreEpic = (action$, state$, { api }) => action$.pipe(
  ofType(CreateStoreTypes.CREATE_STORE_REQUEST),
  mergeMap(action => {
    const userId = state$.value.login.payload.user.userid
    const companyId = state$.value.login.payload.user.companyid
    const location = state$.value.gps.data

    if (location) {
      return api.uploadImage(action.data.image.uri, action.data.image.fileName, userId)
        .pipe(
          mergeMap(response => {
            if (response.ok) {
              const params = {
                ...action.data,
                image: null,
                latitude: location.latitude,
                longitude: location.longitude,
                EndTime: moment().format('MM/DD/YYYY HH:mm'),
                userId: userId,
                companyId: companyId,
                imageUrl: response.data.filepath
              }
              return api.createStore(params)
            } else {
              return of(response)
            }
          }),
          mergeMap(response => {
            if (response.ok) {

              if (action.data.onSuccess) action.data.onSuccess()
              if (action.offline) {
                return of(CreateStoreActions.createStoreSuccess({
                  ...response.data,
                  city: action.data.city
                }), OfflineActions.fixStore(action.id, response.data.id, userId))
              } else {
                Alert.alert('Success', 'Store created successfully')
                return of(CreateStoreActions.createStoreSuccess({
                  ...response.data, city: action.data.city
                }), StoresRedux.storesRequest())
              }
            } else {
              if (R.any(value => R.equals(R.prop('problem', response), value), [NETWORK_ERROR, TIMEOUT_ERROR]) && !action.offline) {
                const hasPJP = hasPJPDay(action.data)

                Alert.alert('Success', 'Store created in offline mode')
                if (action.data.onSuccess) action.data.onSuccess()

                if (hasPJP) {
                  return of(OfflineActions.addPjpStore({
                    action,
                    data: R.merge(action.data, { storeId: new Date().getTime(), pjp: true })
                  }), CreateStoreActions.createStoreFailure(response))
                } else {
                  return of(OfflineActions.addOtherStore({
                    action,
                    data: R.assoc('storeId', new Date().getTime(), action.data)
                  }), CreateStoreActions.createStoreFailure(response))
                }
              } else {
                return of(CreateStoreActions.createStoreFailure(response))
              }
            }
          })
        )
    } else {
      Alert.alert('Failed to grab your location, Please try again')
      return of(CreateStoreActions.createStoreFailure(null))
    }
  })
)

export const storeById = (action$, state$, { api }) => action$.pipe(
  ofType(StoresTypes.STORES_REQUEST),
  mergeMap(action => {
    const userId = state$.value.login.payload.user.userid
    const companyId = state$.value.login.payload.user.companyid

    return zip(api.storesByUserId(userId), api.getBrands(companyId), api.getNonBrands(companyId)).pipe(
      mergeMap(response => {
        const actions = []
        response.forEach((value, index) => {
          if (value.ok) {
            switch (index) {
              case 0:
                actions.push(StoresRedux.storesSuccess(value.data))
                break
              case 1:
                actions.push(GetBrandsActions.getBrandsSuccess(value.data))
                break
              case 2:
                actions.push(GetNonBrandsActions.getNonBrandsSuccess(value.data))
                break
            }
          } else {
            switch (index) {
              case 0:
                actions.push(StoresRedux.storesFailure(value))
                break
              case 1:
                actions.push(GetBrandsActions.getBrandsFailure(value))
                break
              case 2:
                actions.push(GetNonBrandsActions.getNonBrandsFailure(value))
                break
            }
          }
        })

        return from(actions)
      })
    )
  })
)
