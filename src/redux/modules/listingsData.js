/* @flow */
import fetch from 'isomorphic-fetch'

// ------------------------------------
// Constants
// ------------------------------------
export const SELECT_LETTER = 'SELECT_LETTER'
export const INVALIDATE_LETTER = 'INVALIDATE_LETTER'
export const REQUEST_LISTINGS = 'REQUEST_LISTINGS'
export const RECEIVE_LISTINGS = 'RECEIVE_LISTINGS'

export const FETCH_LISTINGS_REQUEST = 'FETCH_LISTINGS_REQUEST'
export const FETCH_LISTINGS_SUCCESS = 'FETCH_LISTINGS_SUCCESS'
export const FETCH_LISTINGS_FAILURE = 'FETCH_LISTINGS_FAILURE'

// ------------------------------------
// Action Creators
// ------------------------------------

// UI actions
export const selectLetter = (letter: string): Action => ({
  type: SELECT_LETTER,
  letter
})

export const invalidateLetter = (letter: string): Action => ({
  type: INVALIDATE_LETTER,
  letter
})

// Network actions

export const fetchListingsRequest = (letter: string): Action => ({
  type: FETCH_LISTINGS_REQUEST,
  letter
})

export const fetchListingsSuccess = (letter: string, json: Object): Action => ({
  type: FETCH_LISTINGS_SUCCESS,
  letter,
  listings: json.data.children.map((child) => child.data), // TODO check API schema
  nextPageURL: json.nextURL, // TODO check the API schema
  receivedAt: Date.now()
})

export const fetchListingsFailure = (letter: string, json: Object): Action => ({
  type: FETCH_LISTINGS_FAILURE,
  letter,
  error: json.error // TODO check API schema
})

// Async action thunks
function fetchListings (letter: string): Function {
  return (dispatch) => {
    dispatch(fetchListingsRequest(letter))
    return fetch(`https://ibl.api.bbci.co.uk/ibl/v1/atoz/${letter}/programmes?page=1`) // TODO pagination
      .then((response) => response.json())
      .then((json) => dispatch(fetchListingsSuccess(letter, json))) // TODO dispatch failure if error
  }
}

function shouldFetchListings (state: Object, letter: string): bool {
  const listings = state.listingsData[letter]
  if (!listings) {
    return true
  } else if (listings.isFetching) {
    return false
  } else {
    return listings.didInvalidate
  }
}

export function fetchListingsIfNeeded (letter: string): Promise {
  return (dispatch, getState) => {
    if (shouldFetchListings(getState(), letter)) {
      return dispatch(fetchListings(letter))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

function listingsReducer (state = {
  isFetching: false,
  didInvalidate: false,
  fetchedPageCount: 0,
  nextPageURL: '',
  items: [],
  lastUpdated: undefined,
  error: undefined
}, action) {
  switch (action.type) {
    case INVALIDATE_LETTER:
      return {...state, ...{
        didInvalidate: true
      }}
    case FETCH_LISTINGS_REQUEST:
      return {...state, ...{
        isFetching: true,
        didInvalidate: false
      }}
    case FETCH_LISTINGS_SUCCESS:
      return {...state, ...{
        isFetching: false,
        didInvalidate: false,
        fetchedPageCount: state.fetchedPageCount + 1,
        nextPageURL: action.nextPageURL,
        items: action.posts, // TODO possibly need to decide to append or replace with two separate actions
        lastUpdated: action.receivedAt
      }}
    case FETCH_LISTINGS_FAILURE:
      return {...state, ...{
        isFetching: false,
        didInvalidate: false, // TODO do we set this to true or handle an error some other way?
        error: action.error
      }}
    default:
      return state
  }
}

export default function listingsByLetterReducer (state: Object = {}, action: Action): Object {
  switch (action.type) {
    case INVALIDATE_LETTER:
    case FETCH_LISTINGS_REQUEST:
    case FETCH_LISTINGS_SUCCESS:
    case FETCH_LISTINGS_FAILURE:
      return {...state, ...{
        [action.letter]: listingsReducer(state[action.letter], action)
      }}
    default:
      return state
  }
}
