import { ofType } from 'redux-observable'
import ShopHistoryAction, { ShopHistoryTakingType } from '../Redux/ShopHistoryRedux'
import { mergeMap, map } from 'rxjs/operators'

export default (action$, state$, { api }) => action$.pipe(
  ofType(ShopHistoryTakingType.SHOP_HISTORY_REQUEST),
  mergeMap((data) => {
    return api.history(data).pipe(
      map(response => {
        if (response.ok) {
          return ShopHistoryAction.shopHistorySuccess(response.data)
        } else {
          return ShopHistoryAction.shopHistoryFailure(response)
        }
      })
    )
  })
)
