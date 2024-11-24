import { combineReducers } from 'redux'
import userAuthReducer from './userAuthReducer'
import projectsReducer from './projectReducer'
import searchReducer from './searchReducer'

const myReducer = combineReducers({
  user: userAuthReducer,
  projects: projectsReducer,
  searchTerm: searchReducer,
})

export default myReducer
