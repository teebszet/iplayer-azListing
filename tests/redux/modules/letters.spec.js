import {
  UPDATE_LETTER,
  updateLetter,
  default as letterReducer
} from 'redux/modules/letters'

describe('(Redux Module) Letter', () => {
  it('should export a constant UPDATE_LETTER.', () => {
    expect(UPDATE_LETTER).to.equal('UPDATE_LETTER')
  })
  it('should export a function updateLetter.', () => {
    expect(updateLetter).to.be.a('function')
  })
  it('should export a function letterReducer.', () => {
    expect(letterReducer).to.be.a('function')
  })

  describe('(Action) UPDATE_LETTER', () => {
    it('should update the letter', () => {
      const text = 'a'
      const expectedAction = {
        type: UPDATE_LETTER,
        text
      }
      expect(updateLetter(text)).to.deep.equal(expectedAction)
    })
  })

  describe('(Reducer) Letter', () => {
    let tests = [
      {
        should: 'should return same state if invalid action type',
        initialState: '',
        expectedState: '',
        action: {
          type: 'somethingweird',
          text: 'a'
        }
      },
      {
        should: 'should return letter if no initial state',
        initialState: undefined,
        expectedState: 'a',
        action: {
          type: 'UPDATE_LETTER',
          text: 'a'
        }
      },
      {
        should: 'should return \'\' if no initial state and no letter',
        initialState: undefined,
        expectedState: '',
        action: {
          type: 'UPDATE_LETTER',
        }
      },
      {
        should: 'should return the new letter in state',
        initialState: '',
        action: {
          type: 'UPDATE_LETTER',
          text: 'a'
        },
        expectedState: 'a'
      },
    ]

    tests.forEach(({should, initialState, expectedState, action}) => {
      it(should, () => {
        expect(letterReducer(initialState, action)).to.equal(expectedState)
      })
    })
  })
})
