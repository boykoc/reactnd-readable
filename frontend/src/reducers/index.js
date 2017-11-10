import { combineReducers } from 'redux'
import { SELECT_CATEGORY, REQUEST_POSTS, RECEIVE_POSTS } from '../actions'

function selectedCategory(state = 'react', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

function posts( state = { isFetching: false, items: []}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return {...state, 
      	isFetching: true
      }
    case RECEIVE_POSTS:
      return {...state, 
        isFetching: false,
        items: action.posts,
        lastUpdated: action.recievedAt
      }
    default:
      return state
  }
}

function postsByCategory(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {...state, 
        [action.category]: posts(state[action.category], action)
      }
    default: 
      return state
  }
}

const rootReducer = combineReducers({
  postsByCategory,
  selectedCategory
})

export default rootReducer