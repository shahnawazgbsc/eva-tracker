import { map, mergeMap } from 'rxjs/operators'
import { from, of, zip } from 'rxjs'
import { Alert } from 'react-native'
import { ofType } from 'redux-observable'
import StoresRedux, { StoresTypes } from '../Redux/StoresRedux'
import CreateStoreActions, { CreateStoreTypes } from '../Redux/CreateStoreRedux'
import AppConfig from '../Config/AppConfig'
import GetBrandsActions from '../Redux/GetBrandsRedux'

export const createStoreEpic = (action$, state$, { api }) => action$.pipe(
  ofType(CreateStoreTypes.CREATE_STORE_REQUEST),
  mergeMap(action => {
    console.log(state$)
    const userId = state$.value.login.payload.user.userid
    const companyId = state$.value.login.payload.user.companyId
    const location = state$.value.gps.data

    return api.uploadImage(action.data.image.uri, action.data.image.fileName, userId)
      .pipe(
        map(response => {
          if (response.ok) {
            action.data = {
              ...action.data,
              latitude: location.latitude,
              longitude: location.longitude,
              image: null,
              userId,
              companyId,
              imageUrl: response.data.filepath
            }
            return action
          } else {
            return response
          }
        })
      )
  }),
  mergeMap(action => (action.data.imageUrl ? api.createStore(action.data) : of(action))
    .pipe(
      mergeMap(response => {
        if (response.ok) {
          Alert.alert('Success', 'Store created successfully')
          return of(CreateStoreActions.createStoreSuccess(response.data), StoresRedux.storesRequest())
        } else {
          return of(CreateStoreActions.createStoreFailure(response))
        }
      })
    ))
)

export const storeById = (action$, state$, { api }) => action$.pipe(
  ofType(StoresTypes.STORES_REQUEST),
  mergeMap(action => {
    const userId = state$.value.login.payload.user.userid
    const companyId = state$.value.login.payload.user.companyid

    return zip(api.storesByUserId(userId), api.getBrands(companyId)).pipe(
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
            }
          } else {
            switch (index) {
              case 0:
                actions.push(StoresRedux.storesFailure(value))
                break
              case 1:
                actions.push(GetBrandsActions.getBrandsFailure(value))
                break
            }
          }
        })

        return from(actions)
      })
    )
  })
)
