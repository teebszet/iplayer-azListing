import {
  FETCH_LISTINGS_DATA,
  fetchListingsData,
  default as listingsDataReducer
} from 'redux/modules/listingsData'

describe('(Redux Module) ListingsData', () => {
  it('should export a constant FETCH_LISTINGS_DATA.', () => {
    expect(FETCH_LISTINGS_DATA).to.equal('FETCH_LISTINGS_DATA')
  })
  it('should export a function fetchListingsData.', () => {
    expect(fetchListingsData).to.be.a('function')
  })
  it('should export a function listingsDataReducer.', () => {
    expect(listingsDataReducer).to.be.a('function')
  })

  // TODO need to mock the middleware fetch here
  // describe('(Action) FETCH_LISTINGS_DATA', () => {
  //   it('should return the action for fetchListingsData', () => {
  //     const letter = 'd'
  //     const expectedAction = {
  //       type: FETCH_LISTINGS_DATA,
  //       data: {idontknow: 'something from api'}
  //     }
  //     expect(fetchListingsData(letter)).to.deep.equal(expectedAction)
  //   })
  // })

  describe('(Reducer) ListingsData', () => {
    const tests = [
      {
        should: 'should return same state if invalid action type',
        initialState: {},
        expectedState: {},
        action: {
          type: 'no action for this type',
          data: {somevalid: 'data'}
        }
      },
      {
        should: 'should return new state if no initial state',
        initialState: undefined,
        expectedState: {listings: 'data'},
        action: {
          type: 'FETCH_LISTINGS_DATA',
          data: {listings: 'data'}
        }
      },
      {
        should: 'should return {} if no initial state and no letter',
        initialState: undefined,
        expectedState: {},
        action: {
          type: 'FETCH_LISTINGS_DATA',
        }
      },
      {
        should: 'should return the new data in state',
        initialState: {},
        action: {
          type: 'FETCH_LISTINGS_DATA',
          data: {listings: 'data'}
        },
        expectedState: {listings: 'data'},
      }
    ]

    tests.forEach(({should, initialState, expectedState, action}) => {
      it(should, () => {
        expect(listingsDataReducer(initialState, action)).to.deep.equal(expectedState)
      })
    })
  })
})
