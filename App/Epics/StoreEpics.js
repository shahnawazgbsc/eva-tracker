import { mergeMap } from 'rxjs/operators'
import { from, of, zip } from 'rxjs'
import { Alert } from 'react-native'
import { ofType } from 'redux-observable'
import StoresRedux, { StoresTypes } from '../Redux/StoresRedux'
import CreateStoreActions, { CreateStoreTypes } from '../Redux/CreateStoreRedux'
import GetBrandsActions from '../Redux/GetBrandsRedux'

export const createStoreEpic = (action$, state$, { api }) => action$.pipe(
  ofType(CreateStoreTypes.CREATE_STORE_REQUEST),
  mergeMap(action => {
    const userId = state$.value.login.payload.user.userid
    const companyId = state$.value.login.payload.user.companyid
    const location = state$.value.gps.data

    return api.uploadImage(action.data.image.uri, action.data.image.fileName, userId)
      .pipe(
        mergeMap(response => {
          if (response.ok) {
            const params = {
              ...action.data,
              image: null,
              latitude: location.latitude,
              longitude: location.longitude,
              EndTime: new Date(),
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
            Alert.alert('Success', 'Store created successfully')
            if (action.data.onSuccess) action.data.onSuccess()
            return of(CreateStoreActions.createStoreSuccess(response.data), StoresRedux.storesRequest())
          } else {
            return of(CreateStoreActions.createStoreFailure(response))
          }
        })
      )
  })
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
