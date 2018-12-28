import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  selectProductsList: null,
  selectProductsListFailure: ['error'],
  selectProductsListSuccess: ['data']
})

export const InventoryTakingType = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  payload: null,
  error: null,
  inventoryTaken:false
})

/* ------------- Reducers ------------- */

// request the data from an api
export const selectProductsList = (state = INITIAL_STATE) => state && 
    Immutable(state).merge({ fetching: true })

export const selectProductsListSuccess = (state, { data }) => Immutable(state).merge({
  fetching: false,
  payload: data,
  error:null,
  inventoryTaken: true
})

  // Something went wrong somewhere.
export const selectProductsListFailure = (state, { error }) =>
    Immutable(state).merge({ fetching: false, error })
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SELECT_PRODUCTS_LIST]: selectProductsList,
  [Types.SELECT_PRODUCTS_LIST_SUCCESS]: selectProductsListSuccess,
  [Types.SELECT_PRODUCTS_LIST_FAILURE]: selectProductsListFailure,
})
