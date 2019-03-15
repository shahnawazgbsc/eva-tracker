import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getBrandsRequest: ['data'],
  getBrandsSuccess: ['payload'],
  getBrandsFailure: null
})

export const GetBrandsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const GetBrandsSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  Immutable(state).merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return Immutable(state).merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  Immutable(state).merge({ fetching: false, error: true })

export const startUp = (state) => Immutable(state).merge({ fetching: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_BRANDS_REQUEST]: request,
  [Types.GET_BRANDS_SUCCESS]: success,
  [Types.GET_BRANDS_FAILURE]: failure,
  'STARTUP': startUp
})
