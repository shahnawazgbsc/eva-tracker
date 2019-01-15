import { ofType } from 'redux-observable'
import { map, mergeMap } from 'rxjs/operators'
import InventoryActions, { InventoryTakingType } from '../Redux/InventoryTakingRedux'

export const selectProductsListEpics = (action$, state$, { api }) => action$.pipe(
  ofType(InventoryTakingType.INVENTORY_REQUEST),
  mergeMap(action => {
    const checkInParam = state$.value.shop.checkInParam
    const data = {
      InventoryTaking: action.data.items.map(value => ({
        inventoryItemId: value.inventoryItemId,
        quantity: value.quantity,
        storeVisitId: checkInParam.storeVisitId,
        companyId: checkInParam.companyId,
        StoreId: checkInParam.StoreId
      }))
    }

    return api.addInventories(data).pipe(
      map(response => {
        if (response.ok) {
          if (action.data.onSuccess) action.data.onSuccess()
          return InventoryActions.inventorySuccess(response.data)
        } else {
          if (action.data.onFailure) action.data.onFailure()
          return InventoryActions.inventoryFailure(response)
        }
      })
    )
  })
)
export const selectInventorySKUs = (action$, state$, { api }) => action$.pipe(
  ofType(InventoryTakingType.INVENTORY_SKU_REQUEST),
  mergeMap(action=>{
    const companyId = state$.value.login.payload.user.companyid
    return api.inventorySKUs(companyId).pipe(
      map(response => {
        if (response.ok) {
          return InventoryActions.inventory_sku_success(response.data)
        } else {
          return InventoryActions.inventory_sku_failure(response)
        }
      }))
  })
)
