/* @flow */
import fetch from 'isomorphic-fetch'

// ------------------------------------
// Constants
// ------------------------------------
export const INVALIDATE_LETTER = 'INVALIDATE_LETTER'

export const FETCH_LISTINGS_REQUEST = 'FETCH_LISTINGS_REQUEST'
export const FETCH_LISTINGS_SUCCESS = 'FETCH_LISTINGS_SUCCESS'
export const FETCH_LISTINGS_FAILURE = 'FETCH_LISTINGS_FAILURE'

// ------------------------------------
// Action Creators
// ------------------------------------

// UI actions
export const invalidateLetter = (letter: string): Action => ({
  type: INVALIDATE_LETTER,
  letter
})

// Network actions

export const fetchListingsRequest = (letter: string): Action => ({
  type: FETCH_LISTINGS_REQUEST,
  letter
})

export const fetchListingsSuccess = (letter: string, json: Object): Action => {
  // TODO is there a better place to store schema info?
  //
  // wow, ES6 destructuring so useful with APIs! originally used lodash map -> pick,
  // but this seems cleaner:
  const listings = json.atoz_programmes.elements
    .map(({title, lexical_sort_letter, images: {standard: image}, id}) => ({
      title,
      letter: lexical_sort_letter.toLowerCase(),
      image,
      id
    }))

  let remainingListings = json.atoz_programmes.count -
    (json.atoz_programmes.page * json.atoz_programmes.per_page)

  if (remainingListings < 0) {
    remainingListings = 0
  }
  return {
    type: FETCH_LISTINGS_SUCCESS,
    letter,
    listings,
    remainingListings,
    receivedAt: Date.now()
  }
}

export const fetchListingsFailure = (letter: string, json: Object): Action => ({
  type: FETCH_LISTINGS_FAILURE,
  letter,
  error: json.error // TODO check API schema
})

// Async action thunks
function fetchListings (letter: string, page: number): Function {
  return (dispatch) => {
    dispatch(fetchListingsRequest(letter))
    const uri = `https://ibl.api.bbci.co.uk/ibl/v1/atoz/${letter}/programmes?page=${page}`
    console.log('fetching from ' + uri)
    return fetch(uri)
      .then((response) => response.json())
      .then((json) => dispatch(fetchListingsSuccess(letter, json))) // TODO dispatch failure if error
  }
}

export function shouldFetchListings ({state, letter, paginate}): bool|number {
  if (!letter || !state) {
    return false
  }

  const listings = state.listingsData[letter]
  if (!listings) {
    return 1
  } else if (listings.isFetching) {
    return false
  } else if (paginate) {
    return listings.fetchedPageCount + 1
  } else {
    return listings.didInvalidate ? 1 : false
  }
}

export function fetchListingsIfNeeded (letter: string, paginate: bool): Function {
  return (dispatch, getState) => {
    const page = shouldFetchListings({state: getState(), letter, paginate})
    if (page) {
      return dispatch(fetchListings(letter, page))
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
      if (!action.listings || !action.receivedAt) {
        return state
      } else {
        return {...state, ...{
          isFetching: false,
          didInvalidate: false,
          fetchedPageCount: state.fetchedPageCount + 1,
          items: [...state.items, ...action.listings],
          remainingListings: action.remainingListings,
          lastUpdated: action.receivedAt
        }}
      }
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
      if (!action.letter) {
        return state
      } else {
        return {...state, ...{
          [action.letter]: listingsReducer(state[action.letter], action)
        }}
      }
    default:
      return state
  }
}
