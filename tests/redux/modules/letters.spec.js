import {
  UPDATE_LETTER,
  updateLetter
} from 'redux/modules/letters'

describe('(Redux Module) Letters', () => {
  it('should export a constant UPDATE_LETTER.', () => {
    expect(UPDATE_LETTER).to.equal('UPDATE_LETTER')
  })
  it('should export a function updateLetter.', () => {
    expect(updateLetter).to.be.a('function')
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
})
