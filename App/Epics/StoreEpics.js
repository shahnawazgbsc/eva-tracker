import { map, mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import StoresRedux, { StoresTypes } from '../Redux/StoresRedux'

export const storeById = (action$, state$, { api }) => action$.pipe(
  ofType(StoresTypes.STORES_REQUEST),
  mergeMap(action => api.storesByUserId(action.data).pipe(
    map(response => {
      if (response.ok){
        return StoresRedux.success(response.data)
      } else {
        return StoresRedux.failure(response)
      }
    })
  ))
)
