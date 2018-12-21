import { map, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { Alert } from 'react-native'
import { ofType } from 'redux-observable'
import StoresRedux, { StoresTypes } from '../Redux/StoresRedux'
import CreateStoreActions, { CreateStoreTypes } from '../Redux/CreateStoreRedux'
import AppConfig from '../Config/AppConfig'

export const createStoreEpic = (action$, state$, { api }) => action$.pipe(
  ofType(CreateStoreTypes.CREATE_STORE_REQUEST),
  mergeMap(action => {
    console.log(state$)
    const userId = state$.value.login.payload.user.userid
    const companyId = state$.value.login.payload.user.companyId

    return api.uploadImage(action.data.image.uri, userId)
      .pipe(
        map(response => {
          if (response.ok) {
            action.data = {
              ...action.data,
              image: null,
              userId,
              companyId,
              imageURL: AppConfig.baseUrl + response.data.filepath.split('\\').join('/')
            }
            return action
          } else {
            return response
          }
        })
      )
  }),
  mergeMap(action => (action.data.imageURL ? api.createStore(action.data) : of(action))
    .pipe(
      map(response => {
        if (response.ok) {
          Alert.alert('Success', 'Store created successfully')
          return CreateStoreActions.createStoreSuccess(response.data)
        } else {
          return CreateStoreActions.createStoreFailure(response)
        }
      })
    ))
)

export const storeById = (action$, state$, { api }) => action$.pipe(
  ofType(StoresTypes.STORES_REQUEST),
  mergeMap(action => api.storesByUserId(action.data).pipe(
    map(response => {
      if (response.ok) {
        return StoresRedux.success(response.data)
      } else {
        return StoresRedux.failure(response)
      }
    })
  ))
)
