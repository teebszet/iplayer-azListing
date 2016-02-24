import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import letter from './modules/letters'

export default combineReducers({
  letter,
  router
})
