import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  createStoreRequest: ['data'],
  createStoreSuccess: ['payload'],
  subSectionSuccess: ['payload'],
  selectDays: ['payload'],
  resetDays: null,
  createStoreFailure: ['error']
})

export const CreateStoreTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  subSection: null,
  days: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) => Immutable(state).merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, {payload}) => Immutable(state).merge({ fetching: false, error: null, payload })

export const subSectionSuccess = (state, { payload }) => Immutable(state).merge({ subSection: payload })

export const selectDays = (state, { payload }) => Immutable(state).merge({ days: payload.sort() })

export const resetDays = (state) => Immutable(state).merge({ days: null })

// Something went wrong somewhere.
export const failure = (state, { error }) => Immutable(state).merge({ fetching: false, error, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_STORE_REQUEST]: request,
  [Types.CREATE_STORE_SUCCESS]: success,
  [Types.CREATE_STORE_FAILURE]: failure,
  [Types.SUB_SECTION_SUCCESS]: subSectionSuccess,
  [Types.RESET_DAYS]: resetDays,
  [Types.SELECT_DAYS]: selectDays
})
