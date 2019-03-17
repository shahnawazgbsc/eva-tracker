import { ofType } from 'redux-observable'
import { map, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'
import InventoryActions, { InventoryTakingType } from '../Redux/InventoryTakingRedux'
import OfflineActions from '../Redux/OfflineRedux'

export const selectProductsListEpics = (action$, state$, { api }) => action$.pipe(
  ofType(InventoryTakingType.INVENTORY_REQUEST),
  mergeMap(action => {
    const checkInParam = action.checkInParam ? action.checkInParam : state$.value.shop.checkInParam
    var requestData = []
    action.data.items.forEach(element => {
      if (Number.parseInt(element.quantity) > 0) {
        requestData.push({
          brandName: element.brandName,
          generalSKUId: element.generalSKUId,
          quantity: element.quantity,
          storeVisitId: checkInParam.storeVisitId,
          companyId: checkInParam.companyId,
          StoreId: checkInParam.StoreId
        })
      }
    })

    const data = {
      InventoryTaking: requestData
    }

    if (checkInParam.offline) {
      if (action.data.onSuccess) action.data.onSuccess()
      return of(OfflineActions.addInventory(action), InventoryActions.inventoryFailure(null))
    } else {
      return api.addInventories(data).pipe(
        mergeMap(response => {
          if (response.ok) {
            if (action.data.onSuccess) action.data.onSuccess()
            return of(InventoryActions.inventorySuccess(response.data))
          } else {
            if (action.data.onFailure) action.data.onFailure()
            return of(InventoryActions.inventoryFailure(response))
          }
        })
      )
    }
  })
)
export const selectInventorySKUs = (action$, state$, { api }) => action$.pipe(
  ofType(InventoryTakingType.INVENTORY_SKU_REQUEST),
  mergeMap(action => {
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
