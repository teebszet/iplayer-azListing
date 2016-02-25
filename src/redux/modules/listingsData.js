/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_LISTINGS_DATA = 'FETCH_LISTINGS_DATA'

// ------------------------------------
// Actions
// ------------------------------------
export const fetchListingsData = (data: Object): Action => ({
  type: FETCH_LISTINGS_DATA,
  data
})

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {}
export default function listingsDataReducer (state: Object = initialState, action: Action): Object {
  switch (action.type) {
    case FETCH_LISTINGS_DATA:
      return action.data ? action.data : state
    default:
      return state
  }
}
