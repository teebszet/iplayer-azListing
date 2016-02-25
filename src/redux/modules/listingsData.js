/* @flow */
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

export const fetchListingsRequest = (url: Object): Action => ({
  type: FETCH_LISTINGS_REQUEST,
  url
})

export const fetchListingsSuccess = (data: Object): Action => ({
  type: FETCH_LISTINGS_SUCCESS,
  data
})

export const fetchListingsFailure = (data: Object): Action => ({
  type: FETCH_LISTINGS_FAILURE,
  data
})

// ------------------------------------
// Actions
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
export const requestListings = (letter: string): Action => ({
  type: REQUEST_LISTINGS,
  letter
})

export const receiveListings = (letter: string, json): Action => ({
  type: RECEIVE_LISTINGS,
  letter,
  posts: json.data.children.map((child) => child.data), // TODO check API schema
  nextPageURL: json.nextURL, // TODO check the API schema
  receivedAt: Date.now()
})

// TODO implement an error handling action

// ------------------------------------
// Reducer
// ------------------------------------

function listings (state = {
  isFetching: false,
  didInvalidate: false,
  fetchedPageCount: 0,
  nextPageURL: '',
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_LETTER:
      return {...state, ...{
        didInvalidate: true
      }}
    case REQUEST_LISTINGS:
      return {...state, ...{
        isFetching: true,
        didInvalidate: false
      }}
    case RECEIVE_LISTINGS:
      return {...state, ...{
        isFetching: false,
        didInvalidate: false,
        fetchedPageCount: state.fetchedPageCount + 1,
        nextPageURL: action.nextPageURL,
        items: action.posts, // TODO possibly need to decide to append or replace with two separate actions
        lastUpdated: action.receivedAt
      }}
    default:
      return state
  }
}

export default function listingsByLetterReducer (state: Object = {}, action: Action): Object {
  switch (action.type) {
    case INVALIDATE_LETTER:
    case RECEIVE_LISTINGS:
    case REQUEST_LISTINGS:
      return {...state, ...{
        [action.letter]: listings(state[action.letter], action)
      }}
    default:
      return state
  }
}
