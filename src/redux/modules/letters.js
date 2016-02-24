/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_LETTER = 'UPDATE_LETTER'

// ------------------------------------
// Actions
// ------------------------------------
export const updateLetter = (text: string): Action => ({
  type: UPDATE_LETTER,
  text
})

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = ''
export default function letterReducer (state: string = initialState, action: Action): string {
  switch (action.type) {
    case UPDATE_LETTER:
      return action.text ? action.text : state
    default:
      return state
  }
}
