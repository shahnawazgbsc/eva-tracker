import { ofType } from 'redux-observable'
import LoginActions, { LoginTypes } from '../Redux/LoginRedux'
import CreateStoreActions from '../Redux/CreateStoreRedux'
import { mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { Alert } from 'react-native'

export default (action$, state$, { api }) => action$.pipe(
  ofType(LoginTypes.LOGIN_REQUEST),
  mergeMap(action => {
    let login
    return api.login(action.data).pipe(
      mergeMap(response => {
        if (response.ok) {
          login = response.data
          api.setHeaders(login.response.auth_token)
          return api.subsectionsByUser(login.user.userid)
        } else {
          return of(response)
        }
      }),
      mergeMap(response => {
        if(login.moduleFeatures.length==0) {
          Alert.alert('You are not authorized to use this application')
        return of(LoginActions.loginFailure(response))
        }
        else {
        if (response.ok) {
          return of(LoginActions.loginSuccess(login), CreateStoreActions.subSectionSuccess(response.data))
        } else {
          if (response.status === 400) {
            Alert.alert('Wrong credentials', 'Please provide correct username and password')
          }
          return of(LoginActions.loginFailure(response))
        }
      }
      })
    )
  })
)
