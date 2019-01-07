import { ofType } from 'redux-observable'
import HistoryActions, { HistoryTypes } from '../Redux/HistoryRedux'
import { mergeMap, map } from 'rxjs/operators'

export default (action$, state$, { api }) => action$.pipe(
  ofType(HistoryTypes.HISTORY_REQUEST),
  mergeMap(({ data }) => {
    return api.history(data).pipe(
      map(response => {
        if (response.ok) {
          return HistoryActions.historySuccess(response.data)
        } else {
          return HistoryActions.historyFailure(response)
        }
      })
    )
  })
)
