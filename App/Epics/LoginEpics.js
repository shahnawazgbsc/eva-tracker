import { ofType } from 'redux-observable'
import LoginActions, { LoginTypes } from '../Redux/LoginRedux'
import { mergeMap, map } from 'rxjs/operators'

export default (action$, state$, { api }) => action$.pipe(
  ofType(LoginTypes.LOGIN_REQUEST),
  mergeMap(action => {
    return api.login(action.data).pipe(
      map(response => {
        if (response.ok) {
          console.log(LoginActions.loginSuccess(response.data))
          return LoginActions.loginSuccess(response.data)
        } else {
          return LoginActions.loginFailure(response)
        }
      })
    )
  })
)
