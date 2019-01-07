import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  historyRequest: ['data'],
  historySuccess: ['payload'],
  historyFailure: ['error']
})

export const HistoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  payload: null
})

/* ------------- Selectors ------------- */

export const HistorySelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HISTORY_REQUEST]: request,
  [Types.HISTORY_SUCCESS]: success,
  [Types.HISTORY_FAILURE]: failure
})
