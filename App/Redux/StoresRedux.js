import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  storesSuccess: ['payload'],
  storesRequest: null,
  storesFailure: ['error'],
  dayStartRequest: ['date'],
  dayEndRequest: null
})

export const StoresTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  payload: null,
  fetching: false,
  date: null
})

/* ------------- Reducers ------------- */

// successful api lookup
const request = (state = INITIAL_STATE) => state && state.merge({ fetching: true })

const dayStart = (state, { date }) => state.merge({ date })

const dayEnd = (state) => state.merge({ date: null })

export const success = (state, action) => {
  const { payload } = action
  return state.merge({ payload, fetching: false })
}

export const failure = (state, action) => state.merge({ fetching: false, error: action.error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORES_SUCCESS]: success,
  [Types.STORES_REQUEST]: request,
  [Types.STORES_FAILURE]: failure,
  [Types.DAY_START_REQUEST]: dayStart,
  [Types.DAY_END_REQUEST]: dayEnd
})
