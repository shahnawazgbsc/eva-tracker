import { ofType } from 'redux-observable'
import { map, mergeMap } from 'rxjs/operators'
import InventoryActions, { InventoryTakingType } from '../Redux/InventoryTakingRedux'
import GetBrandsActions from '../Redux/GetBrandsRedux'

export const selectProductsListEpics = (action$, state$, { api }) => action$.pipe(
  ofType(InventoryTakingType.SELECT_PRODUCTS_LIST),
  mergeMap(action => {
     const companyId = state$.value.login.payload == null? 194 : 
          state$.value.login.payload.user.companyid
    return api.getBrands(companyId).pipe(
      map(response => {
        //alert(JSON.stringify(response.data))
         if (response.ok) {
           return InventoryActions.selectProductsListSuccess(response.data)
         } else {
           return InventoryTakingType.selectProductsListFailure(response)
         }
      })
    )
  })
)