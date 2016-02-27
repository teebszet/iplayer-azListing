import {
  PAGINATE_LETTER,
  FETCH_LISTINGS_REQUEST,
  FETCH_LISTINGS_SUCCESS,
  FETCH_LISTINGS_FAILURE,
  fetchListingsRequest,
  fetchListingsSuccess,
  fetchListingsFailure,
  fetchListingsIfNeeded,
  shouldFetchListings,
  default as listingsDataReducer
} from 'redux/modules/listingsData'

describe('(Redux Module) ListingsData', () => {

  // constant exports
  it('should export a constant PAGINATE_LETTER.', () => {
    expect(PAGINATE_LETTER).to.equal('PAGINATE_LETTER')
  })
  it('should export a constant FETCH_LISTINGS_REQUEST.', () => {
    expect(FETCH_LISTINGS_REQUEST).to.equal('FETCH_LISTINGS_REQUEST')
  })
  it('should export a constant FETCH_LISTINGS_SUCCESS.', () => {
    expect(FETCH_LISTINGS_SUCCESS).to.equal('FETCH_LISTINGS_SUCCESS')
  })
  it('should export a constant FETCH_LISTINGS_FAILURE.', () => {
    expect(FETCH_LISTINGS_FAILURE).to.equal('FETCH_LISTINGS_FAILURE')
  })

  // action creator exports
  it('should export a function fetchListingsRequest.', () => {
    expect(fetchListingsRequest).to.be.a('function')
  })
  it('should export a function fetchListingsSuccess.', () => {
    expect(fetchListingsSuccess).to.be.a('function')
  })
  it('should export a function fetchListingsFailure.', () => {
    expect(fetchListingsFailure).to.be.a('function')
  })

  // thunk action creator exports
  it('should export a function fetchListingsIfNeeded.', () => {
    expect(fetchListingsIfNeeded).to.be.a('function')
  })

  // reducer exports
  it('should export a function listingsDataReducer.', () => {
    expect(listingsDataReducer).to.be.a('function')
  })

  // TODO need to mock the thunk-middleware fetch here
  // describe('(Action) FETCH_LISTINGS_DATA', () => {
  //   it('should return the action for fetchListings', () => {
  //     const letter = 'd'
  //     const expectedAction = {
  //       type: FETCH_LISTINGS_DATA,
  //       data: {idontknow: 'something from api'}
  //     }
  //     expect(fetchListingsData(letter)).to.deep.equal(expectedAction)
  //   })
  // })

  describe('(Action) shouldFetchListings', () => {
    const tests = [
      {
        should: 'should return true if there are no listings',
        input: {state: {listingsData: {}}, letter: 'a'},
        expected: true
      },
      {
        should: 'should return false if there are listings, but isFetching',
        input: {state: {listingsData: {'a': {isFetching: true}}}, letter: 'a'},
        expected: false
      },
      {
        should: 'should return false if there are listings, isFetching, and paginate',
        input: {state: {listingsData: {'a': {isFetching: true}}}, letter: 'a', paginate: true},
        expected: false
      },
      {
        should: 'should return true if there are listings, not isFetching, but we want to paginate',
        input: {state: {listingsData: {'a': {}}}, letter: 'a', paginate: true},
        expected: true
      },
      {
        should: 'should return false if no letter',
        input: {},
        expected: false
      },
      {
        should: 'should return false if no state',
        input: {letter: 'a'},
        expected: false
      },
    ]

    tests.forEach(({should, input, expected}) => {
      it(should, () => {
        expect(shouldFetchListings(input)).to.equal(expected)
      })
    })
  })

  describe('(Reducer) ListingsData', () => {
    const tests = [
      {
        should: 'should return same state if invalid action type',
        initialState: {},
        expectedState: {},
        action: {
          type: 'no action for this type',
          letter: 'a'
        }
      },
      {
        should: 'should return a new state as expected',
        initialState: {},
        action: {
          type: 'FETCH_LISTINGS_REQUEST',
          letter: 'a'
        },
        expectedState: {
          'a': {
            isFetching: true,
            didInvalidate: false,
            fetchedPageCount: 0,
            items: [],
            lastUpdated: undefined,
            error: undefined
          }
        },
      }
    ]

    tests.forEach(({should, initialState, expectedState, action}) => {
      it(should, () => {
        expect(listingsDataReducer(initialState, action)).to.deep.equal(expectedState)
      })
    })
  })
})
