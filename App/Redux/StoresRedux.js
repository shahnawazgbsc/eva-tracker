import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  storesSuccess: ['payload']
})

export const StoresTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  payload: null
})

/* ------------- Reducers ------------- */

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ payload })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORES_SUCCESS]: success
})
