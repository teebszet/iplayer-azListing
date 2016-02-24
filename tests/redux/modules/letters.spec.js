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
    it('should return the new letter in state', () => {
      const initialState = ''
      const text = 'a'
      const expectedState = text
      const action = updateLetter(text)
      expect(letterReducer(initialState, action)).to.deep.equal(expectedState)
    })
  })
})
