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
  data: { latitude: 24.8632645, longitude: 67.0739113 },
  waypoint: null,
  fetching: false,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const update = (state, { data }) => Immutable(state).merge({ data })

export const gpsDirection = (state) => Immutable(state).merge({ fetching: true })

export const gpsDirectionSuccess = (state, { waypoint }) => Immutable(state).merge({ waypoint, fetching: false })

// Something went wrong somewhere.
export const failure = (state, { error }) => Immutable(state).merge({ error, fetching: false })

export const startUp = (state) => Immutable(state).merge({ fetching: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GPS_UPDATE]: update,
  [Types.GPS_DIRECTION]: gpsDirection,
  [Types.GPS_DIRECTION_SUCCESS]: gpsDirectionSuccess,
  [Types.GPS_FAILURE]: failure,
  'STARTUP': startUp
})
