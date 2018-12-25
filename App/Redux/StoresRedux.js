import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { ShopTypes } from './ShopRedux'
import * as R from 'ramda'
import moment, { StartOf } from 'moment'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  storesSuccess: ['payload'],
  storesRequest: null,
  storesFailure: ['error'],
  dayStartRequest: null,
  dayEndRequest: null
})

export const StoresTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  payload: null,
  achieved: [],
  fetching: false,
  dayStarted: false,
  dayStartDate: null,
  dayEndDate: null
})

/* ------------- Reducers ------------- */

// successful api lookup
const request = (state = INITIAL_STATE) => state && Immutable(state).merge({ fetching: true })

const dayStart = (state) => {
  if (!state.dayStartDate || moment(state.dayStartDate).isBefore(new Date(), 'D')) {
    return Immutable(state).merge({ dayStartDate: new Date(), dayStarted: true })
  } else return state
}

const dayEnd = (state) => Immutable(state).merge({ dayEndDate: new Date(), dayStarted: false, achieved: [] })

export const success = (state, action) => {
  const { payload } = action
  return Immutable(state).merge({ payload, fetching: false })
}

export const failure = (state, action) => Immutable(state).merge({ fetching: false, error: action.error })

export const startUp = (state) => Immutable(state).merge({ fetching: false })

export const checkOutCheck = (state, { id }) =>
  R.contains(id, state.achieved) ? state : Immutable(state).merge({
    achieved: Immutable(state.achieved).concat(id)
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORES_SUCCESS]: success,
  [Types.STORES_REQUEST]: request,
  [Types.STORES_FAILURE]: failure,
  [Types.DAY_START_REQUEST]: dayStart,
  [Types.DAY_END_REQUEST]: dayEnd,
  [ShopTypes.CHECK_OUT_SUCCESS]: checkOutCheck,
  'STARTUP': startUp
})
