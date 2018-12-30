import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { ShopTypes } from './ShopRedux'
import * as R from 'ramda'
import moment from 'moment'
import GetVisitDay from '../Lib/GetVisitDay'
import { LoginTypes } from './LoginRedux'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  storesSuccess: ['payload'],
  storesRequest: null,
  storesFailure: ['error'],
  dayStartRequest: ['data'],
  dayStartSuccess: ['id'],
  dayEndRequest: ['note'],
  dayEndSuccess: null
})

export const StoresTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  payload: null,
  pjpShops: null,
  others: null,
  achieved: [],
  fetching: false,
  dayStarted: false,
  dayStartDate: null,
  pjpId: null,
  subsection: null
})

/* ------------- Reducers ------------- */

// successful api lookup
const request = (state = INITIAL_STATE) => Immutable(state).merge({ fetching: true })

const dayStartRequest = (state, { data }) => Immutable(state).merge({ fetching: true, subsection: data })

const dayStartSuccess = (state, { id }) => Immutable(state).merge({
  fetching: false,
  pjpId: id,
  dayStarted: true,
  dayStartDate: new Date()
})

const dayEndRequest = (state) => Immutable(state).merge({ fetching: true })

const dayEndSuccess = (state) => Immutable(state).merge({
  fetching: false,
  subsection: null,
  dayStarted: false,
  achieved: []
})

export const success = (state, { payload }) => {
  let pjpShops =
    R.map(R.assoc('pjp', true))(
      R.filter(
        R.compose(
          R.contains(GetVisitDay()),
          R.map(R.prop('day')),
          R.prop('visitDays')
        ))(payload))

  let others = R.filter(
    R.compose(
      R.not,
      R.contains(GetVisitDay()),
      R.map(R.prop('day')),
      R.prop('visitDays')
    )
  )(payload)
  return Immutable(state).merge({ payload, fetching: false, pjpShops, others })
}

export const failure = (state, action) => Immutable(state).merge({ fetching: false, error: action.error })

export const startUp = (state) => {
  if (state.dayStartDate && moment(state.dayStartDate).isBefore(new Date(), 'D')) {
    // Previous day not ended discuss logic what to do here
  }
  return Immutable(state).merge({ fetching: false })
}

export const checkOutCheck = (state, { data }) =>
  R.contains(
    data.id,
    R.map(R.prop('id'))
  )(state.achieved) ? state : Immutable(state).merge({ achieved: Immutable(state.achieved).concat(data) })

export const reset = state => Immutable(state).merge({
  shops: null,
  pjpShops: null,
  achieved: [],
  others: null,
  dayStartDate: __DEV__ ? null : state.dayStartDate,
  dayStarted: __DEV__ ? false : state.dayStarted
})
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORES_SUCCESS]: success,
  [Types.STORES_REQUEST]: request,
  [Types.STORES_FAILURE]: failure,
  [Types.DAY_START_REQUEST]: dayStartRequest,
  [Types.DAY_START_SUCCESS]: dayStartSuccess,
  [Types.DAY_END_REQUEST]: dayEndRequest,
  [Types.DAY_END_SUCCESS]: dayEndSuccess,
  [LoginTypes.LOGOUT]: reset,
  [ShopTypes.CHECK_OUT_SUCCESS]: checkOutCheck,
  'STARTUP': startUp
})
