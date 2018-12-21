import { ofType } from 'redux-observable'
import LoginActions, { LoginTypes } from '../Redux/LoginRedux'
import CreateStoreActions from '../Redux/CreateStoreRedux'
import { mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'

export default (action$, state$, { api }) => action$.pipe(
  ofType(LoginTypes.LOGIN_REQUEST),
  mergeMap(action => {
    let login
    return api.login(action.data).pipe(
      mergeMap(response => {
        if (response.ok) {
          login = JSON.parse(response.data)
          api.setHeaders(login.response.auth_token)
          return api.subsectionsByUser(login.user.userid)
        } else {
          return of(response)
        }
      }),
      mergeMap(response => {
        if (response.ok) {
          return of(LoginActions.loginSuccess(login), CreateStoreActions.subSectionSuccess(response.data))
        } else {
          return of(LoginActions.loginFailure(response))
        }
      })
    )
  })
)
