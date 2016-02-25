import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import letter from './modules/letters'
import listingsData from './modules/listingsData'

export default combineReducers({
  letter,
  listingsData,
  router
})
