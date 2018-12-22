import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  gpsUpdate: ['data'],
  gpsDirection: ['location'],
  gpsDirectionSuccess: ['waypoint'],
  gpsFailure: ['error']
})

export const GpsLocationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  waypoint: null,
  fetching: false,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const update = (state, { data }) =>
  state.merge({ data })

export const gpsDirection = (state) => state.merge({ fetching: true })

export const gpsDirectionSuccess = (state, { waypoint }) => state.merge({ waypoint, fetching: false })

// Something went wrong somewhere.
export const failure = (state, { error }) =>
  state.merge({ error, fetching: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GPS_UPDATE]: update,
  [Types.GPS_DIRECTION]: gpsDirection,
  [Types.GPS_DIRECTION_SUCCESS]: gpsDirectionSuccess,
  [Types.GPS_FAILURE]: failure
})
